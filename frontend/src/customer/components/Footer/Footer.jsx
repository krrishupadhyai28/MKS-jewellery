import { Link } from "react-router-dom"; // <-- Integrated Route Links
import {
  FiInstagram,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand Section - Unified Logo Integration */}
        <div>
          <Link to="/" className="flex items-center gap-3 select-none mb-6">
            <img
              src="/mk-logo.png"
              alt="MK Jewellers"
              className="h-12 w-12 rounded-lg object-contain bg-white p-0.5"
            />
            <div>
              <h2 className="text-xl font-bold tracking-wide text-white">
                MK Jewellers
              </h2>
              <p className="text-[10px] uppercase tracking-[3px] text-gray-400">
                Premium Jewellery
              </p>
            </div>
          </Link>
          <p className="text-gray-400 leading-7">
            Premium Artificial Jewellery crafted for every occasion.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-5">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <Link 
                to="/" 
                className="text-gray-400 transition hover:text-[#C9A227]"
              >
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-gray-400 transition hover:text-[#C9A227]">
                Shop
              </Link>
            </li>
            
            <li>
              <Link to="/collections" className="text-gray-400 transition hover:text-[#C9A227]">
                Collections
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-400 transition hover:text-[#C9A227]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-xl font-semibold mb-5">
            Customer Care
          </h3>
          <ul className="space-y-3">
            <li>
              <Link to="/shipping" className="text-gray-400 transition hover:text-[#C9A227]">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/returns" className="text-gray-400 transition hover:text-[#C9A227]">
                Returns
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="text-gray-400 transition hover:text-[#C9A227]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-gray-400 transition hover:text-[#C9A227]">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info with working hyperlinks */}
        <div>
          <h3 className="text-xl font-semibold mb-5">
            Contact
          </h3>
          <div className="space-y-4">
            <a
              href="tel:+91XXXXXXXXXX"
              className="flex items-center gap-3 text-gray-400 transition hover:text-[#C9A227]"
            >
              <FiPhone className="shrink-0" />
              <span>+91 XXXXX XXXXX</span>
            </a>

            <a
              href="mailto:mkjewellers@email.com"
              className="flex items-center gap-3 text-gray-400 transition hover:text-[#C9A227]"
            >
              <FiMail className="shrink-0" />
              <span>mkjewellers@email.com</span>
            </a>

            <a
              href="https://www.instagram.com/_mk_jewellers_1111"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-400 transition hover:text-[#C9A227]"
            >
              <FiInstagram className="shrink-0" />
              <span>@_mk_jewellers_1111</span>
            </a>

            <a
              href="https://maps.google.com/?q=India"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-400 transition hover:text-[#C9A227]"
            >
              <FiMapPin className="shrink-0" />
              <span>India</span>
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Footer Sub-bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} MK Jewellers. All Rights Reserved.
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