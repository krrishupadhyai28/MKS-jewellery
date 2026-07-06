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
    subtitle: "Orders above ₹999",
  },
  {
    icon: <FiAward size={32} />,
    title: "Premium Quality",
    subtitle: "Elegant Artificial Jewellery",
  },
  {
    icon: <FiShield size={32} />,
    title: "Secure Payment",
    subtitle: "100% Safe Checkout",
  },
  {
    icon: <FiRefreshCw size={32} />,
    title: "Easy Returns",
    subtitle: "Hassle-Free Support",
  },
];

function TrustStrip() {
  return (
    <section className="bg-white border-y border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 py-10">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FAF7F2] text-[#C9A227]">
                {item.icon}
              </div>

              <div>
                <h3 className="font-semibold text-[#111111]">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default TrustStrip;