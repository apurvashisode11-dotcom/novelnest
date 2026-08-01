import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiPackage, FiCalendar, FiBookOpen, FiLoader } from 'react-icons/fi';
import { fetchOrders } from '../services/api';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0 },
};

const StatusBadge = () => (
  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
    Processing
  </span>
);

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch { return 'N/A'; }
};

const Orders = () => {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetchOrders()
      .then((res) => setOrders(res.data || []))
      .catch(() => setError('Could not load orders. Make sure the backend is running.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Order <span className="text-gradient">History</span>
          </h1>
          <p className="text-[#CBD5E1]">Track all your placed orders below.</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24 gap-3">
            <FiLoader className="text-[#059669] text-2xl animate-spin" />
            <span className="text-[#CBD5E1]">Fetching your orders...</span>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="glass-card p-8 text-center max-w-lg mx-auto">
            <p className="text-4xl mb-4">⚠️</p>
            <p className="text-white font-semibold text-lg mb-2">Backend Not Connected</p>
            <p className="text-[#CBD5E1] text-sm">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <div className="w-28 h-28 bg-gradient-to-br from-[#059669]/20 to-[#10B981]/10 rounded-3xl flex items-center justify-center mb-6 border border-[#059669]/20">
              <FiPackage className="text-5xl text-[#059669]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No Orders Yet</h2>
            <p className="text-[#CBD5E1] max-w-xs mb-8 leading-relaxed">
              You haven't placed any orders. Browse our catalogue and find your next read!
            </p>
            <Link to="/catalogue" className="btn-primary flex items-center gap-2">
              <FiBookOpen /> Explore Books
            </Link>
          </motion.div>
        )}

        {/* Orders List */}
        {!loading && !error && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order, i) => {
              const price    = Number(order.price)    || 0;
              const total    = Number(order.total)    || 0;
              const quantity = Number(order.quantity) || 1;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-white/5 hover:border-[#059669]/20 transition-all duration-300"
                >
                  {/* Order Number */}
                  <div className="px-3 h-12 bg-gradient-to-br from-[#059669]/20 to-[#10B981]/20 rounded-xl flex items-center justify-center border border-[#059669]/20 shrink-0">
                    <span className="text-[#10B981] font-bold text-sm">{order.order_id || `#${order.id}`}</span>
                  </div>

                  {/* Book Info */}
                  <div className="flex-grow min-w-0">
                    <h3 className="text-white font-semibold text-base line-clamp-1">{order.book_title || 'Unknown Book'}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <span className="text-[#CBD5E1] text-xs flex items-center gap-1">
                        <FiCalendar className="text-[#059669]" /> {formatDate(order.order_date)}
                      </span>
                      <span className="text-[#CBD5E1] text-xs">Qty: <span className="text-white font-medium">{quantity}</span></span>
                      <span className="text-[#CBD5E1] text-xs">Unit: <span className="text-white font-medium">${price.toFixed(2)}</span></span>
                      <span className="text-[#CBD5E1] text-xs">To: <span className="text-white font-medium">{order.city}</span></span>
                    </div>
                  </div>

                  {/* Total + Status */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5 shrink-0">
                    <span className="text-[#059669] font-bold text-xl">${total.toFixed(2)}</span>
                    <StatusBadge />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Orders;
