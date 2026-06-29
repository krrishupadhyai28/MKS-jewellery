import { Link } from "react-router-dom";

function OffersBanner() {
  return (
    <section className="bg-[#111111] py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="rounded-3xl bg-gradient-to-r from-[#111111] via-[#2B2B2B] to-[#111111] px-10 py-20 text-center shadow-2xl">

          <span className="text-sm font-semibold uppercase tracking-[5px] text-[#C9A227]">
            Limited Time Offer
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-6xl">
            Flat 40% OFF
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Discover premium jewellery crafted for every occasion.
            Shop today and enjoy exclusive festive discounts with
            free shipping across India.
          </p>

          <Link
            to="/shop"
            className="mt-10 inline-block rounded-xl bg-[#C9A227] px-10 py-4 font-semibold text-white transition hover:bg-white hover:text-[#111111]"
          >
            Shop Now
          </Link>

        </div>

      </div>
    </section>
  );
}

export default OffersBanner;