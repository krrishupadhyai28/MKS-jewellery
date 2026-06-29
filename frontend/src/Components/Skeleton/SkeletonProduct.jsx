function SkeletonProduct() {
  return (
    <section className="bg-[#FAF7F2] py-10 lg:py-20 animate-pulse">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16">

          <div className="h-[650px] rounded-3xl bg-gray-200"></div>

          <div>

            <div className="h-6 w-32 rounded bg-gray-200"></div>

            <div className="mt-6 h-12 w-96 rounded bg-gray-200"></div>

            <div className="mt-8 h-10 w-48 rounded bg-gray-200"></div>

            <div className="mt-8 h-32 rounded bg-gray-200"></div>

            <div className="mt-8 h-12 w-48 rounded bg-gray-200"></div>

            <div className="mt-10 h-14 w-full rounded-xl bg-gray-200"></div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default SkeletonProduct;