import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Step 1
import toast from "react-hot-toast"; // <-- Step 1
import { useCustomerAuth } from "./CustomerAuthContext"; // <-- Step 1

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate(); // <-- Step 2
  const { isAuthenticated } = useCustomerAuth(); // <-- Step 2

  // Add To Cart — Authentication check + Variant logic preserved
  const addToCart = (product) => {
    // Auth Check
    if (!isAuthenticated) {
      toast.error("Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    // Checking ID + Color + Size combination
    const exists = cart.find(
      (item) =>
        item.id === product.id &&
        item.selectedColor === product.selectedColor &&
        item.selectedSize === product.selectedSize
    );

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize
            ? {
                ...item,
                quantity: item.quantity + (product.quantity || 1), // Dynamically adds quantity
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: product.quantity || 1,
        },
      ]);
    }

    toast.success("Added to cart"); // <-- Success Notification
  };

  // Remove Item — Specific Variant ko cart se drop karega
  const removeFromCart = (id, color, size) => {
    setCart(
      cart.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
    toast.success("Removed from cart");
  };

  // Increase Quantity
  const increaseQuantity = (id, color, size) => {
    setCart(
      cart.map((item) =>
        item.id === id &&
        item.selectedColor === color &&
        item.selectedSize === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id, color, size) => {
    setCart(
      cart
        .map((item) =>
          item.id === id &&
          item.selectedColor === color &&
          item.selectedSize === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear Cart Helper (If required by your setup)
  const clearCart = () => {
    setCart([]);
  };

  // Save To Local Storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart, // Keeping it 'cart' to avoid breaking existing UI components
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}