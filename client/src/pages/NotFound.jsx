import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiBook } from 'react-icons/fi';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-[10rem] font-bold text-gradient leading-none mb-4 select-none"
        >
          404
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-6xl mb-6">📚</div>
          <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
          <p className="text-muted text-base leading-relaxed mb-8">
            Looks like this page wandered off the shelf. Let's get you back to the right chapter.
          </p>

          <div className="flex gap-4 justify-center">
            <Link to="/" className="btn-primary flex items-center gap-2">
              <FiHome /> Go Home
            </Link>
            <Link to="/catalogue" className="btn-secondary flex items-center gap-2">
              <FiBook /> Browse Books
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
