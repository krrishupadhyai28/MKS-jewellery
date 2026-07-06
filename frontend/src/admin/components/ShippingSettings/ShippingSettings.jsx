import { useState } from "react";

function ShippingSettings() {
  const [shipping, setShipping] = useState({
    freeShipping: true,
    freeShippingAmount: 5000,
    standardCharge: 99,
    expressCharge: 199,
    estimatedDelivery: "3-5 Business Days",
    internationalShipping: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setShipping({
      ...shipping,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(shipping);

    // Backend API
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-gray-900">
          Shipping Settings
        </h2>

        <p className="mt-2 text-gray-500">
          Configure shipping charges and delivery options.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* Shipping Options */}

        <div className="grid gap-6 md:grid-cols-2">

          <label className="flex items-center justify-between rounded-xl border p-4">

            <span className="font-medium">
              Enable Free Shipping
            </span>

            <input
              type="checkbox"
              name="freeShipping"
              checked={shipping.freeShipping}
              onChange={handleChange}
            />

          </label>

          <label className="flex items-center justify-between rounded-xl border p-4">

            <span className="font-medium">
              International Shipping
            </span>

            <input
              type="checkbox"
              name="internationalShipping"
              checked={shipping.internationalShipping}
              onChange={handleChange}
            />

          </label>

        </div>

        {/* Charges */}

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">
              Free Shipping Above (₹)
            </label>

            <input
              type="number"
              name="freeShippingAmount"
              value={shipping.freeShippingAmount}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Standard Shipping (₹)
            </label>

            <input
              type="number"
              name="standardCharge"
              value={shipping.standardCharge}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Express Shipping (₹)
            </label>

            <input
              type="number"
              name="expressCharge"
              value={shipping.expressCharge}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Estimated Delivery
            </label>

            <input
              type="text"
              name="estimatedDelivery"
              value={shipping.estimatedDelivery}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            />

          </div>

        </div>

        {/* Save */}

        <div className="flex justify-end">

          <button
            type="submit"
            className="rounded-xl bg-[#C9A227] px-8 py-3 font-semibold text-white transition hover:bg-[#b08d1f]"
          >
            Save Shipping Settings
          </button>

        </div>

      </form>

    </div>
  );
}

export default ShippingSettings;