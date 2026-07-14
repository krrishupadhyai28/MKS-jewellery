import { FaTimes } from "react-icons/fa";

function ViewCategoryModal({ open, onClose, category }) {
  if (!open || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b px-8 py-6">
          <div>
            <h2 className="text-2xl font-bold">Category Details</h2>
            <p className="mt-1 text-sm text-gray-500">
              Category ID : #{category.category_id}
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
        <div className="grid gap-8 p-8 md:grid-cols-3">
          
          {/* Image Section */}
          <div className="rounded-2xl border p-6 text-center flex flex-col justify-center items-center">
            <img
              src={category.image_url || "/placeholder.png"}
              alt={category.name}
              className="h-52 w-52 rounded-2xl object-cover border"
              onError={(e) => {
                e.target.src = "/placeholder.png";
              }}
            />
            <h3 className="mt-5 text-2xl font-bold">{category.name}</h3>
          </div>

          {/* Details Section */}
          <div className="space-y-6 md:col-span-2">
            <div className="rounded-2xl border p-6 h-full">
              <h3 className="mb-5 text-xl font-semibold">
                Category Information
              </h3>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Category Name</p>
                  <h4 className="font-semibold">{category.name}</h4>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Created Date</p>
                  <h4 className="font-semibold">
                    {category.created_at
                      ? new Date(category.created_at).toLocaleDateString("en-IN")
                      : "—"}
                  </h4>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="font-semibold text-gray-700 mt-1 whitespace-pre-line">
                    {category.description || "No description available."}
                  </p>
                </div>
              </div>
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

export default ViewCategoryModal;