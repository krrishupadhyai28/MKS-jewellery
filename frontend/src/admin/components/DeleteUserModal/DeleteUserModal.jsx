import { FaTimes, FaTrashAlt } from "react-icons/fa";

function DeleteUserModal({
  open,
  onClose,
  user,
  onDelete,
}) {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">

          <h2 className="text-xl font-bold text-red-600">
            Delete Customer
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}

        <div className="px-6 py-8 text-center">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

            <FaTrashAlt
              size={32}
              className="text-red-600"
            />

          </div>

          <h3 className="text-2xl font-bold">
            Delete Customer?
          </h3>

          <p className="mt-4 leading-7 text-gray-500">

            Are you sure you want to permanently delete

            <span className="font-semibold text-black">
              {" "}
              {user.name}
            </span>

            ?

          </p>

          <p className="mt-2 text-sm text-red-500">
            This action cannot be undone.
          </p>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t px-6 py-5">

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-5 py-3 font-medium transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Delete Customer
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteUserModal;