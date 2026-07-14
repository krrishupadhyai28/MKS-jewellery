import toast from "react-hot-toast";
import api from "../../../services/api";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

// Updated initialState as per instructions
const initialState = {
  name: "",
  description: "",
  image_url: "",
};

function CategoryModal({
  open,
  onClose,
  category,
  onSave,
}) {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // Updated useEffect to handle only name, description, and image
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        image_url: category.image_url || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [category, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Updated validation to only check for name
    if (!formData.name) {
      toast.error("Category name is required");
      return;
    }

    try {
      setLoading(true);

      if (category) {
        await api.put(
          `/api/admin/categories/${category.category_id}`,
          formData
        );
        toast.success("Category updated successfully");
      } else {
        await api.post(
          "/api/admin/categories",
          formData
        );
        toast.success("Category added successfully");
      }

      if (onSave) {
        await onSave();
      }

      onClose();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error ||
        "Failed to save category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-8 py-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {category ? "Edit Category" : "Add Category"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Fill in category information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2"
        >

          {/* Name - Now spans full width on medium screens because slug is removed */}
          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
              required
            />
          </div>

          {/* Image URL Input (Replaced File Upload) */}
          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">
              Image URL
            </label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">
              Description
            </label>
            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter category description..."
              className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#C9A227]"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-6 py-3 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#C9A227] px-8 py-3 font-semibold text-white transition hover:bg-[#b08d1f] disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : category
                ? "Update Category"
                : "Save Category"}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}

export default CategoryModal;