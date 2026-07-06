import ProductRow from "../ProductRow/ProductRow";
import { productsData } from "../../data/productsData";

function ProductTable({ onView, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-[#F8F6F2]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Image
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Product
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Stock
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {productsData.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ProductTable;