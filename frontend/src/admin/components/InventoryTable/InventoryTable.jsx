import InventoryRow from "../InventoryRow/InventoryRow";
import { inventoryData } from "../../data/inventoryData";

function InventoryTable({
  onView,
  onUpdate,
  onHistory,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-[#F8F6F2]">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                SKU
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Stock
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Reserved
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Available
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Reorder Level
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {inventoryData.map((item) => (

              <InventoryRow
                key={item.id}
                item={item}
                onView={onView}
                onUpdate={onUpdate}
                onHistory={onHistory}
              />

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default InventoryTable;