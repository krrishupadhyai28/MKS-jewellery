import sidebarData from "./sidebarData";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-[#111111] flex flex-col">
      
      {/* Updated Unified Branding Header */}
      <div className="flex items-center gap-3 border-b border-gray-800 px-6 py-6 select-none">
        <img
          src="/mk-logo.png"
          alt="MK Jewellers"
          className="h-12 w-12 rounded-lg object-contain bg-white p-0.5"
        />
        <div>
          <h1 className="text-lg font-bold tracking-wide text-white">
            MK Jewellers
          </h1>
          <p className="text-[10px] uppercase tracking-[3px] text-[#C9A227] font-medium">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Sidebar Items Navigation */}
      <div className="flex-1 space-y-2 px-4 py-6 overflow-y-auto">
        {sidebarData.map((item) => (
          <SidebarItem
            key={item.title}
            {...item}
          />
        ))}
      </div>

    </aside>
  );
}

export default Sidebar;