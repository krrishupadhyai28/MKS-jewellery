import { FaTimes, FaStar } from "react-icons/fa";

function ViewCategoryModal({
  open,
  onClose,
  category,
}) {
  if (!open || !category) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-6">

          <div>

            <h2 className="text-2xl font-bold">
              Category Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Category ID : #{category.id}
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

          {/* Image */}

          <div className="rounded-2xl border p-6 text-center">

            <img
              src={category.image}
              alt={category.name}
              className="mx-auto h-52 w-52 rounded-2xl object-cover"
            />

            <h3 className="mt-5 text-2xl font-bold">
              {category.name}
            </h3>

            <div className="mt-4">

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                  category.status
                )}`}
              >
                {category.status}
              </span>

            </div>

          </div>

          {/* Details */}

          <div className="space-y-6 md:col-span-2">

            <div className="rounded-2xl border p-6">

              <h3 className="mb-5 text-xl font-semibold">
                Category Information
              </h3>

              <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <p className="text-sm text-gray-500">
                    Category Name
                  </p>

                  <h4 className="font-semibold">
                    {category.name}
                  </h4>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Slug
                  </p>

                  <h4 className="font-semibold">
                    {category.slug}
                  </h4>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Products
                  </p>

                  <h4 className="font-semibold">
                    {category.products}
                  </h4>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Created On
                  </p>

                  <h4 className="font-semibold">
                    {category.createdAt}
                  </h4>

                </div>

              </div>

            </div>

            {/* Featured */}

            <div className="rounded-2xl border p-6">

              <h3 className="mb-5 text-xl font-semibold">
                Category Status
              </h3>

              <div className="flex items-center justify-between">

                <span className="font-medium">
                  Featured Category
                </span>

                {category.featured ? (

                  <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">

                    <FaStar />

                    Featured

                  </span>

                ) : (

                  <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600">
                    Not Featured
                  </span>

                )}

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