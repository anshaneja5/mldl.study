import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { Sun, Moon, ChevronDown, ChevronUp, X, GitBranch, BookOpen, Map } from 'lucide-react';
import Navbar from './Navbar';
import { Helmet } from 'react-helmet';

// FAQ Data
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
    answer: "Absolutely! Contributions are welcome. Visit our GitHub repository to contribute new resources or suggest improvements."
  },
  {
    question: "How do I start the roadmap?",
    answer: "Click on any of the roadmap buttons above to begin your learning journey."
  }
];

// Contribution Modal Component
const ContributionModal = ({ isOpen, onClose, darkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className={`relative w-full max-w-md rounded-lg shadow-xl p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <button 
          onClick={onClose} 
          className={`absolute top-4 right-4 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full p-1 transition-colors`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Help Us Grow! 🌱</h2>
        <p className="mb-4">
          mldl.study is an open-source community project. We rely on contributions 
          from learners like you to make this resource better and more comprehensive.
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">How Can You Contribute?</h3>
            <ul className={`list-disc list-inside text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>
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
            <span className="flex items-center justify-center">
              <GitBranch className="w-4 h-4 mr-2" />
              Visit GitHub Repository
            </span>
          </a>
        </div>
        <p className="text-xs mt-4 text-center opacity-70">
          Your contribution can help someone learn! 💡
        </p>
      </div>
    </div>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer, isOpen, onClick, darkMode }) => (
  <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} last:border-b-0`}>
    <button
      onClick={onClick}
      className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
    >
      <span className="font-medium">{question}</span>
      {isOpen ? (
        <ChevronUp className="w-4 h-4 flex-shrink-0" />
      ) : (
        <ChevronDown className="w-4 h-4 flex-shrink-0" />
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

// Home Page Component
const HomePage = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  const [darkMode, setDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [openFAQs, setOpenFAQs] = useState({});
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

  // Generate JSON-LD structured data for FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Your Roadmap to AI Mastery | Machine Learning Roadmap</title>
        <meta 
          name="description" 
          content="Transform from beginner to machine learning professional with our comprehensive roadmap featuring free ML, DL, and GenAI resources. Join our community-driven journey today." 
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://mldl.study" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <ContributionModal 
        isOpen={isContributionModalOpen} 
        onClose={() => setIsContributionModalOpen(false)}
        darkMode={darkMode}
      />
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-slate-50 text-gray-900'}`}>
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          isTransitioning={isTransitioning}
        />
    
        <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
          {/* Hero Section */}
          <header className="text-center mb-12 max-w-2xl mx-auto">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Your Roadmap to AI Mastery
            </h1>
            <p className={`text-lg mb-8 max-w-xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Transform from beginner to ML professional with structured learning paths designed for practical, hands-on mastery.
            </p>
            <div className='flex justify-center items-center space-x-2'>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium inline-flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-2"></span>100% Free
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mx-2"></span>Community-Driven
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mx-2"></span>Real-World Skills
              </span>
            </div>
          </header>
          
          {/* Roadmap Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full mb-16">
            <Link to="/prerequisites" className={`flex items-center justify-center px-6 py-4 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-sm hover:shadow transition-all duration-300 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <BookOpen className="w-5 h-5 mr-3 text-blue-500" />
              <span className={`text-base font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Prerequisites Roadmap</span>
            </Link>
            <Link to="/machinelearning" className={`flex items-center justify-center px-6 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all duration-300 text-white`}>
              <Map className="w-5 h-5 mr-3 text-white" />
              <span className="text-base font-medium">ML Roadmap</span>
            </Link>
            <Link to="/deeplearning" className={`flex items-center justify-center px-6 py-4 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-sm hover:shadow transition-all duration-300 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <BookOpen className="w-5 h-5 mr-3 text-blue-500" />
              <span className={`text-base font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>DL Roadmap</span>
            </Link>
            <Link to="/genai" className={`flex items-center justify-center px-6 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all duration-300 text-white`}>
              <Map className="w-5 h-5 mr-3 text-white" />
              <span className="text-base font-medium">GenAI Roadmap</span>
            </Link>
          </div>
          
          {/* Feature Section */}
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm rounded-lg p-6 w-full max-w-3xl mx-auto mb-12 transition-all duration-300 border ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>What's in These Roadmaps?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-2"></div>
                  <p>Video lectures & animations</p>
                </div>
                <div className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-2"></div>
                  <p>Interactive simulations</p>
                </div>
                <div className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-2"></div>
                  <p>Research papers & articles</p>
                </div>
              </div>
              <div className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-2"></div>
                  <p>Practical exercises & quizzes</p>
                </div>
                <div className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-2"></div>
                  <p>Hands-on projects</p>
                </div>
                <div className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-2"></div>
                  <p>Community discussions</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Video Section */}
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm rounded-lg overflow-hidden w-full max-w-3xl mx-auto mb-12 transition-all duration-300 border ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Watch This Before You Start!</h2>
              <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                This video sparked my interest in the field - it's non-technical but highly motivating!
              </p>
            </div>
            <a href="https://www.youtube.com/watch?v=WXuK6gekU1Y" target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative aspect-video">
                <img
                  src="https://img.youtube.com/vi/WXuK6gekU1Y/0.jpg"
                  alt="AI video thumbnail"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://img.youtube.com/vi/WXuK6gekU1Y/hqdefault.jpg";
                  }}
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
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 hover:bg-opacity-20 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                    <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-red-600 ml-1"></div>
                  </div>
                </div>
              </div>
            </a>
          </div>
    
          {/* FAQ Section */}
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm rounded-lg p-6 w-full max-w-3xl mx-auto mb-12 transition-all duration-300 border ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
            <h2 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h2>
            <div className="space-y-1">
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
          
          {/* Contribute CTA */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setIsContributionModalOpen(true)}
              className={`flex items-center justify-center px-6 py-3 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white shadow-sm transition-all duration-300`}
            >
              <GitBranch className="w-5 h-5 mr-2" />
              <span className="text-base font-medium">Contribute to Roadmap</span>
            </button>
          </div>
        </main>
        
        {/* Footer */}
        <footer className={`py-6 ${darkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-100'}`}>
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              © {new Date().getFullYear()} mldl.study • Built with ❤️ by <a href="https://www.linkedin.com/in/anshaneja5" target="_blank" rel="noopener noreferrer" className={`hover:underline ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Ansh Aneja</a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;