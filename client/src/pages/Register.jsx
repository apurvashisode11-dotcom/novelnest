import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiBookOpen, FiCheckCircle } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { registerUser } from '../services/api';

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0 },
};

const getPasswordStrength = (password) => {
  if (!password) return { label: '', color: '', width: '0%' };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: 'Weak', color: '#EF4444', width: '20%' };
  if (score === 2) return { label: 'Fair', color: '#F59E0B', width: '40%' };
  if (score === 3) return { label: 'Good', color: '#FBBF24', width: '65%' };
  if (score === 4) return { label: 'Strong', color: '#22C55E', width: '85%' };
  return { label: 'Very Strong', color: '#34D399', width: '100%' };
};

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const strength = getPasswordStrength(form.password);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid 10-digit phone number';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await registerUser({ name: form.name, email: form.email, phone: form.phone, password: form.password });

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful! 🎉',
        html: `<p style="color:#CBD5E1">Welcome to NovelNest, <strong style="color:#10B981">${form.name}</strong>!<br>Your account has been created.</p>`,
        background: '#1E293B',
        color: '#F8FAFC',
        confirmButtonColor: '#059669',
        confirmButtonText: 'Sign In Now',
      }).then(() => navigate('/login'));
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong. Please try again.';
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: msg,
        background: '#1E293B',
        color: '#F8FAFC',
        confirmButtonColor: '#059669',
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full bg-[#0F172A] border rounded-xl py-3 pl-11 pr-4 text-white placeholder-[#64748b] text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
      errors[field]
        ? 'border-red-500/60 focus:ring-red-500/30'
        : 'border-white/10 focus:ring-emerald-500/40 focus:border-emerald-500/40'
    }`;

  const fields = [
    { name: 'name', label: 'Full Name', icon: FiUser, type: 'text', placeholder: 'John Doe' },
    { name: 'email', label: 'Email Address', icon: FiMail, type: 'email', placeholder: 'you@example.com' },
    { name: 'phone', label: 'Phone Number', icon: FiPhone, type: 'tel', placeholder: '9876543210' },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex items-center justify-center py-28 px-4"
    >
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 glass-card overflow-hidden">
        {/* Left Panel */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-[#10B981]/30 to-[#059669]/20 p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-56 h-56 bg-[#10B981]/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-[#059669]/20 rounded-full filter blur-3xl" />
          <div className="relative z-10 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[#059669] to-[#10B981] rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
              <FiBookOpen className="text-white text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Join NovelNest Today</h2>
            <p className="text-[#CBD5E1] text-sm leading-relaxed max-w-xs mb-8">
              Create your account and unlock access to thousands of books, exclusive deals, and personalized recommendations.
            </p>
            {['Access 10,000+ books', 'Free delivery on orders above $30', 'Personalized recommendations', '24×7 reader support'].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2.5 text-left mb-3">
                <FiCheckCircle className="text-green-400 shrink-0" />
                <span className="text-[#CBD5E1] text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="p-8 sm:p-10 overflow-y-auto">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-gradient-to-br from-[#059669] to-[#10B981] p-2 rounded-xl">
              <FiBookOpen className="text-white text-lg" />
            </div>
            <span className="text-lg font-bold text-white">NovelNest</span>
          </div>

          <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
          <p className="text-[#CBD5E1] text-sm mb-7">
            Already have an account?{' '}
            <Link to="/login" className="text-[#059669] hover:underline font-medium">Sign in</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ name, label, icon: Icon, type, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-[#CBD5E1] mb-1.5">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={inputClass(name)}
                  />
                </div>
                {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]}</p>}
              </div>
            ))}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#CBD5E1] mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  className={`${inputClass('password')} pr-11`}
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CBD5E1] hover:text-white transition-colors">
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-[#CBD5E1]">Strength</span>
                    <span className="text-xs font-medium" style={{ color: strength.color }}>{strength.label}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: strength.color }}
                      initial={{ width: 0 }}
                      animate={{ width: strength.width }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#CBD5E1] mb-1.5">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`${inputClass('confirmPassword')} pr-11`}
                />
                <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CBD5E1] hover:text-white transition-colors">
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#059669] to-[#10B981] text-white font-semibold py-3.5 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : 'Create Account'}
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
