import { NavLink } from "react-router-dom";

function SidebarItem({ icon: Icon, title, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 ${
          isActive
            ? "bg-[#C9A227] text-white"
            : "text-gray-300 hover:bg-[#1f1f1f] hover:text-white"
        }`
      }
    >
      <Icon size={20} />
      <span>{title}</span>
    </NavLink>
  );
}

export default SidebarItem;