import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function UpdateStatusModal({
  open,
  onClose,
  order,
  onSave,
}) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  if (!open || !order) return null;

  const handleSubmit = () => {
    onSave({
      ...order,
      status,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Update Order Status
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {order.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}
        <div className="space-y-6 p-6">

          <div>

            <label className="mb-2 block text-sm font-semibold">
              Customer
            </label>

            <input
              type="text"
              value={order.customer}
              readOnly
              className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-semibold">
              Product
            </label>

            <input
              type="text"
              value={order.product}
              readOnly
              className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-semibold">
              Order Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>

          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-5">

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-5 py-3 font-medium hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-[#C9A227] px-6 py-3 font-semibold text-white transition hover:bg-[#b08d1f]"
          >
            Update Status
          </button>

        </div>

      </div>

    </div>
  );
}

export default UpdateStatusModal;