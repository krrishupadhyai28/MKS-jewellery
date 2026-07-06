import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Step 1
import { useCustomerAuth } from "./CustomerAuthContext"; // <-- Step 1
import toast from "react-hot-toast"; // <-- Step 1

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate(); // <-- Step 2
  const { isAuthenticated } = useCustomerAuth(); // <-- Step 2

  // Toggle Wishlist — Best for Heart/Icon buttons with Auth Check
  const toggleWishlist = (product) => {
    if (!isAuthenticated) {
      toast.error("Please login to use Wishlist.");
      navigate("/login");
      return;
    }

    const exists = wishlist.find((item) => item.id === product.id);

    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      toast.success("Removed from wishlist");
    } else {
      setWishlist([...wishlist, product]);
      toast.success("Added to wishlist");
    }
  };

  // Add To Wishlist — Direct method (Auth Check Included)
  const addToWishlist = (product) => {
    if (!isAuthenticated) {
      toast.error("Please login to use Wishlist.");
      navigate("/login");
      return;
    }

    const exists = wishlist.find((item) => item.id === product.id);

    if (!exists) {
      setWishlist([...wishlist, product]);
      toast.success("Added to wishlist");
    }
  };

  // Remove From Wishlist — Direct delete (Useful for Wishlist Page items)
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
    toast.success("Removed from wishlist");
  };

  // Clear entire wishlist helper
  const clearWishlist = () => {
    setWishlist([]);
  };

  // Save To Local Storage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist, // State name unchanged to support your existing pages
        toggleWishlist, // New flexible toggle function
        addToWishlist, // Preserved
        removeFromWishlist, // Preserved
        clearWishlist, // Clean up helper
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}