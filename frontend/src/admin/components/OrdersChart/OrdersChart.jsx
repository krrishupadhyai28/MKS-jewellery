import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const ordersData = [
  {
    month: "Jan",
    orders: 120,
  },
  {
    month: "Feb",
    orders: 160,
  },
  {
    month: "Mar",
    orders: 210,
  },
  {
    month: "Apr",
    orders: 260,
  },
  {
    month: "May",
    orders: 310,
  },
  {
    month: "Jun",
    orders: 420,
  },
];

function OrdersChart() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-gray-900">
          Monthly Orders
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Order growth over the last 6 months
        </p>

      </div>

      {/* Chart */}

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={ordersData}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="orders"
              fill="#C9A227"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default OrdersChart;