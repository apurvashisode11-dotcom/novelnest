import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    name: 'Priya Sharma',
    avatar: 'https://i.pravatar.cc/100?img=47',
    rating: 5,
    review:
      'NovelNest transformed the way I discover new books. The UI is gorgeous and finding my next read has never been easier. Highly recommend!',
    role: 'Software Engineer',
  },
  {
    name: 'Arjun Mehta',
    avatar: 'https://i.pravatar.cc/100?img=12',
    rating: 5,
    review:
      'Fast delivery, great prices, and an incredible selection. I found books here that I couldn\'t find anywhere else. A true book lover\'s paradise.',
    role: 'Student, IIT Delhi',
  },
  {
    name: 'Aisha Khan',
    avatar: 'https://i.pravatar.cc/100?img=32',
    rating: 5,
    review:
      'The curated categories and recommendations are spot on. NovelNest feels personal, like it really understands what I want to read next.',
    role: 'Content Writer',
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#0b1120]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our <span className="text-gradient">Readers Say</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Real experiences from real book lovers.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="glass-card p-7 flex flex-col gap-4 border border-white/5 hover:border-primary/30 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, si) => (
                  <FiStar key={si} style={{ fill: '#F59E0B', color: '#F59E0B' }} className="text-lg" />
                ))}
              </div>

              {/* Review */}
              <p className="text-muted text-sm leading-relaxed italic flex-grow">
                "{t.review}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/30"
                />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-muted text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
