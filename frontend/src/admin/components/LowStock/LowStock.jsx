import {
  FaTriangleExclamation,
  FaBoxOpen,
} from "react-icons/fa6";

const lowStockProducts = [
  {
    id: 1,
    name: "Diamond Ring",
    sku: "MK-DR-101",
    stock: 3,
  },
  {
    id: 2,
    name: "Gold Necklace",
    sku: "MK-GN-202",
    stock: 5,
  },
  {
    id: 3,
    name: "Silver Bracelet",
    sku: "MK-SB-303",
    stock: 2,
  },
  {
    id: 4,
    name: "Pearl Earrings",
    sku: "MK-PE-404",
    stock: 1,
  },
];

function LowStock() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Low Stock Products
          </h2>

          <p className="text-sm text-gray-500">
            Products that need restocking
          </p>
        </div>

        <FaTriangleExclamation
          size={24}
          className="text-red-500"
        />

      </div>

      {/* Product List */}
      <div className="space-y-4">

        {lowStockProducts.map((product) => (

          <div
            key={product.id}
            className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:bg-red-50"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">

                <FaBoxOpen
                  className="text-red-600"
                  size={20}
                />

              </div>

              <div>

                <h3 className="font-semibold">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {product.sku}
                </p>

              </div>

            </div>

            <div className="text-right">

              <p className="text-lg font-bold text-red-600">
                {product.stock}
              </p>

              <p className="text-xs text-gray-500">
                Items Left
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default LowStock;