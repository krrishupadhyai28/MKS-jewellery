import { Routes, Route } from "react-router-dom";

import CustomerRoutes from "./customer/router/CustomerRoutes";
import AdminRoutes from "./admin/routes/AdminRoutes";

import ScrollToTop from "./customer/components/ScrollToTopButton/ScrollToTop";
import ScrollToTopButton from "./customer/components/ScrollToTopButton/ScrollToTopButton";

function App() {
  return (
    <>
      {/* Automatically scroll to top on route change */}
      <ScrollToTop />

      {/* Floating scroll-to-top button */}
      <ScrollToTopButton />

      <Routes>
        {/* Customer Facing Routes */}
        <Route path="/*" element={<CustomerRoutes />} />
        
        {/* Admin Panel Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </>
  );
}

export default App;