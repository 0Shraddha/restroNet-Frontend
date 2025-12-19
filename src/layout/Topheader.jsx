import React from 'react';
import { User, Menu } from 'lucide-react';

export default function TopHeader({ title = "" }) {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className=" flex justify-between items-center p-4">
        {/* Left side - Title */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h5 className="text-2xl md:text-xl font-bold tracking-tight text-gray-800">
              {title}
            </h5>
          </div>
        </div>

        {/* Right side - User Info */}
        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-200/50 hover:bg-white/80 hover:shadow-md transition-all">
          <div className="hidden md:block text-right">
            <p className="font-semibold text-sm text-gray-800">
              {user?.username || "Guest"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email || "guest@example.com"}
            </p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center ring-2 ring-red-200/50">
            <User className="w-5 h-5 text-red-600" />
          </div>
        </div>
      </div>
    </header>
  );
}