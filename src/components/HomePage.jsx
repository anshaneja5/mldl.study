import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { Sun, Moon, ChevronDown, ChevronUp, X } from 'lucide-react';

const ContributionModal = ({ isOpen, onClose, darkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className={`relative w-full max-w-md rounded-lg shadow-xl p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 hover:bg-gray-200 rounded-full p-1"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Help Us Grow! 🌱</h2>
        <p className="mb-4">
          mldl.study is an open-source community project. We rely on contributions 
          from learners like you to make this resource better and more comprehensive.
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">How Can You Contribute?</h3>
            <ul className="list-disc list-inside text-sm">
              <li>Add new resources</li>
              <li>Fix typos or errors</li>
              <li>Suggest improvements</li>
            </ul>
          </div>
          <a
            href="https://github.com/anshaneja5/mldl.study"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Visit GitHub Repository
          </a>
        </div>
        <p className="text-xs mt-4 text-center opacity-70">
          Your contribution can help someone learn! 💡
        </p>
      </div>
    </div>
  );
};

const FAQ_DATA = [
  {
    question: "What is mldl.study?",
    answer: "mldl.study is a curated roadmap to help learners master Machine Learning and Deep Learning with structured resources, including videos, articles, research papers, competitions and projects."
  },
  {
    question: "Who is this roadmap for?",
    answer: "This roadmap is designed for beginners and intermediate learners who want to dive deep into ML and DL concepts systematically."
  },
  {
    question: "Is the content free to access?",
    answer: "Yes, all the resources provided in the roadmap are free or point to freely accessible materials available online."
  },
  {
    question: "Can I contribute to the roadmap?",
    answer: <>Absolutely! Contributions are welcome. Visit our <a href="https://github.com/anshaneja5/mldl.study" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">GitHub repository</a> to contribute new resources or suggest improvements.</>
  },
  {
    question: "How do I start the roadmap?",
    answer: "Click on the 'Start ML Roadmap' or 'Start DL Roadmap' button below to begin your learning journey."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick, darkMode }) => (
  <div className="border-b last:border-b-0">
    <button
      onClick={onClick}
      className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
    >
      <span className="font-medium">{question}</span>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 flex-shrink-0" />
      ) : (
        <ChevronDown className="w-5 h-5 flex-shrink-0" />
      )}
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-40' : 'max-h-0'
      }`}
    >
      <p className={`pb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {answer}
      </p>
    </div>
  </div>
);

const HomePage = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  const [darkMode, setDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [openFAQs, setOpenFAQs] = useState({});
  
  // New state for contribution modal
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);

    // Check if modal has been shown before
    const hasSeenModal = localStorage.getItem('contributionModalSeen');
    if (!hasSeenModal) {
      // Open modal on first visit
      setIsContributionModalOpen(true);
      localStorage.setItem('contributionModalSeen', 'true');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsTransitioning(true);
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const toggleFAQ = (index) => {
    setOpenFAQs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <>
      <ContributionModal 
        isOpen={isContributionModalOpen} 
        onClose={() => setIsContributionModalOpen(false)}
        darkMode={darkMode}
      />

      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <nav className={`sticky top-0 z-50 p-4 shadow-md transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white border-b'}`}>
            <div className="container mx-auto flex justify-between items-center flex-wrap">
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-600'}`}>mldl.study</h1>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg text-sm md:text-base flex items-center gap-2 transition-all duration-300 ${
                  darkMode ? 'bg-blue-100 text-blue-600' : 'bg-gray-800 text-yellow-400' 
                } hover:scale-105 transform`}
                aria-label="Toggle dark mode"
              >
                <div className="relative w-6 h-6">
                  <div className={`absolute transition-all duration-300 transform ${
                    isTransitioning ? 'scale-0' : 'scale-100'
                  }`}>
                    {darkMode ? (
                      <Sun className="w-6 h-6" />
                    ) : (
                      <Moon className="w-6 h-6" />
                    )}
                  </div>
                </div>
                <span className="hidden md:inline">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
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
                  href="https://github.com/anshaneja5/mldl.study"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 hover:text-blue-600 transition-colors relative group ${
                    darkMode ? 'text-white' : 'text-gray-700'
                  }`}
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
                  <span className="hidden md:inline">Star on GitHub</span>
                  <span className="absolute top-0 -right-1 md:hidden">
                    <span className="inline-flex rounded-full h-3 w-3 bg-blue-500 text-white text-[8px] items-center justify-center">⭐</span>
                  </span>
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
           <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto mb-12 transition-all duration-300`}>
           <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
           <div className="space-y-2">
             {FAQ_DATA.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQs[index]}
                onClick={() => toggleFAQ(index)}
                darkMode={darkMode}
              />
            ))}
          </div>
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
    </>
  );
};

export default HomePage;