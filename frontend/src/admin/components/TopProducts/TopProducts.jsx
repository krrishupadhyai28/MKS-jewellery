import {
  FaGem,
  FaArrowTrendUp,
} from "react-icons/fa6";

const products = [
  {
    id: 1,
    name: "Diamond Ring",
    category: "Rings",
    sales: 152,
    revenue: "₹3.8L",
  },
  {
    id: 2,
    name: "Gold Necklace",
    category: "Necklaces",
    sales: 118,
    revenue: "₹5.2L",
  },
  {
    id: 3,
    name: "Silver Bracelet",
    category: "Bracelets",
    sales: 95,
    revenue: "₹1.4L",
  },
  {
    id: 4,
    name: "Pearl Earrings",
    category: "Earrings",
    sales: 84,
    revenue: "₹1.1L",
  },
];

function TopProducts() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Top Selling Products
          </h2>

          <p className="text-sm text-gray-500">
            Best performing jewellery
          </p>
        </div>

        <button className="rounded-lg border border-[#C9A227] px-4 py-2 text-sm font-medium text-[#C9A227] transition hover:bg-[#C9A227] hover:text-white">
          View All
        </button>

      </div>

      <div className="space-y-5">

        {products.map((product) => (

          <div
            key={product.id}
            className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9A227]/10">
                <FaGem
                  className="text-[#C9A227]"
                  size={20}
                />
              </div>

              <div>

                <h3 className="font-semibold text-gray-900">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {product.category}
                </p>

              </div>

            </div>

            <div className="text-right">

              <p className="font-bold text-gray-900">
                {product.sales} Sales
              </p>

              <div className="mt-1 flex items-center justify-end gap-2">

                <FaArrowTrendUp
                  className="text-green-500"
                  size={12}
                />

                <span className="text-sm text-green-600">
                  {product.revenue}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TopProducts;