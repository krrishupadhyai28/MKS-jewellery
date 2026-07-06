import OrderRow from "../OrderRow/OrderRow";
import { ordersData } from "../../data/ordersData";

function OrdersTable({
  onView,
  onStatus,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-[#F8F6F2]">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Order ID
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Payment
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Date
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {ordersData.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                onView={onView}
                onStatus={onStatus}
              />
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default OrdersTable;