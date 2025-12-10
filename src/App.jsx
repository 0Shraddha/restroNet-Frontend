import { ToastContainer } from 'react-toastify';
import './App.css';
import SidebarLayout from './layout/sidebar/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';


function App() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const shouldHideSidebar = ['/auth', '/users', '/get-preferences', '/restaurant/'].some(path =>
    location.pathname.includes(path)
  );

  return (
      <div className="flex h-full w-full">
        <ToastContainer position="bottom-right" autoClose={3000} />

        {/* Sidebar */}
        {!shouldHideSidebar && (
        <aside className='sticky   top-0 left-0 h-screen'>
          <SidebarLayout
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </aside>

        )}

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 transition-all duration-300">
          <Outlet />
        </main>
      </div>
  );
}

export default App;
