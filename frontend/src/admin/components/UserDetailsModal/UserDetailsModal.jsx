import { FaTimes } from "react-icons/fa";

function UserDetailsModal({
  open,
  onClose,
  user,
}) {
  if (!open || !user) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "VIP":
        return "bg-purple-100 text-purple-700";

      case "Blocked":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-5">

          <div>

            <h2 className="text-2xl font-bold">
              Customer Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Customer ID : #{user.id}
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}

        <div className="grid gap-8 p-8 lg:grid-cols-3">

          {/* Left */}

          <div className="rounded-2xl border p-6 text-center">

            <img
              src={user.avatar}
              alt={user.name}
              className="mx-auto h-32 w-32 rounded-full object-cover"
            />

            <h3 className="mt-5 text-2xl font-bold">
              {user.name}
            </h3>

            <span
              className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                user.status
              )}`}
            >
              {user.status}
            </span>

          </div>

          {/* Right */}

          <div className="space-y-6 lg:col-span-2">

            {/* Personal */}

            <div className="rounded-2xl border p-6">

              <h3 className="mb-5 text-xl font-semibold">
                Personal Information
              </h3>

              <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <p className="text-sm text-gray-500">
                    Full Name
                  </p>

                  <h4 className="font-semibold">
                    {user.name}
                  </h4>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <h4 className="font-semibold">
                    {user.email}
                  </h4>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Phone
                  </p>

                  <h4 className="font-semibold">
                    {user.phone}
                  </h4>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Joined
                  </p>

                  <h4 className="font-semibold">
                    {user.joined}
                  </h4>

                </div>

              </div>

            </div>

            {/* Statistics */}

            <div className="grid gap-5 md:grid-cols-3">

              <div className="rounded-2xl border bg-gray-50 p-5 text-center">

                <h4 className="text-3xl font-bold text-[#C9A227]">
                  {user.orders}
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Total Orders
                </p>

              </div>

              <div className="rounded-2xl border bg-gray-50 p-5 text-center">

                <h4 className="text-3xl font-bold text-[#C9A227]">
                  ₹{user.totalSpent.toLocaleString("en-IN")}
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Total Spent
                </p>

              </div>

              <div className="rounded-2xl border bg-gray-50 p-5 text-center">

                <h4 className="text-3xl font-bold text-[#C9A227]">
                  {user.status}
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Account Status
                </p>

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

export default UserDetailsModal;