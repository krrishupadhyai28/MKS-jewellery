import { useState } from "react";
import { storeSettings } from "../../data/settingsData";

function StoreSettings() {
  const [formData, setFormData] = useState(storeSettings);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Backend API
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-gray-900">
          Store Information
        </h2>

        <p className="mt-2 text-gray-500">
          Update your jewellery store details.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 md:grid-cols-2"
      >

        {/* Store Name */}

        <div>

          <label className="mb-2 block font-medium">
            Store Name
          </label>

          <input
            type="text"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
          />

        </div>

        {/* Owner */}

        <div>

          <label className="mb-2 block font-medium">
            Owner Name
          </label>

          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
          />

        </div>

        {/* Email */}

        <div>

          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
          />

        </div>

        {/* Phone */}

        <div>

          <label className="mb-2 block font-medium">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
          />

        </div>

        {/* GST */}

        <div>

          <label className="mb-2 block font-medium">
            GST Number
          </label>

          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
          />

        </div>

        {/* Currency */}

        <div>

          <label className="mb-2 block font-medium">
            Currency
          </label>

          <input
            type="text"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
          />

        </div>

        {/* Address */}

        <div className="md:col-span-2">

          <label className="mb-2 block font-medium">
            Store Address
          </label>

          <textarea
            rows="4"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#C9A227]"
          />

        </div>

        {/* Save */}

        <div className="md:col-span-2 flex justify-end">

          <button
            type="submit"
            className="rounded-xl bg-[#C9A227] px-8 py-3 font-semibold text-white transition hover:bg-[#b08d1f]"
          >
            Save Changes
          </button>

        </div>

      </form>

    </div>
  );
}

export default StoreSettings;