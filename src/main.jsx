import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './state/store.js'

// Assuming SidebarProvider is exported like this:
import { SidebarProvider } from './components/ui/sidebar.js' 
import router from './routes/router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
     <SidebarProvider>
      <RouterProvider router={router}  />
    </SidebarProvider>
   </Provider>
  </StrictMode>
)
