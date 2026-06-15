import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import ReactGA from 'react-ga4';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import AuroraBackground from './AuroraBackground';
import Modal from './Modal';
import BackToTopButton from './BackToTopButton';
import useDarkMode from './useDarkMode';

/* Circular progress ring with a gradient stroke */
const ProgressRing = ({ progress, size = 48, stroke = 4, from, to, id, children }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;
  return (
    <span className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <span className="absolute grid place-items-center text-lg">{children}</span>
    </span>
  );
};

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

  const [darkMode, toggleDarkMode] = useDarkMode();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicProgress, setTopicProgress] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [hoveredTopic, setHoveredTopic] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

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

  const filteredTopics = useMemo(() => {
    let list = topics;
    if (searchTerm) {
      list = topics.filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return [...list].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'progress') return topicProgressPct(b.name) - topicProgressPct(a.name);
      return a.id - b.id;
    });
  }, [topics, searchTerm, sortBy, topicProgress]);

  const updateTopicProgress = (topicName, videoUrl, completed, bulkUpdates = null) => {
    try {
      const next = bulkUpdates
        ? { ...topicProgress, ...bulkUpdates }
        : { ...topicProgress, [`${topicName}_${videoUrl}`]: completed };
      setTopicProgress(next);
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  };

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

  const lineStyle = (from, to) => {
    if (hoveredTopic) {
      const touches = from === hoveredTopic.id || to === hoveredTopic.id;
      return touches
        ? { stroke: accent.lineActive, baseOpacity: 0.18, flowOpacity: 0.95 }
        : { stroke: accent.lineActive, baseOpacity: 0.05, flowOpacity: 0.08 };
    }
    return { stroke: accent.lineActive, baseOpacity: 0.16, flowOpacity: 0.55 };
  };

  const isDimmed = (topic) => hoveredTopic && hoveredTopic.id !== topic.id && !neighbors[hoveredTopic.id]?.has(topic.id);

  /* ---------- desktop graph ---------- */
  const Graph = () => (
    <div className="relative mx-auto h-[560px] w-full max-w-6xl overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.015] p-4 sm:h-[640px] lg:h-[700px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: `radial-gradient(60% 55% at 50% 42%, ${accent.glow}, transparent 70%)` }}
      />
      <svg className="absolute inset-0 h-full w-full" style={{ overflow: 'visible' }}>
        {connections.map((conn, i) => {
          const from = pos[conn.from];
          const to = pos[conn.to];
          if (!from || !to || !visibleIds.has(conn.from) || !visibleIds.has(conn.to)) return null;
          const s = lineStyle(conn.from, conn.to);
          return (
            <g key={i}>
              <line
                x1={`${from.x}%`} y1={`${from.y}%`} x2={`${to.x}%`} y2={`${to.y}%`}
                stroke={s.stroke} strokeWidth="1.5" style={{ opacity: s.baseOpacity, transition: 'opacity 0.3s' }}
              />
              <line
                x1={`${from.x}%`} y1={`${from.y}%`} x2={`${to.x}%`} y2={`${to.y}%`}
                stroke={s.stroke} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 9"
                className="animate-flow" style={{ opacity: s.flowOpacity, transition: 'opacity 0.3s' }}
              />
            </g>
          );
        })}
      </svg>

      {filteredTopics.map((topic, i) => {
        const progress = topicProgressPct(topic.name);
        const dimmed = isDimmed(topic);
        const count = content[topic.name]?.length || 0;
        return (
          <motion.div
            key={topic.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos[topic.id].x}%`, top: `${pos[topic.id].y}%` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: dimmed ? 0.4 : 1, scale: 1 }}
            transition={{ delay: i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={() => setSelectedTopic(topic)}
              onMouseEnter={() => setHoveredTopic(topic)}
              onMouseLeave={() => setHoveredTopic(null)}
              className="group relative w-[220px] rounded-2xl glass glass-sheen p-3 text-left transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: hoveredTopic?.id === topic.id ? `0 0 36px -8px ${accent.glow}` : 'none' }}
            >
              <span
                className="absolute -left-2 -top-2 grid h-6 w-6 place-items-center rounded-full font-mono text-[11px] font-semibold text-[#06070f]"
                style={{ background: `linear-gradient(135deg, ${accent.ringFrom}, ${accent.ringTo})` }}
              >
                {topic.id}
              </span>
              <div className="flex items-center gap-2.5">
                <ProgressRing
                  progress={progress}
                  size={44}
                  from={accent.ringFrom}
                  to={accent.ringTo}
                  id={`ring-${storageKey}-${topic.id}`}
                >
                  {topic.icon}
                </ProgressRing>
                <div className="min-w-0">
                  <p className="line-clamp-3 text-[13px] font-semibold leading-snug text-ink">{topic.name}</p>
                  <p className="mt-1 font-mono text-[10px] tracking-wide text-faint">
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {filteredTopics.map((topic, i) => {
        const progress = topicProgressPct(topic.name);
        const count = content[topic.name]?.length || 0;
        return (
          <motion.button
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="group relative overflow-hidden rounded-3xl glass glass-sheen p-5 text-left transition-all duration-300 active:scale-[0.99]"
          >
            <div className="flex items-center gap-4">
              <ProgressRing progress={progress} size={56} stroke={5} from={accent.ringFrom} to={accent.ringTo} id={`mring-${storageKey}-${topic.id}`}>
                {topic.icon}
              </ProgressRing>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-mono text-[11px] text-faint">{String(topic.id).padStart(2, '0')}</span>
                </div>
                <h3 className="text-base font-semibold leading-tight text-ink">{topic.name}</h3>
                <p className="mt-1 text-xs text-soft">{count} resources · {progress}% complete</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-faint transition-transform group-active:translate-x-1" />
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
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={seo.canonical} />
      </Helmet>

      <AuroraBackground />

      <div className="flex min-h-screen flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="mx-auto w-full max-w-7xl flex-grow px-4 pb-20 pt-10 sm:pt-14">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-10 max-w-2xl text-center"
          >
            <span
              className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
              style={{ color: accent.text }}
            >
              Learning Path
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{title}</h1>
            <p className="mx-auto mt-4 max-w-xl text-soft">{subtitle}</p>
          </motion.div>

          {/* Progress + controls */}
          <div className="mx-auto mb-8 flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="glass glass-sheen flex flex-1 items-center gap-4 rounded-2xl p-4">
              <ProgressRing progress={overallProgress} size={52} stroke={5} from={accent.ringFrom} to={accent.ringTo} id={`overall-${storageKey}`}>
                <span className="font-mono text-[10px] font-semibold text-ink">{overallProgress}%</span>
              </ProgressRing>
              <div>
                <p className="text-sm font-semibold text-ink">Your progress</p>
                <p className="text-xs text-soft">{overallProgress}% of this roadmap completed</p>
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
                  className="w-full rounded-2xl glass py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition-shadow placeholder:text-faint focus:shadow-glow sm:w-64"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-2xl glass px-3 py-2.5 text-sm text-ink outline-none focus:shadow-glow"
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
                <h3 className="font-display text-xl font-bold text-ink">No topics found</h3>
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
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="border-aurora relative mx-auto max-w-6xl overflow-hidden rounded-3xl glass glass-sheen p-8 sm:p-10"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full blur-3xl"
                style={{ background: accent.glow }}
              />
              <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink">{next.title}</h2>
                  <p className="mt-2 text-soft">{next.desc}</p>
                </div>
                <a href={next.href} className="btn-aurora shrink-0 rounded-2xl px-6 py-3 text-[15px]">
                  {next.label} <ArrowRight className="h-4 w-4" />
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
            accent={accent}
            roadmapType={roadmapType}
          />
        )}
      </AnimatePresence>

      <BackToTopButton />
    </>
  );
};

export default RoadmapView;
