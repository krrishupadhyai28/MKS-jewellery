function Newsletter() {
  return (
    <section className="bg-[#111111] py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <span className="text-[#C9A227] uppercase tracking-[4px] text-sm">
          Stay Updated
        </span>

        <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-white">
          Subscribe to Our Newsletter
        </h2>

        <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
          Be the first to know about our latest jewellery collections,
          exclusive offers and festive discounts.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-96 rounded-xl border border-gray-700 bg-white px-5 py-4 outline-none"
          />

          <button className="rounded-xl bg-[#C9A227] px-8 py-4 font-semibold text-white transition hover:bg-[#b38d1e]">
            Subscribe
          </button>

        </div>

      </div>
    </section>
  );
}

export default Newsletter;