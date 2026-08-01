import { Link } from 'react-router-dom';
import { FiBookOpen, FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-[#0b1120] border-t border-white/5 pt-20 pb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#059669]/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-gradient-to-br from-[#059669] to-[#10B981] p-2 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#059669]/30">
                <FiBookOpen className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold text-white tracking-wide">NovelNest</span>
            </Link>
            <p className="text-[#CBD5E1] text-sm leading-relaxed pr-4">
              Your premium destination for discovering, exploring, and purchasing the world's best books across every genre.
            </p>
            <div className="flex gap-3">
              {[FiInstagram, FiTwitter, FiFacebook, FiYoutube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#CBD5E1] hover:text-white hover:bg-[#059669] hover:border-[#059669] hover:shadow-lg hover:shadow-[#059669]/30 transition-all duration-300"
                >
                  <Icon className="text-base" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#059669]" /> Quick Links
            </h4>
            <ul className="space-y-3">
              {['Home', 'Catalogue', 'Wishlist', 'Orders'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="group flex items-center gap-2 text-[#CBD5E1] text-sm hover:text-white transition-colors"
                  >
                    <FiArrowRight className="text-[#059669] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" /> Top Genres
            </h4>
            <ul className="space-y-3">
              {['Programming', 'Artificial Intelligence', 'Business', 'Self Help', 'Novels'].map((c) => (
                <li key={c}>
                  <Link
                    to="/catalogue"
                    className="group flex items-center gap-2 text-[#CBD5E1] text-sm hover:text-white transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#10B981] group-hover:scale-150 transition-all duration-300" />
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{c}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:hello@novelnest.com" className="flex items-start gap-3 text-[#CBD5E1] text-sm hover:text-white group transition-colors">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#059669] group-hover:text-white transition-colors shrink-0">
                    <FiMail className="text-base" />
                  </div>
                  <div className="pt-1">
                    <p className="font-medium text-white mb-0.5">Email</p>
                    <p>hello@novelnest.com</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:+911234567890" className="flex items-start gap-3 text-[#CBD5E1] text-sm hover:text-white group transition-colors">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#10B981] group-hover:text-white transition-colors shrink-0">
                    <FiPhone className="text-base" />
                  </div>
                  <div className="pt-1">
                    <p className="font-medium text-white mb-0.5">Phone</p>
                    <p>+91 12345 67890</p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 text-[#CBD5E1] text-sm">
                <div className="p-2 bg-white/5 rounded-lg shrink-0">
                  <FiMapPin className="text-base" />
                </div>
                <div className="pt-1">
                  <p className="font-medium text-white mb-0.5">Address</p>
                  <p>123 NovelNest HQ, Book Street, Tech Park 400001</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#64748b] text-sm text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-[#CBD5E1] font-semibold">NovelNest</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-[#64748b] text-sm">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <p className="text-[#64748b] text-xs flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full">
            Built with <span className="text-red-500 animate-pulse">❤️</span> for book lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
