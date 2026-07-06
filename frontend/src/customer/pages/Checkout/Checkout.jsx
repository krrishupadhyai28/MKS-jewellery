import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import MainLayout from "../../layouts/MainLayout";
import { useCart } from "../../context/CartContext";
import { useCustomerAuth } from "../../context/CustomerAuthContext"; // <-- Step 1
import toast from "react-hot-toast"; // <-- Step 1

function Checkout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { cart } = useCart();
  const { isAuthenticated } = useCustomerAuth(); // <-- Step 2

  // 🔥 Fixed Subtotal Bug: Multiplying price with quantity
  const subtotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // 🔥 Step 3: Integrated Place Order Handler with Auth & Loading
  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      toast.error("Please login to place your order.");
      navigate("/login");
      return;
    }

    // Checkout page khali cart par submit na ho jaye uske liye guard clause
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setLoading(true);

    // Simulating API Call
    setTimeout(() => {
      setLoading(false);
      toast.success("Order placed successfully.");
      navigate("/order-success");
    }, 2000);
  };

  return (
    <MainLayout>
      <section className="min-h-screen bg-[#FAF7F2] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold">Checkout</h1>
          <p className="mt-3 text-gray-500">Complete your order securely.</p>

          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {/* Billing Details */}
            <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow">
              <h2 className="mb-8 text-2xl font-bold">Billing Details</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                />
              </div>

              <textarea
                rows="5"
                placeholder="Complete Address"
                className="mt-6 w-full rounded-xl border p-4 outline-none focus:border-[#C9A227]"
              />

              <input
                type="text"
                placeholder="Pincode"
                className="mt-6 w-full rounded-xl border p-4 outline-none focus:border-[#C9A227]"
              />

              <h3 className="mt-10 text-xl font-bold">Payment Method</h3>
              <div className="mt-5 space-y-4">
                <label className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer">
                  <input type="radio" name="payment" defaultChecked />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer">
                  <input type="radio" name="payment" />
                  UPI Payment
                </label>
                <label className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer">
                  <input type="radio" name="payment" />
                  Credit / Debit Card
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="h-fit rounded-3xl bg-white p-8 shadow">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              <div className="mt-8 space-y-5">
                {cart.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex justify-between items-start"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      {/* Displays Variant details cleanly under name */}
                      {(item.selectedColor || item.selectedSize) && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                          {item.selectedColor && item.selectedSize && " | "}
                          {item.selectedSize && `Size: ${item.selectedSize}`}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>
                    <span className="font-medium">
                      ₹{item.price * (item.quantity || 1)}
                    </span>
                  </div>
                ))}

                <hr className="border-gray-100" />

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>

                <div className="flex justify-between text-2xl font-bold text-gray-900 pt-2">
                  <span>Total</span>
                  <span>₹{subtotal}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="mt-8">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="w-full rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                />
                <button className="mt-4 w-full rounded-xl border border-[#C9A227] py-3 font-semibold text-[#C9A227] transition hover:bg-[#C9A227] hover:text-white">
                  Apply Coupon
                </button>
              </div>

              {/* 🔥 Step 4: Retained your beautiful LoadingButton component */}
              <LoadingButton
                loading={loading}
                onClick={handlePlaceOrder}
                className="mt-8 w-full rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-[#C9A227]"
              >
                Place Order
              </LoadingButton>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Checkout;