import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookCard from './BookCard';
import staticBooks from '../data/books';
import { fetchBooks } from '../services/api';
import { FiTrendingUp, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const normalizeBook = (b) => ({
  ...b,
  price: Number(b.price) || 0,
  rating: Number(b.rating) || 0,
  available: b.available !== undefined ? b.available : true,
});

const TrendingBooks = () => {
  const [books, setBooks] = useState(staticBooks.slice(0, 10).map(normalizeBook));
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchBooks()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          // Sort by rating high to low to simulate "Trending"
          const sorted = [...res.data].sort((a, b) => Number(b.rating) - Number(a.rating));
          setBooks(sorted.slice(0, 8).map(normalizeBook));
        }
      })
      .catch(() => {});
  }, []);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const currentBooks = books.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const nextPage = () => setPage((p) => (p + 1) % totalPages);
  const prevPage = () => setPage((p) => (p - 1 + totalPages) % totalPages);

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0f1e]">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#059669]/10 to-transparent rounded-full filter blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 bg-[#F59E0B]/20 rounded-lg text-[#F59E0B]">
                <FiTrendingUp className="text-sm" />
              </span>
              <span className="text-sm font-bold text-[#F59E0B] tracking-widest uppercase">
                Trending Now
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Top Rated <span className="text-gradient">Reads</span>
            </h2>
            <p className="text-[#CBD5E1] mt-3 max-w-xl">
              Discover the books our community can't stop talking about. These highly-rated titles are guaranteed to keep you turning pages.
            </p>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={prevPage}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-[#059669] hover:border-[#059669] transition-all cursor-pointer"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={nextPage}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-[#059669] hover:border-[#059669] transition-all cursor-pointer"
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="relative min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {currentBooks.map((book, i) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View All */}
        <div className="mt-12 text-center">
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-2 text-[#CBD5E1] font-medium hover:text-white group border border-white/10 bg-white/5 px-6 py-3 rounded-full hover:bg-white/10 transition-all"
          >
            Explore Full Catalogue
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingBooks;
