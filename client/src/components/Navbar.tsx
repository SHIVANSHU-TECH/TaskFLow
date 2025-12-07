
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaTasks, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await auth?.logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-white/40 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200">
                <FaTasks className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
              TaskFlow
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {auth?.user ? (
              <>
                <div className="flex flex-col items-end mr-2">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        {auth.user.username}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                        {auth.user.email}
                    </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-md hover:shadow-lg hover:from-red-600 hover:to-pink-600 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login" 
                  className="px-5 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-300 dark:hover:text-white"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full shadow-md shadow-indigo-200 hover:bg-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 focus:outline-none p-2"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-16 left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-6 space-y-4 flex flex-col items-center">
          {auth?.user ? (
            <>
              <div className="text-center mb-2">
                  <div className="text-base font-bold text-slate-800 dark:text-white">
                      {auth.user.username}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                      {auth.user.email}
                  </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full max-w-xs px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <Link 
                to="/login" 
                onClick={closeMenu}
                className="w-full text-center px-6 py-3 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors dark:bg-slate-800 dark:text-slate-300"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                onClick={closeMenu}
                className="w-full text-center px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
