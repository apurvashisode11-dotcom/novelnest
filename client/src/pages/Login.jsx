import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiBookOpen } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { loginUser } from '../services/api';

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0 },
};

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const res = await loginUser({ email: form.email, password: form.password });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      Swal.fire({
        icon: 'success',
        title: `Welcome back, ${res.data.user.name}! 👋`,
        text: 'You have been logged in successfully.',
        background: '#1E293B',
        color: '#F8FAFC',
        confirmButtonColor: '#059669',
        confirmButtonText: 'Continue',
        timer: 2500,
        timerProgressBar: true,
      }).then(() => navigate('/catalogue'));
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong. Please try again.';
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
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

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex items-center justify-center py-28 px-4"
    >
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 glass-card overflow-hidden">
        {/* Left Panel - Illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-[#059669]/30 to-[#10B981]/20 p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#059669]/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#10B981]/20 rounded-full filter blur-3xl" />

          <div className="relative z-10 text-center">
            <div className="relative w-56 h-64 mx-auto mb-8">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute right-4 bottom-0 w-32 h-44 rounded-xl overflow-hidden shadow-2xl border border-white/10"
              >
                <img src="https://m.media-amazon.com/images/I/51-nXsSRfZL._SY445_SX342_.jpg" alt="" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = '/book-placeholder.png'; }} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute left-4 bottom-8 w-28 h-40 rounded-xl overflow-hidden shadow-2xl border border-white/10"
              >
                <img src="https://m.media-amazon.com/images/I/41xShlnTZTL._SY445_SX342_.jpg" alt="" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = '/book-placeholder.png'; }} />
              </motion.div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Welcome Back Reader!</h2>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Log back in to access your personalized book recommendations and reading list.
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="p-8 sm:p-12">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-gradient-to-br from-[#059669] to-[#10B981] p-2 rounded-xl">
              <FiBookOpen className="text-white text-lg" />
            </div>
            <span className="text-lg font-bold text-white">NovelNest</span>
          </div>

          <h1 className="text-2xl font-bold text-white mb-1">Sign in</h1>
          <p className="text-[#CBD5E1] text-sm mb-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#059669] hover:underline font-medium">Create one</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#CBD5E1] mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass('email')}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-[#CBD5E1]">Password</label>
                <button type="button" className="text-xs text-[#059669] hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CBD5E1]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`${inputClass('password')} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CBD5E1] hover:text-white transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="w-4 h-4 accent-emerald-600 rounded"
              />
              <span className="text-sm text-[#CBD5E1]">Remember me</span>
            </label>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#059669] to-[#10B981] text-white font-semibold py-3.5 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
