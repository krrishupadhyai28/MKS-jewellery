import MainLayout from "../../layouts/MainLayout";

function Collections() {
  return (
    <MainLayout>
      <section className="min-h-screen bg-[#FAF7F2] py-20">
        <div className="max-w-7xl mx-auto px-6">

          <span className="uppercase tracking-[5px] text-[#C9A227] font-semibold">
            Collections
          </span>

          <h1 className="mt-4 text-5xl font-bold">
            Explore Our Collections
          </h1>

          <p className="mt-6 max-w-2xl text-gray-600 text-lg">
            Browse elegant necklace sets, rings, earrings,
            bangles and premium jewellery collections.
          </p>

        </div>
      </section>
    </MainLayout>
  );
}

export default Collections;