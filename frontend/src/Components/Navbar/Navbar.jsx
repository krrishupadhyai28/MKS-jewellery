import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiMenu,
  FiX,
} from "react-icons/fi";
import SearchModal from "../SearchModal/SearchModal";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Collections", path: "/collections" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">

        <div className="max-w-[1400px] mx-auto h-24 px-6 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="select-none">
            <h1 className="logo-font text-4xl font-bold tracking-widest text-[#111111]">
              MK
            </h1>

            <p className="text-[10px] tracking-[7px] uppercase text-gray-500">
              Jewellers
            </p>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-10">

            {navLinks.map((item) => (
              <li key={item.name}>

                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative group text-sm font-medium tracking-wide transition-all duration-300 ${
                      isActive
                        ? "text-[#C9A227]"
                        : "text-gray-700 hover:text-[#C9A227]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}

                      <span
                        className={`absolute left-0 -bottom-2 h-0.5 rounded-full bg-[#C9A227] transition-all duration-300 ${
                          isActive
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </>
                  )}

                </NavLink>

              </li>
            ))}

          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F8F6F2] hover:text-[#C9A227] transition hover:scale-110"
            >
              <FiSearch size={20} />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F8F6F2] hover:text-[#C9A227] transition hover:scale-110"
            >
              <FiHeart size={20} />

              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C9A227] text-[10px] font-bold text-white">
                {wishlist.length}
              </span>

            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F8F6F2] hover:text-[#C9A227] transition hover:scale-110"
            >
              <FiShoppingBag size={20} />

              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#111111] text-[10px] font-bold text-white">
                {cart.length}
              </span>

            </Link>

            {/* Login */}
            <Link
              to="/login"
              className="hidden lg:flex items-center rounded-xl border border-[#C9A227] px-5 py-2 text-sm font-medium transition hover:bg-[#C9A227] hover:text-white"
            >
              Login
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F8F6F2] hover:text-[#C9A227] transition"
            >
              <FiMenu size={24} />
            </button>

          </div>

        </div>

      </nav>
            {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden">

          {/* Overlay */}
          <div
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/40"
          ></div>

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl p-6">

            {/* Header */}
            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-3xl font-bold text-[#111111]">
                  MK
                </h2>

                <p className="text-xs tracking-[6px] uppercase text-gray-500">
                  Jewellers
                </p>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-full p-2 hover:bg-gray-100 transition"
              >
                <FiX size={24} />
              </button>

            </div>

            {/* Menu */}
            <div className="mt-10 flex flex-col gap-6">

              {navLinks.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-medium transition ${
                      isActive
                        ? "text-[#C9A227]"
                        : "text-gray-700 hover:text-[#C9A227]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <hr className="my-2" />

              <NavLink
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium transition ${
                    isActive
                      ? "text-[#C9A227]"
                      : "text-gray-700 hover:text-[#C9A227]"
                  }`
                }
              >
                ❤️ Wishlist
              </NavLink>

              <NavLink
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium transition ${
                    isActive
                      ? "text-[#C9A227]"
                      : "text-gray-700 hover:text-[#C9A227]"
                  }`
                }
              >
                🛒 Cart
              </NavLink>

              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-4 rounded-xl bg-[#111111] py-3 text-center font-medium text-white transition hover:bg-[#C9A227]"
              >
                Login
              </NavLink>

            </div>

          </div>

        </div>
      )}

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

    </>
  );
}

export default Navbar;