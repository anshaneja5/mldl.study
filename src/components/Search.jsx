import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, X, ExternalLink, BookOpen, Brain, Zap, Sparkles, Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga4';

// Import all categorized content
import categorizedMLContent from '../../categorizedMLContent';
import categorizedDLContent from '../../categorizedDLContent';
import categorizedGenAIContent from '../../categorizedGenAIContent';
import categorizedPrerequisiteContent from '../../categorizedPrerequisiteContent';

const Search = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    const shouldUseDarkMode = savedDarkMode === null ? true : savedDarkMode === 'true';
    setDarkMode(shouldUseDarkMode);
    document.documentElement.classList.toggle('dark', shouldUseDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  // Function to get roadmap icon and color
  const getRoadmapInfo = (roadmapType) => {
    const roadmapData = {
      'Machine Learning': {
        icon: <Brain className="w-5 h-5" />,
        color: 'from-blue-500 to-indigo-500',
        path: '/machinelearning'
      },
      'Deep Learning': {
        icon: <Zap className="w-5 h-5" />,
        color: 'from-purple-500 to-pink-500',
        path: '/deeplearning'
      },
      'Generative AI': {
        icon: <Sparkles className="w-5 h-5" />,
        color: 'from-amber-500 to-orange-500',
        path: '/genai'
      },
      'Prerequisites': {
        icon: <Book className="w-5 h-5" />,
        color: 'from-emerald-500 to-teal-500',
        path: '/prerequisites'
      }
    };
    return roadmapData[roadmapType] || {
      icon: <BookOpen className="w-5 h-5" />,
      color: 'from-gray-500 to-gray-600',
      path: '/'
    };
  };

  // Search function
  const performSearch = (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const results = [];
    const searchTerm = query.toLowerCase();

    // Helper function to search in a categorized content object
    const searchInContent = (content, roadmapType) => {
      Object.entries(content).forEach(([category, videos]) => {
        // Check if category matches
        const categoryMatches = category.toLowerCase().includes(searchTerm);
        
        // Search through videos in this category
        videos.forEach((video) => {
          const titleMatches = video.title?.toLowerCase().includes(searchTerm);
          const articleTitleMatches = video.articleTitle?.toLowerCase().includes(searchTerm);
          const notesMatches = video.notes?.toLowerCase().includes(searchTerm);
          
          if (titleMatches || articleTitleMatches || notesMatches || categoryMatches) {
            results.push({
              ...video,
              category,
              roadmapType,
              matchType: titleMatches ? 'title' : categoryMatches ? 'category' : 'content'
            });
          }
        });
      });
    };

    // Search across all content
    searchInContent(categorizedMLContent, 'Machine Learning');
    searchInContent(categorizedDLContent, 'Deep Learning');
    searchInContent(categorizedGenAIContent, 'Generative AI');
    searchInContent(categorizedPrerequisiteContent, 'Prerequisites');

    setSearchResults(results);
    setIsSearching(false);
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <>
      <Helmet>
        <title>Search Resources | MLDL.Study</title>
        <meta 
          name="description" 
          content="Search across Machine Learning, Deep Learning, and AI learning resources. Find videos, articles, and tutorials on specific topics."
        />
      </Helmet>

      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-slate-50 text-gray-900'}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
          {/* Search Header */}
          <div className="mb-8 text-center">
            <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Search Learning Resources
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Find topics across ML, DL, GenAI, and Prerequisites roadmaps
            </p>
          </div>

          {/* Search Input */}
          <div className="mb-8">
            <div className={`relative max-w-2xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
              <SearchIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for topics, concepts, algorithms..."
                className={`w-full pl-12 pr-12 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Search Results */}
          <div className="space-y-4">
            {!searchQuery && (
              <div className="text-center py-12">
                <SearchIcon className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Start typing to search across all learning resources
                </p>
              </div>
            )}

            {searchQuery && isSearching && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Searching...</p>
              </div>
            )}

            {searchQuery && !isSearching && searchResults.length === 0 && (
              <div className="text-center py-12">
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No results found for &quot;{searchQuery}&quot;
                </p>
                <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Try different keywords or check your spelling
                </p>
              </div>
            )}

            {searchQuery && !isSearching && searchResults.length > 0 && (
              <>
                <div className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                </div>
                
                <div className="space-y-4">
                  {searchResults.map((result, index) => {
                    const roadmapInfo = getRoadmapInfo(result.roadmapType);
                    return (
                      <div
                        key={index}
                        className={`p-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
                      >
                        {/* Roadmap Badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${roadmapInfo.color} text-white text-xs font-medium flex items-center gap-1`}>
                            {roadmapInfo.icon}
                            <span>{result.roadmapType}</span>
                          </div>
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {result.category}
                          </span>
                        </div>

                        {/* Video Title */}
                        <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {result.title}
                        </h3>

                        {/* Links */}
                        <div className="flex flex-wrap gap-3 mt-3">
                          {result.url && (
                            <a
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                            >
                              <ExternalLink className="w-4 h-4" />
                              Watch Video
                            </a>
                          )}
                          {result.articleLink && (
                            <a
                              href={result.articleLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${darkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'}`}
                            >
                              <BookOpen className="w-4 h-4" />
                              {result.articleTitle || 'Read Article'}
                            </a>
                          )}
                          <Link
                            to={roadmapInfo.path}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                          >
                            View Roadmap
                          </Link>
                        </div>

                        {/* Notes */}
                        {result.notes && (
                          <div className={`mt-3 p-3 rounded-md text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
                            <span className="font-medium">Note: </span>
                            {result.notes}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </>
  );
};

export default Search;
