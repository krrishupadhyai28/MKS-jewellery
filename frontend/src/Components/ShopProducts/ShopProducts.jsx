import { useState } from "react";
import products from "../../data/products";
import ProductCard from "../ProductCard/ProductCard";

function ShopProducts({ search, category, sortBy }) {
  const [visibleProducts, setVisibleProducts] = useState(8);

  // Search + Category Filter
  let filteredProducts = products.filter((product) => {
    const value = search.toLowerCase();
  
    const matchesSearch =
      product.name.toLowerCase().includes(value) ||
      product.category.toLowerCase().includes(value);

    const matchesCategory =
      category === "All" ||
    product.category === category;
  
    return matchesSearch && matchesCategory;
  });

  // Sorting
  switch (sortBy) {
    case "Price Low → High":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;

    case "Price High → Low":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;

    case "Top Rated":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;

    default:
      break;
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">

          <div>
            <h2 className="text-3xl font-bold text-[#111111]">
              All Products
            </h2>

            <p className="mt-2 text-gray-500">
              {filteredProducts.length} Products Found
            </p>

          </div>

        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">

            <h3 className="text-3xl font-bold">
              No Products Found
            </h3>

            <p className="mt-4 text-gray-500">
              Try another search or category.
            </p>

          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {filteredProducts
                .slice(0, visibleProducts)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}

            </div>

            {/* Load More */}
            {visibleProducts < filteredProducts.length && (
              <div className="mt-12 flex justify-center">

                <button
                  onClick={() =>
                    setVisibleProducts((prev) => prev + 8)
                  }
                  className="rounded-xl bg-[#111111] px-8 py-4 font-semibold text-white transition hover:bg-[#C9A227]"
                >
                  Load More
                </button>

              </div>
            )}

          </>
        )}

      </div>
    </section>
  );
}

export default ShopProducts;