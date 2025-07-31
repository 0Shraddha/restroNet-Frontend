import {User} from 'lucide-react';

export default function Navbar(){
   return (
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍽️</span>
              </div>
              <span className="text-xl font-bold text-gray-900">RestroNet</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Restaurants</a>
            </nav>

            {/* Right section */}
            <div className="flex items-center space-x-4">
              <User className="w-6 h-6 p-1 text-gray-600 cursor-pointer bg-orange-100 rounded-xl hover:text-orange-500" />
            </div>
          </div>
        </div>
      </header>
   )
}