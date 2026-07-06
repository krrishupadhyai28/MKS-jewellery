import {
  FaPlus,
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const actions = [
  {
    title: "Add Product",
    icon: FaPlus,
    link: "/admin/products",
    color: "bg-[#C9A227]",
  },
  {
    title: "Manage Orders",
    icon: FaClipboardList,
    link: "/admin/orders",
    color: "bg-blue-600",
  },
  {
    title: "Inventory",
    icon: FaBoxOpen,
    link: "/admin/inventory",
    color: "bg-green-600",
  },
  {
    title: "Customers",
    icon: FaUsers,
    link: "/admin/users",
    color: "bg-purple-600",
  },
];

function QuickActions() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold text-gray-900">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.link}
              className={`${action.color} flex flex-col items-center justify-center rounded-2xl p-6 text-white transition duration-300 hover:scale-105`}
            >
              <Icon size={30} />

              <span className="mt-3 text-center font-semibold">
                {action.title}
              </span>
            </Link>
          );
        })}

      </div>

    </div>
  );
}

export default QuickActions;