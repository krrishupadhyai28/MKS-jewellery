import MainLayout from "../../layouts/MainLayout";

function About() {
  return (
    <MainLayout>
      <section className="bg-[#FAF7F2] py-20">

        <div className="max-w-7xl mx-auto px-6">

          <span className="uppercase tracking-[5px] text-[#C9A227] font-semibold">
            About Us
          </span>

          <h1 className="mt-4 text-5xl font-bold text-[#111111]">
            Crafting Timeless Elegance
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-600">
            MK Jewellers offers premium artificial jewellery that
            combines elegance, affordability, and modern fashion.
            Our collections are designed to make every occasion
            special with beautiful craftsmanship and high-quality
            materials.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            <div className="rounded-3xl bg-white p-8 shadow">

              <h2 className="text-2xl font-bold">
                Premium Quality
              </h2>

              <p className="mt-4 text-gray-600">
                Carefully designed jewellery with premium finishing.
              </p>

            </div>

            <div className="rounded-3xl bg-white p-8 shadow">

              <h2 className="text-2xl font-bold">
                Modern Designs
              </h2>

              <p className="mt-4 text-gray-600">
                Trendy collections inspired by luxury brands.
              </p>

            </div>

            <div className="rounded-3xl bg-white p-8 shadow">

              <h2 className="text-2xl font-bold">
                Trusted Service
              </h2>

              <p className="mt-4 text-gray-600">
                Fast delivery and customer-first support.
              </p>

            </div>

          </div>

        </div>

      </section>
    </MainLayout>
  );
}

export default About;