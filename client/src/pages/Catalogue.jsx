import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';
import BookCard from '../components/BookCard';
import staticBooks from '../data/books';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchBooks } from '../services/api';

const normalizeBook = (b) => ({
  ...b,
  price: Number(b.price) || 0,
  rating: Number(b.rating) || 0,
  available: b.available !== undefined ? b.available : true,
});

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0 },
};

const BOOKS_PER_PAGE = 12;
const GENRES = ['All', 'Programming', 'Artificial Intelligence', 'Business', 'Novels', 'Self Help', 'Science', 'History', 'Comics'];
const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Title: A–Z', value: 'title_asc' },
  { label: 'Title: Z–A', value: 'title_desc' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Highest Rated', value: 'rating_desc' },
];

const Catalogue = () => {
  const [allBooks, setAllBooks] = useState(staticBooks.map(normalizeBook));
  const [loading, setLoading] = useState(true);
  
  // Advanced Filter States
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const [sort, setSort] = useState('default');
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchBooks()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setAllBooks(res.data.map(normalizeBook));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = [...allBooks];

    // 1. Search (Title, Author, Genre - partial, ignore case)
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) => 
          b.title.toLowerCase().includes(q) || 
          b.author.toLowerCase().includes(q) || 
          b.genre.toLowerCase().includes(q)
      );
    }

    // 2. Genre Filter
    if (genre !== 'All') {
      result = result.filter((b) => b.genre === genre);
    }

    // 3. Price & Rating Filters
    result = result.filter((b) => b.price <= maxPrice && b.rating >= minRating);

    // 4. Sort
    switch (sort) {
      case 'title_asc':   result.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'title_desc':  result.sort((a, b) => b.title.localeCompare(a.title)); break;
      case 'price_asc':   result.sort((a, b) => a.price - b.price); break;
      case 'price_desc':  result.sort((a, b) => b.price - a.price); break;
      case 'rating_desc': result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    
    return result;
  }, [allBooks, search, genre, sort, minRating, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / BOOKS_PER_PAGE));
  const currentBooks = filtered.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE);

  // Reset page on filter change
  useEffect(() => { setPage(1); }, [search, genre, sort, minRating, maxPrice]);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-28 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Book <span className="text-gradient">Catalogue</span>
          </h1>
          <p className="text-[#CBD5E1] text-lg">Browse our complete collection of {allBooks.length} handpicked books.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar / Filters */}
          <div className="lg:col-span-1 space-y-8 glass-card p-6 self-start sticky top-28">
            
            {/* Search */}
            <div>
              <label className="block text-white font-medium mb-3">Search</label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Title, author, genre..."
                  className="w-full bg-[#0F172A] border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-white text-sm focus:outline-none focus:border-[#059669]/50"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-white font-medium mb-3 flex items-center gap-2"><FiFilter /> Sort By</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full bg-[#0F172A] border border-white/10 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#059669]/50 cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <div className="flex justify-between text-white font-medium mb-3">
                <label>Max Price</label>
                <span className="text-[#10B981]">${maxPrice}</span>
              </div>
              <input 
                type="range" min="0" max="100" step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#059669] cursor-pointer"
              />
            </div>

            {/* Rating Filter */}
            <div>
              <div className="flex justify-between text-white font-medium mb-3">
                <label>Min Rating</label>
                <span className="text-[#10B981]">{minRating} ★</span>
              </div>
              <input 
                type="range" min="0" max="5" step="0.5"
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full accent-[#059669] cursor-pointer"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            
            {/* Genre Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {GENRES.map((g) => (
                <button
                  key={g}
                  onClick={() => setGenre(g)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                    genre === g
                      ? 'bg-[#059669] text-white border-[#059669] shadow-lg shadow-[#059669]/20'
                      : 'bg-transparent text-[#CBD5E1] border-white/10 hover:border-[#059669]/50 hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            <p className="text-[#64748b] text-sm mb-6">
              Showing <span className="text-white font-medium">{currentBooks.length}</span> of{' '}
              <span className="text-white font-medium">{filtered.length}</span> results
            </p>

            {/* Books Grid */}
            {loading ? (
              <LoadingSpinner />
            ) : currentBooks.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-20 glass-card"
              >
                <p className="text-6xl mb-4 text-[#64748b]">🔍</p>
                <p className="text-white font-semibold text-xl mb-2">No matches found</p>
                <p className="text-[#CBD5E1] max-w-sm mx-auto">Try adjusting your filters, price range, or search terms to find what you're looking for.</p>
                <button 
                  onClick={() => { setSearch(''); setGenre('All'); setMaxPrice(100); setMinRating(0); setSort('default'); }}
                  className="mt-6 px-6 py-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {currentBooks.map((book) => (
                    <motion.div
                      layout
                      key={book.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.3 }}
                    >
                      <BookCard book={book} showAvailability />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 text-[#CBD5E1] hover:text-white hover:border-[#059669] disabled:opacity-40 transition-all cursor-pointer"
                >
                  <FiChevronLeft />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium border transition-all cursor-pointer ${
                      page === p
                        ? 'bg-[#059669] text-white border-[#059669]'
                        : 'border-white/10 text-[#CBD5E1] hover:text-white hover:border-[#059669]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 text-[#CBD5E1] hover:text-white hover:border-[#059669] disabled:opacity-40 transition-all cursor-pointer"
                >
                  <FiChevronRight />
                </button>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Catalogue;
