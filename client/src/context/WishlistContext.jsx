import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  // Initialize from localStorage on first render
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('novelnest_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage whenever wishlist changes
  useEffect(() => {
    try {
      localStorage.setItem('novelnest_wishlist', JSON.stringify(wishlist));
    } catch {
      // storage quota exceeded — ignore
    }
  }, [wishlist]);

  const isWishlisted = useCallback(
    (bookId) => wishlist.some((b) => String(b.id) === String(bookId)),
    [wishlist]
  );

  const toggleWishlist = useCallback((book) => {
    setWishlist((prev) => {
      const exists = prev.some((b) => String(b.id) === String(book.id));
      return exists ? prev.filter((b) => String(b.id) !== String(book.id)) : [...prev, book];
    });
  }, []);

  const removeFromWishlist = useCallback((bookId) => {
    setWishlist((prev) => prev.filter((b) => String(b.id) !== String(bookId)));
  }, []);

  const clearWishlist = useCallback(() => setWishlist([]), []);

  return (
    <WishlistContext.Provider value={{ wishlist, isWishlisted, toggleWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
};
