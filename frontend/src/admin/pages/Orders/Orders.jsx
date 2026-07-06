import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

import OrdersTable from "../../components/OrdersTable/OrdersTable";
import Pagination from "../../components/Pagination/Pagination";
import OrderDetailsModal from "../../components/OrderDetailsModal/OrderDetailsModal";
import UpdateStatusModal from "../../components/UpdateStatusModal/UpdateStatusModal";
import InvoiceModal from "../../components/InvoiceModal/InvoiceModal";

function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Orders
          </h1>

          <p className="mt-2 text-gray-500">
            Manage customer orders and monitor delivery status.
          </p>

        </div>

      </div>

      {/* Search & Filter */}

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

          {/* Search */}

          <div className="relative lg:col-span-2">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search orders..."
              className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-[#C9A227]"
            />

          </div>

          {/* Status */}

          <select className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]">

            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>

          </select>

          {/* Filter */}

          <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 hover:bg-gray-50">

            <FaFilter />

            Filter

          </button>

        </div>

      </div>

      {/* Orders Table */}

      <OrdersTable
        onView={(order) => {
          setSelectedOrder(order);
          setDetailsOpen(true);
        }}
        onStatus={(order) => {
          setSelectedOrder(order);
          setStatusOpen(true);
        }}
      />

      <Pagination />

      {/* Details Modal */}

      <OrderDetailsModal
        open={detailsOpen}
        order={selectedOrder}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedOrder(null);
        }}
      />

      {/* Status Modal */}

      <UpdateStatusModal
        open={statusOpen}
        order={selectedOrder}
        onClose={() => {
          setStatusOpen(false);
          setSelectedOrder(null);
        }}
        onSave={(updatedOrder) => {
          console.log(updatedOrder);

          setStatusOpen(false);
          setSelectedOrder(null);
        }}
      />

      {/* Invoice Modal */}

      <InvoiceModal
        open={invoiceOpen}
        order={selectedOrder}
        onClose={() => {
          setInvoiceOpen(false);
        }}
      />

    </div>
  );
}

export default Orders;