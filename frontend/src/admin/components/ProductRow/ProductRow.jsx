import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function ProductRow({ product, onView, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "Low Stock":
        return "bg-yellow-100 text-yellow-700";

      case "Out of Stock":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <tr className="border-b transition hover:bg-gray-50">

      {/* Product Image */}
      <td className="px-6 py-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-14 w-14 rounded-xl object-cover"
        />
      </td>

      {/* Product Name */}
      <td className="px-6 py-4">
        <h3 className="font-semibold text-gray-900">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500">
          {product.sku}
        </p>
      </td>

      {/* Category */}
      <td className="px-6 py-4">
        {product.category}
      </td>

      {/* Price */}
      <td className="px-6 py-4 font-semibold">
        {typeof product.price === "number"
          ? `₹${product.price.toLocaleString("en-IN")}`
          : product.price}
      </td>

      {/* Stock */}
      <td className="px-6 py-4">
        {product.stock}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
            product.status
          )}`}
        >
          {product.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex justify-center gap-3">

          {/* View */}
          <button
            onClick={() => onView(product)}
            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
          >
            <FaEye />
          </button>

          {/* Edit */}
          <button
            onClick={() => onEdit(product)}
            className="rounded-lg bg-yellow-50 p-2 text-yellow-600 transition hover:bg-yellow-100"
          >
            <FaEdit />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(product)}
            className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
          >
            <FaTrash />
          </button>

        </div>
      </td>

    </tr>
  );
}

export default ProductRow;