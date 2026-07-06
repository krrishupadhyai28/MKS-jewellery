import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function UserRow({
  user,
  onView,
  onEdit,
  onDelete,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "VIP":
        return "bg-purple-100 text-purple-700";

      case "Blocked":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <tr className="border-b transition hover:bg-gray-50">

      {/* Customer */}
      <td className="px-6 py-4">

        <div className="flex items-center gap-4">

          <img
            src={user.avatar}
            alt={user.name}
            className="h-12 w-12 rounded-full object-cover"
          />

          <div>

            <h3 className="font-semibold text-gray-900">
              {user.name}
            </h3>

            <p className="text-xs text-gray-500">
              ID : #{user.id}
            </p>

          </div>

        </div>

      </td>

      {/* Email */}
      <td className="px-6 py-4 text-gray-700">
        {user.email}
      </td>

      {/* Phone */}
      <td className="px-6 py-4 text-gray-700">
        {user.phone}
      </td>

      {/* Orders */}
      <td className="px-6 py-4 text-center font-semibold">
        {user.orders}
      </td>

      {/* Total Spent */}
      <td className="px-6 py-4 text-right font-semibold">
        ₹{user.totalSpent.toLocaleString("en-IN")}
      </td>

      {/* Status */}
      <td className="px-6 py-4 text-center">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
            user.status
          )}`}
        >
          {user.status}
        </span>

      </td>

      {/* Joined */}
      <td className="px-6 py-4 text-center text-gray-600">
        {user.joined}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">

        <div className="flex justify-center gap-3">

          {/* View */}
          <button
            onClick={() => onView(user)}
            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
          >
            <FaEye />
          </button>

          {/* Edit */}
          <button
            onClick={() => onEdit(user)}
            className="rounded-lg bg-yellow-50 p-2 text-yellow-600 transition hover:bg-yellow-100"
          >
            <FaEdit />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(user)}
            className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
          >
            <FaTrash />
          </button>

        </div>

      </td>

    </tr>
  );
}

export default UserRow;