import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function CategoryRow({
  category,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="border-b transition hover:bg-gray-50">

      {/* Category (Image & Name) */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src={category.image_url || "/placeholder.png"}
            alt={category.name}
            className="h-14 w-14 rounded-xl object-cover"
            onError={(e) => {
              e.target.src = "/placeholder.png";
            }}
          />

          <div>
            <h3 className="font-semibold text-gray-900">
              {category.name}
            </h3>
            <p className="text-xs text-gray-500">
              Category ID : #{category.category_id}
            </p>
          </div>
        </div>
      </td>

      {/* Description */}
      <td className="max-w-sm px-6 py-4 text-gray-600 truncate">
        {category.description || "—"}
      </td>

      {/* Created */}
      <td className="px-6 py-4 text-center text-gray-600">
        {category.created_at 
          ? new Date(category.created_at).toLocaleDateString() 
          : "—"}
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