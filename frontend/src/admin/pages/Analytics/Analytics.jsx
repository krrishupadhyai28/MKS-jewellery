import AnalyticsCard from "../../components/AnalyticsCard/AnalyticsCard";
import RevenueChart from "../../components/RevenueChart/RevenueChart";
import OrdersChart from "../../components/OrdersChart/OrdersChart";
import TopCategories from "../../components/TopCategories/TopCategories";

import { analyticsCards } from "../../data/analyticsData";

function Analytics() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          Analytics
        </h1>

        <p className="mt-2 text-gray-500">
          Monitor your jewellery store performance, sales, customers and business growth.
        </p>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {analyticsCards.map((card) => (

          <AnalyticsCard
            key={card.title}
            title={card.title}
            value={card.value}
            change={card.change}
            color={card.color}
            icon={card.icon}
          />

        ))}

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">

          <RevenueChart />

        </div>

        <TopCategories />

      </div>

      {/* Bottom Charts */}

      <div className="grid grid-cols-1 gap-6">

        <OrdersChart />

      </div>

    </div>
  );
}

export default Analytics;