import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

// Animated number counter — uses framer-motion v11+ API: value.on("change", cb)
const Counter = ({ target, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 2000 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    // framer-motion v11+: use .on("change") instead of deprecated .onChange()
    const unsubscribe = spring.on('change', (v) => setDisplay(Math.floor(v)));
    return unsubscribe;
  }, [spring]);

  return (
    <span ref={ref}>
      {Number(display).toLocaleString()}{suffix}
    </span>
  );
};

const Stats = () => {
  const stats = [
    { value: 10000, suffix: '+', label: 'Books', icon: '📚' },
    { value: 5000,  suffix: '+', label: 'Happy Customers', icon: '😊' },
    { value: 800,   suffix: '+', label: 'Authors', icon: '✍️' },
    { value: 24,    suffix: '×7', label: 'Support', icon: '🛟' },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#059669]/10 via-transparent to-[#10B981]/10 pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by <span className="text-gradient">Thousands</span>
          </h2>
          <p className="text-[#CBD5E1] text-lg max-w-xl mx-auto">
            Numbers that speak to our commitment to book lovers everywhere.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass-card p-6 text-center transition-all duration-300"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[#CBD5E1] text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
