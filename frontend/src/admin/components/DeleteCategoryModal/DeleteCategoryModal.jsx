import { FaExclamationTriangle } from "react-icons/fa";

function DeleteCategoryModal({
  open,
  onClose,
  category,
  onDelete,
}) {
  if (!open || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex flex-col items-center border-b px-8 py-6">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

            <FaExclamationTriangle
              size={36}
              className="text-red-600"
            />

          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            Delete Category
          </h2>

          <p className="mt-3 text-center text-gray-500">
            Are you sure you want to delete
            <span className="font-semibold">
              {" "}
              "{category.name}"{" "}
            </span>
            ?
          </p>

          <p className="mt-2 text-center text-sm text-red-500">
            This action cannot be undone.
          </p>

        </div>

        {/* Details */}

        <div className="space-y-4 px-8 py-6">

          <div className="flex justify-between">

            <span className="text-gray-500">
              Slug
            </span>

            <span className="font-medium">
              {category.slug}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              Products
            </span>

            <span className="font-medium">
              {category.products}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              Status
            </span>

            <span className="font-medium">
              {category.status}
            </span>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 border-t px-8 py-5">

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-6 py-3 font-medium hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={() => onDelete(category)}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Delete Category
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteCategoryModal;