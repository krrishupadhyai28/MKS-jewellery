import { motion } from "framer-motion";
import heroBanner from "../../../assets/banners/hero-banner.jpg";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2]">

      {/* Decorative Background */}
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#C9A227]/10 blur-3xl"></div>
      <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-[#111111]/5 blur-3xl"></div>

      <div className="max-w-[1400px] mx-auto px-6 py-24">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#C9A227]/10 px-5 py-2 text-sm font-semibold text-[#C9A227]"
            >
              ✨ New Collection 2026
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hero-title mt-8 text-5xl font-bold leading-tight text-[#111111] lg:text-7xl"
            >
              Timeless
              <br />
              Elegance for
              <span className="text-[#C9A227]">
                {" "}Every Occasion
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 max-w-xl text-lg leading-8 text-gray-600"
            >
              Discover premium artificial jewellery crafted with
              elegance, designed to elevate your everyday style.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-10 flex flex-wrap gap-5"
            >

              <button className="rounded-xl bg-[#111111] px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#C9A227]">
                Shop Collection
              </button>

              <button className="rounded-xl border-2 border-[#111111] px-8 py-4 font-semibold transition-all duration-300 hover:bg-[#111111] hover:text-white">
                Explore More
              </button>

            </motion.div>

            {/* Stats */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-14 flex gap-10"
            >

              <div>
                <h3 className="text-3xl font-bold text-[#111111]">
                  500+
                </h3>

                <p className="text-gray-500">
                  Happy Customers
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#111111]">
                  200+
                </h3>

                <p className="text-gray-500">
                  Premium Designs
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#111111]">
                  4.9★
                </h3>

                <p className="text-gray-500">
                  Customer Rating
                </p>
              </div>

            </motion.div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >

            {/* Floating Badge */}

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute left-0 top-8 rounded-2xl bg-white p-4 shadow-xl"
            >
              <p className="text-sm text-gray-500">
                Bestseller
              </p>

              <h4 className="font-bold text-[#111111]">
                Necklace Collection
              </h4>

            </motion.div>

            <motion.img
              loading="eager"
              fetchPriority="high"
              whileHover={{
                scale: 1.04,
              }}
              transition={{
                duration: 0.5,
              }}
              src={heroBanner}
              alt="MK Jewellers"
              className="w-full rounded-[40px] shadow-2xl"
            />

          </motion.div>

        </div>

      </div>

    </section>
  );
}

export default Hero;