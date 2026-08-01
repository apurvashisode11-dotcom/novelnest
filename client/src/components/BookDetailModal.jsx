import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiStar, FiHeart, FiShoppingBag, FiBook, FiGlobe, FiHash } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import Swal from 'sweetalert2';

// Extra metadata per genre (since DB doesn't store these)
const GENRE_META = {
  'Programming':            { pages: 431, language: 'English', publisher: 'Prentice Hall' },
  'Self Help':              { pages: 320, language: 'English', publisher: 'Avery Publishing' },
  'Business':               { pages: 278, language: 'English', publisher: 'Crown Business' },
  'Novels':                 { pages: 336, language: 'English', publisher: 'HarperCollins' },
  'Artificial Intelligence':{ pages: 807, language: 'English', publisher: 'MIT Press' },
  'Science':                { pages: 512, language: 'English', publisher: 'W. H. Freeman' },
  'History':                { pages: 448, language: 'English', publisher: 'Random House' },
  'Comics':                 { pages: 192, language: 'English', publisher: 'Marvel/DC Comics' },
};

const GENRE_DESC = {
  'Programming': 'A must-read for software developers looking to improve their craft. Covers best practices, clean code principles, and practical techniques for writing maintainable, readable code.',
  'Self Help': 'An inspiring guide to building powerful habits that transform your life. Packed with evidence-based strategies for lasting personal growth and productivity.',
  'Business': 'Essential reading for entrepreneurs and business professionals. Distills timeless wisdom on building wealth, leadership, and achieving long-term financial success.',
  'Novels': 'A captivating story that takes you on an unforgettable journey. Rich characters, vivid settings, and a narrative that stays with you long after the last page.',
  'Artificial Intelligence': 'The definitive reference on artificial intelligence and machine learning. Covers foundational theory, algorithms, and real-world applications in depth.',
  'Science': 'A fascinating exploration of scientific discovery and the natural world. Makes complex ideas accessible and ignites curiosity about the universe we inhabit.',
  'History': 'A richly researched account of pivotal events that shaped our modern world. Brings history to life through compelling storytelling and detailed analysis.',
  'Comics': 'A visually stunning adventure filled with iconic characters, bold artwork, and stories that have defined pop culture for generations.',
};

const BookDetailModal = ({ book, isOpen, onClose, onBuyNow }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();

  if (!book) return null;

  const price  = Number(book.price)  || 0;
  const rating = Number(book.rating) || 0;
  const genre  = book.genre || 'General';
  const meta   = GENRE_META[genre] || { pages: 250, language: 'English', publisher: 'N/A' };
  const desc   = GENRE_DESC[genre] || 'An excellent book worth adding to your collection.';
  const wishlisted = isWishlisted(book.id);

  const handleWishlist = () => {
    toggleWishlist(book);
    Swal.fire({
      toast: true, position: 'top-end', showConfirmButton: false, timer: 1800, timerProgressBar: true,
      icon: wishlisted ? 'info' : 'success',
      title: wishlisted ? 'Removed from Wishlist' : '❤️ Added to Wishlist',
      background: '#1E293B', color: '#F8FAFC',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="w-full max-w-2xl glass-card relative overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Top gradient bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#059669] to-[#10B981]" />

            <button onClick={onClose} className="absolute top-4 right-4 text-[#CBD5E1] hover:text-white p-1.5 bg-white/5 rounded-lg transition-colors cursor-pointer z-10">
              <FiX className="text-lg" />
            </button>

            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left — Cover */}
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="w-44 h-64 bg-[#0a0f1e] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#059669]/20 flex items-center justify-center"
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/book-placeholder.png'; }}
                  />
                </motion.div>

                {/* Metadata grid */}
                <div className="grid grid-cols-3 gap-3 w-full mt-5">
                  {[
                    { icon: FiBook,  label: 'Pages',    value: meta.pages },
                    { icon: FiGlobe, label: 'Language', value: meta.language },
                    { icon: FiHash,  label: 'Genre',    value: genre.split(' ')[0] },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-[#0F172A]/60 rounded-xl p-2.5 text-center border border-white/5">
                      <Icon className="text-[#059669] text-sm mx-auto mb-1" />
                      <p className="text-white text-xs font-semibold">{value}</p>
                      <p className="text-[#64748b] text-[10px]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Details */}
              <div className="flex flex-col">
                {/* Genre badge */}
                <span className="self-start text-xs font-semibold px-3 py-1 rounded-full bg-[#059669]/20 text-[#10B981] border border-[#059669]/30 mb-3">
                  {genre}
                </span>

                <h2 className="text-white font-bold text-2xl leading-tight mb-1">{book.title}</h2>
                <p className="text-[#CBD5E1] text-sm mb-1">by <span className="text-[#10B981] font-medium">{book.author}</span></p>
                <p className="text-[#64748b] text-xs mb-4">Publisher: {meta.publisher}</p>

                {/* Stars + Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FiStar key={i} className="text-base" style={{ fill: i < Math.floor(rating) ? '#F59E0B' : 'none', color: i < Math.floor(rating) ? '#F59E0B' : '#475569' }} />
                    ))}
                  </div>
                  <span className="text-white font-bold text-sm">{rating > 0 ? rating.toFixed(1) : '—'}</span>
                  <span className="text-[#64748b] text-xs">/ 5.0</span>
                </div>

                {/* Description */}
                <p className="text-[#CBD5E1] text-sm leading-relaxed mb-5 flex-grow">{desc}</p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-3xl font-bold text-[#059669]">${price.toFixed(2)}</span>
                  <span className="text-[#64748b] text-sm line-through">${(price * 1.2).toFixed(2)}</span>
                  <span className="text-green-400 text-xs font-semibold bg-green-500/10 px-2 py-0.5 rounded-full">17% OFF</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { onClose(); onBuyNow(); }}
                    className="flex-1 py-3 bg-gradient-to-r from-[#059669] to-[#10B981] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#059669]/30 transition-all cursor-pointer"
                  >
                    <FiShoppingBag /> Buy Now
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={handleWishlist}
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                      wishlisted
                        ? 'bg-red-500/20 border-red-500/40 text-red-400'
                        : 'bg-white/5 border-white/10 text-[#CBD5E1] hover:border-red-500/40 hover:text-red-400'
                    }`}
                  >
                    <FiHeart style={{ fill: wishlisted ? 'currentColor' : 'none' }} className="text-lg" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookDetailModal;
