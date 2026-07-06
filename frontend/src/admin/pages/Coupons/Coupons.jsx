import { useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

import CouponTable from "../../components/CouponTable/CouponTable";
import CouponModal from "../../components/CouponModal/CouponModal";
import ViewCouponModal from "../../components/ViewCouponModal/ViewCouponModal";
import DeleteCouponModal from "../../components/DeleteCouponModal/DeleteCouponModal";
import Pagination from "../../components/Pagination/Pagination";

function Coupons() {
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Coupons
          </h1>

          <p className="mt-2 text-gray-500">
            Create and manage discount coupons for your jewellery store.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedCoupon(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-[#C9A227] px-6 py-3 font-semibold text-white transition hover:bg-[#b08d1f]"
        >
          <FaPlus />

          Add Coupon

        </button>

      </div>

      {/* Search & Filter */}

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

          <div className="relative lg:col-span-2">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search coupons..."
              className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-[#C9A227]"
            />

          </div>

          <select className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]">

            <option>All Status</option>
            <option>Active</option>
            <option>Scheduled</option>
            <option>Expired</option>

          </select>

          <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 hover:bg-gray-50">

            <FaFilter />

            Filter

          </button>

        </div>

      </div>

      {/* Coupon Table */}

      <CouponTable
        onView={(coupon) => {
          setSelectedCoupon(coupon);
          setViewOpen(true);
        }}
        onEdit={(coupon) => {
          setSelectedCoupon(coupon);
          setModalOpen(true);
        }}
        onDelete={(coupon) => {
          setSelectedCoupon(coupon);
          setDeleteOpen(true);
        }}
      />

      <Pagination />

      {/* Add / Edit Coupon */}

      <CouponModal
        open={modalOpen}
        coupon={selectedCoupon}
        onClose={() => {
          setModalOpen(false);
          setSelectedCoupon(null);
        }}
        onSave={(data) => {
          console.log(data);

          setModalOpen(false);
          setSelectedCoupon(null);
        }}
      />

      {/* View Coupon */}

      <ViewCouponModal
        open={viewOpen}
        coupon={selectedCoupon}
        onClose={() => {
          setViewOpen(false);
          setSelectedCoupon(null);
        }}
      />

      {/* Delete Coupon */}

      <DeleteCouponModal
        open={deleteOpen}
        coupon={selectedCoupon}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedCoupon(null);
        }}
        onDelete={(coupon) => {
          console.log("Delete:", coupon);

          setDeleteOpen(false);
          setSelectedCoupon(null);
        }}
      />

    </div>
  );
}

export default Coupons;