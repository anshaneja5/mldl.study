import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import {
  ChevronDown, X, GitBranch, BookOpen, Map, ArrowRight, Sparkles, Zap,
  Book, Code, Brain, Users, Play, Compass, Linkedin, Twitter, Mail, CheckCircle2,
  Flame, Share2, Lock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from './Navbar';
import Footer from './Footer';
import BrutalBackground from './BrutalBackground';
import useDarkMode from './useDarkMode';
import BackToTopButton from './BackToTopButton';
import ShareDialog from './ShareCard';
import { useGamification } from '../contexts/GamificationContext';

const FAQ_DATA = [
  { question: 'What is mldl.study?', answer: 'mldl.study is a free AI roadmap, machine learning roadmap, deep learning roadmap, and generative AI roadmap built to help learners move from fundamentals to practical projects with curated resources.' },
  { question: 'Who is this AI roadmap for?', answer: 'This roadmap is designed for beginners, students, developers, and intermediate learners who want a structured path to learn AI, ML, deep learning, and GenAI systematically.' },
  { question: 'Is the content free to access?', answer: 'Yes, all the resources provided in the roadmap are free or point to freely accessible materials available online.' },
  { question: 'Can I contribute to the roadmap?', answer: 'Absolutely! Contributions are welcome. Visit our GitHub repository to contribute new resources or suggest improvements.' },
  { question: 'How do I start the machine learning roadmap?', answer: 'Start with prerequisites if you are new to math or Python, then continue to the Machine Learning roadmap, Deep Learning roadmap, and Generative AI roadmap as your skills grow.' },
  { question: 'Does this roadmap include modern AI topics?', answer: 'Yes. The roadmap includes classic ML and deep learning foundations plus modern GenAI topics such as transformers, RAG, vector databases, fine-tuning, AI agents, evaluation, and deployment.' },
];

const ROADMAP_CARDS = [
  { id: 'prerequisites', step: '01', title: 'Prerequisites', description: 'Master the foundational math and programming skills needed for ML.', icon: <Book className="h-6 w-6" />, path: '/prerequisites', fill: 'var(--pastel-mint)', loud: '#00873c' },
  { id: 'machinelearning', step: '02', title: 'Machine Learning', description: 'Learn the core concepts and algorithms of machine learning.', icon: <Brain className="h-6 w-6" />, path: '/machinelearning', fill: 'var(--pastel-blue)', loud: '#3300ff' },
  { id: 'deeplearning', step: '03', title: 'Deep Learning', description: 'Explore neural networks and advanced deep learning techniques.', icon: <Zap className="h-6 w-6" />, path: '/deeplearning', fill: 'var(--pastel-pink)', loud: '#ff2e88', unlockHint: 'UNLOCKS AT ML ≥ 60%' },
  { id: 'genai', step: '04', title: 'Generative AI', description: 'Discover the latest in generative AI, transformers and agents.', icon: <Sparkles className="h-6 w-6" />, path: '/genai', fill: 'var(--pastel-yellow)', loud: '#e07800', unlockHint: 'UNLOCKS AT DL ≥ 60%' },
];

const SITE_URL = 'https://mldl.study';

const FEATURES = [
  { icon: <BookOpen className="h-5 w-5" />, title: 'Video Lectures', desc: 'Curated video content from top educators and practitioners in the field.', fill: 'var(--pastel-blue)' },
  { icon: <Code className="h-5 w-5" />, title: 'Hands-on Projects', desc: 'Practical exercises and real-world projects to apply your knowledge.', fill: 'var(--pastel-mint)' },
  { icon: <Brain className="h-5 w-5" />, title: 'Research Papers', desc: 'Access to foundational and cutting-edge research in AI and ML.', fill: 'var(--pastel-pink)' },
];

const SOCIAL_LINKS = [
  { label: 'Follow on X', handle: '@vedolos', href: 'https://x.com/vedolos/', icon: <Twitter className="h-5 w-5" />, className: 'bg-[#0f1419] text-white' },
  { label: 'Connect on LinkedIn', handle: 'Ansh Aneja', href: 'https://www.linkedin.com/in/anshaneja5/', icon: <Linkedin className="h-5 w-5" />, className: 'bg-[#0a66c2] text-white' },
];

const SUBSTACK_URL = 'https://anshaneja.substack.com/';

const NEWSLETTER_POINTS = [
  'New Claude Code, Cursor, and Codex features',
  'Breakthrough AI research and product changes',
  'Useful GenAI tools before they get noisy',
  'One clear weekly email to keep you updated',
];

const MARQUEE_ITEMS = ['FREE FOREVER', 'NO SIGNUP', '400+ CURATED RESOURCES', 'COMMUNITY-DRIVEN', 'OPEN SOURCE'];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.35, ease: 'easeOut' } }),
};

const Marquee = () => {
  const strip = MARQUEE_ITEMS.map((t) => `★ ${t} `).join(' ');
  return (
    <div className="brut-marquee py-2 font-mono text-xs font-bold tracking-[0.15em]" aria-hidden="true">
      <div className="brut-marquee-track">
        <span className="pr-2">{strip}</span>
        <span className="pr-2">{strip}</span>
      </div>
    </div>
  );
};

/* ---- first-visit contribution modal ---- */
const ContributionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 1.06, rotate: -1 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.18, ease: [0.34, 1.56, 0.64, 1] }}
        className="brut-card-lg relative w-full max-w-md"
      >
        <div className="brut-titlebar">
          <span>contribute.md</span>
          <button onClick={onClose} aria-label="Close" className="hover:text-hot-pink">
            <X size={16} />
          </button>
        </div>
        <div className="p-7">
          <div className="mb-4 inline-grid h-12 w-12 place-items-center border-[3px] border-[#0a0a0a] bg-acid text-[#0a0a0a] shadow-brut-sm">
            <GitBranch className="h-6 w-6" />
          </div>
          <h2 className="font-display text-2xl uppercase text-ink">Help us grow 🌱</h2>
          <p className="mt-3 text-sm leading-relaxed text-soft">
            mldl.study is an open-source community project. We rely on contributions from learners like you to make this resource better and more comprehensive.
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-soft">
            <li>• Add new resources</li>
            <li>• Fix typos or errors</li>
            <li>• Suggest improvements</li>
          </ul>
          <a href="https://github.com/anshaneja5/mldl.study" target="_blank" rel="noopener noreferrer" className="brut-btn mt-6 w-full py-3 text-sm">
            <GitBranch className="h-4 w-4" /> Visit GitHub Repository
          </a>
          <p className="mt-4 text-center font-mono text-xs text-faint">Your contribution can help someone learn 💡</p>
        </div>
      </motion.div>
    </div>
  );
};

/* ---- tilted pastel roadmap card with live progress ---- */
const RoadmapCard = ({ roadmap, index, stats, unlocked }) => {
  const pct = stats?.pct ?? 0;
  const total = stats?.total ?? 0;
  const tilt = index % 2 === 0 ? 'rotate-[-0.8deg]' : 'rotate-[0.8deg]';
  const locked = roadmap.unlockHint && !unlocked;
  return (
    <motion.div custom={index} variants={fadeUp}>
      <Link
        to={roadmap.path}
        className={`brut-hover group relative block border-[3px] border-ink p-6 shadow-brut ${tilt} hover:rotate-0`}
        style={{ background: roadmap.fill }}
      >
        {locked && (
          <span className="absolute -right-3 -top-3 z-10 flex rotate-6 items-center gap-1 border-2 border-[#0a0a0a] bg-cyber-yellow px-2 py-1 font-mono text-[10px] font-bold text-[#0a0a0a] shadow-brut-sm">
            <Lock size={10} strokeWidth={3} /> {roadmap.unlockHint}
          </span>
        )}
        {pct === 100 && (
          <span className="absolute -right-3 -top-3 z-10 rotate-6 border-2 border-[#0a0a0a] bg-acid px-2 py-1 font-mono text-[10px] font-bold text-[#0a0a0a] shadow-brut-sm">
            DONE ✓
          </span>
        )}
        <div className="flex items-start gap-4">
          <span
            className="grid h-14 w-14 shrink-0 place-items-center border-[3px] border-[#0a0a0a] text-white shadow-brut-sm transition-transform duration-150 group-hover:-rotate-6"
            style={{ background: roadmap.loud }}
          >
            {roadmap.icon}
          </span>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span className="font-mono text-xs font-bold tracking-widest text-soft">{roadmap.step}</span>
              <span className="h-[3px] w-6 bg-ink" />
            </div>
            <h3 className="font-display text-xl uppercase text-ink">{roadmap.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-soft">{roadmap.description}</p>
          </div>
        </div>
        <div className="mt-4 h-3 border-2 border-ink bg-surface">
          <div className="h-full bg-acid" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-soft">
            {pct}% · {total} resources
          </span>
          <span className="flex items-center gap-1.5 text-sm font-bold uppercase text-ink">
            Start track
            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" strokeWidth={3} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b-2 border-ink last:border-b-0">
    <button onClick={onClick} className="flex w-full items-center justify-between py-4 text-left">
      <span className="font-bold text-ink">{question}</span>
      <ChevronDown className={`h-4 w-4 shrink-0 text-soft transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} strokeWidth={3} />
    </button>
    <div className={`grid transition-all duration-200 ${isOpen ? 'grid-rows-[1fr] pb-4 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
      <div className="overflow-hidden">
        <p className="text-sm leading-relaxed text-soft">{answer}</p>
      </div>
    </div>
  </div>
);

const SectionShell = ({ children, className = '' }) => (
  <motion.section
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.25 }}
    className={`brut-card mx-auto w-full max-w-4xl p-7 sm:p-9 ${className}`}
  >
    {children}
  </motion.section>
);

const HomePage = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [openFAQs, setOpenFAQs] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const { xp, streak, level, completed, roadmaps, unlocked } = useGamification();

  useEffect(() => {
    if (!localStorage.getItem('contributionModalSeen')) {
      setIsModalOpen(true);
      localStorage.setItem('contributionModalSeen', 'true');
    }
  }, []);

  const toggleFAQ = (i) => setOpenFAQs((p) => ({ ...p, [i]: !p[i] }));

  const totals = Object.values(roadmaps).reduce(
    (acc, r) => ({ done: acc.done + r.done, total: acc.total + r.total }),
    { done: 0, total: 0 }
  );
  const overallPct = totals.total === 0 ? 0 : Math.round((totals.done / totals.total) * 100);

  const shareCard = {
    headline: "I'm learning AI.\nNo fluff.",
    pct: overallPct,
    done: totals.done,
    total: totals.total,
    streak,
    levelName: level.name,
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'mldl.study',
        url: SITE_URL,
        description: 'A free AI, machine learning, deep learning, and generative AI roadmap for beginners and builders.',
        inLanguage: 'en',
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#ansh`,
        name: 'Ansh Aneja',
        url: SITE_URL,
        sameAs: [
          'https://x.com/vedolos/',
          'https://www.linkedin.com/in/anshaneja5/',
          'https://anshaneja.substack.com/',
          'https://github.com/anshaneja5',
        ],
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'mldl.study',
        url: SITE_URL,
        founder: { '@id': `${SITE_URL}/#ansh` },
        sameAs: [
          'https://github.com/anshaneja5/mldl.study',
          'https://x.com/vedolos/',
          'https://www.linkedin.com/in/anshaneja5/',
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#ai-roadmap-list`,
        name: 'AI and Machine Learning Roadmap',
        itemListElement: ROADMAP_CARDS.map((roadmap, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${roadmap.title} Roadmap`,
          url: `${SITE_URL}${roadmap.path}`,
          description: roadmap.description,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: FAQ_DATA.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>AI Roadmap & Machine Learning Roadmap for Beginners | mldl.study</title>
        <meta name="description" content="Follow a free AI roadmap, machine learning roadmap, deep learning roadmap, and GenAI roadmap with curated resources, projects, papers, and progress tracking." />
        <meta name="keywords" content="AI roadmap, machine learning roadmap, ML roadmap, deep learning roadmap, generative AI roadmap, learn AI, learn machine learning" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={SITE_URL} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <BrutalBackground />
      <ContributionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="flex min-h-screen flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Marquee />

        <main className="flex flex-grow flex-col items-center px-4 pb-20 pt-12 sm:pt-16">
          {/* Hero */}
          <motion.header initial="hidden" animate="visible" className="relative mx-auto mb-16 w-full max-w-4xl text-center">
            <motion.div variants={fadeUp} custom={0} className="brut-chip mb-8 bg-pastel-mint">
              <span className="h-2 w-2 animate-blink bg-[#00873c]" />
              The open-source AI learning roadmap
            </motion.div>

            <div className="brut-sticker absolute -top-4 right-0 hidden h-24 w-24 bg-hot-pink text-xs text-white sm:flex md:h-28 md:w-28 md:text-sm" aria-hidden="true">
              100% FREE FOREVER
            </div>

            <motion.h1 variants={fadeUp} custom={1} className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl md:text-7xl">
              The AI roadmap
              <br />
              <span className="mt-2 inline-block rotate-[-1.2deg] bg-electric px-3 py-1 text-white shadow-brut">
                no fluff.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-soft">
              Learn AI from scratch with a free machine learning roadmap, deep learning roadmap, and generative AI roadmap - curated, structured, hands-on, and community-driven.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link to="/prerequisites" className="brut-btn px-7 py-3.5 text-[15px]">
                <Compass className="h-[18px] w-[18px]" /> Start learning
              </Link>
              <a href="#roadmaps" className="brut-btn brut-btn-surface px-7 py-3.5 text-[15px]">
                <Map className="h-[18px] w-[18px]" /> Explore roadmaps
              </a>
            </motion.div>

            {/* Live progress strip (only once you've done something) */}
            {xp > 0 && (
              <motion.div variants={fadeUp} custom={4} className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <span className="brut-chip bg-pastel-yellow">
                  <Zap size={12} strokeWidth={3} /> {xp} XP · {level.name}
                </span>
                {streak > 0 && (
                  <span className="brut-chip bg-pastel-pink">
                    <Flame size={12} strokeWidth={3} /> {streak}-day streak
                  </span>
                )}
                <span className="brut-chip">{completed} resources done</span>
                <button onClick={() => setShareOpen(true)} className="brut-btn brut-btn-pink px-3 py-1.5 text-xs">
                  <Share2 size={13} strokeWidth={3} /> Share my progress
                </button>
              </motion.div>
            )}

            <motion.div variants={fadeUp} custom={5} className="brut-card mx-auto mt-10 max-w-2xl p-5 sm:p-6">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-hot-pink">Follow the builder</p>
              <h2 className="mt-1 font-display text-2xl uppercase text-ink sm:text-3xl">Follow Ansh for AI, Claude Code, Cursor, and build updates</h2>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-soft">
                I share learning resources, roadmap updates, and practical notes on the latest AI tools, agentic coding, Claude Code, Cursor, ML, DL, and GenAI.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-3 border-[3px] border-[#0a0a0a] px-5 py-4 text-left font-bold shadow-brut-sm transition-transform duration-150 hover:-translate-y-0.5 ${social.className}`}
                  >
                    {social.icon}
                    <span className="flex flex-col leading-tight">
                      <span>{social.label}</span>
                      <span className="text-xs font-medium opacity-75">{social.handle}</span>
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={6} className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="brut-chip"><Zap className="h-3.5 w-3.5" /> 100% Free</span>
              <span className="brut-chip"><Users className="h-3.5 w-3.5" /> Community-Driven</span>
              <span className="brut-chip"><BookOpen className="h-3.5 w-3.5" /> Real-World Skills</span>
            </motion.div>
          </motion.header>

          {/* Roadmap cards */}
          <motion.div
            id="roadmaps"
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-20 grid w-full max-w-5xl scroll-mt-24 grid-cols-1 gap-7 md:grid-cols-2"
          >
            {ROADMAP_CARDS.map((r, i) => (
              <RoadmapCard key={r.id} roadmap={r} index={i} stats={roadmaps[r.id]} unlocked={unlocked[r.id]} />
            ))}
          </motion.div>

          {/* Newsletter CTA */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="brut-card-lg relative mb-16 w-full max-w-5xl rotate-[-0.4deg] bg-pastel-yellow p-6 sm:p-8 lg:p-10"
          >
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="brut-chip mb-4 bg-surface">
                  <Mail className="h-4 w-4" />
                  Free newsletter
                </div>
                <h2 className="font-display text-3xl uppercase leading-tight text-ink sm:text-4xl md:text-5xl">
                  Stay ahead of every important AI shift
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-soft sm:text-lg">
                  I track what is new in AI every week — Claude Code, Cursor, Codex, GenAI tools, model launches, research breakthroughs, and practical changes builders should know. You get the useful signal first, in one clear weekly email.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={SUBSTACK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brut-btn brut-btn-pink px-7 py-4 text-base"
                  >
                    Subscribe free
                    <ArrowRight className="h-5 w-5" strokeWidth={3} />
                  </a>
                  <span className="text-sm font-medium text-soft">No spam. Unsubscribe anytime. Emails handled by Substack.</span>
                </div>
              </div>

              <div className="border-[3px] border-ink bg-surface p-5 shadow-brut-sm">
                <p className="mb-4 font-display text-lg uppercase text-ink">What you will get</p>
                <ul className="space-y-3">
                  {NEWSLETTER_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-soft">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* SEO overview */}
          <SectionShell className="mb-12">
            <h2 className="font-display text-2xl uppercase text-ink sm:text-3xl">
              A free AI roadmap for machine learning, deep learning, and GenAI
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-soft sm:text-base">
              <p>
                mldl.study is built for learners who search for a clear AI roadmap, ML roadmap, or machine learning roadmap and want one structured path instead of scattered bookmarks. The roadmap starts with Python, mathematics, and core machine learning, then moves into neural networks, Transformers, generative AI, RAG, agents, evaluation, and deployment.
              </p>
              <p>
                Each learning path is organized as a practical sequence with curated videos, articles, research papers, projects, and progress tracking. You can start with the prerequisites, move through classical machine learning, continue into deep learning, and then explore modern GenAI topics used by builders today.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/ai-roadmap" className="brut-chip transition-transform duration-150 hover:-translate-y-0.5">AI Roadmap Guide</Link>
              <Link to="/ml-roadmap" className="brut-chip transition-transform duration-150 hover:-translate-y-0.5">Machine Learning Roadmap</Link>
              <Link to="/deeplearning" className="brut-chip transition-transform duration-150 hover:-translate-y-0.5">Deep Learning Roadmap</Link>
              <Link to="/genai" className="brut-chip transition-transform duration-150 hover:-translate-y-0.5">Generative AI Roadmap</Link>
              <Link to="/ai-agents-roadmap" className="brut-chip transition-transform duration-150 hover:-translate-y-0.5">AI Agents Roadmap</Link>
              <Link to="/rag-roadmap" className="brut-chip transition-transform duration-150 hover:-translate-y-0.5">RAG Roadmap</Link>
              <Link to="/learn-ai-from-scratch" className="brut-chip transition-transform duration-150 hover:-translate-y-0.5">Learn AI from Scratch</Link>
            </div>
          </SectionShell>

          {/* What's inside */}
          <SectionShell className="mb-12">
            <h2 className="font-display text-2xl uppercase text-ink sm:text-3xl">What&apos;s inside these roadmaps?</h2>
            <p className="mt-2 text-soft">Everything you need to learn by doing — in one structured path.</p>
            <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">
              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  className={`border-[3px] border-ink p-5 shadow-brut-sm ${i % 2 === 0 ? 'rotate-[-0.5deg]' : 'rotate-[0.5deg]'}`}
                  style={{ background: f.fill }}
                >
                  <span className="mb-3 inline-grid h-11 w-11 place-items-center border-[3px] border-ink bg-surface text-ink">{f.icon}</span>
                  <h3 className="font-bold uppercase text-ink">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-soft">{f.desc}</p>
                </div>
              ))}
            </div>
          </SectionShell>

          {/* Video */}
          <SectionShell className="mb-12 overflow-hidden !p-0">
            <div className="p-7 sm:p-9">
              <h2 className="font-display text-2xl uppercase text-ink sm:text-3xl">Watch this before you start</h2>
              <p className="mt-2 text-sm text-soft">This video sparked my interest in the field — non-technical, but highly motivating.</p>
            </div>
            <a href="https://www.youtube.com/watch?v=WXuK6gekU1Y" target="_blank" rel="noopener noreferrer" className="group relative block aspect-video border-t-[3px] border-ink">
              <img
                src="https://img.youtube.com/vi/WXuK6gekU1Y/0.jpg"
                alt="AI video thumbnail"
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://img.youtube.com/vi/WXuK6gekU1Y/hqdefault.jpg'; }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/15">
                <span className="grid h-20 w-20 place-items-center border-[3px] border-[#0a0a0a] bg-acid text-[#0a0a0a] shadow-brut transition-transform duration-150 group-hover:scale-110 group-hover:rotate-3">
                  <Play className="ml-1 h-9 w-9 fill-current" />
                </span>
              </div>
            </a>
          </SectionShell>

          {/* FAQ */}
          <SectionShell className="mb-12">
            <h2 className="font-display text-2xl uppercase text-ink sm:text-3xl">Frequently asked questions</h2>
            <div className="mt-5">
              {FAQ_DATA.map((faq, i) => (
                <FAQItem key={i} {...faq} isOpen={openFAQs[i]} onClick={() => toggleFAQ(i)} />
              ))}
            </div>
          </SectionShell>

          {/* Contribute CTA */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <button onClick={() => setIsModalOpen(true)} className="brut-btn px-7 py-3.5 text-[15px]">
              <GitBranch className="h-5 w-5" /> Contribute to the roadmap
            </button>
          </motion.div>
        </main>

        <Footer darkMode={darkMode} />
      </div>

      <ShareDialog open={shareOpen} onClose={() => setShareOpen(false)} card={shareCard} />
      <BackToTopButton />
    </>
  );
};

export default HomePage;
