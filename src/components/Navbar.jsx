import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

// Dropdown animation for mobile menu
const NavbarModal = ({ isOpen, onClose, darkMode, toggleDarkMode }) => {
  // Handle ESC key for accessibility
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div 
      className={`fixed inset-0 z-[100] backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } ${darkMode ? 'bg-black/80' : 'bg-gray-900/70'}`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div 
        className={`fixed bottom-0 left-0 right-0 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-t-2xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
        aria-modal="true"
        role="dialog"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Menu
          </h2>
          <button 
            onClick={onClose} 
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
              darkMode ? 'text-white' : 'text-gray-700'
            }`}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <NavLinks 
            darkMode={darkMode} 
            className="flex flex-col space-y-6 text-lg pb-6 border-b border-gray-200 dark:border-gray-700" 
            onLinkClick={onClose}
            isMobile={true}
          />
          <div className="mt-6 flex items-center justify-between pt-2">
            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </span>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                darkMode ? 'bg-blue-100/90 text-blue-600' : 'bg-gray-800/95 text-yellow-400'
              } hover:scale-105 transform`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          {/* Buy Me A Coffee Button for Mobile */}
          <div className="mt-4 flex justify-center">
            <a 
              href="https://buymeacoffee.com/anshaneja" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
              onClick={onClose}
            >
              <img 
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" 
                alt="Buy Me A Coffee"
                className="h-10"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavLinks = ({ darkMode, className, onLinkClick = () => {}, isMobile = false }) => {
  const location = useLocation();
  
  // Simplified navigation items - reduced number for desktop
  const navItems = [
    { path: '/prerequisites', label: 'Prerequisites' },
    { path: '/machinelearning', label: 'ML' },
    { path: '/deeplearning', label: 'DL' },
    { path: '/genai', label: 'GenAI' },
    // Additional items can be moved to a dropdown menu
  ];

  // Secondary nav items for dropdown
  const secondaryItems = [
    { path: '/books', label: 'Books' },
    { path: '/researchpapers', label: 'Papers' },
    { path: '/journey', label: 'Journey' },
  ];

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <ul className={className}>
      {navItems.map((item) => (
        <li key={item.path}>
          <Link 
            to={item.path} 
            className={`
              relative group flex items-center transition-colors duration-300
              ${darkMode ? 'text-white' : 'text-gray-700'}
              ${location.pathname === item.path 
                ? 'text-emerald-500 font-medium' 
                : 'hover:text-emerald-600'
              }
              ${isMobile ? 'text-lg py-1.5' : 'text-base'}
            `}
            onClick={onLinkClick}
            aria-current={location.pathname === item.path ? 'page' : undefined}
          >
            {item.label}
            {!isMobile && (
              <span className={`
                absolute -bottom-1 left-0 h-0.5 bg-emerald-500 transition-all duration-300
                ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}
              `}></span>
            )}
          </Link>
        </li>
      ))}
      
      {!isMobile && (
        <li className="relative">
          <button
            className={`
              flex items-center gap-1 transition-colors duration-300
              ${darkMode ? 'text-white' : 'text-gray-700'}
              hover:text-emerald-600
            `}
            onClick={() => setShowDropdown(!showDropdown)}
            aria-expanded={showDropdown}
          >
            More
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {showDropdown && (
            <div className={`
              absolute top-full right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10
              ${darkMode ? 'bg-gray-800' : 'bg-white'}
              border ${darkMode ? 'border-gray-700' : 'border-gray-200'}
            `}>
              {secondaryItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    block px-4 py-2 text-sm
                    ${darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}
                    ${location.pathname === item.path ? 'font-medium text-emerald-500' : ''}
                  `}
                  onClick={() => {
                    setShowDropdown(false);
                    onLinkClick();
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </li>
      )}
      
      {isMobile && secondaryItems.map((item) => (
        <li key={item.path}>
          <Link 
            to={item.path} 
            className={`
              relative flex items-center transition-colors duration-300
              ${darkMode ? 'text-white' : 'text-gray-700'}
              ${location.pathname === item.path 
                ? 'text-emerald-500 font-medium' 
                : 'hover:text-emerald-600'
              }
              text-lg py-1.5
            `}
            onClick={onLinkClick}
          >
            {item.label}
          </Link>
        </li>
      ))}
      
      <li>
        <a
          href="https://github.com/anshaneja5/mldl.study"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            flex items-center gap-2 transition-all duration-300
            ${darkMode ? 'text-white' : 'text-gray-700'}
            hover:text-emerald-600
            ${isMobile ? 'text-lg py-1.5' : 'text-base'}
          `}
          onClick={onLinkClick}
        >
          <svg
            height={isMobile ? "22" : "20"}
            width={isMobile ? "22" : "20"}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="inline-block"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span className="whitespace-nowrap">GitHub</span>
        </a>
      </li>
    </ul>
  );
};

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`
          sticky top-0 z-50 transition-all duration-300
          ${darkMode 
            ? isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-md' : 'bg-black'
            : isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white border-b border-gray-200'
          }
        `}
      >
        <div className="container mx-auto px-4 py-3 md:py-3 flex justify-between items-center">
          <Link 
            to="/" 
            className={`
              text-2xl font-bold tracking-tight transition-all duration-300
              ${darkMode 
                ? 'text-white hover:text-emerald-400' 
                : 'text-emerald-600 hover:text-emerald-700'
              }
            `}
          >
            mldl.study
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks darkMode={darkMode} className="flex items-center space-x-5" />
            
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleDarkMode}
                className={`
                  p-2 rounded-lg transition-all duration-300
                  ${darkMode 
                    ? 'bg-blue-100/90 text-blue-600 hover:bg-blue-200' 
                    : 'bg-gray-800/95 text-yellow-400 hover:bg-gray-700'
                  }
                `}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <a 
                href="https://buymeacoffee.com/anshaneja" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img 
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" 
                  alt="Buy Me A Coffee"
                  className="h-8"
                />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className={`
              md:hidden p-2.5 rounded-md transition-colors
              ${darkMode 
                ? 'text-white hover:bg-gray-800' 
                : 'text-gray-800 hover:bg-gray-100'
              }
            `}
            aria-label="Open navigation menu"
            aria-expanded={isModalOpen}
          >
            <Menu size={24} />
          </button>
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
