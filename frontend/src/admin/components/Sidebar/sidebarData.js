import {
  FaTachometerAlt,
  FaGem,
  FaShoppingBag,
  FaUsers,
  FaTags,
  FaWarehouse,
  FaTicketAlt,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

const sidebarData = [
  {
    title: "Dashboard",
    icon: FaTachometerAlt,
    path: "/admin/dashboard",
  },
  {
    title: "Products",
    icon: FaGem,
    path: "/admin/products",
  },
  {
    title: "Orders",
    icon: FaShoppingBag,
    path: "/admin/orders",
  },
  {
    title: "Customers",
    icon: FaUsers,
    path: "/admin/users",
  },
  {
    title: "Categories",
    icon: FaTags,
    path: "/admin/categories",
  },
  {
    title: "Inventory",
    icon: FaWarehouse,
    path: "/admin/inventory",
  },
  {
    title: "Coupons",
    icon: FaTicketAlt,
    path: "/admin/coupons",
  },
  {
    title: "Reports",
    icon: FaChartBar,
    path: "/admin/reports",
  },
  {
    title: "Settings",
    icon: FaCog,
    path: "/admin/settings",
  },
];

export default sidebarData;