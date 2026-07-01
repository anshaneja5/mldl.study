import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';
import { Search as SearchIcon, ArrowRight, Zap, Flame, Share2, Check } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import BrutalBackground from './BrutalBackground';
import Modal from './Modal';
import BackToTopButton from './BackToTopButton';
import ShareDialog from './ShareCard';
import useDarkMode from './useDarkMode';
import { useGamification, XP_PER_RESOURCE } from '../contexts/GamificationContext';

const SITE_URL = 'https://mldl.study';

const DEFAULT_ACCENT = { fill: 'var(--pastel-blue)', loud: '#3300ff' };

const RoadmapView = ({
  topics,
  connections,
  content,
  storageKey,
  title,
  subtitle,
  accent,
  seo,
  next,
  roadmapType,
}) => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });

  const a = { ...DEFAULT_ACCENT, ...(accent || {}) };
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicProgress, setTopicProgress] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [hoveredTopic, setHoveredTopic] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [xpToast, setXpToast] = useState(null); // { amount, key }
  const location = useLocation();
  const { xp, streak, level, levelUp, dismissLevelUp, notifyProgress } = useGamification();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setTopicProgress(JSON.parse(saved));
    } catch (e) {
      console.error('Error loading progress:', e);
    }
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [storageKey]);

  // Deep link from the command palette: /path?topic=<name> opens that topic
  useEffect(() => {
    const wanted = new URLSearchParams(location.search).get('topic');
    if (!wanted) return;
    const match = topics.find((t) => t.name === wanted);
    if (match) setSelectedTopic(match);
  }, [location.search, topics]);

  const topicProgressPct = (name) => {
    const items = content[name] || [];
    if (items.length === 0) return 0;
    const done = items.filter((v) => topicProgress[`${name}_${v.url}`] === true).length;
    return Math.round((done / items.length) * 100);
  };

  const overallProgress = useMemo(() => {
    if (topics.length === 0) return 0;
    const total = topics.reduce((acc, t) => acc + topicProgressPct(t.name), 0);
    return Math.round(total / topics.length);
  }, [topics, topicProgress]);

  const { doneCount, totalCount } = useMemo(() => {
    let done = 0;
    let total = 0;
    for (const [name, items] of Object.entries(content)) {
      total += items.length;
      done += items.filter((v) => topicProgress[`${name}_${v.url}`] === true).length;
    }
    return { doneCount: done, totalCount: total };
  }, [content, topicProgress]);

  const filteredTopics = useMemo(() => {
    let list = topics;
    if (searchTerm) {
      list = topics.filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return [...list].sort((a2, b) => {
      if (sortBy === 'name') return a2.name.localeCompare(b.name);
      if (sortBy === 'progress') return topicProgressPct(b.name) - topicProgressPct(a2.name);
      return a2.id - b.id;
    });
  }, [topics, searchTerm, sortBy, topicProgress]);

  const updateTopicProgress = (topicName, videoUrl, completed, bulkUpdates = null) => {
    try {
      const next2 = bulkUpdates
        ? { ...topicProgress, ...bulkUpdates }
        : { ...topicProgress, [`${topicName}_${videoUrl}`]: completed };
      setTopicProgress(next2);
      localStorage.setItem(storageKey, JSON.stringify(next2));

      // XP toast + streak stamp when something got completed
      let gained = 0;
      if (bulkUpdates) {
        gained = Object.entries(bulkUpdates).filter(
          ([k, v]) => v === true && topicProgress[k] !== true
        ).length;
      } else if (completed === true) {
        gained = 1;
      }
      if (gained > 0) {
        setXpToast({ amount: gained * XP_PER_RESOURCE, key: Date.now() });
      }
      notifyProgress(gained > 0);
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  };

  useEffect(() => {
    if (!xpToast) return;
    const t = setTimeout(() => setXpToast(null), 1600);
    return () => clearTimeout(t);
  }, [xpToast]);

  const neighbors = useMemo(() => {
    const map = {};
    connections.forEach(({ from, to }) => {
      (map[from] = map[from] || new Set()).add(to);
      (map[to] = map[to] || new Set()).add(from);
    });
    return map;
  }, [connections]);

  const visibleIds = new Set(filteredTopics.map((t) => t.id));

  // Normalize the vertical layout so every roadmap fills the panel nicely,
  // regardless of the raw y-range authored in its config.
  const pos = useMemo(() => {
    const ys = topics.map((t) => t.y);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const span = maxY - minY || 1;
    const map = {};
    topics.forEach((t) => {
      map[t.id] = { x: t.x, y: 10 + ((t.y - minY) / span) * 78 };
    });
    return map;
  }, [topics]);

  const edgeStyle = (from, to) => {
    if (hoveredTopic) {
      const touches = from === hoveredTopic.id || to === hoveredTopic.id;
      return touches
        ? { stroke: a.loud, opacity: 1, width: 4 }
        : { stroke: 'var(--ink)', opacity: 0.12, width: 3 };
    }
    return { stroke: 'var(--ink)', opacity: 0.55, width: 3 };
  };

  const isDimmed = (topic) => hoveredTopic && hoveredTopic.id !== topic.id && !neighbors[hoveredTopic.id]?.has(topic.id);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${seo.canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: title, item: seo.canonical },
        ],
      },
      {
        '@type': 'LearningResource',
        '@id': `${seo.canonical}#learning-resource`,
        name: title,
        description: seo.description,
        url: seo.canonical,
        educationalLevel: 'Beginner to Intermediate',
        learningResourceType: 'Roadmap',
        teaches: topics.map((topic) => topic.name),
        provider: {
          '@type': 'Organization',
          name: 'mldl.study',
          url: SITE_URL,
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${seo.canonical}#topics`,
        name: `${title} topics`,
        itemListElement: topics.map((topic, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: topic.name,
        })),
      },
    ],
  };

  const shareCard = {
    headline: title.replace(/ (Roadmap)$/i, '\n$1'),
    pct: overallProgress,
    done: doneCount,
    total: totalCount,
    streak,
    levelName: level.name,
  };

  /* ---------- desktop graph: subway map drawn with a marker ---------- */
  const Graph = () => (
    <div className="brut-card relative mx-auto h-[560px] w-full max-w-6xl overflow-hidden p-4 sm:h-[640px] lg:h-[700px]">
      <svg className="absolute inset-0 h-full w-full" style={{ overflow: 'visible' }} aria-hidden="true">
        {connections.map((conn, i) => {
          const from = pos[conn.from];
          const to = pos[conn.to];
          if (!from || !to || !visibleIds.has(conn.from) || !visibleIds.has(conn.to)) return null;
          const s = edgeStyle(conn.from, conn.to);
          const midY = (from.y + to.y) / 2;
          const seg = { stroke: s.stroke, strokeWidth: s.width, style: { opacity: s.opacity, transition: 'opacity 0.15s' } };
          return (
            <g key={i}>
              <line x1={`${from.x}%`} y1={`${from.y}%`} x2={`${from.x}%`} y2={`${midY}%`} {...seg} />
              <line x1={`${from.x}%`} y1={`${midY}%`} x2={`${to.x}%`} y2={`${midY}%`} {...seg} />
              <line x1={`${to.x}%`} y1={`${midY}%`} x2={`${to.x}%`} y2={`${to.y}%`} {...seg} />
            </g>
          );
        })}
      </svg>

      {filteredTopics.map((topic, i) => {
        const progress = topicProgressPct(topic.name);
        const dimmed = isDimmed(topic);
        const count = content[topic.name]?.length || 0;
        const tilt = topic.id % 2 === 0 ? 'rotate-[1.1deg]' : 'rotate-[-1.2deg]';
        return (
          <motion.div
            key={topic.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos[topic.id].x}%`, top: `${pos[topic.id].y}%` }}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: dimmed ? 0.35 : 1, scale: 1 }}
            transition={{ delay: i * 0.03, duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <button
              onClick={() => setSelectedTopic(topic)}
              onMouseEnter={() => setHoveredTopic(topic)}
              onMouseLeave={() => setHoveredTopic(null)}
              className={`group relative w-[215px] border-[3px] border-ink p-3 text-left shadow-brut-sm transition-all duration-150 hover:rotate-0 hover:shadow-brut ${tilt} hover:-translate-y-1`}
              style={{ background: progress === 100 ? 'var(--pastel-mint)' : a.fill }}
            >
              <span
                className="absolute -left-2.5 -top-2.5 grid h-7 w-7 place-items-center border-2 border-[#0a0a0a] font-mono text-[12px] font-bold text-white"
                style={{ background: a.loud }}
              >
                {topic.id}
              </span>
              {progress === 100 && (
                <span className="absolute -right-2 -top-2 grid h-7 w-7 rotate-12 place-items-center border-2 border-[#0a0a0a] bg-acid text-[#0a0a0a]">
                  <Check size={15} strokeWidth={4} />
                </span>
              )}
              <div className="flex items-start gap-2.5">
                <span className="text-2xl leading-none">{topic.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-3 text-[13px] font-bold leading-snug text-ink">{topic.name}</p>
                  <div className="mt-2 h-2.5 border-2 border-ink bg-surface">
                    <div className="h-full bg-acid" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-1 font-mono text-[10px] font-semibold tracking-wide text-soft">
                    {progress}% · {count} res
                  </p>
                </div>
              </div>
            </button>
          </motion.div>
        );
      })}
    </div>
  );

  /* ---------- mobile cards ---------- */
  const Cards = () => (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {filteredTopics.map((topic, i) => {
        const progress = topicProgressPct(topic.name);
        const count = content[topic.name]?.length || 0;
        const tilt = i % 2 === 0 ? 'rotate-[-0.6deg]' : 'rotate-[0.6deg]';
        return (
          <motion.button
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.25 }}
            className={`group relative border-[3px] border-ink p-5 text-left shadow-brut-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${tilt}`}
            style={{ background: progress === 100 ? 'var(--pastel-mint)' : a.fill }}
          >
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center border-[3px] border-ink bg-surface text-2xl">
                {topic.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-soft">{String(topic.id).padStart(2, '0')}</span>
                  {progress === 100 && (
                    <span className="border-2 border-ink bg-acid px-1 font-mono text-[10px] font-bold text-[#0a0a0a]">DONE</span>
                  )}
                </div>
                <h3 className="text-base font-bold leading-tight text-ink">{topic.name}</h3>
                <div className="mt-2 h-2.5 border-2 border-ink bg-surface">
                  <div className="h-full bg-acid" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-1 font-mono text-xs font-semibold text-soft">{count} resources · {progress}%</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-ink transition-transform group-active:translate-x-1" />
            </div>
          </motion.button>
        );
      })}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={seo.canonical} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <BrutalBackground />

      <div className="flex min-h-screen flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="mx-auto w-full max-w-7xl flex-grow px-4 pb-20 pt-10 sm:pt-14">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mx-auto mb-10 max-w-3xl text-center"
          >
            <span className="brut-chip mb-5" style={{ background: a.fill }}>
              Learning Path
            </span>
            <h1 className="font-display text-4xl uppercase tracking-tight text-ink sm:text-5xl">{title}</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-soft">{subtitle}</p>
          </motion.div>

          {/* Progress + controls */}
          <div className="mx-auto mb-10 flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-stretch lg:justify-between">
            <div className="brut-card flex flex-1 flex-wrap items-center gap-x-6 gap-y-3 p-4">
              <div className="min-w-[180px] flex-1">
                <div className="flex items-baseline justify-between">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-soft">Your progress</p>
                  <span className="font-display text-xl text-ink">{overallProgress}%</span>
                </div>
                <div className="brut-progress mt-2">
                  <div style={{ width: `${overallProgress}%` }} data-full={overallProgress === 100} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="brut-chip bg-pastel-yellow">
                  <Zap size={12} strokeWidth={3} /> {xp} XP
                </span>
                {streak > 0 && (
                  <span className="brut-chip bg-pastel-pink">
                    <Flame size={12} strokeWidth={3} /> {streak}-day streak
                  </span>
                )}
                <button onClick={() => setShareOpen(true)} className="brut-btn brut-btn-pink px-3 py-1.5 text-xs">
                  <Share2 size={13} strokeWidth={3} /> Share
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                <input
                  type="text"
                  placeholder="Search topics…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border-[3px] border-ink bg-surface py-2.5 pl-10 pr-4 text-sm text-ink shadow-brut-sm outline-none placeholder:text-faint sm:w-64"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-[3px] border-ink bg-surface px-3 py-2.5 text-sm font-bold text-ink shadow-brut-sm outline-none"
              >
                <option value="id">Order</option>
                <option value="name">Name</option>
                <option value="progress">Progress</option>
              </select>
            </div>
          </div>

          {/* Graph or cards */}
          <div className="mb-12">
            {filteredTopics.length === 0 ? (
              <div className="py-20 text-center">
                <div className="mb-4 text-5xl">🔍</div>
                <h3 className="font-display text-xl uppercase text-ink">No topics found</h3>
                <p className="mt-2 text-soft">Try adjusting your search to find what you&apos;re looking for.</p>
              </div>
            ) : isMobile ? (
              <Cards />
            ) : (
              <Graph />
            )}
          </div>

          {/* Next steps */}
          {next && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3 }}
              className="brut-card-lg relative mx-auto max-w-6xl p-8 sm:p-10"
              style={{ background: a.fill }}
            >
              <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-display text-2xl uppercase text-ink">{next.title}</h2>
                  <p className="mt-2 text-soft">{next.desc}</p>
                </div>
                <a href={next.href} className="brut-btn shrink-0 px-6 py-3 text-[15px]">
                  {next.label} <ArrowRight className="h-4 w-4" strokeWidth={3} />
                </a>
              </div>
            </motion.div>
          )}
        </main>

        <Footer darkMode={darkMode} />
      </div>

      <AnimatePresence>
        {selectedTopic && (
          <Modal
            key="topic-modal"
            topic={selectedTopic}
            onClose={() => setSelectedTopic(null)}
            videoSource={content}
            existingProgress={topicProgress}
            onProgressUpdate={updateTopicProgress}
            darkMode={darkMode}
            accent={a}
            roadmapType={roadmapType}
          />
        )}
      </AnimatePresence>

      {/* +XP stamp */}
      <AnimatePresence>
        {xpToast && (
          <motion.div
            key={xpToast.key}
            initial={{ opacity: 0, scale: 1.6, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18, ease: [0.34, 1.56, 0.64, 1] }}
            className="pointer-events-none fixed bottom-24 left-1/2 z-[110] -translate-x-1/2 border-[3px] border-[#0a0a0a] bg-acid px-4 py-2 font-display text-xl text-[#0a0a0a] shadow-brut"
          >
            +{xpToast.amount} XP
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level-up toast */}
      <AnimatePresence>
        {levelUp && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-1/2 z-[110] w-[min(92vw,420px)] -translate-x-1/2"
          >
            <div className="brut-card-lg bg-pastel-yellow p-4">
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-soft">Level up!</p>
              <p className="mt-1 font-display text-xl uppercase text-ink">You&apos;re now a {levelUp.name}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    dismissLevelUp();
                    setShareOpen(true);
                  }}
                  className="brut-btn px-3 py-1.5 text-xs"
                >
                  <Share2 size={13} strokeWidth={3} /> Share it
                </button>
                <button onClick={dismissLevelUp} className="brut-btn brut-btn-surface px-3 py-1.5 text-xs">
                  Keep going
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ShareDialog open={shareOpen} onClose={() => setShareOpen(false)} card={shareCard} />

      <BackToTopButton />
    </>
  );
};

export default RoadmapView;
