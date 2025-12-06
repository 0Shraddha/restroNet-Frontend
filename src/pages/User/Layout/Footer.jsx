export default function RestaurantList() {
  return(
        <footer className="bg-gray-900 text-white py-4 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🍽️</span>
                </div>
                <span className="text-xl font-bold">RestroNet</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for restaurant recommendations and food discovery.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>support@restronet.com</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fast Food</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fine Dining</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cafes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Desserts</a></li>
              </ul>
            </div>
            
           
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400">
            <p>&copy; 2025 RestroNet. All rights reserved.</p>
          </div>
      </footer>
  )
}