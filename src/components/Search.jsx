import { useState, useEffect, useCallback, useMemo } from 'react';
import { Search as SearchIcon, X, ExternalLink, BookOpen, Brain, Zap, Sparkles, Book, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import BrutalBackground from './BrutalBackground';
import useDarkMode from './useDarkMode';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga4';

// Import all categorized content
import categorizedMLContent from '../../categorizedMLContent';
import categorizedDLContent from '../../categorizedDLContent';
import categorizedGenAIContent from '../../categorizedGenAIContent';
import categorizedPrerequisiteContent from '../../categorizedPrerequisiteContent';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' } }),
};

const Search = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });

  const [darkMode, toggleDarkMode] = useDarkMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Function to get roadmap icon and color
  const getRoadmapInfo = (roadmapType) => {
    const roadmapData = {
      'Machine Learning': {
        icon: <Brain className="h-3.5 w-3.5" />,
        color: 'bg-electric text-white border-[#0a0a0a]',
        path: '/machinelearning'
      },
      'Deep Learning': {
        icon: <Zap className="h-3.5 w-3.5" />,
        color: 'bg-hot-pink text-white border-[#0a0a0a]',
        path: '/deeplearning'
      },
      'Generative AI': {
        icon: <Sparkles className="h-3.5 w-3.5" />,
        color: 'bg-cyber-yellow text-[#0a0a0a] border-[#0a0a0a]',
        path: '/genai'
      },
      'Prerequisites': {
        icon: <Book className="h-3.5 w-3.5" />,
        color: 'bg-pastel-mint text-ink border-ink',
        path: '/prerequisites'
      }
    };
    return roadmapData[roadmapType] || {
      icon: <BookOpen className="h-3.5 w-3.5" />,
      color: 'bg-surface text-ink border-ink',
      path: '/'
    };
  };

  // Search function
  const performSearch = useCallback((query) => {
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
            // Determine match type with priority: title > articleTitle > category > notes
            let matchType = 'content';
            if (titleMatches) matchType = 'title';
            else if (articleTitleMatches) matchType = 'articleTitle';
            else if (categoryMatches) matchType = 'category';
            else if (notesMatches) matchType = 'notes';

            results.push({
              ...video,
              category,
              roadmapType,
              matchType
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
  }, []);

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

  // Group results by roadmap, then by category (presentation-only, derived at render time)
  const groupedResults = useMemo(() => {
    const order = ['Prerequisites', 'Machine Learning', 'Deep Learning', 'Generative AI'];
    const byRoadmap = {};
    searchResults.forEach((result) => {
      const rt = result.roadmapType || 'Other';
      if (!byRoadmap[rt]) byRoadmap[rt] = {};
      const cat = result.category || 'General';
      if (!byRoadmap[rt][cat]) byRoadmap[rt][cat] = [];
      byRoadmap[rt][cat].push(result);
    });
    return Object.keys(byRoadmap)
      .sort((a, b) => {
        const ia = order.indexOf(a);
        const ib = order.indexOf(b);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      })
      .map((roadmapType) => ({
        roadmapType,
        count: Object.values(byRoadmap[roadmapType]).reduce((acc, arr) => acc + arr.length, 0),
        categories: byRoadmap[roadmapType],
      }));
  }, [searchResults]);

  return (
    <>
      <Helmet>
        <title>Search Resources | MLDL.Study</title>
        <meta
          name="description"
          content="Search across Machine Learning, Deep Learning, and AI learning resources. Find videos, articles, and tutorials on specific topics."
        />
      </Helmet>

      <BrutalBackground />

      <div className="flex min-h-screen flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="mx-auto w-full max-w-7xl flex-grow px-4 pb-20 pt-10 sm:pt-14">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mx-auto mb-8 max-w-2xl text-center"
          >
            <span className="brut-chip mb-4">
              <SearchIcon className="h-3.5 w-3.5" /> Global search
            </span>
            <h1 className="font-display text-4xl uppercase tracking-tight text-ink sm:text-5xl">
              Search{' '}
              <span className="inline-block rotate-[-1deg] bg-electric px-2 text-white shadow-brut-sm">resources</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-soft">
              Find topics across ML, DL, GenAI, and Prerequisites roadmaps.
            </p>
          </motion.div>

          {/* Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05, ease: 'easeOut' }}
            className="mx-auto mb-10 max-w-2xl"
          >
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-faint" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for topics, concepts, algorithms…"
                className="w-full border-[3px] border-ink bg-surface py-4 pl-14 pr-14 text-base text-ink shadow-brut outline-none placeholder:text-faint"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center border-2 border-ink bg-surface text-soft transition-colors duration-150 hover:bg-hot-pink hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Search Results */}
          <div className="mx-auto max-w-4xl">
            {!searchQuery && (
              <div className="brut-card mx-auto max-w-xl px-6 py-14 text-center">
                <span className="mx-auto mb-5 grid h-16 w-16 place-items-center border-[3px] border-[#0a0a0a] bg-electric text-white shadow-brut-sm">
                  <SearchIcon className="h-8 w-8" />
                </span>
                <p className="font-display text-lg uppercase text-ink">Start typing to search</p>
                <p className="mt-2 text-sm text-soft">
                  Search across all learning resources — videos, articles, and notes.
                </p>
              </div>
            )}

            {searchQuery && isSearching && (
              <div className="brut-card mx-auto max-w-xl px-6 py-14 text-center">
                <div className="mx-auto h-10 w-10 animate-spin border-[3px] border-[#0a0a0a] bg-acid" />
                <p className="mt-4 font-mono text-sm font-bold uppercase text-soft">Searching…</p>
              </div>
            )}

            {searchQuery && !isSearching && searchResults.length === 0 && (
              <div className="brut-card mx-auto max-w-xl px-6 py-14 text-center">
                <div className="mb-4 text-5xl">🔍</div>
                <p className="font-display text-lg uppercase text-ink">
                  No results found for &quot;{searchQuery}&quot;
                </p>
                <p className="mt-2 text-sm text-soft">
                  Try different keywords or check your spelling.
                </p>
              </div>
            )}

            {searchQuery && !isSearching && searchResults.length > 0 && (
              <>
                <p className="mb-6 font-mono text-sm font-bold uppercase tracking-wider text-soft">
                  Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                </p>

                <div className="space-y-6">
                  {groupedResults.map((group, gi) => {
                    const roadmapInfo = getRoadmapInfo(group.roadmapType);
                    return (
                      <motion.section
                        key={group.roadmapType}
                        custom={gi}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="brut-card p-5 sm:p-6"
                      >
                        {/* Roadmap group header */}
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className={`grid h-10 w-10 shrink-0 place-items-center border-2 shadow-brut-sm ${roadmapInfo.color}`}>
                              {roadmapInfo.icon}
                            </span>
                            <div>
                              <h2 className="font-display text-lg uppercase text-ink">{group.roadmapType}</h2>
                              <p className="font-mono text-xs font-bold text-faint">
                                {group.count} result{group.count !== 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                          <Link
                            to={roadmapInfo.path}
                            className="brut-chip shrink-0 transition-transform duration-150 hover:-translate-y-0.5"
                          >
                            View roadmap
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>

                        {/* Categories within roadmap */}
                        <div className="space-y-4">
                          {Object.entries(group.categories).map(([category, items]) => (
                            <div key={category}>
                              <span className="mb-2 inline-flex items-center border-2 border-ink bg-surface-soft px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-soft">
                                {category}
                              </span>
                              <div className="space-y-2.5">
                                {items.map((result, index) => (
                                  <div
                                    key={`${category}-${index}`}
                                    className="border-2 border-ink bg-surface-soft p-4 transition-colors duration-150 hover:bg-surface"
                                  >
                                    {/* Title as accent external link (falls back to plain text / article link) */}
                                    {result.url ? (
                                      <a
                                        href={result.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-start gap-1.5 font-bold text-hot-pink"
                                      >
                                        <span className="leading-snug">{result.title}</span>
                                        <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 opacity-70 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                      </a>
                                    ) : result.articleLink ? (
                                      <a
                                        href={result.articleLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-start gap-1.5 font-bold text-hot-pink"
                                      >
                                        <span className="leading-snug">{result.title}</span>
                                        <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 opacity-70 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                      </a>
                                    ) : (
                                      <span className="font-bold leading-snug text-ink">{result.title}</span>
                                    )}

                                    {/* Secondary links */}
                                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                                      {result.url && (
                                        <a
                                          href={result.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 border-2 border-ink bg-surface px-3 py-1 text-xs font-bold uppercase text-ink transition-transform duration-150 hover:-translate-y-0.5"
                                        >
                                          <ExternalLink className="h-3.5 w-3.5" />
                                          Watch Video
                                        </a>
                                      )}
                                      {result.articleLink && (
                                        <a
                                          href={result.articleLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 border-2 border-ink bg-surface px-3 py-1 text-xs font-bold uppercase text-ink transition-transform duration-150 hover:-translate-y-0.5"
                                        >
                                          <BookOpen className="h-3.5 w-3.5" />
                                          {result.articleTitle || 'Read Article'}
                                        </a>
                                      )}
                                    </div>

                                    {/* Notes */}
                                    {result.notes && (
                                      <p className="mt-3 border-2 border-ink bg-pastel-yellow p-3 text-sm leading-relaxed text-ink">
                                        <span className="font-bold">Note: </span>
                                        {result.notes}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.section>
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
