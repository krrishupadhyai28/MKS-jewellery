import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function CouponRow({
  coupon,
  onView,
  onEdit,
  onDelete,
}) {
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
    <tr className="border-b transition hover:bg-gray-50">

      {/* Coupon Code */}

      <td className="px-6 py-4">

        <div>

          <h3 className="font-semibold text-gray-900">
            {coupon.code}
          </h3>

          <p className="text-xs text-gray-500">
            ID : #{coupon.id}
          </p>

        </div>

      </td>

      {/* Type */}

      <td className="px-6 py-4 text-center">
        {coupon.type}
      </td>

      {/* Discount */}

      <td className="px-6 py-4 text-center font-semibold text-[#C9A227]">
        {coupon.discount}
      </td>

      {/* Minimum Order */}

      <td className="px-6 py-4 text-center">
        ₹{coupon.minOrder.toLocaleString()}
      </td>

      {/* Usage */}

      <td className="px-6 py-4">

        <div>

          <div className="mb-1 flex justify-between text-xs text-gray-500">

            <span>
              {coupon.used}/{coupon.usageLimit}
            </span>

            <span>
              {usagePercentage.toFixed(0)}%
            </span>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-[#C9A227]"
              style={{
                width: `${usagePercentage}%`,
              }}
            />

          </div>

        </div>

      </td>

      {/* Expiry */}

      <td className="px-6 py-4 text-center">
        {coupon.expiryDate}
      </td>

      {/* Status */}

      <td className="px-6 py-4 text-center">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
            coupon.status
          )}`}
        >
          {coupon.status}
        </span>

      </td>

      {/* Actions */}

      <td className="px-6 py-4">

        <div className="flex justify-center gap-3">

          <button
            onClick={() => onView(coupon)}
            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
          >
            <FaEye />
          </button>

          <button
            onClick={() => onEdit(coupon)}
            className="rounded-lg bg-yellow-50 p-2 text-yellow-600 transition hover:bg-yellow-100"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(coupon)}
            className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
          >
            <FaTrash />
          </button>

        </div>

      </td>

    </tr>
  );
}

export default CouponRow;