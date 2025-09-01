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
} from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Restaurant", url: "/restaurant-list", icon: Inbox },
  { title: "Admin/Manager", url: "/manager", icon: Calendar },
  { title: "Approval", url: "/approve", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Logout", url: "/auth", icon: LogOut },
];

export default function AppLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
            {items.map((item) => (
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
                <item.icon
                  className={`${
                    isCollapsed ? "w-6 h-6" : "w-5 h-5"
                  } transition-all duration-200 group-hover:scale-110 flex-shrink-0`}
                />
                {!isCollapsed && (
                  <span className="font-medium text-left">{item.title}</span>
                )}
              </NavLink>
            ))}
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
