const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Get User Profile
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [users] = await db.execute('SELECT id, name, email, phone, address, city, pincode FROM users WHERE id = ?', [id]);
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(users[0]);
  } catch (error) {
    console.error('Fetch profile error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update User Profile
router.put('/:id/profile', async (req, res) => {
  const { id } = req.params;
  const { name, phone, address, city, pincode } = req.body;
  
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }
  
  try {
    await db.execute(
      'UPDATE users SET name = ?, phone = ?, address = ?, city = ?, pincode = ? WHERE id = ?',
      [name, phone, address || null, city || null, pincode || null, id]
    );
    
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Change Password
router.put('/:id/password', async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;
  
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new passwords are required' });
  }
  
  try {
    const [users] = await db.execute('SELECT password FROM users WHERE id = ?', [id]);
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = users[0];
    
    if (user.password !== currentPassword) {
      return res.status(401).json({ error: 'Incorrect current password' });
    }
    
    await db.execute('UPDATE users SET password = ? WHERE id = ?', [newPassword, id]);
    
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
