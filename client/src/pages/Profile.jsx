import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiEye, FiEyeOff, FiSave } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { getUserProfile, updateUserProfile, changeUserPassword } from '../services/api';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0 },
};

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // Forms
  const [personalForm, setPersonalForm] = useState({ name: '', phone: '', address: '', city: '', pincode: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  
  // UI States
  const [loading, setLoading] = useState(true);
  const [updatingPersonal, setUpdatingPersonal] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    
    // Fetch full profile from backend
    getUserProfile(parsedUser.id)
      .then((res) => {
        const data = res.data;
        setUser(data);
        setPersonalForm({
          name: data.name || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          pincode: data.pincode || ''
        });
        
        // Update local storage to keep it fresh
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch((err) => {
        console.error('Failed to load profile', err);
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load profile data', background: '#1E293B', color: '#F8FAFC' });
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    if (!personalForm.name.trim() || !personalForm.phone.trim()) {
      Swal.fire({ icon: 'warning', title: 'Missing Fields', text: 'Name and Phone are required.', background: '#1E293B', color: '#F8FAFC' });
      return;
    }
    
    setUpdatingPersonal(true);
    try {
      await updateUserProfile(user.id, personalForm);
      
      // Update local state and local storage
      const updatedUser = { ...user, ...personalForm };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your personal information has been saved successfully.',
        background: '#1E293B', color: '#F8FAFC', confirmButtonColor: '#059669',
      });
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to update profile.';
      Swal.fire({ icon: 'error', title: 'Update Failed', text: msg, background: '#1E293B', color: '#F8FAFC' });
    } finally {
      setUpdatingPersonal(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire({ icon: 'warning', title: 'Missing Fields', text: 'All password fields are required.', background: '#1E293B', color: '#F8FAFC' });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      Swal.fire({ icon: 'error', title: 'Passwords Mismatch', text: 'New password and confirm password do not match.', background: '#1E293B', color: '#F8FAFC' });
      return;
    }
    
    if (newPassword.length < 6) {
      Swal.fire({ icon: 'warning', title: 'Weak Password', text: 'New password must be at least 6 characters.', background: '#1E293B', color: '#F8FAFC' });
      return;
    }

    setUpdatingPassword(true);
    try {
      await changeUserPassword(user.id, { currentPassword, newPassword });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      Swal.fire({
        icon: 'success',
        title: 'Password Changed',
        text: 'Your password has been successfully updated.',
        background: '#1E293B', color: '#F8FAFC', confirmButtonColor: '#059669',
      });
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to change password.';
      Swal.fire({ icon: 'error', title: 'Update Failed', text: msg, background: '#1E293B', color: '#F8FAFC' });
    } finally {
      setUpdatingPassword(false);
    }
  };

  const inputClass = "w-full bg-[#0F172A] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-[#64748b] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all duration-200";

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28 pb-20">
        <div className="w-8 h-8 border-4 border-[#059669]/30 border-t-[#059669] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">My <span className="text-gradient">Profile</span></h1>
          <p className="text-[#CBD5E1]">Manage your personal information and security settings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Personal Info */}
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FiUser className="text-[#059669]" /> Personal Information
            </h2>
            
            <form onSubmit={handlePersonalSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#CBD5E1] mb-1.5">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
                  <input type="text" name="name" value={personalForm.name} onChange={handlePersonalChange} className={inputClass} placeholder="John Doe" />
                </div>
              </div>

              {/* Email (Readonly) */}
              <div>
                <label className="block text-sm font-medium text-[#CBD5E1] mb-1.5">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
                  <input type="email" value={user.email} disabled className={`${inputClass} opacity-60 cursor-not-allowed`} />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-[#CBD5E1] mb-1.5">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
                  <input type="tel" name="phone" value={personalForm.phone} onChange={handlePersonalChange} className={inputClass} placeholder="9876543210" />
                </div>
              </div>

              <div className="h-px w-full bg-white/10 my-6"></div>
              
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FiMapPin className="text-[#059669]" /> Address Information
              </h3>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-[#CBD5E1] mb-1.5">Street Address</label>
                <div className="relative">
                  <FiMapPin className="absolute left-4 top-4 text-[#CBD5E1]" />
                  <textarea name="address" value={personalForm.address} onChange={handlePersonalChange} className={`${inputClass} pl-11 resize-none h-24 pt-3`} placeholder="Apartment, Studio, or Floor"></textarea>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-[#CBD5E1] mb-1.5">City</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
                    <input type="text" name="city" value={personalForm.city} onChange={handlePersonalChange} className={inputClass} placeholder="Mumbai" />
                  </div>
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-medium text-[#CBD5E1] mb-1.5">Pincode</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
                    <input type="text" name="pincode" value={personalForm.pincode} onChange={handlePersonalChange} className={inputClass} placeholder="400001" />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={updatingPersonal} className="w-full mt-6 bg-gradient-to-r from-[#059669] to-[#10B981] text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer">
                {updatingPersonal ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiSave />}
                Save Changes
              </button>
            </form>
          </div>

          {/* Right Column - Security */}
          <div className="glass-card p-8 h-fit">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FiLock className="text-[#059669]" /> Security
            </h2>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-[#CBD5E1] mb-1.5">Current Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
                  <input type={showCurrentPassword ? 'text' : 'password'} name="currentPassword" value={passwordForm.currentPassword} onChange={handlePasswordChange} className={inputClass} placeholder="••••••••" />
                  <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CBD5E1] hover:text-white transition-colors cursor-pointer">
                    {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="h-px w-full bg-white/10 my-4"></div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-[#CBD5E1] mb-1.5">New Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
                  <input type={showNewPassword ? 'text' : 'password'} name="newPassword" value={passwordForm.newPassword} onChange={handlePasswordChange} className={inputClass} placeholder="••••••••" />
                  <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CBD5E1] hover:text-white transition-colors cursor-pointer">
                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-[#CBD5E1] mb-1.5">Confirm New Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
                  <input type={showNewPassword ? 'text' : 'password'} name="confirmPassword" value={passwordForm.confirmPassword} onChange={handlePasswordChange} className={inputClass} placeholder="••••••••" />
                </div>
              </div>

              <button type="submit" disabled={updatingPassword} className="w-full mt-6 bg-[#0F172A] border border-white/10 text-white font-semibold py-3 rounded-xl hover:border-[#059669]/50 transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer">
                {updatingPassword ? <div className="w-4 h-4 border-2 border-[#059669]/30 border-t-[#059669] rounded-full animate-spin" /> : <FiLock />}
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
