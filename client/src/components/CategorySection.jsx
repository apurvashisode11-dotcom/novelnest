import { motion } from 'framer-motion';

const categories = [
  { name: 'Programming', icon: '💻', gradient: 'from-blue-600 to-blue-800' },
  { name: 'Artificial Intelligence', icon: '🤖', gradient: 'from-emerald-600 to-emerald-900' },
  { name: 'Science', icon: '🔬', gradient: 'from-cyan-600 to-cyan-900' },
  { name: 'Business', icon: '📈', gradient: 'from-amber-600 to-amber-900' },
  { name: 'History', icon: '🏛️', gradient: 'from-orange-600 to-orange-900' },
  { name: 'Novels', icon: '📖', gradient: 'from-pink-600 to-pink-900' },
  { name: 'Self Help', icon: '🌱', gradient: 'from-emerald-600 to-emerald-900' },
  { name: 'Comics', icon: '🦸', gradient: 'from-red-600 to-red-900' },
];

const CategorySection = () => {
  return (
    <section className="py-24">
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
            Browse By
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explore <span className="text-gradient">Categories</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Dive into any genre and find the perfect book for your mood.
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group`}
            >
              <div className={`bg-gradient-to-br ${cat.gradient} p-6 h-full border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 text-center min-h-[120px]`}>
                {/* Animated glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-white/10 rounded-2xl" />
                <span className="text-4xl drop-shadow-lg">{cat.icon}</span>
                <span className="text-white font-semibold text-sm leading-tight">{cat.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
