import {
  FaShoppingCart,
  FaUserPlus,
  FaExclamationTriangle,
  FaMoneyBillWave,
} from "react-icons/fa";

export const notifications = [
  {
    id: 1,
    title: "New Order Received",
    message: "Order #ORD1025 has been placed.",
    time: "2 min ago",
    icon: FaShoppingCart,
    color: "blue",
  },
  {
    id: 2,
    title: "New Customer",
    message: "Ankit Kumar created an account.",
    time: "15 min ago",
    icon: FaUserPlus,
    color: "green",
  },
  {
    id: 3,
    title: "Low Stock Alert",
    message: "Diamond Ring stock is below 5.",
    time: "1 hour ago",
    icon: FaExclamationTriangle,
    color: "yellow",
  },
  {
    id: 4,
    title: "Payment Received",
    message: "₹24,999 payment confirmed.",
    time: "2 hours ago",
    icon: FaMoneyBillWave,
    color: "purple",
  },
];