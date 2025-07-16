import {
  Calendar,
  Home,
  Inbox,
  Menu,
  Search,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Restaurant", url: "/restaurant-list", icon: Inbox },
  { title: "Admin/Manager", url: "/manager", icon: Calendar },
  { title: "Approval", url: "/approve", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

export default function SidebarLayout({ collapsed, setCollapsed }) {
  return (
    <Sidebar className="h-full">
      <SidebarContent>
        <div className="flex items-center justify-between px-4 py-3">
          {!collapsed && (
            <SidebarGroupLabel className="text-xl font-bold">
              🍽️ RESTRONET
            </SidebarGroupLabel>
          )}
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="text-muted-foreground hover:text-primary"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.url}
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-muted-foreground hover:bg-muted"
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" strokeWidth={1.5} />
                    {!collapsed && (
                      <span className="text-sm font-medium">
                        {item.title}
                      </span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
    </Sidebar>
  );
}
