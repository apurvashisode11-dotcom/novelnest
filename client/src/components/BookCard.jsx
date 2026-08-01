import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiShoppingBag, FiHeart, FiEye } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useWishlist } from '../context/WishlistContext';
import OrderModal from './OrderModal';
import BookDetailModal from './BookDetailModal';

const BookCard = ({ book, showAvailability = false }) => {
  const [orderOpen, setOrderOpen]   = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const { isWishlisted, toggleWishlist } = useWishlist();

  if (!book) return null;

  // Safely coerce MySQL string values to numbers
  const price  = Number(book.price)  || 0;
  const rating = Number(book.rating) || 0;
  const title  = book.title  || 'Untitled';
  const author = book.author || 'Unknown Author';
  const genre  = book.genre  || 'General';
  const image  = book.image  || '';
  const wishlisted = isWishlisted(book.id);

  const renderStars = (r) =>
    Array.from({ length: 5 }, (_, i) => (
      <FiStar key={i} className="text-xs"
        style={{ fill: i < Math.floor(r) ? '#F59E0B' : 'none', color: i < Math.floor(r) ? '#F59E0B' : '#475569' }}
      />
    ));

  const genreColors = {
    'Programming':            'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Self Help':              'bg-green-500/20 text-green-400 border-green-500/30',
    'Business':               'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Novels':                 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    'Artificial Intelligence':'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Science':                'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    'History':                'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'Comics':                 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  const genreClass = genreColors[genre] || 'bg-[#059669]/20 text-[#10B981] border-[#059669]/30';

  const handleWishlist = (e) => {
    e.stopPropagation();
    const wasWishlisted = wishlisted;
    toggleWishlist(book);
    Swal.fire({
      toast: true, position: 'top-end', showConfirmButton: false, timer: 1600, timerProgressBar: true,
      icon: wasWishlisted ? 'info' : 'success',
      title: wasWishlisted ? 'Removed from Wishlist' : '❤️ Added to Wishlist',
      background: '#1E293B', color: '#F8FAFC',
    });
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="glass-card group overflow-hidden flex flex-col h-full"
      >
        {/* Book Cover */}
        <div className="relative overflow-hidden h-56 bg-[#0a0f1e] rounded-t-2xl">
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
            src={image}
            alt={title}
            className="w-full h-full object-contain p-2 transition-all duration-300"
            onError={(e) => { e.target.onerror = null; e.target.src = '/book-placeholder.png'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] to-transparent opacity-60" />

          {/* Wishlist Heart Button */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleWishlist}
            className={`absolute top-3 left-3 w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-200 cursor-pointer ${
              wishlisted ? 'bg-red-500/30 border-red-500/50 text-red-400' : 'bg-black/40 border-white/10 text-[#CBD5E1] hover:text-red-400 hover:border-red-500/40'
            }`}
          >
            <FiHeart style={{ fill: wishlisted ? 'currentColor' : 'none' }} className="text-sm" />
          </motion.button>

          {/* Availability Badge */}
          {showAvailability && (
            <div className={`absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full border ${
              book.available ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'
            }`}>
              {book.available ? 'In Stock' : 'Out of Stock'}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <span className={`self-start text-xs font-medium px-2.5 py-0.5 rounded-full border mb-2 ${genreClass}`}>{genre}</span>

          <h3 className="text-white font-semibold text-base leading-tight mb-1 line-clamp-2 group-hover:text-[#10B981] transition-colors">
            {title}
          </h3>
          <p className="text-[#CBD5E1] text-sm mb-3">{author}</p>

          <div className="flex items-center gap-1.5 mb-4">
            <div className="flex gap-0.5">{renderStars(rating)}</div>
            <span className="text-xs text-[#CBD5E1] font-medium">{rating > 0 ? rating.toFixed(1) : '—'}</span>
          </div>

          {/* Price + Buttons */}
          <div className="mt-auto space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#059669] font-bold text-lg">${price.toFixed(2)}</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setOrderOpen(true)}
                className="flex items-center gap-1.5 bg-gradient-to-r from-[#059669] to-[#10B981] text-white text-xs font-semibold px-3 py-2 rounded-xl hover:shadow-lg hover:shadow-[#059669]/30 transition-all cursor-pointer"
              >
                <FiShoppingBag className="text-xs" /> Buy Now
              </motion.button>
            </div>

            {/* View Details */}
            <button
              onClick={() => setDetailOpen(true)}
              className="w-full py-1.5 text-xs font-medium text-[#CBD5E1] border border-white/8 rounded-xl hover:border-[#059669]/40 hover:text-[#10B981] transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <FiEye className="text-xs" /> View Details
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modals — rendered per card, portal-like via fixed positioning */}
      <OrderModal book={book} isOpen={orderOpen} onClose={() => setOrderOpen(false)} />
      <BookDetailModal
        book={book}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        onBuyNow={() => setOrderOpen(true)}
      />
    </>
  );
};

export default BookCard;
