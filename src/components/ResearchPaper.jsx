import { useState, useEffect } from 'react';
import { Book, ExternalLink, ChevronDown, Search } from 'lucide-react';
import researchPapers from "../../categorizedRPContent";
import Navbar from './Navbar';
import { Helmet } from 'react-helmet';
import { getInitialTheme, applyTheme, setupThemeListener } from '../utils/themeUtils';

const ResearchPaper = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    applyTheme(newDarkMode, true);
  };

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setDarkMode(initialTheme);
    applyTheme(initialTheme, false);
    
    const removeThemeListener = setupThemeListener((isDark) => {
      setDarkMode(isDark);
      applyTheme(isDark, false);
    });

    return () => {
      removeThemeListener();
    };
  }, []);

  const categoryInfo = {
    "foundational_papers": {
      name: "Foundational Papers",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      lightBg: "bg-gradient-to-br from-blue-50 to-white",
      darkBg: "dark:from-gray-800 dark:to-gray-900",
      borderColor: "border-blue-200 dark:border-blue-900"
    },
    "neural_networks_and_deep_learning": {
      name: "Neural Networks and Deep Learning",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      lightBg: "bg-gradient-to-br from-blue-50 to-white",
      darkBg: "dark:from-gray-800 dark:to-gray-900",
      borderColor: "border-blue-200 dark:border-blue-900"
    },
    "language_models_and_nlp": {
      name: "Language Models and NLP",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      lightBg: "bg-gradient-to-br from-blue-50 to-white",
      darkBg: "dark:from-gray-800 dark:to-gray-900",
      borderColor: "border-blue-200 dark:border-blue-900"
    },
    "sequence_models": {
      name: "Sequence Models",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      lightBg: "bg-gradient-to-br from-blue-50 to-white",
      darkBg: "dark:from-gray-800 dark:to-gray-900",
      borderColor: "border-blue-200 dark:border-blue-900"
    },
    "machine_learning_theory": {
      name: "Machine Learning Theory",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      lightBg: "bg-gradient-to-br from-blue-50 to-white",
      darkBg: "dark:from-gray-800 dark:to-gray-900",
      borderColor: "border-blue-200 dark:border-blue-900"
    },
    "memory_and_attention": {
      name: "Memory and Attention",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      lightBg: "bg-gradient-to-br from-blue-50 to-white",
      darkBg: "dark:from-gray-800 dark:to-gray-900",
      borderColor: "border-blue-200 dark:border-blue-900"
    },
    "specialized_applications": {
      name: "Specialized Applications",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      lightBg: "bg-gradient-to-br from-blue-50 to-white",
      darkBg: "dark:from-gray-800 dark:to-gray-900",
      borderColor: "border-blue-200 dark:border-blue-900"
    },
    "technical_resources": {
      name: "Technical Resources",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      lightBg: "bg-gradient-to-br from-blue-50 to-white",
      darkBg: "dark:from-gray-800 dark:to-gray-900",
      borderColor: "border-blue-200 dark:border-blue-900"
    },
    "complexity_and_systems": {
      name: "Complexity and Systems",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      lightBg: "bg-gradient-to-br from-blue-50 to-white",
      darkBg: "dark:from-gray-800 dark:to-gray-900",
      borderColor: "border-blue-200 dark:border-blue-900"
    }
  };

  const handleCategoryClick = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const filterPapers = () => {
    if (!searchTerm) return researchPapers;
    
    const results = {};
    Object.entries(researchPapers).forEach(([category, papers]) => {
      const filteredPapers = papers.filter(paper =>
        paper.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredPapers.length > 0) {
        results[category] = filteredPapers;
      }
    });
    return results;
  };

  const filteredContent = filterPapers();

  return (
    <>
      <Helmet>
        <title>Research Papers Library | AI and ML Papers</title>
        <meta
          name="description"
          content="A curated collection of essential papers in AI and Machine Learning. Access foundational research and cutting-edge developments in the field."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://mldl.study/papers" />
      </Helmet>

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} isTransitioning={false} />

      <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              Research Papers Library
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8 text-lg">
              A curated collection of essential papers in AI and Machine Learning
            </p>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search papers by title..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 
                          bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                          shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent
                          transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-6 sm:gap-8">
            {Object.entries(filteredContent).map(([categoryKey, papers]) => {
              const category = categoryInfo[categoryKey];
              return (
                <div 
                  key={categoryKey}
                  className={`rounded-xl border ${category.borderColor} 
                             ${darkMode ? category.darkBg : category.lightBg} 
                             shadow-sm hover:shadow-md transition-all duration-300`}
                >              
                  <button 
                    className="w-full px-4 py-5 sm:px-6 cursor-pointer transition-colors duration-200"
                    onClick={() => handleCategoryClick(categoryKey)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center text-white shadow-sm`}>
                          <Book className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col items-start">
                          <h2 className="text-lg sm:text-xl font-semibold text-left">{category.name}</h2>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {papers.length} papers
                          </span>
                        </div>
                      </div>
                      <div className={`${category.color} bg-opacity-10 rounded-full p-2 transition-transform duration-200 
                                   ${expandedCategory === categoryKey ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  </button>
                  {expandedCategory === categoryKey && (
                    <div className="px-4 pb-5 sm:px-6">
                      <div className="grid gap-4">
                        {papers.map((paper, index) => (
                          <div
                            key={index}
                            className="bg-white dark:bg-gray-800/50 rounded-xl p-4 sm:p-5
                                     shadow-sm hover:shadow-md transition-all duration-200
                                     border border-gray-100 dark:border-gray-700"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <h3 className="font-medium text-lg text-gray-900 dark:text-white">{paper.title}</h3>
                              <a
                                href={paper.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${category.color} ${category.hoverColor} text-white
                                          flex items-center justify-center space-x-2 
                                          rounded-lg px-4 py-2 shadow-sm 
                                          transition-all duration-200`}
                              >
                                <span>Read Paper</span>
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResearchPaper;
