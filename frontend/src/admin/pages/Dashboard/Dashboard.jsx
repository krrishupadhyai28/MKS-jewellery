import DashboardCard from "../../components/DashboardCard/DashboardCard";
import SalesChart from "../../components/SalesChart/SalesChart";
import RecentOrders from "../../components/RecentOrders/RecentOrders";
import TopProducts from "../../components/TopProducts/TopProducts";
import LowStock from "../../components/LowStock/LowStock";
import RecentActivity from "../../components/RecentActivity/RecentActivity";

import { dashboardStats } from "../../data/dashboardData";

function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Welcome back, Admin 👋 Here's an overview of your jewellery store.
          </p>
        </div>

        <div className="rounded-xl bg-white px-5 py-3 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">
            Today's Date
          </p>

          <h3 className="font-semibold text-gray-800">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h3>
        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {dashboardStats.map((item) => (
          <DashboardCard
            key={item.title}
            title={item.title}
            value={item.value}
            change={item.change}
            icon={item.icon}
            color={item.color}
          />
        ))}

      </div>

      {/* Sales Chart + Activity */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <SalesChart />
        </div>

        <RecentActivity />

      </div>

      {/* Orders + Products */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <RecentOrders />

        <TopProducts />

      </div>

      {/* Low Stock */}
      <LowStock />

    </div>
  );
}

export default Dashboard;