import { FaTrashAlt, FaTimes } from "react-icons/fa";

function DeleteModal({
  open,
  onClose,
  onDelete,
  product,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">

          <h2 className="text-xl font-bold text-red-600">
            Delete Product
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}
        <div className="px-6 py-8 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">

            <FaTrashAlt
              size={28}
              className="text-red-600"
            />

          </div>

          <h3 className="text-xl font-semibold">
            Delete Product?
          </h3>

          <p className="mt-3 text-gray-500">

            Are you sure you want to delete

            <span className="font-semibold text-black">
              {" "}
              {product?.name}
            </span>

            ?

            <br />

            This action cannot be undone.

          </p>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t px-6 py-5">

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;