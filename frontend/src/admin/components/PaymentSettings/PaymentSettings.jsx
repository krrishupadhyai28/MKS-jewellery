import { useState } from "react";

function PaymentSettings() {
  const [payment, setPayment] = useState({
    razorpay: true,
    stripe: false,
    cod: true,
    upi: true,
    tax: "3",
    currency: "INR",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setPayment({
      ...payment,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(payment);

    // Backend API
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-gray-900">
          Payment Settings
        </h2>

        <p className="mt-2 text-gray-500">
          Configure payment gateways and taxation for your store.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* Payment Methods */}

        <div>

          <h3 className="mb-5 text-lg font-semibold">
            Payment Methods
          </h3>

          <div className="grid gap-5 md:grid-cols-2">

            <label className="flex items-center justify-between rounded-xl border p-4">

              <span>Razorpay</span>

              <input
                type="checkbox"
                name="razorpay"
                checked={payment.razorpay}
                onChange={handleChange}
              />

            </label>

            <label className="flex items-center justify-between rounded-xl border p-4">

              <span>Stripe</span>

              <input
                type="checkbox"
                name="stripe"
                checked={payment.stripe}
                onChange={handleChange}
              />

            </label>

            <label className="flex items-center justify-between rounded-xl border p-4">

              <span>Cash on Delivery</span>

              <input
                type="checkbox"
                name="cod"
                checked={payment.cod}
                onChange={handleChange}
              />

            </label>

            <label className="flex items-center justify-between rounded-xl border p-4">

              <span>UPI Payment</span>

              <input
                type="checkbox"
                name="upi"
                checked={payment.upi}
                onChange={handleChange}
              />

            </label>

          </div>

        </div>

        {/* Tax */}

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">
              GST / Tax (%)
            </label>

            <input
              type="number"
              name="tax"
              value={payment.tax}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Currency
            </label>

            <select
              name="currency"
              value={payment.currency}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            >
              <option>INR</option>
              <option>USD</option>
              <option>EUR</option>
            </select>

          </div>

        </div>

        {/* Save */}

        <div className="flex justify-end">

          <button
            type="submit"
            className="rounded-xl bg-[#C9A227] px-8 py-3 font-semibold text-white transition hover:bg-[#b08d1f]"
          >
            Save Payment Settings
          </button>

        </div>

      </form>

    </div>
  );
}

export default PaymentSettings;