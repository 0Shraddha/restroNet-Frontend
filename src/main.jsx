import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'

// Assuming SidebarProvider is exported like this:
import { SidebarProvider } from './components/ui/sidebar.js' 
import router from './routes/router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SidebarProvider>
    <RouterProvider router={router}  />
    </SidebarProvider>
  </StrictMode>
)
