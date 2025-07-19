import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import { Home, User, Calendar, LogOut, Moon, Sun, Globe } from 'lucide-react';

const Layout = ({ children }) => {
  const { user, signOut } = useAuth();
  const { region, theme, toggleRegion, toggleTheme, isDark } = useSettings();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-primary transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Y</span>
              </div>
              <span className="font-bold text-xl text-primary">Yummurai</span>
            </Link>

            <div className="flex items-center space-x-4">
              {/* Settings Toggles */}
              <div className="flex items-center space-x-2">
                {/* Region Toggle */}
                <button
                  onClick={toggleRegion}
                  className="flex items-center space-x-1 px-2 py-1 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title={`Switch to ${region === 'India' ? 'USA' : 'India'}`}
                >
                  <Globe size={16} />
                  <span>{region}</span>
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>

              {user && (
                <nav className="hidden md:flex space-x-6">
                  <Link
                    to="/dashboard"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/dashboard')
                        ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    <Home size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/meal-planner"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/meal-planner')
                        ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    <Calendar size={16} />
                    <span>Meal Planner</span>
                  </Link>
                  <Link
                    to="/profile"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/profile')
                        ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </nav>
              )}

              {!user && (
                <Link
                  to="/login"
                  className="btn-primary"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Mobile Navigation */}
      {user && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex justify-around py-2">
            <Link
              to="/dashboard"
              className={`flex flex-col items-center py-2 px-3 transition-colors ${
                isActive('/dashboard') ? 'text-primary-600' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <Home size={20} />
              <span className="text-xs mt-1">Dashboard</span>
            </Link>
            <Link
              to="/meal-planner"
              className={`flex flex-col items-center py-2 px-3 transition-colors ${
                isActive('/meal-planner') ? 'text-primary-600' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <Calendar size={20} />
              <span className="text-xs mt-1">Planner</span>
            </Link>
            <Link
              to="/profile"
              className={`flex flex-col items-center py-2 px-3 transition-colors ${
                isActive('/profile') ? 'text-primary-600' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <User size={20} />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;