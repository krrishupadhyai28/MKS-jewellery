import { topCategories } from "../../data/analyticsData";

function TopCategories() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-gray-900">
          Top Selling Categories
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Best performing jewellery categories
        </p>

      </div>

      {/* Categories */}

      <div className="space-y-5">

        {topCategories.map((item, index) => (

          <div
            key={item.category}
            className="space-y-2"
          >

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold text-gray-900">
                  {item.category}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.sales}
                </p>

              </div>

              <span className="text-sm font-bold text-[#C9A227]">
                #{index + 1}
              </span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-200">

              <div
                className="h-full rounded-full bg-[#C9A227]"
                style={{
                  width: `${90 - index * 18}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TopCategories;