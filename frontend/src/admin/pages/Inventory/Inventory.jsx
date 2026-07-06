import { useState } from "react";
import {
  FaBoxes,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

import InventoryTable from "../../components/InventoryTable/InventoryTable";
import LowStockAlert from "../../components/LowStockAlert/LowStockAlert";
import StockDetailsModal from "../../components/StockDetailsModal/StockDetailsModal";
import UpdateStockModal from "../../components/UpdateStockModal/UpdateStockModal";
import StockHistoryModal from "../../components/StockHistoryModal/StockHistoryModal";
import Pagination from "../../components/Pagination/Pagination";

function Inventory() {
  const [selectedItem, setSelectedItem] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">

            <FaBoxes className="text-[#C9A227]" />

            Inventory

          </h1>

          <p className="mt-2 text-gray-500">
            Manage inventory, stock levels and supplier updates.
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

          {/* Search */}

          <div className="relative lg:col-span-2">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search inventory..."
              className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-[#C9A227]"
            />

          </div>

          {/* Filter */}

          <select className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]">

            <option>All Status</option>

            <option>In Stock</option>

            <option>Low Stock</option>

            <option>Out of Stock</option>

          </select>

          <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 hover:bg-gray-50">

            <FaFilter />

            Filter

          </button>

        </div>

      </div>

      {/* Low Stock */}

      <LowStockAlert />

      {/* Inventory Table */}

      <InventoryTable
        onView={(item) => {
          setSelectedItem(item);
          setViewOpen(true);
        }}
        onUpdate={(item) => {
          setSelectedItem(item);
          setUpdateOpen(true);
        }}
        onHistory={(item) => {
          setSelectedItem(item);
          setHistoryOpen(true);
        }}
      />

      <Pagination />

      {/* View */}

      <StockDetailsModal
        open={viewOpen}
        item={selectedItem}
        onClose={() => {
          setViewOpen(false);
          setSelectedItem(null);
        }}
      />

      {/* Update */}

      <UpdateStockModal
        open={updateOpen}
        item={selectedItem}
        onClose={() => {
          setUpdateOpen(false);
          setSelectedItem(null);
        }}
        onSave={(updatedItem) => {
          console.log(updatedItem);

          setUpdateOpen(false);
          setSelectedItem(null);
        }}
      />

      {/* History */}

      <StockHistoryModal
        open={historyOpen}
        item={selectedItem}
        onClose={() => {
          setHistoryOpen(false);
          setSelectedItem(null);
        }}
      />

    </div>
  );
}

export default Inventory;