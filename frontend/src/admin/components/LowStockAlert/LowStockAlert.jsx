import { FaExclamationTriangle } from "react-icons/fa";
import { inventoryData } from "../../data/inventoryData";

function LowStockAlert() {
  const lowStockItems = inventoryData.filter(
    (item) =>
      item.status === "Low Stock" ||
      item.status === "Out of Stock"
  );

  return (
    <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">

          <FaExclamationTriangle
            size={22}
            className="text-red-600"
          />

        </div>

        <div>

          <h2 className="text-xl font-bold text-gray-900">
            Low Stock Alerts
          </h2>

          <p className="text-sm text-gray-500">
            Products that need restocking
          </p>

        </div>

      </div>

      {/* List */}

      <div className="space-y-4">

        {lowStockItems.length === 0 ? (

          <div className="rounded-xl bg-green-50 p-6 text-center">

            <h3 className="font-semibold text-green-700">
              🎉 All products are sufficiently stocked.
            </h3>

          </div>

        ) : (

          lowStockItems.map((item) => (

            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50"
            >

              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 rounded-xl object-cover"
                />

                <div>

                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    SKU : {item.sku}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="font-bold text-red-600">
                  {item.available} Left
                </p>

                <p className="text-xs text-gray-500">
                  Reorder at {item.reorderLevel}
                </p>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default LowStockAlert;