import {
  FaEye,
  FaSyncAlt,
} from "react-icons/fa";

function OrderRow({
  order,
  onView,
  onStatus,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Processing":
        return "bg-yellow-100 text-yellow-700";

      case "Shipped":
        return "bg-blue-100 text-blue-700";

      case "Pending":
        return "bg-orange-100 text-orange-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentColor = (payment) => {
    switch (payment) {
      case "Paid":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Refunded":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <tr className="border-b transition hover:bg-gray-50">

      {/* Order ID */}
      <td className="px-6 py-4 font-semibold text-[#C9A227]">
        {order.id}
      </td>

      {/* Customer */}
      <td className="px-6 py-4">

        <h3 className="font-semibold text-gray-900">
          {order.customer}
        </h3>

        <p className="text-xs text-gray-500">
          {order.email}
        </p>

      </td>

      {/* Product */}
      <td className="px-6 py-4">

        <div className="flex items-center gap-3">

          <img
            src={order.image}
            alt={order.product}
            className="h-12 w-12 rounded-lg object-cover"
          />

          <span className="font-medium">
            {order.product}
          </span>

        </div>

      </td>

      {/* Amount */}
      <td className="px-6 py-4 font-semibold">
        ₹{order.amount.toLocaleString("en-IN")}
      </td>

      {/* Payment */}
      <td className="px-6 py-4">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getPaymentColor(
            order.payment
          )}`}
        >
          {order.payment}
        </span>

      </td>

      {/* Status */}
      <td className="px-6 py-4">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
            order.status
          )}`}
        >
          {order.status}
        </span>

      </td>

      {/* Date */}
      <td className="px-6 py-4 text-gray-600">
        {order.date}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">

        <div className="flex justify-center gap-3">

          {/* View */}
          <button
            onClick={() => onView(order)}
            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
          >
            <FaEye />
          </button>

          {/* Update Status */}
          <button
            onClick={() => onStatus(order)}
            className="rounded-lg bg-[#FFF8E5] p-2 text-[#C9A227] transition hover:bg-[#F5E8B2]"
          >
            <FaSyncAlt />
          </button>

        </div>

      </td>

    </tr>
  );
}

export default OrderRow;