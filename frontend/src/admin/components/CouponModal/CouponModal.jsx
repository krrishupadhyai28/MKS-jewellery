import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const initialState = {
  code: "",
  type: "Percentage",
  discount: "",
  minOrder: "",
  usageLimit: "",
  startDate: "",
  expiryDate: "",
  status: "Active",
};

function CouponModal({
  open,
  onClose,
  coupon,
  onSave,
}) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code || "",
        type: coupon.type || "Percentage",
        discount: coupon.discount || "",
        minOrder: coupon.minOrder || "",
        usageLimit: coupon.usageLimit || "",
        startDate: coupon.startDate || "",
        expiryDate: coupon.expiryDate || "",
        status: coupon.status || "Active",
      });
    } else {
      setFormData(initialState);
    }
  }, [coupon, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSave) {
      onSave(formData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-5">

          <div>

            <h2 className="text-2xl font-bold">
              {coupon ? "Edit Coupon" : "Add Coupon"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Configure coupon details.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2"
        >

          <div>

            <label className="mb-2 block font-medium">
              Coupon Code
            </label>

            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="WELCOME10"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
              required
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Discount Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            >
              <option>Percentage</option>
              <option>Flat</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Discount Value
            </label>

            <input
              type="text"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="10% or ₹500"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
              required
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Minimum Order
            </label>

            <input
              type="number"
              name="minOrder"
              value={formData.minOrder}
              onChange={handleChange}
              placeholder="5000"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Usage Limit
            </label>

            <input
              type="number"
              name="usageLimit"
              value={formData.usageLimit}
              onChange={handleChange}
              placeholder="100"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            >
              <option>Active</option>
              <option>Scheduled</option>
              <option>Expired</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Start Date
            </label>

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Expiry Date
            </label>

            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            />

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-4 md:col-span-2">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-6 py-3 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#C9A227] px-8 py-3 font-semibold text-white transition hover:bg-[#b08d1f]"
            >
              {coupon ? "Update Coupon" : "Save Coupon"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CouponModal;