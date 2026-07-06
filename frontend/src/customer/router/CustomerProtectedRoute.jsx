import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCustomerAuth } from "../context/CustomerAuthContext";

function CustomerProtectedRoute() {
  // Updated destructuring to include 'role'
  const { loading, isAuthenticated, role } = useCustomerAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-lg font-semibold text-gray-600">
          Loading...
        </h2>
      </div>
    );
  }

  // Updated condition to check both authentication and the "customer" role
  if (!isAuthenticated || role !== "customer") {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}

export default CustomerProtectedRoute;