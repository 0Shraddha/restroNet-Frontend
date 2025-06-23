import { useState } from 'react'
import './App.css'
import AddRestaurant from './pages/Restaurant/AddRestaurant'
import SidebarLayout from './layout/sidebar/Sidebar'
import LoginPage from './pages/Authentication/Login'
import SignUpPage from './pages/Authentication/SignUp'

function App() {

  return (

     <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
          <SidebarLayout />
        
          </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto bg-gray-100">
          {/* <h2 className="text-2xl font-semibold mb-2">Welcome to RestroNet System</h2>
          <p className="text-lg mb-6 text-gray-700">This is where we can find the restaurant of all kinds!</p>
           */}
          {/* Restaurant Form */}
          <AddRestaurant />
            <SignUpPage />
          <LoginPage/>
        </main>
        </div>
  )
}

export default App
