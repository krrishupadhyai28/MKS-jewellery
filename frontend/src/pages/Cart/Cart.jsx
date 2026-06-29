import { Link } from "react-router-dom";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
} from "react-icons/fi";

import MainLayout from "../../layouts/MainLayout";
import { useCart } from "../../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <MainLayout>
      <section className="min-h-screen bg-[#FAF7F2] py-20">
        <div className="mx-auto max-w-7xl px-6">
          
          {/* Heading */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-[#111111]">
              Shopping Cart
            </h1>
            <p className="mt-3 text-lg text-gray-500">
              Review your selected jewellery items before checkout.
            </p>
          </div>

          {/* Empty Cart Logic */}
          {cart.length === 0 ? (
            <div className="rounded-3xl bg-white py-24 text-center shadow">
              <FiShoppingBag
                size={70}
                className="mx-auto text-[#C9A227]"
              />
              <h2 className="mt-8 text-3xl font-bold">
                Your Cart is Empty
              </h2>
              <p className="mt-3 text-gray-500">
                Looks like you haven't added any jewellery yet.
              </p>
              <Link
                to="/shop"
                className="mt-8 inline-block rounded-xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-[#C9A227]"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid gap-10 grid-cols-1 lg:grid-cols-3">
              
              {/* Cart Items List */}
              <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow">
                <h2 className="mb-8 text-2xl font-bold">
                  Cart Items
                </h2>

                {cart.map((product) => (
                  <div
                    
                    key={`${product.id}-${product.selectedColor || "default"}-${product.selectedSize || "default"}`}
                    className="mb-8 flex flex-col gap-6 border-b pb-8 sm:flex-row"
                  >
                    {/* Improvement 2: Safe Image Fallback handler */}
                    <img
                      src={product.image || "https://placehold.co/300x400"}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = "https://placehold.co/300x400";
                      }}
                      className="h-40 w-32 rounded-2xl object-cover"
                    />

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-gray-500">
                        {product.category}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <span className="rounded-full bg-[#FAF7F2] px-4 py-2 text-sm">
                          Color :
                          <span className="ml-1 font-semibold text-[#C9A227]">
                            {product.selectedColor || "Default"}
                          </span>
                        </span>

                        <span className="rounded-full bg-[#FAF7F2] px-4 py-2 text-sm">
                          Size :
                          <span className="ml-1 font-semibold text-[#C9A227]">
                            {product.selectedSize || "Default"}
                          </span>
                        </span>
                      </div>

                      <p className="mt-6 text-3xl font-bold">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Adjustment & Remove Controls */}
                    <div className="flex flex-col items-end justify-between">
                      
                      <button
                        onClick={() =>
                          removeFromCart(
                            product.id,
                            product.selectedColor,
                            product.selectedSize
                          )
                        }
                        className="rounded-xl p-2 text-red-500 transition hover:bg-red-50"
                      >
                        <FiTrash2 size={22} />
                      </button>

                      <div className="mt-6 flex items-center gap-4 rounded-xl border px-3 py-2">
                        
                        <button
                          onClick={() =>
                            decreaseQuantity(
                              product.id,
                              product.selectedColor,
                              product.selectedSize
                            )
                          }
                          className="rounded-lg p-2 transition hover:bg-gray-100"
                        >
                          <FiMinus />
                        </button>

                        <span className="w-8 text-center text-lg font-bold">
                          {product.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              product.id,
                              product.selectedColor,
                              product.selectedSize
                            )
                          }
                          className="rounded-lg p-2 transition hover:bg-gray-100"
                        >
                          <FiPlus />
                        </button>

                      </div>

                      <p className="mt-6 text-xl font-bold text-[#C9A227]">
                        ₹{(product.price * product.quantity).toLocaleString()}
                      </p>

                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Sidebar */}
              <div className="h-fit rounded-3xl bg-white p-8 shadow">
                <h2 className="text-2xl font-bold">
                  Order Summary
                </h2>

                <div className="mt-8 space-y-5">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Total Items
                    </span>
                    <span className="font-semibold">
                      {cart.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  </div>

                  {/* Future Improvement: Added Subtotal line & updated summary view layout */}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-semibold text-green-600">₹0</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Shipping
                    </span>
                    <span className="font-semibold text-green-600">
                      FREE
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      GST
                    </span>
                    <span className="text-gray-500">
                      Included
                    </span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-3xl font-bold">
                    <span>Total</span>
                    <span className="text-[#C9A227]">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Coupon Code Element */}
                <div className="mt-10">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="w-full rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                  />
                  <button
                    className="mt-4 w-full rounded-xl border border-[#C9A227] py-3 font-semibold text-[#C9A227] transition hover:bg-[#C9A227] hover:text-white"
                  >
                    Apply Coupon
                  </button>
                </div>

                {/* Checkout & Shop CTA Options */}
                <Link
                  to="/checkout"
                  className="mt-10 block w-full rounded-xl bg-black py-4 text-center text-lg font-semibold text-white transition hover:bg-[#C9A227]"
                >
                  Proceed To Checkout
                </Link>

                <Link
                  to="/shop"
                  className="mt-4 block w-full rounded-xl border border-[#111111] py-4 text-center font-semibold transition hover:bg-[#111111] hover:text-white"
                >
                  Continue Shopping
                </Link>
              </div>

            </div>
          )}

        </div>
      </section>
    </MainLayout>
  );
}

export default Cart;