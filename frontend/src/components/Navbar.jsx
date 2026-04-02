import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  HomeIcon, 
  PlusCircleIcon, 
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  TicketIcon,
  UserGroupIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleIcon = () => {
    switch(user?.role) {
      case 'admin':
        return <ShieldCheckIcon className="h-4 w-4" />;
      case 'agent':
        return <UserGroupIcon className="h-4 w-4" />;
      default:
        return <UserCircleIcon className="h-4 w-4" />;
    }
  };

  const getRoleBadgeColor = () => {
    switch(user?.role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'agent':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <TicketIcon className="h-8 w-8 text-indigo-600 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                HelpDesk Pro
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors duration-200"
            >
              <HomeIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            
            <Link
              to="/create-ticket"
              className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
            >
              <PlusCircleIcon className="h-5 w-5" />
              <span className="hidden sm:inline">New Ticket</span>
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none group"
              >
                <div className="relative">
                  <UserCircleIcon className="h-8 w-8 text-gray-600 group-hover:text-indigo-600 transition-colors duration-200" />
                  <span className={`absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-semibold rounded-full ${getRoleBadgeColor()} flex items-center gap-1`}>
                    {getRoleIcon()}
                    <span className="hidden sm:inline">
                      {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                    </span>
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <ChevronDownIcon className="h-4 w-4 text-gray-600" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;