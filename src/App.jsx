import { ToastContainer } from "react-toastify";
import "./App.css";
import SidebarLayout from "./layout/sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

function App() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const shouldHideSidebar = [
    "/auth",
    "/users",
    "/get-preferences",
    "/restaurant/",
    "/consumer"
  ].some((path) => location.pathname.includes(path));

  let role = "";
  if (localStorage.getItem("user")) {
    role = JSON.parse(localStorage.getItem("user"))?.role;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">

      {/* SIDEBAR */}
      {!shouldHideSidebar && role !== "consumer" && (
        <aside
          className={`
            h-full flex-shrink-0 overflow-hidden border-r bg-white
            transition-all duration-300
          `}
          style={{
            width: collapsed ? "80px" : "240px", // <-- HARD OVERRIDE (cannot be ignored)
          }}
        >
          <SidebarLayout collapsed={collapsed} setCollapsed={setCollapsed} />
        </aside>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 h-full overflow-y-auto bg-gray-100">
        <ToastContainer position="bottom-right" autoClose={3000} />
        <Outlet />
      </main>

    </div>
  );
}

export default App;
