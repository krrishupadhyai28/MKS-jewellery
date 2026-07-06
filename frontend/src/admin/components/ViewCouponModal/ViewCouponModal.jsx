import { FaTimes, FaTicketAlt } from "react-icons/fa";

function ViewCouponModal({
  open,
  onClose,
  coupon,
}) {
  if (!open || !coupon) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "Expired":
        return "bg-red-100 text-red-700";

      case "Scheduled":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const usagePercentage = Math.min(
    (coupon.used / coupon.usageLimit) * 100,
    100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-6">

          <div>

            <h2 className="flex items-center gap-3 text-2xl font-bold">

              <FaTicketAlt className="text-[#C9A227]" />

              Coupon Details

            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Coupon ID : #{coupon.id}
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <FaTimes size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="grid gap-8 p-8 md:grid-cols-2">

          {/* Left */}

          <div className="space-y-6">

            <div className="rounded-2xl border p-6">

              <h3 className="mb-5 text-lg font-semibold">
                Coupon Information
              </h3>

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Coupon Code
                  </span>

                  <span className="font-bold text-[#C9A227]">
                    {coupon.code}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Discount Type
                  </span>

                  <span className="font-medium">
                    {coupon.type}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Discount
                  </span>

                  <span className="font-semibold">
                    {coupon.discount}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Minimum Order
                  </span>

                  <span className="font-semibold">
                    ₹{coupon.minOrder.toLocaleString()}
                  </span>

                </div>

              </div>

            </div>

            <div className="rounded-2xl border p-6">

              <h3 className="mb-5 text-lg font-semibold">
                Validity
              </h3>

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Start Date
                  </span>

                  <span>{coupon.startDate}</span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Expiry Date
                  </span>

                  <span>{coupon.expiryDate}</span>

                </div>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="space-y-6">

            <div className="rounded-2xl border p-6">

              <h3 className="mb-5 text-lg font-semibold">
                Coupon Usage
              </h3>

              <div className="mb-4 flex justify-between">

                <span>
                  Used
                </span>

                <span className="font-semibold">
                  {coupon.used} / {coupon.usageLimit}
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-200">

                <div
                  className="h-full rounded-full bg-[#C9A227]"
                  style={{
                    width: `${usagePercentage}%`,
                  }}
                />

              </div>

              <p className="mt-3 text-right text-sm text-gray-500">
                {usagePercentage.toFixed(0)}% Used
              </p>

            </div>

            <div className="rounded-2xl border p-6">

              <h3 className="mb-5 text-lg font-semibold">
                Status
              </h3>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                  coupon.status
                )}`}
              >
                {coupon.status}
              </span>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end border-t px-8 py-5">

          <button
            onClick={onClose}
            className="rounded-xl bg-[#C9A227] px-6 py-3 font-semibold text-white transition hover:bg-[#b08d1f]"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default ViewCouponModal;