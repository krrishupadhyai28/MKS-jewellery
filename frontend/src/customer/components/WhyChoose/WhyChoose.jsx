import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiAward,
} from "react-icons/fi";

const features = [
  {
    icon: <FiTruck size={32} />,
    title: "Free Shipping",
    description: "On orders above ₹999",
  },
  {
    icon: <FiAward size={32} />,
    title: "Premium Quality",
    description: "Beautiful artificial jewellery",
  },
  {
    icon: <FiShield size={32} />,
    title: "Secure Payment",
    description: "100% safe transactions",
  },
  {
    icon: <FiRefreshCw size={32} />,
    title: "Easy Returns",
    description: "Hassle-free return policy",
  },
];

function WhyChoose() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Why Choose MK Jewellers
        </h2>

        <p className="text-center text-gray-500 mt-3 mb-14">
          Luxury designs with trusted service.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border p-8 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >
              <div className="text-[#C9A227] flex justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold">
                {item.title}
              </h3>

              <p className="text-gray-500 mt-3">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChoose;