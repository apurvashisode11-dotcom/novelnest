import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiTrash2, FiShoppingBag, FiBookOpen } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import BookCard from '../components/BookCard';
import Swal from 'sweetalert2';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0 },
};

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  const handleClear = () => {
    Swal.fire({
      title: 'Clear Wishlist?',
      text: 'All books will be removed from your wishlist.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#059669',
      cancelButtonColor: '#475569',
      confirmButtonText: 'Yes, Clear It',
      background: '#1E293B',
      color: '#F8FAFC',
    }).then((res) => { if (res.isConfirmed) clearWishlist(); });
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              My <span className="text-gradient">Wishlist</span>
            </h1>
            <p className="text-[#CBD5E1]">
              {wishlist.length > 0
                ? `${wishlist.length} book${wishlist.length > 1 ? 's' : ''} saved`
                : 'No books saved yet'}
            </p>
          </div>
          {wishlist.length > 0 && (
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium cursor-pointer self-start sm:self-auto"
            >
              <FiTrash2 /> Clear All
            </button>
          )}
        </div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <div className="w-28 h-28 bg-gradient-to-br from-[#059669]/20 to-[#10B981]/10 rounded-3xl flex items-center justify-center mb-6 border border-[#059669]/20">
              <FiHeart className="text-5xl text-[#059669]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Your Wishlist is Empty</h2>
            <p className="text-[#CBD5E1] text-base max-w-xs mb-8 leading-relaxed">
              Start adding books you love by clicking the ❤️ on any book card.
            </p>
            <div className="flex gap-4">
              <Link to="/catalogue" className="btn-primary flex items-center gap-2">
                <FiBookOpen /> Browse Books
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Wishlist Grid */
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((book, i) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  transition={{ delay: i * 0.06 }}
                >
                  <BookCard book={book} showAvailability />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default Wishlist;
