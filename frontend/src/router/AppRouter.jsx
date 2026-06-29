import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Product from "../pages/Product/Product";
import Cart from "../pages/Cart/Cart";
import Wishlist from "../pages/Wishlist/Wishlist";
import Checkout from "../pages/Checkout/Checkout";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import Profile from "../pages/Profile/Profile";
import MyOrders from "../pages/MyOrders/MyOrders";
import SavedAddress from "../pages/SavedAddress/SavedAddress";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Collections from "../pages/Collections/Collections";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Shop */}
        <Route path="/shop" element={<Shop />} />

        {/* Product Details */}
        <Route path="/product/:id" element={<Product />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* Wishlist */}
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Checkout */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Order Success */}
        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* My Orders */}
        <Route
          path="/orders"
          element={<MyOrders />}
        />

        {/* Saved Address */}
        <Route
          path="/saved-address"
          element={<SavedAddress />}
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Other Pages */}
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* 404 Page - Always Keep Last */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;