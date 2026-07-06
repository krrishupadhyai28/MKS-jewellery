import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { monthlySales } from "../../data/analyticsData";

function RevenueChart() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-gray-900">
            Revenue Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Monthly sales performance
          </p>

        </div>

      </div>

      {/* Chart */}

      <div className="h-96">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={monthlySales}>

            <defs>

              <linearGradient
                id="salesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#C9A227"
                  stopOpacity={0.4}
                />

                <stop
                  offset="95%"
                  stopColor="#C9A227"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#C9A227"
              strokeWidth={3}
              fill="url(#salesGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default RevenueChart;