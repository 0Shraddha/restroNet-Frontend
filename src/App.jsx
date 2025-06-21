import { useState } from 'react'
import './App.css'
import AddRestaurant from './pages/Restaurant/AddRestaurant'
import SidebarLayout from './layout/sidebar/Sidebar'

function App() {

  return (
    <>
    <SidebarLayout />
   <div className="main">
   <h2>Welcome to RestroNet System</h2>
     <span className='text-3xl'>This is where we can find the restaurant of all kinds!</span>

     <AddRestaurant />
   </div>
    </>
  )
}

export default App
