import { useState } from "react";
import {
  Calendar,
  Home,
  Inbox,
  Menu,
  Search,
  Settings,
  LogOut,
  ChevronLeft,
  MenuIcon,
  TagIcon,
  TagsIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Restaurant", url: "/restaurant-list", icon: Inbox },
  { title: "Menu", url: "/menu-manager", icon: MenuIcon },
  { title: "Infos", icon: TagsIcon, 
    children: [
       { title: "Category", url: "/categories" },
      { title: "Cuisines", url: "/add-cuisines" },
      { title: "Tags", url: "/add-tags" },
    ]
  },
  { title: "Offers", url: "/add-offers", icon: TagIcon },
  { title: "Admin/Manager", url: "/manager", icon: Calendar },
  { title: "Approval", url: "/approve", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Logout", url: "/auth", icon: LogOut },
];

export default function AppLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);
  const toggleMenu = (title) => {
    setOpenMenu(openMenu === title ? null : title);
  };

  return (
    <div className="flex min-h-screen overflow-hidden position-sticky bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? "w-20" : "w-72"
        } transition-all duration-300 bg-white border-r border-gray-200 shadow-lg flex flex-col sticky top-0 h-screen`}
        
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <h4 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                RESTRONET
              </h4>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
            >
              {isCollapsed ? (
                <Menu className="w-7 h-7 text-gray-700 group-hover:text-orange-500 hover:transform hover:scale-105" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-orange-500 hover:transform hover:scale-105" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
  <div className="space-y-2">

    {items.map((item) => {
      const Icon = item.icon;

      // 👉 If menu has sub-items
      if (item.children) {
        return (
          <div key={item.title}>
            {/* Parent Button */}
            <button
              onClick={() => toggleMenu(item.title)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group 
                ${openMenu === item.title ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"}`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0`} />
              {!isCollapsed && (
                <span className="font-medium flex-1 text-left">{item.title}</span>
              )}

              {/* Arrow */}
              {!isCollapsed && (
                <ChevronLeft
                  className={`w-4 h-4 transition-transform duration-200 
                  ${openMenu === item.title ? "-rotate-90" : "rotate-0"}`}
                />
              )}
            </button>

            {/* Sub Menu */}
            {!isCollapsed && (
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openMenu === item.title ? "max-h-40" : "max-h-0"
                }`}
              >
                <div className="ml-10 mt-1 space-y-1">
                  {item.children.map((sub) => (
                    <NavLink
                      key={sub.title}
                      to={sub.url}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-lg text-sm transition ${
                          isActive
                            ? "bg-orange-500 text-white shadow"
                            : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                        }`
                      }
                    >
                      {sub.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }

      // 👉 Normal single menu
      return (
        <NavLink
          key={item.title}
          to={item.url}
          end
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
              isActive
                ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-md transform scale-105"
                : "text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:transform hover:scale-105"
            }`
          }
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium text-left">{item.title}</span>}
        </NavLink>
      );
    })}

  </div>
</nav>

        
        
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center p-4 bg-white border-b border-gray-200 shadow-sm">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <span className="ml-3 font-bold text-xl bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
            RESTRONET
          </span>
        </div>
      </main>
    </div>
  );
}
