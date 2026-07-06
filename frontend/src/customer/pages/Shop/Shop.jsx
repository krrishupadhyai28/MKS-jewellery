import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // <-- Integrated Step 1

import MainLayout from "../../layouts/MainLayout";
import ShopToolbar from "../../components/ShopToolbar/ShopToolbar";
import ShopProducts from "../../components/ShopProducts/ShopProducts";

function Shop() {
  const location = useLocation(); // <-- Integrated Step 2

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  // Sync Category state with URL query parameter on mount or URL change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");

    if (categoryParam) {
      // Slug text ko Title Case me convert karega (e.g., 'rings' -> 'Rings')
      setCategory(
        categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)
      );
    } else {
      setCategory("All");
    }
  }, [location.search]);

  return (
    <MainLayout>
      {/* Hero */}
      <section className="bg-[#FAF7F2] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <span className="uppercase tracking-[5px] text-sm font-semibold text-[#C9A227]">
            Shop Collection
          </span>
          <h1 className="mt-4 text-5xl font-bold text-[#111111]">
            Discover Premium Jewellery
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Browse our latest collection of premium artificial jewellery.
          </p>
        </div>
      </section>

      {/* Synchronized Toolbar (Buttons inside this will update the state directly) */}
      <ShopToolbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Inside ShopProducts component, make sure you filter using the incoming category prop */}
      <ShopProducts
        search={search}
        category={category}
        sortBy={sortBy}
      />
    </MainLayout>
  );
}

export default Shop;