import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Add To Cart — Ab Id + Color + Size ke combination ko check karega
  const addToCart = (product) => {
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
                quantity: item.quantity + product.quantity, // Product page se aayi quantity ko add karega
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
  };

  // Increase Quantity — Specific Variant ki quantity badhayega
  const increaseQuantity = (id, color, size) => {
    setCart(
      cart.map((item) =>
        item.id === id &&
        item.selectedColor === color &&
        item.selectedSize === size
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease Quantity — Specific Variant ki quantity kam karega ya 0 hone par remove karega
  const decreaseQuantity = (id, color, size) => {
    setCart(
      cart
        .map((item) =>
          item.id === id &&
          item.selectedColor === color &&
          item.selectedSize === size
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Save To Local Storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}