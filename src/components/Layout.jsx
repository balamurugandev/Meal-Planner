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
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-lg">Y</span>
              </div>
              <span className="font-bold text-2xl text-gradient group-hover:scale-105 transition-transform">Yummurai</span>
            </Link>

            <div className="flex items-center space-x-4">
              {/* Settings Toggles */}
              <div className="flex items-center space-x-3">
                {/* Region Toggle */}
                <button
                  onClick={toggleRegion}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-200 hover:scale-105 hover:shadow-md"
                  title={`Switch to ${region === 'India' ? 'USA' : 'India'}`}
                >
                  <Globe size={16} className="animate-pulse" />
                  <span>{region}</span>
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-200 hover:scale-105 hover:shadow-md"
                  title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                >
                  {isDark ? <Sun size={16} className="animate-pulse" /> : <Moon size={16} className="animate-pulse" />}
                </button>
              </div>

              {user && (
                <nav className="hidden md:flex space-x-2">
                  <Link
                    to="/dashboard"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 ${
                      isActive('/dashboard')
                        ? 'text-white bg-gradient-primary shadow-lg hover:shadow-xl'
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md'
                    }`}
                  >
                    <Home size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/meal-planner"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 ${
                      isActive('/meal-planner')
                        ? 'text-white bg-gradient-primary shadow-lg hover:shadow-xl'
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md'
                    }`}
                  >
                    <Calendar size={16} />
                    <span>Meal Planner</span>
                  </Link>
                  <Link
                    to="/profile"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 ${
                      isActive('/profile')
                        ? 'text-white bg-gradient-primary shadow-lg hover:shadow-xl'
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md'
                    }`}
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 bg-white/50 dark:bg-gray-800/50 hover:bg-red-50 dark:hover:bg-red-900/20 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </nav>
              )}

              {!user && (
                <Link
                  to="/login"
                  className="btn-primary hover-glow group"
                >
                  <span className="flex items-center">
                    <span className="mr-2">👋</span>
                    Sign In
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </span>
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