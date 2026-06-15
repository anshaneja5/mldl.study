import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { Bookmark, Trash2, ExternalLink, BookOpen, Brain, Zap, Sparkles, Book, Pin } from 'lucide-react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import AuroraBackground from './AuroraBackground';
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
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
        icon: <Brain className="w-4 h-4" />,
        color: 'from-blue-500 to-indigo-500',
        path: '/machinelearning'
      },
      'Deep Learning': {
        icon: <Zap className="w-4 h-4" />,
        color: 'from-purple-500 to-pink-500',
        path: '/deeplearning'
      },
      'Generative AI': {
        icon: <Sparkles className="w-4 h-4" />,
        color: 'from-amber-500 to-orange-500',
        path: '/genai'
      },
      'Prerequisites': {
        icon: <Book className="w-4 h-4" />,
        color: 'from-emerald-500 to-teal-500',
        path: '/prerequisites'
      }
    };
    return roadmapData[roadmapType] || {
      icon: <BookOpen className="w-4 h-4" />,
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

      <AuroraBackground />

      <div className="flex min-h-screen flex-col">
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isTransitioning={isTransitioning}
        />

        <main className="mx-auto w-full max-w-7xl flex-grow px-4 pb-20 pt-10 sm:pt-14">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-aurora-violet to-aurora-cyan text-[#06070f] shadow-glow">
                  <Bookmark className="h-6 w-6" />
                </span>
                <motion.h1 variants={fadeUp} custom={0} className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                  Your <span className="text-aurora">Bookmarks</span>
                </motion.h1>
              </div>
              {bookmarks.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear all bookmarks? This action cannot be undone.')) {
                      clearAllBookmarks();
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl glass px-4 py-2.5 text-sm font-medium text-soft transition-all duration-200 hover:text-rose-400 hover:shadow-glow"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </button>
              )}
            </div>
            <motion.p variants={fadeUp} custom={1} className="max-w-xl text-lg leading-relaxed text-soft">
              Your saved learning resources for quick access.
            </motion.p>
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
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                    filterRoadmap === type
                      ? 'bg-gradient-to-r from-aurora-violet to-aurora-cyan text-[#06070f] shadow-glow'
                      : 'glass text-soft hover:text-ink'
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
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] hover:shadow-glow"
                  >
                    {/* Roadmap Badge */}
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${roadmapInfo.color} px-3 py-1 text-xs font-medium text-[#06070f]`}>
                          {roadmapInfo.icon}
                          <span>{bookmark.roadmapType}</span>
                        </div>
                        <span className="rounded-full glass px-3 py-1 text-xs text-soft">
                          {bookmark.category}
                        </span>
                      </div>
                      <button
                        onClick={() => removeBookmark(bookmark.bookmarkId)}
                        className="grid h-9 w-9 place-items-center rounded-xl glass text-soft transition-all duration-200 hover:text-rose-400 hover:shadow-glow"
                        title="Remove bookmark"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Resource Title */}
                    <h3 className="mb-3 font-display text-lg font-semibold text-ink">
                      {bookmark.title}
                    </h3>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3">
                      {bookmark.url && (
                        <a
                          href={bookmark.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl glass px-3 py-2 text-sm font-medium text-aurora transition-all duration-200 hover:shadow-glow"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Watch Video
                        </a>
                      )}
                      {bookmark.articleLink && bookmark.articleTitle && (
                        <a
                          href={bookmark.articleLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl glass px-3 py-2 text-sm font-medium text-emerald-400 transition-all duration-200 hover:shadow-glow"
                        >
                          <BookOpen className="h-4 w-4" />
                          Read Article
                        </a>
                      )}
                    </div>

                    {/* Notes */}
                    {bookmark.notes && (
                      <div className="mt-3 flex items-start gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3">
                        <Pin className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                        <p className="text-sm text-rose-300">{bookmark.notes}</p>
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
              className="glass glass-sheen mx-auto max-w-xl rounded-3xl px-6 py-16 text-center"
            >
              <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl glass text-soft">
                <Bookmark className="h-8 w-8" />
              </span>
              <h3 className="mb-2 font-display text-xl font-semibold text-ink">
                {filterRoadmap === 'all' ? 'No Bookmarks Yet' : `No ${filterRoadmap} Bookmarks`}
              </h3>
              <p className="mb-6 text-soft">
                {filterRoadmap === 'all'
                  ? 'Start bookmarking resources from the roadmaps to build your personalized learning collection.'
                  : `No bookmarked resources found for ${filterRoadmap}.`
                }
              </p>
              {filterRoadmap === 'all' && (
                <Link
                  to="/"
                  className="btn-aurora rounded-2xl px-6 py-3 text-[15px]"
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
