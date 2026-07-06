import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function Pagination() {
  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 md:flex-row">

      {/* Left */}
      <p className="text-sm text-gray-500">
        Showing
        <span className="mx-1 font-semibold text-gray-900">
          1
        </span>
        to
        <span className="mx-1 font-semibold text-gray-900">
          10
        </span>
        of
        <span className="mx-1 font-semibold text-gray-900">
          120
        </span>
        products
      </p>

      {/* Right */}
      <div className="flex items-center gap-2">

        {/* Previous */}
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 transition hover:bg-gray-100">
          <FaChevronLeft size={14} />
        </button>

        {/* Pages */}
        <button className="h-10 w-10 rounded-xl bg-[#C9A227] font-semibold text-white">
          1
        </button>

        <button className="h-10 w-10 rounded-xl border border-gray-300 transition hover:bg-gray-100">
          2
        </button>

        <button className="h-10 w-10 rounded-xl border border-gray-300 transition hover:bg-gray-100">
          3
        </button>

        <button className="h-10 w-10 rounded-xl border border-gray-300 transition hover:bg-gray-100">
          4
        </button>

        <span className="px-2 text-gray-500">
          ...
        </span>

        <button className="h-10 w-10 rounded-xl border border-gray-300 transition hover:bg-gray-100">
          12
        </button>

        {/* Next */}
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 transition hover:bg-gray-100">
          <FaChevronRight size={14} />
        </button>

      </div>

    </div>
  );
}

export default Pagination;