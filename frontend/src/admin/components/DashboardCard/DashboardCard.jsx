import {
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

function DashboardCard({
  title,
  value,
  change,
  icon: Icon,
  color = "#C9A227",
}) {
  const positive = change?.startsWith("+");

  return (
    <div className="group rounded-2xl bg-white p-6 shadow-sm border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Top */}
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
          style={{ backgroundColor: color }}
        >
          <Icon size={24} />
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-6 flex items-center gap-2">

        {positive ? (
          <FaArrowTrendUp className="text-green-600" />
        ) : (
          <FaArrowTrendDown className="text-red-500" />
        )}

        <span
          className={`text-sm font-semibold ${
            positive ? "text-green-600" : "text-red-500"
          }`}
        >
          {change}
        </span>

        <span className="text-sm text-gray-500">
          from last month
        </span>

      </div>

    </div>
  );
}

export default DashboardCard;