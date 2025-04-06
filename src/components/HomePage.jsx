import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { Sun, Moon, ChevronDown, ChevronUp, X, GitBranch, BookOpen, Map, ArrowRight, Sparkles, Zap, Book, Code, Brain } from 'lucide-react';
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
  const [activeRoadmap, setActiveRoadmap] = useState(null);

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

  const roadmaps = [
    {
      id: 'prerequisites',
      title: 'Prerequisites',
      description: 'Master the foundational math and programming skills needed for ML',
      icon: <Book className="w-6 h-6" />,
      path: '/prerequisites',
      color: 'from-emerald-500 to-teal-500',
      hoverColor: 'hover:from-emerald-600 hover:to-teal-600',
      darkHoverColor: 'dark:hover:from-emerald-400 dark:hover:to-teal-400'
    },
    {
      id: 'machinelearning',
      title: 'Machine Learning',
      description: 'Learn the core concepts and algorithms of machine learning',
      icon: <Brain className="w-6 h-6" />,
      path: '/machinelearning',
      color: 'from-blue-500 to-indigo-500',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-600',
      darkHoverColor: 'dark:hover:from-blue-400 dark:hover:to-indigo-400'
    },
    {
      id: 'deeplearning',
      title: 'Deep Learning',
      description: 'Explore neural networks and advanced deep learning techniques',
      icon: <Zap className="w-6 h-6" />,
      path: '/deeplearning',
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-600 hover:to-pink-600',
      darkHoverColor: 'dark:hover:from-purple-400 dark:hover:to-pink-400'
    },
    {
      id: 'genai',
      title: 'Generative AI',
      description: 'Discover the latest in generative AI and transformer models',
      icon: <Sparkles className="w-6 h-6" />,
      path: '/genai',
      color: 'from-amber-500 to-orange-500',
      hoverColor: 'hover:from-amber-600 hover:to-orange-600',
      darkHoverColor: 'dark:hover:from-amber-400 dark:hover:to-orange-400'
    }
  ];

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
          <header className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium">
              AI Learning Roadmap
            </div>
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Your Path to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">AI Mastery</span>
            </h1>
            <p className={`text-lg mb-8 max-w-xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Transform from beginner to AI professional with structured learning paths designed for practical, hands-on mastery.
            </p>
            <div className='flex justify-center items-center space-x-2'>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium inline-flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-2"></span>100% Free
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mx-2"></span>Community-Driven
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mx-2"></span>Real-World Skills
              </span>
            </div>
          </header>
          
          {/* Roadmap Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full mb-20">
            {roadmaps.map((roadmap) => (
              <Link 
                key={roadmap.id}
                to={roadmap.path}
                className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-sm hover:shadow-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                onMouseEnter={() => setActiveRoadmap(roadmap.id)}
                onMouseLeave={() => setActiveRoadmap(null)}
              >
                <div className="flex items-start">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${roadmap.color} text-white mr-4`}>
                    {roadmap.icon}
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {roadmap.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {roadmap.description}
                    </p>
                  </div>
                </div>
                <div className={`absolute bottom-0 right-0 p-2 rounded-tl-lg bg-gradient-to-r ${roadmap.color} text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
          
          {/* Feature Section */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm rounded-xl p-8 w-full max-w-4xl mx-auto mb-16 transition-all duration-300 border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>What's in These Roadmaps?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-lg bg-blue-500 text-white mr-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Video Lectures</h3>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Curated video content from top educators and practitioners in the field
                </p>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-lg bg-purple-500 text-white mr-3">
                    <Code className="w-5 h-5" />
                  </div>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Hands-on Projects</h3>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Practical exercises and real-world projects to apply your knowledge
                </p>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-lg bg-amber-500 text-white mr-3">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Research Papers</h3>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Access to foundational and cutting-edge research in AI and ML
                </p>
              </div>
            </div>
          </div>
          
          {/* Video Section */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm rounded-xl overflow-hidden w-full max-w-4xl mx-auto mb-16 transition-all duration-300 border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <div className="p-6">
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Watch This Before You Start!</h2>
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
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-30 transition-all duration-300">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="white" 
                        className="w-12 h-12 ml-1"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-red-600 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      WATCH
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
    
          {/* FAQ Section */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm rounded-xl p-8 w-full max-w-4xl mx-auto mb-16 transition-all duration-300 border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h2>
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
              className={`flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-sm transition-all duration-300`}
            >
              <GitBranch className="w-5 h-5 mr-2" />
              <span className="text-base font-medium">Contribute to Roadmap</span>
            </button>
          </div>
        </main>
        
        {/* Footer */}
        <footer className={`py-6 ${darkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-100'}`}>
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