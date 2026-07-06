import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiHeart,
  FiEye,
  FiShoppingBag,
  FiStar,
} from "react-icons/fi";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import QuickViewModal from "../QuickViewModal/QuickViewModal";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const { wishlist, addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [openQuickView, setOpenQuickView] = useState(false);

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const discount = Math.round(
    ((product.oldPrice - product.price) /
      product.oldPrice) *
      100
  );

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.95,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{
          y: -8,
        }}
        className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:shadow-2xl"
      >

        {/* Image */}
        <div className="relative overflow-hidden">

          <Link to={`/product/${product.id}`}>
            <img
              loading="lazy"
              decoding="async"
              src={product.image}
              alt={product.name}
              className="h-80 w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
            />
          </Link>

          {/* Overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition duration-500 group-hover:opacity-100">

            {/* Quick View */}
            <button
              onClick={() => setOpenQuickView(true)}
              className="rounded-full bg-white p-3 transition-all duration-300 hover:scale-110 hover:bg-[#C9A227] hover:text-white"
            >
              <FiEye size={20} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => {
                if (isWishlisted) {
                  toast("Already in Wishlist ❤️");
                } else {
                  addToWishlist(product);
                  toast.success("Added to Wishlist ❤️");
                }
              }}
              className="rounded-full bg-white p-3 transition-all duration-300 hover:scale-110 hover:bg-[#C9A227] hover:text-white"
            >
              <FiHeart
                size={20}
                className={
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : ""
                }
              />
            </button>

          </div>

          {/* Badge */}
          <span className="absolute left-4 top-4 rounded-full bg-[#C9A227] px-3 py-1 text-xs font-semibold text-white">
            {product.badge}
          </span>

          {/* Discount */}
          <span className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            {discount}% OFF
          </span>

        </div>

        {/* Content */}
        <div className="p-5">

          {/* Category */}
          <p className="text-sm uppercase tracking-wider text-gray-500">
            {product.category}
          </p>

          {/* Name */}
          <Link
            to={`/product/${product.id}`}
            className="mt-2 block text-xl font-bold transition hover:text-[#C9A227]"
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">

            <FiStar className="fill-yellow-400 text-yellow-400" />

            <span className="font-medium">
              {product.rating}
            </span>

          </div>

          {/* Price */}
          <div className="mt-4 flex items-center gap-3">

            <span className="text-2xl font-bold text-[#111111]">
              ₹{product.price}
            </span>

            <span className="text-gray-400 line-through">
              ₹{product.oldPrice}
            </span>

          </div>

          {/* Add To Cart */}
          <button
            onClick={() => {
              addToCart(product);
              toast.success("Added to Cart 🛒");
            }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#111111] py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#C9A227]"
          >
            <FiShoppingBag />
            Add To Cart
          </button>

        </div>

      </motion.div>

      {/* Quick View Modal */}
      <QuickViewModal
        open={openQuickView}
        onClose={() => setOpenQuickView(false)}
        product={product}
      />
    </>
  );
}

export default ProductCard;