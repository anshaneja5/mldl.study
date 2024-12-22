import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

const NavbarModal = ({ isOpen, onClose, darkMode, toggleDarkMode }) => {
  return (
    <div 
      className={`fixed inset-0 z-[100] ${isOpen ? 'block' : 'hidden'} ${darkMode ? 'bg-black/80' : 'bg-gray-900/80'}`}
      onClick={onClose}
    >
      <div 
        className={`fixed bottom-0 left-0 right-0 transform transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-t-2xl shadow-2xl p-6`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Navigation Menu
          </h2>
          <button 
            onClick={onClose} 
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
              darkMode ? 'text-white' : 'text-gray-700'
            }`}
          >
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <NavLinks 
            darkMode={darkMode} 
            className="flex flex-col space-y-4 text-lg" 
            onLinkClick={onClose}
          />
          <div className="mt-4 flex items-center justify-between">
            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </span>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                darkMode ? 'bg-blue-100 text-blue-600' : 'bg-gray-800 text-yellow-400'
              } hover:scale-105 transform`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavLinks = ({ darkMode, className, onLinkClick = () => {} }) => (
  <ul className={className}>
    <li>
      <Link 
        to="/prerequisites" 
        className={`hover:text-emerald-600 transition-colors ${darkMode ? 'text-white' : 'text-gray-700'}`}
        onClick={onLinkClick}
      >
        Prerequisites
      </Link>
    </li>
    <li>
      <Link 
        to="/machinelearning" 
        className={`hover:text-emerald-600 transition-colors ${darkMode ? 'text-white' : 'text-gray-700'}`}
        onClick={onLinkClick}
      >
        ML Roadmap
      </Link>
    </li>
    <li>
      <Link 
        to="/deeplearning" 
        className={`hover:text-emerald-600 transition-colors ${darkMode ? 'text-white' : 'text-gray-700'}`}
        onClick={onLinkClick}
      >
        DL Roadmap
      </Link>
    </li>
    <li>
      <Link 
        to="/genai" 
        className={`hover:text-emerald-600 transition-colors ${darkMode ? 'text-white' : 'text-gray-700'}`}
        onClick={onLinkClick}
      >
        GenAI Roadmap
      </Link>
    </li>
    <li>
      <Link 
        to="/books" 
        className={`hover:text-emerald-600 transition-colors ${darkMode ? 'text-white' : 'text-gray-700'}`}
        onClick={onLinkClick}
      >
        Books
      </Link>
    </li>
    <li>
      <Link 
        to="/researchpapers" 
        className={`hover:text-emerald-600 transition-colors ${darkMode ? 'text-white' : 'text-gray-700'}`}
        onClick={onLinkClick}
      >
        Research Papers
      </Link>
    </li>
    <li>
      <a
        href="https://github.com/anshaneja5/mldl.study"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-1.5 hover:text-emerald-600 transition-colors relative group ${
          darkMode ? 'text-white' : 'text-gray-700'
        }`}
        onClick={onLinkClick}
      >
        <svg
          height="20"
          width="20"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="inline-block"
        >
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        <span>Star on GitHub</span>
      </a>
    </li>
  </ul>
);

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className={`sticky top-0 z-50 p-4 shadow-md transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white border-b'}`}>
        <div className="container mx-auto flex justify-between items-center flex-wrap">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-emerald-600'}`}>
            mldl.study
          </h1>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks darkMode={darkMode} className="flex space-x-6" />
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg text-sm md:text-base flex items-center gap-2 transition-all duration-300 ${
                darkMode ? 'bg-blue-100 text-blue-600' : 'bg-gray-800 text-yellow-400' 
              } hover:scale-105 transform`}
              aria-label="Toggle dark mode"
            >
              <div className="relative w-6 h-6">
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </div>
              <span className="hidden md:inline">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsModalOpen(true)}
              className={`p-2 rounded-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Modal */}
      <NavbarModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </>
  );
};

export default Navbar;