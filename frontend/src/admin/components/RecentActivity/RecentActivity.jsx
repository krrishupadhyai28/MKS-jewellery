import {
  FaBagShopping, // Corrected import name
  FaGem,
  FaUsers,
  FaWarehouse,
  FaTruck,
} from "react-icons/fa6";

const activities = [
  {
    id: 1,
    icon: FaBagShopping, // Updated to use the correct imported component
    title: "New Order Received",
    description: "Order #ORD1025 placed successfully.",
    time: "5 min ago",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    icon: FaGem,
    title: "Product Added",
    description: "Diamond Ring added to catalogue.",
    time: "20 min ago",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 3,
    icon: FaUsers,
    title: "New Customer",
    description: "A new customer registered.",
    time: "45 min ago",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 4,
    icon: FaWarehouse,
    title: "Inventory Updated",
    description: "Stock updated for Gold Necklace.",
    time: "1 hour ago",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 5,
    icon: FaTruck,
    title: "Order Shipped",
    description: "Order #ORD1018 has been shipped.",
    time: "2 hours ago",
    color: "bg-red-100 text-red-600",
  },
];

function RecentActivity() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Activity
          </h2>
          <p className="text-sm text-gray-500">
            Latest updates from your store
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${activity.color}`}
              >
                <Icon size={18} />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {activity.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {activity.description}
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default RecentActivity;