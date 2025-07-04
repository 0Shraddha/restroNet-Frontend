import './App.css'
import SidebarLayout from './layout/sidebar/Sidebar'

import { Outlet, useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();

  const shouldHideSidebar = location.pathname.startsWith('/auth');
  console.log({shouldHideSidebar});

  return (

     <div className="flex h-screen w-full">
      {/* Sidebar */}
        {!shouldHideSidebar && 
          <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
            <SidebarLayout />
          </aside>
        }

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto bg-gray-100">
          <Outlet />
        </main>
        </div>
  )
}

export default App
