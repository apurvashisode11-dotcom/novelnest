import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BookCard from './BookCard';
import staticBooks from '../data/books';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { fetchBooks } from '../services/api';

// Normalize book data — coerce numeric fields so .toFixed() never crashes
const normalizeBook = (b) => ({
  ...b,
  price: Number(b.price) || 0,
  rating: Number(b.rating) || 0,
  available: b.available !== undefined ? b.available : true,
});

const FeaturedBooks = () => {
  const [books, setBooks] = useState(staticBooks.slice(0, 8).map(normalizeBook));

  useEffect(() => {
    fetchBooks()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setBooks(res.data.slice(0, 8).map(normalizeBook));
        }
      })
      .catch(() => {
        // silently use static data if backend is not running
      });
  }, []);

  return (
    <section className="py-24 bg-[#0b1120]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="inline-block text-sm font-semibold text-[#059669] tracking-widest uppercase mb-3">
              Handpicked for You
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Featured <span className="text-gradient">Books</span>
            </h2>
          </div>
          <Link
            to="/catalogue"
            className="flex items-center gap-2 text-[#059669] font-medium hover:gap-3 transition-all duration-300 group shrink-0"
          >
            View All Books
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <BookCard book={book} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
