const orders = [
  {
    id: "#ORD1025",
    customer: "Aarav Sharma",
    product: "Diamond Ring",
    amount: "₹24,999",
    status: "Completed",
    date: "07 Jul 2026",
  },
  {
    id: "#ORD1024",
    customer: "Priya Singh",
    product: "Gold Necklace",
    amount: "₹18,500",
    status: "Pending",
    date: "06 Jul 2026",
  },
  {
    id: "#ORD1023",
    customer: "Rohan Verma",
    product: "Silver Bracelet",
    amount: "₹5,800",
    status: "Completed",
    date: "06 Jul 2026",
  },
  {
    id: "#ORD1022",
    customer: "Sneha Gupta",
    product: "Pendant",
    amount: "₹3,999",
    status: "Cancelled",
    date: "05 Jul 2026",
  },
];

function RecentOrders() {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold">
            Recent Orders
          </h2>

          <p className="text-sm text-gray-500">
            Latest customer orders
          </p>
        </div>

        <button className="rounded-lg border border-[#C9A227] px-4 py-2 text-sm font-medium text-[#C9A227] hover:bg-[#C9A227] hover:text-white transition">
          View All
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left text-sm font-semibold">
                Order ID
              </th>

              <th className="py-3 text-left text-sm font-semibold">
                Customer
              </th>

              <th className="py-3 text-left text-sm font-semibold">
                Product
              </th>

              <th className="py-3 text-left text-sm font-semibold">
                Amount
              </th>

              <th className="py-3 text-left text-sm font-semibold">
                Status
              </th>

              <th className="py-3 text-left text-sm font-semibold">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="py-4 font-medium">
                  {order.id}
                </td>

                <td className="py-4">
                  {order.customer}
                </td>

                <td className="py-4">
                  {order.product}
                </td>

                <td className="py-4 font-semibold">
                  {order.amount}
                </td>

                <td className="py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                </td>

                <td className="py-4 text-gray-500">
                  {order.date}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentOrders;