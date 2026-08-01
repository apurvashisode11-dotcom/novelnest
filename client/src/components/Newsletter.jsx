import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiCheckCircle } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with blur blobs */}
      <div className="absolute inset-0 bg-[#070d1a]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#059669]/20 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#10B981]/20 rounded-full filter blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto glass-card border border-white/10 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden"
        >
          {/* Decorative lines inside card */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#059669] to-transparent opacity-50" />
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#059669]/20 to-[#10B981]/20 border border-[#059669]/30 mb-6">
            <FiMail className="text-3xl text-[#10B981]" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Subscribe to our <span className="text-gradient">Newsletter</span>
          </h2>
          <p className="text-[#CBD5E1] max-w-xl mx-auto mb-10 leading-relaxed text-sm md:text-base">
            Get the latest updates on new arrivals, exclusive discounts, and handpicked book recommendations delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
            <div className="relative flex items-center">
              <FiMail className="absolute left-4 text-[#64748b] text-lg" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                disabled={status !== 'idle'}
                className="w-full bg-[#0F172A] border border-white/10 rounded-2xl py-4 pl-12 pr-32 text-white placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#059669]/50 transition-all disabled:opacity-70"
                required
              />
              <motion.button 
                whileHover={status === 'idle' ? { scale: 1.05 } : {}}
                whileTap={status === 'idle' ? { scale: 0.95 } : {}}
                type="submit"
                disabled={status !== 'idle'}
                className="absolute right-2 bg-gradient-to-r from-[#059669] to-[#10B981] text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-[#059669]/30 transition-all disabled:cursor-not-allowed cursor-pointer"
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : status === 'success' ? (
                  <><FiCheckCircle /> Done</>
                ) : (
                  <><FiSend /> Subscribe</>
                )}
              </motion.button>
            </div>
          </form>
          
          <p className="text-[#64748b] text-xs mt-4">We respect your privacy. No spam ever.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
