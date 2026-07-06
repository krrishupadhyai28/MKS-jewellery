import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      review:
        "Absolutely loved the jewellery quality. It looks premium and elegant. Highly recommended!",
    },
    {
      id: 2,
      name: "Ananya Gupta",
      image: "https://i.pravatar.cc/150?img=32",
      rating: 5,
      review:
        "Beautiful designs and quick delivery. The necklace looked exactly like the pictures.",
    },
    {
      id: 3,
      name: "Sneha Verma",
      image: "https://i.pravatar.cc/150?img=47",
      rating: 5,
      review:
        "Amazing customer service and premium finish. I'll definitely shop again.",
    },
  ];

  return (
    <section className="bg-[#FAF7F2] py-20">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold">
            What Our Customers Say
          </h2>

          <p className="mt-3 text-gray-500">
            Thousands of happy customers trust our jewellery.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {reviews.map((review, index) => (

            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.2,
                duration: 0.5,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
              className="rounded-3xl bg-white p-8 shadow-lg transition-all hover:shadow-2xl"
            >

              <div className="flex items-center gap-4">

                <img
                  loading="lazy"
                  decoding="async"
                  src={review.image}
                  alt={review.name}
                  className="h-16 w-16 rounded-full object-cover"
                />

                <div>

                  <h3 className="text-xl font-semibold">
                    {review.name}
                  </h3>

                  <div className="mt-1 flex">

                    {[...Array(review.rating)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}

                  </div>

                </div>

              </div>

              <p className="mt-6 leading-7 text-gray-600">
                "{review.review}"
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;