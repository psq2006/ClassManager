import React, { useState } from 'react';
import { Bell, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { currentUser } from '../../data/mockData';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="ml-4 text-xl font-semibold text-blue-600">EduLearn</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">3</span>
            </button>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)} 
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <img 
                  src={currentUser.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"} 
                  alt="Profile" 
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="hidden md:block text-sm font-medium">{currentUser.name}</span>
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
                <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <UserIcon size={16} className="mr-2" />
                  Profile
                </a>
                <a href="#logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <LogOut size={16} className="mr-2" />
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;