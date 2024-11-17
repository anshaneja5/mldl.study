import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { Sun, Moon } from 'lucide-react';

const HomePage = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  const [darkMode, setDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setIsTransitioning(true);
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <nav className={`sticky top-0 z-50 p-4 shadow-md transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white border-b'}`}>
        <div className="container mx-auto flex justify-between items-center flex-wrap">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-600'}`}>mldl.study</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg text-sm md:text-base flex items-center gap-2 transition-all duration-300 ${
              darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-blue-100 text-blue-600'
            } hover:scale-105 transform`}
            aria-label="Toggle dark mode"
          >
            <div className="relative w-6 h-6">
              <div className={`absolute transition-all duration-300 transform ${
                isTransitioning ? 'scale-0' : 'scale-100'
              }`}>
                {darkMode ? (
                  <Moon className="w-6 h-6" />
                ) : (
                  <Sun className="w-6 h-6" />
                )}
              </div>
            </div>
            <span className="hidden md:inline">
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
          </button>
          <ul className="flex space-x-4 md:space-x-6 mt-2 md:mt-0">
            <li>
              <Link to="/machinelearning" className={`hover:text-blue-600 transition-colors ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                ML Roadmap
              </Link>
            </li>
            <li>
              <Link to="/deeplearning" className={`hover:text-blue-600 transition-colors ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                DL Roadmap
              </Link>
            </li>
            <li>
              <Link to="/books" className={`hover:text-blue-600 transition-colors ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                Books
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/anshaneja5"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-blue-600 transition-colors ${darkMode ? 'text-white' : 'text-gray-700'}`}
              >
                <svg height="25px" width="25px" viewBox="0 -3.5 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" fill="currentColor" stroke="currentColor">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                  <g id="SVGRepo_iconCarrier"> <g fill="currentColor"> <path d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0"/> <path d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923M54.027 187.23c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65M58.33 194.39c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069M65.606 202.683c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258M75.01 205.483c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612M85.714 206.67c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86M96.228 206.267c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398"/> </g> </g>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to ML/DL Roadmap
          </h1>
          <p className="text-lg md:text-xl mb-4 max-w-2xl mx-auto">
            Explore structured roadmap to master Machine Learning and Deep Learning.<br />
            <span className="font-semibold">Curated specifically for the Indian audience.</span>
          </p>
        </header>

        <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto mb-12 transition-all duration-300`}>
          <h2 className="text-2xl font-semibold mb-4">What's in These Roadmaps?</h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            These roadmaps contain a comprehensive set of resources to help you on your journey, including:
          </p>
          <ul className={`list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-4`}>
            <li>Video lectures</li>
            <li>Animations and visualizations</li>
            <li>Simulations to practice concepts</li>
            <li>Articles and research papers</li>
            <li>Interactive exercises and quizzes</li>
            <li>Community contributions</li>
          </ul>
          <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            These resources are designed to give you both theoretical knowledge and hands-on experience, ensuring a well-rounded learning process.
          </p>
        </div>

        <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto mb-12 transition-all duration-300`}>
          <h2 className="text-2xl font-semibold mb-4">Watch This Before You Start!</h2>
          <a href="https://www.youtube.com/watch?v=WXuK6gekU1Y" target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative aspect-video">
              <img
                src="https://img.youtube.com/vi/WXuK6gekU1Y/0.jpg"
                alt="Watch this video"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-16 h-16 md:w-24 md:h-24 text-white opacity-80 hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12l-6 4V8l6 4z"
                  />
                </svg>
              </div>
            </div>
          </a>
          <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            This was the sole video that sparked my interest in this field, so it is highly recommended to watch it first. It's not at all technical, but it will spark your interest in the field.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/machinelearning" className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-blue-700 transition-colors text-center hover:scale-105 transform duration-300">
            <span className="text-base md:text-lg font-medium">Start ML Roadmap</span>
          </Link>
          <Link to="/deeplearning" className="bg-gray-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-gray-800 transition-colors text-center hover:scale-105 transform duration-300">
            <span className="text-base md:text-lg font-medium">Start DL Roadmap</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;