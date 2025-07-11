import { ToastContainer } from 'react-toastify';
import './App.css'
import SidebarLayout from './layout/sidebar/Sidebar'

import { Outlet, useLocation } from 'react-router-dom'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

const shouldHideSidebar = ['/auth', '/users'].some(path => location.pathname.includes(path));
  console.log({shouldHideSidebar});

  return (
    <QueryClientProvider client={queryClient}>
     <div className="flex h-screen w-full">
      <ToastContainer position='bottom-right' autoClose={3000} />
      {/* Sidebar */}
        {!shouldHideSidebar && 
          <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
            <SidebarLayout />
          </aside>
        }

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-100">
          <Outlet />
        </main>
        </div>
        </QueryClientProvider>
  )
}

export default App
