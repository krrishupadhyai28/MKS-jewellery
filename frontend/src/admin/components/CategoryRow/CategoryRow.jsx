import {
  FaEye,
  FaEdit,
  FaTrash,
  FaStar,
} from "react-icons/fa";

function CategoryRow({
  category,
  onView,
  onEdit,
  onDelete,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "Inactive":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <tr className="border-b transition hover:bg-gray-50">

      {/* Category */}

      <td className="px-6 py-4">

        <div className="flex items-center gap-4">

          <img
            src={category.image}
            alt={category.name}
            className="h-14 w-14 rounded-xl object-cover"
          />

          <div>

            <h3 className="font-semibold text-gray-900">
              {category.name}
            </h3>

            <p className="text-xs text-gray-500">
              Category ID : #{category.id}
            </p>

          </div>

        </div>

      </td>

      {/* Slug */}

      <td className="px-6 py-4 text-gray-700">
        {category.slug}
      </td>

      {/* Products */}

      <td className="px-6 py-4 text-center font-semibold">
        {category.products}
      </td>

      {/* Featured */}

      <td className="px-6 py-4 text-center">

        {category.featured ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">

            <FaStar size={10} />

            Featured

          </span>
        ) : (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
            No
          </span>
        )}

      </td>

      {/* Status */}

      <td className="px-6 py-4 text-center">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
            category.status
          )}`}
        >
          {category.status}
        </span>

      </td>

      {/* Created */}

      <td className="px-6 py-4 text-center text-gray-600">
        {category.createdAt}
      </td>

      {/* Actions */}

      <td className="px-6 py-4">

        <div className="flex justify-center gap-3">

          {/* View */}

          <button
            onClick={() => onView(category)}
            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
          >
            <FaEye />
          </button>

          {/* Edit */}

          <button
            onClick={() => onEdit(category)}
            className="rounded-lg bg-yellow-50 p-2 text-yellow-600 transition hover:bg-yellow-100"
          >
            <FaEdit />
          </button>

          {/* Delete */}

          <button
            onClick={() => onDelete(category)}
            className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
          >
            <FaTrash />
          </button>

        </div>

      </td>

    </tr>
  );
}

export default CategoryRow;