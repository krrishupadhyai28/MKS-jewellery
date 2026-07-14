import CategoryRow from "../CategoryRow/CategoryRow";

function CategoryTable({
  categories,
  loading,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-[#F8F6F2]">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Description
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Created
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {/* Loading, Empty, and Data Render Logic */}
            {loading ? (
              <tr>
                <td
                  colSpan="4"
                  className="py-12 text-center text-gray-500"
                >
                  Loading categories...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="py-12 text-center text-gray-500"
                >
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <CategoryRow
                  key={category.category_id}
                  category={category}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CategoryTable;