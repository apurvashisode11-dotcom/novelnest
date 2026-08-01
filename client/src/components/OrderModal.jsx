import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiPhone, FiMapPin, FiShoppingBag, FiMinus, FiPlus } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { placeOrder } from '../services/api';

const INITIAL_FORM = { customer_name: '', phone: '', address: '', city: '', pincode: '', quantity: 1 };

const OrderModal = ({ book, isOpen, onClose }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Reset form when book changes
  useEffect(() => { if (isOpen) setForm(INITIAL_FORM); }, [isOpen]);

  if (!book) return null;

  const price  = Number(book.price)  || 0;
  const total  = (price * Number(form.quantity)).toFixed(2);

  const validate = () => {
    const errs = {};
    if (!form.customer_name.trim()) errs.customer_name = 'Name is required';
    if (!form.phone.trim())         errs.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid 10-digit number';
    if (!form.address.trim())       errs.address = 'Address is required';
    if (!form.city.trim())          errs.city = 'City is required';
    if (!form.pincode.trim())       errs.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(form.pincode)) errs.pincode = 'Pincode must be 6 digits';
    if (form.quantity < 1)          errs.quantity = 'Quantity must be at least 1';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: name === 'quantity' ? Math.max(1, Number(value) || 1) : value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const adjustQty = (delta) =>
    setForm((p) => ({ ...p, quantity: Math.max(1, p.quantity + delta) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await placeOrder({
        customer_name: form.customer_name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        pincode: form.pincode,
        book_id: book.id,
        book_title: book.title,
        quantity: form.quantity,
        price,
        total: Number(total),
      });

      onClose();
      Swal.fire({
        icon: 'success',
        title: '🎉 Order Placed Successfully!',
        html: `<p style="color:#CBD5E1">Your order for <strong style="color:#10B981">${book.title}</strong><br>is being processed. Total: <strong style="color:#F59E0B">$${total}</strong></p>`,
        background: '#1E293B',
        color: '#F8FAFC',
        confirmButtonColor: '#059669',
        confirmButtonText: 'View Orders',
      }).then((res) => { if (res.isConfirmed) window.location.href = '/orders'; });
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to place order. Please try again.';
      Swal.fire({ icon: 'error', title: 'Order Failed', text: msg, background: '#1E293B', color: '#F8FAFC', confirmButtonColor: '#059669' });
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (field) =>
    `w-full bg-[#0F172A] border rounded-xl py-2.5 pl-10 pr-3 text-white placeholder-[#64748b] text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
      errors[field] ? 'border-red-500/60 focus:ring-red-500/30' : 'border-white/10 focus:ring-emerald-500/40'
    }`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-full max-w-lg glass-card p-6 relative max-h-[90vh] overflow-y-auto"
          >
            {/* Close */}
            <button onClick={onClose} className="absolute top-4 right-4 text-[#CBD5E1] hover:text-white transition-colors p-1 cursor-pointer">
              <FiX className="text-xl" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-gradient-to-br from-[#059669] to-[#10B981] rounded-xl">
                <FiShoppingBag className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Place Order</h2>
                <p className="text-[#CBD5E1] text-xs">Fill in your delivery details</p>
              </div>
            </div>

            {/* Book Summary */}
            <div className="flex items-center gap-3 p-3 bg-[#0F172A]/60 rounded-xl border border-white/5 mb-5">
              <img
                src={book.image}
                alt={book.title}
                className="w-14 h-18 object-contain rounded-lg bg-[#0a0f1e] p-1"
                onError={(e) => { e.target.onerror = null; e.target.src = '/book-placeholder.png'; }}
              />
              <div className="flex-grow min-w-0">
                <p className="text-white font-semibold text-sm line-clamp-1">{book.title}</p>
                <p className="text-[#CBD5E1] text-xs">{book.author}</p>
                <p className="text-[#059669] font-bold text-base mt-1">${price.toFixed(2)}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-[#CBD5E1] mb-1">Customer Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] text-sm" />
                  <input type="text" name="customer_name" value={form.customer_name} onChange={handleChange} placeholder="John Doe" className={inputCls('customer_name')} />
                </div>
                {errors.customer_name && <p className="text-red-400 text-xs mt-0.5">{errors.customer_name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-[#CBD5E1] mb-1">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] text-sm" />
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" className={inputCls('phone')} />
                </div>
                {errors.phone && <p className="text-red-400 text-xs mt-0.5">{errors.phone}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-medium text-[#CBD5E1] mb-1">Delivery Address</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-3 text-[#64748b] text-sm" />
                  <textarea name="address" value={form.address} onChange={handleChange} placeholder="Street, Apartment, Area..." rows={2}
                    className={`${inputCls('address')} pl-10 resize-none`} />
                </div>
                {errors.address && <p className="text-red-400 text-xs mt-0.5">{errors.address}</p>}
              </div>

              {/* City + Pincode */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#CBD5E1] mb-1">City</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] text-sm" />
                    <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="Mumbai" className={inputCls('city')} />
                  </div>
                  {errors.city && <p className="text-red-400 text-xs mt-0.5">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#CBD5E1] mb-1">Pincode</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] text-sm" />
                    <input type="text" name="pincode" value={form.pincode} onChange={handleChange} placeholder="400001" className={inputCls('pincode')} />
                  </div>
                  {errors.pincode && <p className="text-red-400 text-xs mt-0.5">{errors.pincode}</p>}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-medium text-[#CBD5E1] mb-1">Quantity</label>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => adjustQty(-1)} className="w-9 h-9 rounded-xl bg-[#0F172A] border border-white/10 flex items-center justify-center text-white hover:border-[#059669]/50 transition-colors cursor-pointer">
                    <FiMinus className="text-sm" />
                  </button>
                  <span className="text-white font-bold text-lg w-8 text-center">{form.quantity}</span>
                  <button type="button" onClick={() => adjustQty(1)} className="w-9 h-9 rounded-xl bg-[#0F172A] border border-white/10 flex items-center justify-center text-white hover:border-[#059669]/50 transition-colors cursor-pointer">
                    <FiPlus className="text-sm" />
                  </button>
                  <span className="text-[#CBD5E1] text-sm ml-2">× ${price.toFixed(2)}</span>
                </div>
              </div>

              {/* Order Total */}
              <div className="flex items-center justify-between p-3 bg-[#059669]/10 border border-[#059669]/20 rounded-xl mt-2">
                <span className="text-[#CBD5E1] font-medium text-sm">Order Total</span>
                <span className="text-[#10B981] font-bold text-xl">${total}</span>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-[#CBD5E1] font-medium hover:bg-white/10 transition-colors cursor-pointer">
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  type="submit" disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#059669] to-[#10B981] text-white font-semibold hover:shadow-lg hover:shadow-[#059669]/30 transition-all disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing...</> : '🛒 Place Order'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;
