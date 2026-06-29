import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import {
  FiHeart,
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiShare2,
  FiCopy,
} from "react-icons/fi";

import MainLayout from "../../layouts/MainLayout";
import products from "../../data/products";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";
import SkeletonProduct from "../../components/Skeleton/SkeletonProduct";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ImageLightbox from "../../components/ImageLightbox/ImageLightbox";
import ProductTabs from "../../components/ProductTabs/ProductTabs";

function Product() {
  const { id } = useParams();

  const { addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);
  
  // Part 1: Color aur Size Variants ki States Add Ki Gayi Hain
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});

  // Part 2: useEffect me Product Change Hone Par Default Values Auto-select Hogi
  useEffect(() => {
    if (!product) return;

    setLoading(true);
    setSelectedImage(product.image);
    setSelectedColor(product.colors?.[0] || "");
    setSelectedSize(product.sizes?.[0] || "");

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [product]);

  const isWishlisted = wishlist.some(
    (item) => item.id === Number(id)
  );
  
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  if (!product) {
    return (
      <MainLayout>
        <section className="py-24 text-center">
          <h2 className="text-4xl font-bold">
            Product Not Found
          </h2>
        </section>
      </MainLayout>
    );
  }

  const discount = Math.round(
    ((product.oldPrice - product.price) /
      product.oldPrice) *
      100
  );

  if (loading) {
    return (
      <MainLayout>
        <SkeletonProduct />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="bg-[#FAF7F2] py-10 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">

          <Breadcrumb />
          
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Product Image */}
            <div>

              <div
                className="overflow-hidden rounded-3xl"
                onMouseMove={(e) => {
                  const { left, top, width, height } =
                    e.currentTarget.getBoundingClientRect();

                  const x = ((e.clientX - left) / width) * 100;
                  const y = ((e.clientY - top) / height) * 100;

                  setZoomStyle({
                    transformOrigin: `${x}% ${y}%`,
                    transform: "scale(2)",
                  });
                }}
                onMouseLeave={() =>
                  setZoomStyle({
                    transform: "scale(1)",
                  })
                }
              >

                <img
                  loading="lazy"
                  decoding="async"
                  src={selectedImage}
                  alt={product.name}
                  onClick={() => setLightboxOpen(true)}
                  className="h-80 w-full cursor-zoom-in rounded-3xl object-cover shadow-xl transition-transform duration-300 sm:h-[450px] lg:h-[650px]"
                  style={zoomStyle}
                />

               </div>

              <div className="mt-5 grid grid-cols-4 gap-4">

                {(
                  product.images || [
                    product.image,
                    product.image,
                    product.image,
                    product.image,
                    product.image,
                  ]
                ).map((image, index) => (
                   <button
                     key={index}
                     onClick={() => setSelectedImage(image)}
                     className={`overflow-hidden rounded-xl border-2 transition ${
                       selectedImage === image
                         ? "border-[#C9A227]"
                         : "border-transparent hover:border-[#C9A227]"
                     }`}
                   >

                      <img
                        loading="lazy"
                        decoding="async"
                        src={image}
                        alt={product.name}
                        className="h-24 w-full object-cover"
                      />

                   </button>

                 ))}

               </div>

            </div>

            {/* Product Details */}
            <div>

              <p className="uppercase tracking-[4px] text-[#C9A227] font-semibold">
                {product.category}
              </p>

              <h1 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-6 flex items-center gap-4">

                <span className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                  ₹{product.price}
                </span>

                <span className="text-2xl line-through text-gray-400">
                  ₹{product.oldPrice}
                </span>

                <span className="rounded-full bg-red-500 px-3 py-1 text-sm text-white">
                  {discount}% OFF
                </span>

              </div>

              {/* Rating */}
              <div className="mt-5">
                ⭐ {product.rating} / 5
              </div>

              {/* Description */}
              <p className="mt-8 leading-8 text-gray-600">
                {product.description}
              </p>

              {/* Stock */}
              <p className="mt-5 font-semibold text-green-600">
                In Stock : {product.stock}
              </p>
              
              {/* Color Selection */}
              <div className="mt-8">
                <h3 className="mb-3 font-semibold">
                  Color :
                  <span className="ml-2 text-[#C9A227]">
                    {selectedColor}
                  </span>
                </h3>

                <div className="flex flex-wrap gap-3">
                  {product.colors?.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-xl border px-4 py-2 transition ${
                        selectedColor === color
                          ? "border-[#C9A227] bg-[#C9A227] text-white"
                          : "hover:border-[#C9A227]"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-8">
                <h3 className="mb-3 font-semibold">
                  Size :
                  <span className="ml-2 text-[#C9A227]">
                    {selectedSize}
                  </span>
                </h3>

                <div className="flex flex-wrap gap-3">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 min-w-[60px] rounded-xl border transition ${
                        selectedSize === size
                          ? "border-[#C9A227] bg-[#C9A227] text-white"
                          : "hover:border-[#C9A227]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-10">

                <h3 className="mb-4 font-semibold">
                  Quantity
                </h3>

                <div className="flex items-center gap-4">

                  <button
                    onClick={() =>
                      quantity > 1 &&
                      setQuantity(quantity - 1)
                    }
                    className="h-10 w-10 rounded-lg border"
                  >
                    -
                  </button>

                  <span className="text-xl font-bold">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity(quantity + 1)
                    }
                    className="h-10 w-10 rounded-lg border"
                  >
                    +
                  </button>

                </div>

              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">

                {/* Part 3: Modifed Add To Cart Handler Jisme Variants Context Me Pass Ho Rhe Hain */}
                <button
                  onClick={() => {
                    addToCart({
                      ...product,
                      quantity,
                      selectedColor,
                      selectedSize,
                    });

                    toast.success("Added to Cart 🛒");
                  }}
                  className="flex items-center gap-2 rounded-xl bg-black px-8 py-4 text-white transition hover:bg-[#C9A227]"
                >

                  <FiShoppingBag />

                  Add To Cart

                </button>

                <button className="rounded-xl border px-8 py-4 transition hover:bg-[#111111] hover:text-white">

                  Buy Now

                </button>

                <button
                  onClick={() => {
                    if (isWishlisted) {
                        toast("Already in Wishlist ❤️");
                    } else {
                      addToWishlist(product);
                      toast.success("Added to Wishlist ❤️");
                    }
                  }}
                  className={`rounded-xl border p-4 transition ${
                    isWishlisted
                       ? "bg-red-500 text-white"
                       : "hover:bg-red-500 hover:text-white"
                  }`}
                >

                  <FiHeart size={22} />

                </button>

              </div>
              {/* Share Product */}
              <div className="mt-10">

                <h3 className="mb-4 font-semibold">
                  Share Product
                </h3>

                <div className="flex flex-wrap gap-4">

                  <button
                    onClick={copyLink}
                    className="flex items-center gap-2 rounded-xl border px-5 py-3 transition hover:bg-[#111111] hover:text-white"
                  >
                    <FiCopy />
                    Copy Link
                  </button>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border px-5 py-3 transition hover:bg-green-600 hover:text-white"
                  >
                    <FiShare2 />
                    WhatsApp
                  </a>

                </div>

              </div>
              {/* Delivery Info */}
              <div className="mt-12 space-y-5">

                <div className="flex items-center gap-3">

                  <FiTruck size={22} />

                  <p>Free Delivery Across India</p>

                </div>

                <div className="flex items-center gap-3">

                  <FiShield size={22} />

                  <p>Secure Payment & Easy Returns</p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      <ProductTabs
        product={product}
     />

      <RelatedProducts
        currentProduct={product}
      />

      <RecentlyViewed
        currentProduct={product}
      />

      <ImageLightbox
        open={lightboxOpen}
        image={selectedImage}
        onClose={() => setLightboxOpen(false)}
      /> 

    </MainLayout>
  );
}    

export default Product;