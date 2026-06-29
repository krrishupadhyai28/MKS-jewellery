import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import ShopToolbar from "../../components/ShopToolbar/ShopToolbar";
import ShopProducts from "../../components/ShopProducts/ShopProducts";

function Shop() {

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [sortBy, setSortBy] = useState("Newest");

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

      <ShopToolbar

        search={search}
        setSearch={setSearch}

        category={category}
        setCategory={setCategory}

        sortBy={sortBy}
        setSortBy={setSortBy}

      />

      <ShopProducts

        search={search}
        category={category}
        sortBy={sortBy}

      />

    </MainLayout>
  );
}

export default Shop;