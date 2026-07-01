import React, { useState } from 'react';
import { Book, ExternalLink, ChevronDown, Search as SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import researchPapers from '../../categorizedRPContent';
import Navbar from './Navbar';
import Footer from './Footer';
import BrutalBackground from './BrutalBackground';
import BackToTopButton from './BackToTopButton';
import useDarkMode from './useDarkMode';

const CATEGORY_NAMES = {
  foundational_papers: 'Foundational Papers',
  neural_networks_and_deep_learning: 'Neural Networks and Deep Learning',
  language_models_and_nlp: 'Language Models and NLP',
  sequence_models: 'Sequence Models',
  machine_learning_theory: 'Machine Learning Theory',
  memory_and_attention: 'Memory and Attention',
  specialized_applications: 'Specialized Applications',
  technical_resources: 'Technical Resources',
  complexity_and_systems: 'Complexity and Systems',
};

// rotating loud accent fills so each category reads distinctly
const ACCENTS = [
  'bg-acid text-[#0a0a0a]',
  'bg-electric text-white',
  'bg-hot-pink text-white',
  'bg-cyber-yellow text-[#0a0a0a]',
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.28, ease: 'easeOut' } }),
};

const ResearchPaper = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryClick = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const filterPapers = () => {
    if (!searchTerm) return researchPapers;
    const results = {};
    Object.entries(researchPapers).forEach(([category, papers]) => {
      const filtered = papers.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
      if (filtered.length > 0) results[category] = filtered;
    });
    return results;
  };

  const filteredContent = filterPapers();
  const entries = Object.entries(filteredContent);
  // keep accent stable per category regardless of filtering
  const accentFor = (key) => ACCENTS[Object.keys(CATEGORY_NAMES).indexOf(key) % ACCENTS.length];

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
        <link rel="canonical" href="https://mldl.study/researchpapers" />
      </Helmet>

      <BrutalBackground />

      <div className="flex min-h-screen flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="mx-auto w-full max-w-5xl flex-grow px-4 pb-20 pt-10 sm:pt-14">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mx-auto mb-10 max-w-2xl text-center"
          >
            <span className="brut-chip mb-4 bg-pastel-yellow">
              Paper Library
            </span>
            <h1 className="font-display text-4xl uppercase tracking-tight text-ink sm:text-5xl">
              Research <span className="inline-block rotate-[-1deg] bg-hot-pink px-2 text-white shadow-brut-sm">Papers</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-soft">
              A curated collection of essential papers in AI and Machine Learning — from the foundations to the frontier.
            </p>

            <div className="relative mx-auto mt-7 max-w-xl">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-faint" />
              <input
                type="text"
                placeholder="Search papers by title…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-[3px] border-ink bg-surface py-3.5 pl-12 pr-4 text-ink shadow-brut-sm outline-none placeholder:text-faint"
              />
            </div>
          </motion.div>

          {/* Categories */}
          {entries.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mb-4 text-5xl">🔍</div>
              <h3 className="font-display text-xl uppercase text-ink">No papers found</h3>
              <p className="mt-2 text-soft">Try a different title or keyword.</p>
            </div>
          ) : (
            <div className="grid gap-5">
              {entries.map(([key, papers], i) => {
                const isOpen = expandedCategory === key;
                const accent = accentFor(key);
                return (
                  <motion.div
                    key={key}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="brut-card overflow-hidden"
                  >
                    <button
                      onClick={() => handleCategoryClick(key)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-150 hover:bg-surface-soft sm:px-6"
                    >
                      <div className="flex items-center gap-4">
                        <span className={`grid h-11 w-11 shrink-0 place-items-center border-[3px] border-[#0a0a0a] shadow-brut-sm ${accent}`}>
                          <Book className="h-5 w-5" />
                        </span>
                        <div>
                          <h2 className="font-display text-lg uppercase text-ink sm:text-xl">{CATEGORY_NAMES[key] || key}</h2>
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-faint">{papers.length} papers</span>
                        </div>
                      </div>
                      <span className={`grid h-9 w-9 shrink-0 place-items-center border-2 border-ink bg-surface text-soft transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown className="h-5 w-5" />
                      </span>
                    </button>

                    <div className={`grid transition-all duration-200 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="grid gap-3 px-5 pb-5 sm:px-6">
                          {papers.map((paper, index) => (
                            <div
                              key={index}
                              className="flex flex-col items-start justify-between gap-3 border-2 border-ink bg-surface-soft p-4 transition-colors duration-150 hover:bg-surface sm:flex-row sm:items-center sm:p-5"
                            >
                              <h3 className="font-medium text-ink">{paper.title}</h3>
                              <a
                                href={paper.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex shrink-0 items-center gap-2 border-2 border-[#0a0a0a] px-4 py-2 text-sm font-bold uppercase shadow-brut-sm transition-transform duration-150 hover:-translate-y-0.5 ${accent}`}
                              >
                                Read Paper <ExternalLink className="h-4 w-4" />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </main>

        <Footer darkMode={darkMode} />
      </div>

      <BackToTopButton />
    </>
  );
};

export default ResearchPaper;
