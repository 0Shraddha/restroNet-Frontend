import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Assuming SidebarProvider is exported like this:
import { SidebarProvider } from './components/ui/sidebar.js' // adjust path as needed

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </StrictMode>
)
