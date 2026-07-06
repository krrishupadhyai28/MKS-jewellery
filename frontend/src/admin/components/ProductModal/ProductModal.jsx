import { FaTimes } from "react-icons/fa";

function ProductModal({
  open,
  onClose,
  product = null,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-8 py-5">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {product ? "Edit Product" : "Add New Product"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {product
                ? "Update the product details below."
                : "Fill all product details below."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <FaTimes size={20} />
          </button>

        </div>

        {/* Body */}
        <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2">

          {/* Product Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Product Name
            </label>

            <input
              type="text"
              defaultValue={product?.name || ""}
              placeholder="Diamond Ring"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#C9A227]"
            />
          </div>

          {/* SKU */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              SKU
            </label>

            <input
              type="text"
              defaultValue={product?.sku || ""}
              placeholder="MK-001"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#C9A227]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Category
            </label>

            <select
              defaultValue={product?.category || "Ring"}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#C9A227]"
            >
              <option>Ring</option>
              <option>Necklace</option>
              <option>Bracelet</option>
              <option>Earrings</option>
              <option>Pendant</option>
              <option>Bangles</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Price
            </label>

            <input
              type="number"
              defaultValue={product?.price || ""}
              placeholder="24999"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#C9A227]"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Discount %
            </label>

            <input
              type="number"
              defaultValue={product?.discount || ""}
              placeholder="10"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#C9A227]"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Stock
            </label>

            <input
              type="number"
              defaultValue={product?.stock || ""}
              placeholder="50"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#C9A227]"
            />
          </div>

          {/* Product Image */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold">
              Product Image
            </label>

            <input
              type="file"
              className="w-full rounded-xl border-2 border-dashed border-gray-300 p-4 file:mr-4 file:rounded-lg file:border-0 file:bg-[#C9A227] file:px-4 file:py-2 file:text-white hover:file:bg-[#b08d1f]"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold">
              Description
            </label>

            <textarea
              rows={5}
              defaultValue={product?.description || ""}
              placeholder="Enter product description..."
              className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-[#C9A227]"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Status
            </label>

            <select
              defaultValue={product?.status || "Active"}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#C9A227]"
            >
              <option>Active</option>
              <option>Inactive</option>
              <option>Out of Stock</option>
            </select>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 border-t px-8 py-5">

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button className="rounded-xl bg-[#C9A227] px-6 py-3 font-semibold text-white transition hover:bg-[#b08d1f]">
            {product ? "Update Product" : "Save Product"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductModal;