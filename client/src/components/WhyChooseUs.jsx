import { motion } from 'framer-motion';
import { FiTruck, FiShield, FiHeadphones, FiBook } from 'react-icons/fi';

const features = [
  {
    icon: <FiBook className="text-3xl" />,
    title: 'Huge Collection',
    description: 'Explore over 10,000 titles across every genre — from timeless classics to the latest bestsellers.',
    color: 'from-emerald-500/20 to-blue-500/20',
    border: 'hover:border-emerald-500/40',
    iconBg: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    icon: <FiTruck className="text-3xl" />,
    title: 'Free Delivery',
    description: 'Enjoy free doorstep delivery on all orders above $30. Fast, reliable, and always on time.',
    color: 'from-emerald-500/20 to-teal-500/20',
    border: 'hover:border-emerald-500/40',
    iconBg: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    icon: <FiShield className="text-3xl" />,
    title: 'Secure Payment',
    description: 'Your transactions are protected with bank-level encryption and trusted payment gateways.',
    color: 'from-amber-500/20 to-orange-500/20',
    border: 'hover:border-amber-500/40',
    iconBg: 'bg-amber-500/20 text-amber-400',
  },
  {
    icon: <FiHeadphones className="text-3xl" />,
    title: '24×7 Support',
    description: 'Our dedicated support team is available around the clock to help you with any queries.',
    color: 'from-pink-500/20 to-rose-500/20',
    border: 'hover:border-pink-500/40',
    iconBg: 'bg-pink-500/20 text-pink-400',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-[#0b1120]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-3">
            Why Us?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose <span className="text-gradient">NovelNest</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            We're more than just a bookstore — we're a community for readers.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`relative glass-card p-7 border border-white/5 ${feature.border} transition-all duration-300 overflow-hidden group`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-xl ${feature.iconBg} mb-5`}>
                  {feature.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
