import { useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaFilter,
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

      {/* Search */}

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

          <div className="relative lg:col-span-2">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search category..."
              className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-[#C9A227]"
            />

          </div>

          <select className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]">

            <option>All Status</option>

            <option>Active</option>

            <option>Inactive</option>

          </select>

          <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 hover:bg-gray-50">

            <FaFilter />

            Filter

          </button>

        </div>

      </div>

      {/* Table */}

      <CategoryTable
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

      <Pagination />

      {/* Add / Edit */}

      <CategoryModal
        open={modalOpen}
        category={selectedCategory}
        onClose={() => {
          setModalOpen(false);
          setSelectedCategory(null);
        }}
        onSave={(data) => {
          console.log(data);

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
        onDelete={(category) => {
          console.log("Delete:", category);

          setDeleteOpen(false);
          setSelectedCategory(null);
        }}
      />

    </div>
  );
}

export default Categories;