import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../../services/api";
import {
  FaPlus,
  FaSearch,
} from "react-icons/fa";

import CategoryTable from "../../components/CategoryTable/CategoryTable";
import CategoryModal from "../../components/CategoryModal/CategoryModal";
import ViewCategoryModal from "../../components/ViewCategoryModal/ViewCategoryModal";
import DeleteCategoryModal from "../../components/DeleteCategoryModal/DeleteCategoryModal";
import Pagination from "../../components/Pagination/Pagination";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    fetchCategories();
  }, []);

  // Reset page to 1 when search filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/admin/categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error ||
          "Failed to load categories"
      );
    } finally {
      setLoading(false);
    }
  };

  // Simplified Filter Logic (Only matches name)
  const filteredCategories = categories.filter((category) => {
    return category.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
  });

  // Pagination Logic
  const totalProducts = filteredCategories.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Categories
          </h1>
          <p className="mt-2 text-gray-500">
            Manage jewellery categories and featured collections.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedCategory(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-[#C9A227] px-6 py-3 font-semibold text-white transition hover:bg-[#b08d1f]"
        >
          <FaPlus />
          Add Category
        </button>
      </div>

      {/* Search Controls */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          
          {/* Controlled Search Input */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-[#C9A227]"
            />
          </div>

          {/* Clear Filter Button */}
          {search && (
            <button
              onClick={() => setSearch("")}
              className="rounded-xl border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50 transition"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <CategoryTable
        categories={paginatedCategories}
        loading={loading}
        onView={(category) => {
          setSelectedCategory(category);
          setViewOpen(true);
        }}
        onEdit={(category) => {
          setSelectedCategory(category);
          setModalOpen(true);
        }}
        onDelete={(category) => {
          setSelectedCategory(category);
          setDeleteOpen(true);
        }}
      />

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        totalProducts={totalProducts}
        productsPerPage={productsPerPage}
      />

      {/* Add / Edit */}
      <CategoryModal
        open={modalOpen}
        category={selectedCategory}
        onClose={() => {
          setModalOpen(false);
          setSelectedCategory(null);
        }}
        onSave={async () => {
          await fetchCategories();
          setModalOpen(false);
          setSelectedCategory(null);
        }}
      />

      {/* View */}
      <ViewCategoryModal
        open={viewOpen}
        category={selectedCategory}
        onClose={() => {
          setViewOpen(false);
          setSelectedCategory(null);
        }}
      />

      {/* Delete */}
      <DeleteCategoryModal
        open={deleteOpen}
        category={selectedCategory}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedCategory(null);
        }}
        onDelete={async (category) => {
          try {
            await api.delete(
              `/api/admin/categories/${category.category_id}`
            );

            toast.success("Category deleted successfully");

            await fetchCategories();

            setDeleteOpen(false);
            setSelectedCategory(null);

          } catch (error) {
            console.error(error);

            toast.error(
              error.response?.data?.error ||
              "Failed to delete category"
            );
          }
        }}
      />

    </div>
  );
}

export default Categories;