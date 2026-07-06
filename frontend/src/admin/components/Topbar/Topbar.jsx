import {
  FaSearch,
  FaBell,
  FaMoon,
  FaUserCircle,
} from "react-icons/fa";

function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8 shadow-sm">

      {/* Search */}
      <div className="relative w-96">

        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-[#C9A227]"
        />

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Dark Mode */}
        <button className="rounded-full p-3 transition hover:bg-gray-100">
          <FaMoon size={18} />
        </button>

        {/* Notification */}
        <button className="relative rounded-full p-3 transition hover:bg-gray-100">

          <FaBell size={18} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">

          <FaUserCircle
            size={40}
            className="text-[#C9A227]"
          />

          <div>

            <h3 className="font-semibold">
              Admin
            </h3>

            <p className="text-sm text-gray-500">
              Super Admin
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;