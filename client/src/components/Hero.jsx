import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowDown, FiSearch } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />
      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/97 via-[#0F172A]/85 to-[#1a0a2e]/95" />

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full filter blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Text */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-primary/20 text-primary text-sm font-semibold px-4 py-1.5 rounded-full border border-primary/30 mb-6">
              📚 Welcome to NovelNest
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
          >
            Discover Your{' '}
            <span className="text-gradient block sm:inline">
              Next Favorite
            </span>{' '}
            Book
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted text-lg md:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
          >
            Explore thousands of books across every genre — curated for curious minds and passionate readers.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-2 max-w-lg mx-auto lg:mx-0 mb-8"
          >
            <FiSearch className="text-muted text-xl ml-3 shrink-0" />
            <input
              type="text"
              placeholder="Search books, authors, genres..."
              className="bg-transparent text-white placeholder-muted flex-grow py-2 px-2 text-sm focus:outline-none"
            />
            <Link
              to="/catalogue"
              className="bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold px-5 py-2.5 rounded-xl shrink-0 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              Search
            </Link>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Link to="/catalogue" className="btn-primary text-base px-8 py-3.5">
              Explore Books
            </Link>
            <Link to="/register" className="btn-secondary text-base px-8 py-3.5">
              Register Now
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start"
          >
            {[['10K+', 'Books'], ['5K+', 'Readers'], ['800+', 'Authors']].map(([num, label]) => (
              <div key={label} className="text-center">
                <p className="text-white font-bold text-xl">{num}</p>
                <p className="text-muted text-xs">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Floating Books Illustration */}
        <div className="flex-1 flex justify-center items-center lg:justify-end relative">
          {/* Floating book stack */}
          <div className="relative w-72 h-80 md:w-96 md:h-[420px]">
            {/* Book 1 - back */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute right-0 bottom-0 w-44 h-60 md:w-56 md:h-72 rounded-2xl overflow-hidden shadow-2xl shadow-primary/30 border border-white/10"
            >
              <img
                src="https://m.media-amazon.com/images/I/51-nXsSRfZL._SY445_SX342_.jpg"
                alt="Book"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = '/book-placeholder.png'; }}
              />
            </motion.div>

            {/* Book 2 - middle */}
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
              className="absolute left-0 bottom-8 w-40 h-56 md:w-52 md:h-68 rounded-2xl overflow-hidden shadow-2xl shadow-secondary/30 border border-white/10 z-10"
            >
              <img
                src="https://m.media-amazon.com/images/I/41xShlnTZTL._SY445_SX342_.jpg"
                alt="Book"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = '/book-placeholder.png'; }}
              />
            </motion.div>

            {/* Book 3 - front top */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute left-1/2 top-0 -translate-x-1/2 w-36 h-48 md:w-44 md:h-60 rounded-2xl overflow-hidden shadow-2xl shadow-accent/20 border border-white/10 z-20"
            >
              <img
                src="https://m.media-amazon.com/images/I/51Z0nLAfLmL._SY445_SX342_.jpg"
                alt="Book"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = '/book-placeholder.png'; }}
              />
            </motion.div>

            {/* Glow circle behind */}
            <div className="absolute inset-1/4 bg-primary/20 rounded-full filter blur-3xl -z-10" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-muted text-xs tracking-widest uppercase">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiArrowDown className="text-primary text-xl" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
