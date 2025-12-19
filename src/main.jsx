// index.js (or main.jsx)
import { StrictMode, Suspense } from 'react' // Import Suspense
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './state/store.js'
import { SidebarProvider } from './components/ui/sidebar.js'
import router from './routes/router.jsx' // Note: 'router' contains the lazy components

const LoadingFallback = <div>Loading page...</div>;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <SidebarProvider>
        <Suspense fallback={LoadingFallback}>
            <RouterProvider router={router} />
        </Suspense>
      </SidebarProvider>
    </Provider>
  </StrictMode>
)
