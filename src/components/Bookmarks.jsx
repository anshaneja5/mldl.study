import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { Bookmark, Trash2, ExternalLink, BookOpen, Brain, Zap, Sparkles, Book, AlertCircle } from 'lucide-react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import useDarkMode from './useDarkMode';
import BackToTopButton from './BackToTopButton';
import { useBookmarks } from '../contexts/BookmarksContext';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

const Bookmarks = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  const [darkMode, baseToggleDarkMode] = useDarkMode();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { bookmarks, removeBookmark, clearAllBookmarks } = useBookmarks();
  const [filterRoadmap, setFilterRoadmap] = useState('all');

  const toggleDarkMode = () => {
    setIsTransitioning(true);
    baseToggleDarkMode();
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Get roadmap info
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

  // Filter bookmarks by roadmap
  const filteredBookmarks = filterRoadmap === 'all' 
    ? bookmarks 
    : bookmarks.filter(b => b.roadmapType === filterRoadmap);

  // Get unique roadmap types
  const roadmapTypes = ['all', ...new Set(bookmarks.map(b => b.roadmapType))];

  return (
    <>
      <Helmet>
        <title>My Bookmarks | MLDL.Study</title>
        <meta 
          name="description" 
          content="View and manage your bookmarked learning resources across ML, DL, GenAI, and Prerequisites roadmaps."
        />
      </Helmet>

      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-slate-50 text-gray-900'}`}>
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Navbar 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            isTransitioning={isTransitioning}
          />
        </motion.div>

        <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div className="flex items-center">
                <Bookmark className={`w-8 h-8 mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  My Bookmarks
                </h1>
              </div>
              {bookmarks.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear all bookmarks? This action cannot be undone.')) {
                      clearAllBookmarks();
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              )}
            </div>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your saved learning resources for quick access
            </p>
          </motion.div>

          {/* Filter Buttons */}
          {bookmarks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 flex flex-wrap gap-2"
            >
              {roadmapTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterRoadmap(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterRoadmap === type
                      ? 'bg-blue-500 text-white'
                      : darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {type === 'all' ? 'All' : type}
                </button>
              ))}
            </motion.div>
          )}

          {/* Bookmarks List */}
          {filteredBookmarks.length > 0 ? (
            <div className="space-y-4">
              {filteredBookmarks.map((bookmark, index) => {
                const roadmapInfo = getRoadmapInfo(bookmark.roadmapType);
                return (
                  <motion.div
                    key={bookmark.bookmarkId}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className={`p-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
                  >
                    {/* Roadmap Badge */}
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${roadmapInfo.color} text-white text-xs font-medium flex items-center gap-1`}>
                          {roadmapInfo.icon}
                          <span>{bookmark.roadmapType}</span>
                        </div>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {bookmark.category}
                        </span>
                      </div>
                      <button
                        onClick={() => removeBookmark(bookmark.bookmarkId)}
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode
                            ? 'hover:bg-gray-700 text-gray-400 hover:text-red-400'
                            : 'hover:bg-gray-100 text-gray-500 hover:text-red-500'
                        }`}
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Resource Title */}
                    <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {bookmark.title}
                    </h3>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3">
                      {bookmark.url && (
                        <a
                          href={bookmark.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Watch Video
                        </a>
                      )}
                      {bookmark.articleLink && bookmark.articleTitle && (
                        <a
                          href={bookmark.articleLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${darkMode ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}
                        >
                          <BookOpen className="w-4 h-4" />
                          Read Article
                        </a>
                      )}
                    </div>

                    {/* Notes */}
                    {bookmark.notes && (
                      <div className={`mt-3 p-3 rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{bookmark.notes}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`text-center py-16 px-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <Bookmark className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {filterRoadmap === 'all' ? 'No Bookmarks Yet' : `No ${filterRoadmap} Bookmarks`}
              </h3>
              <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {filterRoadmap === 'all' 
                  ? 'Start bookmarking resources from the roadmaps to build your personalized learning collection'
                  : `No bookmarked resources found for ${filterRoadmap}`
                }
              </p>
              {filterRoadmap === 'all' && (
                <Link 
                  to="/"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium transition-all"
                >
                  Explore Roadmaps
                </Link>
              )}
            </motion.div>
          )}
        </main>

        <BackToTopButton />
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
};

export default Bookmarks;
