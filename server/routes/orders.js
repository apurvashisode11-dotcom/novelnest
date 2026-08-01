const express = require('express');
const router = express.Router();
const db = require('../database/db');

// POST /api/orders — Place a new order
router.post('/', async (req, res) => {
  const { customer_name, phone, address, city, pincode, book_id, book_title, quantity, price } = req.body;

  if (!customer_name || !phone || !address || !city || !pincode || !book_id || !book_title || !quantity || !price) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (!/^\d{10}$/.test(String(phone).replace(/\s/g, ''))) {
    return res.status(400).json({ error: 'Enter a valid 10-digit phone number' });
  }
  if (!/^\d{6}$/.test(String(pincode))) {
    return res.status(400).json({ error: 'Pincode must be 6 digits' });
  }
  if (Number(quantity) < 1) {
    return res.status(400).json({ error: 'Quantity must be at least 1' });
  }

  const total = (Number(price) * Number(quantity)).toFixed(2);
  const order_id = 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

  try {
    await db.execute(
      'INSERT INTO orders (order_id, customer_name, phone, address, city, pincode, book_id, book_title, quantity, price, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [order_id, customer_name, String(phone), address, city, String(pincode), Number(book_id), book_title, Number(quantity), Number(price), Number(total)]
    );
    res.status(201).json({ message: 'Order placed successfully', order_id, total });
  } catch (error) {
    console.error('Order insert error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/orders — Retrieve all orders
router.get('/', async (req, res) => {
  try {
    const [orders] = await db.execute('SELECT * FROM orders ORDER BY order_date DESC');
    res.json(orders);
  } catch (error) {
    console.error('Order fetch error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
