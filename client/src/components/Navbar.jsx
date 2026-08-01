import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiBookOpen, FiMenu, FiX, FiHeart, FiPackage, FiUser, FiLogOut } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { wishlist } = useWishlist();
  const [user, setUser] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location.pathname]);

  const navLinks = [
    { name: 'Home',      path: '/' },
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'Orders',    path: '/orders' },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-[#059669] to-[#10B981] p-2 rounded-xl group-hover:scale-110 transition-transform">
              <FiBookOpen className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold tracking-wide text-white">NovelNest</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-[#059669] relative group ${
                    isActive(link.path) ? 'text-[#059669]' : 'text-slate-300'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#059669] transition-all duration-300 group-hover:w-full ${isActive(link.path) ? 'w-full' : 'w-0'}`} />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Wishlist Icon with Badge */}
              <Link
                to="/wishlist"
                className="relative p-2 text-slate-300 hover:text-red-400 transition-colors"
                title="Wishlist"
              >
                <FiHeart className="text-xl" style={{ fill: wishlist.length > 0 ? '#f87171' : 'none', color: wishlist.length > 0 ? '#f87171' : undefined }} />
                <AnimatePresence>
                  {wishlist.length > 0 && (
                    <motion.span
                      key={wishlist.length}
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                      {wishlist.length > 9 ? '9+' : wishlist.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              <div className="h-6 w-px bg-white/10" />
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center text-white font-bold shadow-lg shadow-[#059669]/20">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </button>

                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-56 glass bg-[#0F172A]/90 rounded-xl overflow-hidden border border-white/10 shadow-2xl"
                      >
                        <div className="p-4 border-b border-white/10 bg-white/5">
                          <p className="text-white font-semibold truncate text-sm">{user.name}</p>
                          <p className="text-xs text-[#CBD5E1] truncate mt-0.5">{user.email}</p>
                        </div>
                        <div className="p-2">
                          <Link to="/profile" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-[#CBD5E1] hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                            <FiUser className="text-[#059669]" /> Profile
                          </Link>
                          <Link to="/orders" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-[#CBD5E1] hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                            <FiPackage className="text-[#059669]" /> Orders
                          </Link>
                          <Link to="/wishlist" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-[#CBD5E1] hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                            <FiHeart className="text-[#059669]" /> Wishlist
                          </Link>
                        </div>
                        <div className="p-2 border-t border-white/10">
                          <button onClick={() => { setProfileDropdownOpen(false); handleLogout(); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer text-left">
                            <FiLogOut /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-[#CBD5E1] hover:text-white transition-colors">Login</Link>
                  <Link to="/register" className="btn-primary text-sm py-2 px-5 rounded-lg">Register</Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile: Wishlist Badge + Hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <Link to="/wishlist" className="relative p-1.5 text-slate-300">
              <FiHeart className="text-xl" style={{ fill: wishlist.length > 0 ? '#f87171' : 'none', color: wishlist.length > 0 ? '#f87171' : undefined }} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length > 9 ? '9+' : wishlist.length}
                </span>
              )}
            </Link>
            <button className="text-2xl text-slate-300 hover:text-white cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass absolute top-full left-0 w-full border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col py-4 px-6 gap-4">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path}
                  className={`flex items-center gap-2 text-base font-medium ${isActive(link.path) ? 'text-[#059669]' : 'text-slate-300'}`}
                >
                  {link.name === 'Orders' && <FiPackage className="text-sm" />}
                  {link.name}
                </Link>
              ))}
              <Link to="/wishlist" className="flex items-center gap-2 text-base font-medium text-slate-300">
                <FiHeart className="text-sm" /> Wishlist {wishlist.length > 0 && <span className="text-red-400 font-bold">({wishlist.length})</span>}
              </Link>
              <div className="h-px w-full bg-white/10 my-1" />
              {user ? (
                <>
                  <Link to="/profile" className="flex items-center gap-2 text-base font-medium text-[#CBD5E1]">
                    <FiUser className="text-sm" /> Profile ({user.name})
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 text-base font-medium text-red-400 text-left">
                    <FiLogOut className="text-sm" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login"    className="text-base font-medium text-[#CBD5E1]">Login</Link>
                  <Link to="/register" className="text-base font-medium text-[#059669]">Register</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
