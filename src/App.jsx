import { ToastContainer } from 'react-toastify';
import './App.css';
import SidebarLayout from './layout/sidebar/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const shouldHideSidebar = ['/auth', '/users'].some(path =>
    location.pathname.includes(path)
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen w-full">
        <ToastContainer position="bottom-right" autoClose={3000} />

        {/* Sidebar */}
        {!shouldHideSidebar && (
        <aside
  className={`transition-all duration-300 ${
    collapsed ? 'w-16' : 'w-64'
  } bg-white border-r h-full`}
>
  <SidebarLayout
    collapsed={collapsed}
    setCollapsed={setCollapsed}
  />
</aside>

        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-100 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
