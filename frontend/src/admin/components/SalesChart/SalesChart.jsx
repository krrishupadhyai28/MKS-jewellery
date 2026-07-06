import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 42000 },
  { month: "Feb", sales: 52000 },
  { month: "Mar", sales: 61000 },
  { month: "Apr", sales: 58000 },
  { month: "May", sales: 72000 },
  { month: "Jun", sales: 85000 },
  { month: "Jul", sales: 94000 },
  { month: "Aug", sales: 105000 },
  { month: "Sep", sales: 98000 },
  { month: "Oct", sales: 112000 },
  { month: "Nov", sales: 121000 },
  { month: "Dec", sales: 135000 },
];

function SalesChart() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Sales Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Monthly Revenue Performance
          </p>
        </div>

        <button className="rounded-lg border border-[#C9A227] px-4 py-2 text-sm font-medium text-[#C9A227] hover:bg-[#C9A227] hover:text-white transition">
          This Year
        </button>
      </div>

      <div className="h-[340px]">

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData}>

            <defs>
              <linearGradient id="salesColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C9A227" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#C9A227" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              tick={{ fontSize: 12 }}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#C9A227"
              strokeWidth={3}
              fill="url(#salesColor)"
            />

          </AreaChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default SalesChart;