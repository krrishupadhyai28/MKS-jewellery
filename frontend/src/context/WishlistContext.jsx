import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
   const saved = localStorage.getItem("wishlist");

   return saved ? JSON.parse(saved) : [];
 });

  const addToWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);

    if (!exists) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(
      wishlist.filter((item) => item.id !== id)
    );
  };

  useEffect(() => {
  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );
}, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}