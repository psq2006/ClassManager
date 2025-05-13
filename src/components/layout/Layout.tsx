import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} activeItem={activeItem} setActiveItem={setActiveItem} />
      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? 'ml-0 md:ml-64' : 'ml-0 md:ml-16'
        }`}
      >
        <div className="p-4 md:p-6 min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;