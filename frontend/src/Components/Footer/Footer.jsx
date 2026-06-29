import { FiInstagram, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-[#111111] text-white">

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}

        <div>
          <h2 className="text-4xl font-bold logo-font">
            MK
          </h2>

          <p className="tracking-[6px] uppercase text-sm text-gray-400">
            Jewellers
          </p>

          <p className="mt-6 text-gray-400 leading-7">
            Premium Artificial Jewellery crafted for every occasion.
          </p>
        </div>

        {/* Quick Links */}

        <div>

          <h3 className="text-xl font-semibold mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li>Home</li>

            <li>Shop</li>

            <li>Collections</li>

            <li>Contact</li>

          </ul>

        </div>

        {/* Customer Care */}

        <div>

          <h3 className="text-xl font-semibold mb-5">
            Customer Care
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li>Shipping</li>

            <li>Returns</li>

            <li>Privacy Policy</li>

            <li>Terms & Conditions</li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="text-xl font-semibold mb-5">
            Contact
          </h3>

          <div className="space-y-4 text-gray-400">

            <div className="flex gap-3">
              <FiPhone />
              <span>+91 XXXXX XXXXX</span>
            </div>

            <div className="flex gap-3">
              <FiMail />
              <span>mkjewellers@email.com</span>
            </div>

            <div className="flex gap-3">
              <FiInstagram />
              <span>@_mk_jewellers_1111</span>
            </div>

            <div className="flex gap-3">
              <FiMapPin />
              <span>India</span>
            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between text-sm text-gray-500">

          <p>
            © 2026 MK Jewellers. All Rights Reserved.
          </p>

          <p>
            Designed with ❤️ by MK
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;