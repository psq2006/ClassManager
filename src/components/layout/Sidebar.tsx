import React from 'react';
import { Home, Book, FileText, ListChecks, BarChart, Settings, Users } from 'lucide-react';
import { currentUser } from '../../data/mockData';

interface SidebarProps {
  isOpen: boolean;
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeItem, setActiveItem }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'courses', label: 'Courses', icon: <Book size={20} /> },
    { id: 'resources', label: 'Resources', icon: <FileText size={20} /> },
    { id: 'exercises', label: 'Exercises', icon: <ListChecks size={20} /> },
    { id: 'progress', label: 'Progress', icon: <BarChart size={20} /> },
  ];

  // Add admin-only menu items
  if (currentUser.role === 'admin' || currentUser.role === 'teacher') {
    menuItems.push({ id: 'users', label: 'Users', icon: <Users size={20} /> });
    menuItems.push({ id: 'settings', label: 'Settings', icon: <Settings size={20} /> });
  }

  return (
    <aside 
      className={`fixed left-0 top-14 h-full bg-white border-r border-gray-200 transition-all duration-300 z-10 ${
        isOpen ? 'w-64' : 'w-0 -translate-x-full md:translate-x-0 md:w-16'
      }`}
    >
      <div className="h-full flex flex-col py-4">
        <nav className="flex-1">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full flex items-center py-2 px-3 rounded-md transition-colors ${
                    activeItem === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  } ${!isOpen && 'justify-center'}`}
                  onClick={() => setActiveItem(item.id)}
                >
                  <span className="text-current">{item.icon}</span>
                  {isOpen && <span className="ml-3 text-sm font-medium">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`px-4 py-2 text-xs text-gray-500 ${!isOpen && 'hidden'}`}>
          <p>EduLearn v1.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;