import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { Bookmark, Trash2, ExternalLink, BookOpen, Brain, Zap, Sparkles, Book, Pin } from 'lucide-react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import BrutalBackground from './BrutalBackground';
import useDarkMode from './useDarkMode';
import BackToTopButton from './BackToTopButton';
import { useBookmarks } from '../contexts/BookmarksContext';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.25,
      ease: "easeOut",
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.3, ease: 'easeOut' } }),
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
        color: 'bg-electric text-white border-[#0a0a0a]',
        path: '/machinelearning'
      },
      'Deep Learning': {
        icon: <Zap className="w-4 h-4" />,
        color: 'bg-hot-pink text-white border-[#0a0a0a]',
        path: '/deeplearning'
      },
      'Generative AI': {
        icon: <Sparkles className="w-4 h-4" />,
        color: 'bg-cyber-yellow text-[#0a0a0a] border-[#0a0a0a]',
        path: '/genai'
      },
      'Prerequisites': {
        icon: <Book className="w-4 h-4" />,
        color: 'bg-pastel-mint text-ink border-ink',
        path: '/prerequisites'
      }
    };
    return roadmapData[roadmapType] || {
      icon: <BookOpen className="w-4 h-4" />,
      color: 'bg-surface text-ink border-ink',
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

      <BrutalBackground />

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
                <span className="grid h-12 w-12 shrink-0 place-items-center border-[3px] border-[#0a0a0a] bg-electric text-white shadow-brut-sm">
                  <Bookmark className="h-6 w-6" />
                </span>
                <motion.h1 variants={fadeUp} custom={0} className="font-display text-4xl uppercase tracking-tight text-ink sm:text-5xl">
                  Your <span className="text-hot-pink">Bookmarks</span>
                </motion.h1>
              </div>
              {bookmarks.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear all bookmarks? This action cannot be undone.')) {
                      clearAllBookmarks();
                    }
                  }}
                  className="brut-btn brut-btn-surface px-4 py-2.5 text-xs"
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
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.25 }}
              className="mb-8 flex flex-wrap gap-2"
            >
              {roadmapTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterRoadmap(type)}
                  className={`border-2 border-ink px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
                    filterRoadmap === type
                      ? 'bg-ink text-canvas shadow-brut-sm'
                      : 'bg-surface text-soft hover:-translate-y-0.5 hover:text-ink'
                  }`}
                >
                  {type === 'all' ? 'All' : type}
                </button>
              ))}
            </motion.div>
          )}

          {/* Bookmarks List */}
          {filteredBookmarks.length > 0 ? (
            <div className="space-y-5">
              {filteredBookmarks.map((bookmark, index) => {
                const roadmapInfo = getRoadmapInfo(bookmark.roadmapType);
                return (
                  <motion.div
                    key={bookmark.bookmarkId}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className={`brut-card brut-hover p-6 ${index % 2 === 0 ? 'rotate-[-0.3deg]' : 'rotate-[0.3deg]'} hover:rotate-0`}
                  >
                    {/* Roadmap Badge */}
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`inline-flex items-center gap-1.5 border-2 px-3 py-1 font-mono text-xs font-bold uppercase shadow-brut-sm ${roadmapInfo.color}`}>
                          {roadmapInfo.icon}
                          <span>{bookmark.roadmapType}</span>
                        </div>
                        <span className="brut-chip">
                          {bookmark.category}
                        </span>
                      </div>
                      <button
                        onClick={() => removeBookmark(bookmark.bookmarkId)}
                        className="grid h-9 w-9 place-items-center border-2 border-ink bg-surface text-soft transition-colors duration-150 hover:bg-hot-pink hover:text-white"
                        title="Remove bookmark"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Resource Title */}
                    <h3 className="mb-3 font-display text-lg uppercase text-ink">
                      {bookmark.title}
                    </h3>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3">
                      {bookmark.url && (
                        <a
                          href={bookmark.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 border-2 border-ink bg-pastel-blue px-3 py-2 text-xs font-bold uppercase text-ink shadow-brut-sm transition-transform duration-150 hover:-translate-y-0.5"
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
                          className="inline-flex items-center gap-1.5 border-2 border-ink bg-pastel-mint px-3 py-2 text-xs font-bold uppercase text-ink shadow-brut-sm transition-transform duration-150 hover:-translate-y-0.5"
                        >
                          <BookOpen className="h-4 w-4" />
                          Read Article
                        </a>
                      )}
                    </div>

                    {/* Notes */}
                    {bookmark.notes && (
                      <div className="mt-3 flex items-start gap-2 border-2 border-ink bg-pastel-yellow p-3">
                        <Pin className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                        <p className="text-sm text-ink">{bookmark.notes}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.25 }}
              className="brut-card mx-auto max-w-xl px-6 py-16 text-center"
            >
              <span className="mx-auto mb-5 grid h-16 w-16 place-items-center border-[3px] border-[#0a0a0a] bg-acid text-[#0a0a0a] shadow-brut-sm">
                <Bookmark className="h-8 w-8" />
              </span>
              <h3 className="mb-2 font-display text-xl uppercase text-ink">
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
                  className="brut-btn px-6 py-3 text-[15px]"
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
