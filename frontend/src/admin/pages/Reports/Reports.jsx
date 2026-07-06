import { FaChartBar } from "react-icons/fa";

function Reports() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Reports
        </h1>

        <p className="mt-2 text-gray-500">
          View and analyze business reports.
        </p>
      </div>

      <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white shadow-sm">
        <div className="text-center">
          <FaChartBar className="mx-auto mb-4 text-6xl text-[#C9A227]" />

          <h2 className="text-xl font-semibold text-gray-800">
            Reports Module
          </h2>

          <p className="mt-2 text-gray-500">
            Reports and analytics will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Reports;