import { motion } from "framer-motion";
import products from "../../data/products";
import ProductCard from "../ProductCard/ProductCard";

function FeaturedProducts() {
  return (
    <section className="bg-[#F8F6F2] py-20">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold">
            Featured Collection
          </h2>

          <p className="mt-3 mb-12 text-gray-500">
            Handpicked premium jewellery for every occasion.
          </p>
        </motion.div>

        {/* Products */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{
            staggerChildren: 0.15,
          }}
          variants={{
            hidden: {},
            show: {},
          }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 40,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

      </div>

    </section>
  );
}

export default FeaturedProducts;