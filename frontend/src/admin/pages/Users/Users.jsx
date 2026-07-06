import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

import UsersTable from "../../components/UsersTable/UsersTable";
import Pagination from "../../components/Pagination/Pagination";
import UserDetailsModal from "../../components/UserDetailsModal/UserDetailsModal";
import EditUserModal from "../../components/EditUserModal/EditUserModal";
import DeleteUserModal from "../../components/DeleteUserModal/DeleteUserModal";

function Users() {
  const [selectedUser, setSelectedUser] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Customers
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all registered customers.
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
              placeholder="Search customers..."
              className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-[#C9A227]"
            />

          </div>

          {/* Status */}

          <select className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]">

            <option>All Status</option>
            <option>Active</option>
            <option>VIP</option>
            <option>Blocked</option>

          </select>

          {/* Filter */}

          <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 transition hover:bg-gray-100">

            <FaFilter />

            Filter

          </button>

        </div>

      </div>

      {/* Table */}

      <UsersTable
        onView={(user) => {
          setSelectedUser(user);
          setViewOpen(true);
        }}
        onEdit={(user) => {
          setSelectedUser(user);
          setEditOpen(true);
        }}
        onDelete={(user) => {
          setSelectedUser(user);
          setDeleteOpen(true);
        }}
      />

      <Pagination />

      {/* View Modal */}

      <UserDetailsModal
        open={viewOpen}
        user={selectedUser}
        onClose={() => {
          setViewOpen(false);
          setSelectedUser(null);
        }}
      />

      {/* Edit Modal */}

      <EditUserModal
        open={editOpen}
        user={selectedUser}
        onClose={() => {
          setEditOpen(false);
          setSelectedUser(null);
        }}
        onSave={(updatedUser) => {
          console.log(updatedUser);

          setEditOpen(false);
          setSelectedUser(null);
        }}
      />

      {/* Delete Modal */}

      <DeleteUserModal
        open={deleteOpen}
        user={selectedUser}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedUser(null);
        }}
        onDelete={() => {
          console.log(selectedUser);

          setDeleteOpen(false);
          setSelectedUser(null);
        }}
      />

    </div>
  );
}

export default Users;