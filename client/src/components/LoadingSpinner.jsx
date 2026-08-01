import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Animated Book loader */}
      <div className="relative w-16 h-12 mb-6 perspective-[800px]">
        {/* Book cover (back) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#059669] to-[#10B981] rounded-sm transform rotate-x-[60deg] shadow-2xl" />
        
        {/* Pages turning */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              rotateY: [0, -180],
              opacity: [1, 1, 0, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
            style={{ transformOrigin: 'left center' }}
            className="absolute left-1/2 top-0 w-1/2 h-full bg-white rounded-r-sm border-r border-y border-white/20 origin-left"
          />
        ))}

        {/* Book cover (front) */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#5B21B6] to-[#059669] rounded-l-sm transform -rotate-y-[20deg] origin-right shadow-lg border-l border-white/20" />
      </div>

      <motion.p 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-[#059669] font-medium tracking-widest text-sm uppercase"
      >
        Turning Pages...
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
