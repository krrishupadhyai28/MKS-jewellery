import { Routes, Route, Navigate } from "react-router-dom";

// Authentication
import AdminLogin from "../pages/Login/AdminLogin";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import OTPVerification from "../pages/OTPVerification/OTPVerification";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

// Layout
import AdminLayout from "../layouts/AdminLayout";

// Protected Route
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

// Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import Products from "../pages/Products/Products";
import Orders from "../pages/Orders/Orders";
import Users from "../pages/Users/Users";
import Analytics from "../pages/Analytics/Analytics";
import Inventory from "../pages/Inventory/Inventory";
import Categories from "../pages/Categories/Categories";
import Coupons from "../pages/Coupons/Coupons";
import Reports from "../pages/Reports/Reports";

// Settings Pages
import Settings from "../pages/Settings/Settings";
import Profile from "../pages/Settings/Profile";
import ChangePassword from "../pages/Settings/ChangePassword";

function AdminRoutes() {
  return (
    <Routes>
      {/* Redirect */}
      <Route path="/" element={<Navigate to="login" replace />} />

      {/* Authentication */}
      <Route path="login" element={<AdminLogin />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="verify-otp" element={<OTPVerification />} />
      <Route path="reset-password" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="categories" element={<Categories />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="reports" element={<Reports />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />
          <Route path="settings/profile" element={<Profile />} />
          <Route
            path="settings/change-password"
            element={<ChangePassword />}
          />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
}

export default AdminRoutes;