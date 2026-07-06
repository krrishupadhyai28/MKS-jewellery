import { FaTimes } from "react-icons/fa";

const stockHistory = [
  {
    id: 1,
    date: "06 Jul 2026",
    action: "Stock Added",
    quantity: "+20",
    stock: 120,
    user: "Admin",
    reason: "New Purchase",
  },
  {
    id: 2,
    date: "05 Jul 2026",
    action: "Stock Removed",
    quantity: "-5",
    stock: 100,
    user: "Admin",
    reason: "Customer Orders",
  },
  {
    id: 3,
    date: "03 Jul 2026",
    action: "Stock Added",
    quantity: "+50",
    stock: 105,
    user: "Manager",
    reason: "Supplier Delivery",
  },
  {
    id: 4,
    date: "01 Jul 2026",
    action: "Stock Removed",
    quantity: "-10",
    stock: 55,
    user: "Admin",
    reason: "Damaged Items",
  },
];

function StockHistoryModal({
  open,
  onClose,
  item,
}) {
  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-6xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-5">

          <div>

            <h2 className="text-2xl font-bold">
              Stock History
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {item.name}
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <FaTimes />
          </button>

        </div>

        {/* Table */}

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-[#F8F6F2]">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Action
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Quantity
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Stock
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Reason
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Updated By
                </th>

              </tr>

            </thead>

            <tbody>

              {stockHistory.map((history) => (

                <tr
                  key={history.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-6 py-4">
                    {history.date}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    {history.action}
                  </td>

                  <td
                    className={`px-6 py-4 text-center font-bold ${
                      history.quantity.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {history.quantity}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {history.stock}
                  </td>

                  <td className="px-6 py-4">
                    {history.reason}
                  </td>

                  <td className="px-6 py-4">
                    {history.user}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Footer */}

        <div className="flex justify-end border-t px-8 py-5">

          <button
            onClick={onClose}
            className="rounded-xl bg-[#C9A227] px-6 py-3 font-semibold text-white transition hover:bg-[#b08d1f]"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default StockHistoryModal;