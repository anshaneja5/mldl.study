import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import {
  ChevronDown, X, GitBranch, BookOpen, Map, ArrowRight, Sparkles, Zap,
  Book, Code, Brain, Users, Play, Compass, Linkedin, Twitter, Mail, CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from './Navbar';
import Footer from './Footer';
import AuroraBackground from './AuroraBackground';
import useDarkMode from './useDarkMode';
import BackToTopButton from './BackToTopButton';

const FAQ_DATA = [
  { question: 'What is mldl.study?', answer: 'mldl.study is a curated roadmap to help learners master Machine Learning and Deep Learning with structured resources, including videos, articles, research papers, competitions and projects.' },
  { question: 'Who is this roadmap for?', answer: 'This roadmap is designed for beginners and intermediate learners who want to dive deep into ML and DL concepts systematically.' },
  { question: 'Is the content free to access?', answer: 'Yes, all the resources provided in the roadmap are free or point to freely accessible materials available online.' },
  { question: 'Can I contribute to the roadmap?', answer: 'Absolutely! Contributions are welcome. Visit our GitHub repository to contribute new resources or suggest improvements.' },
  { question: 'How do I start the roadmap?', answer: 'Click on any of the roadmap cards above to begin your learning journey.' },
];

const ROADMAPS = [
  { id: 'prerequisites', step: '01', title: 'Prerequisites', description: 'Master the foundational math and programming skills needed for ML.', icon: <Book className="h-6 w-6" />, path: '/prerequisites', color: 'from-emerald-400 to-teal-400', glow: 'rgba(45,212,191,0.18)' },
  { id: 'machinelearning', step: '02', title: 'Machine Learning', description: 'Learn the core concepts and algorithms of machine learning.', icon: <Brain className="h-6 w-6" />, path: '/machinelearning', color: 'from-blue-400 to-indigo-400', glow: 'rgba(96,165,250,0.18)' },
  { id: 'deeplearning', step: '03', title: 'Deep Learning', description: 'Explore neural networks and advanced deep learning techniques.', icon: <Zap className="h-6 w-6" />, path: '/deeplearning', color: 'from-violet-400 to-fuchsia-400', glow: 'rgba(192,132,252,0.18)' },
  { id: 'genai', step: '04', title: 'Generative AI', description: 'Discover the latest in generative AI, transformers and agents.', icon: <Sparkles className="h-6 w-6" />, path: '/genai', color: 'from-amber-400 to-orange-400', glow: 'rgba(251,191,36,0.18)' },
];

const FEATURES = [
  { icon: <BookOpen className="h-5 w-5" />, title: 'Video Lectures', desc: 'Curated video content from top educators and practitioners in the field.', color: 'from-aurora-violet to-aurora-indigo' },
  { icon: <Code className="h-5 w-5" />, title: 'Hands-on Projects', desc: 'Practical exercises and real-world projects to apply your knowledge.', color: 'from-aurora-cyan to-aurora-blue' },
  { icon: <Brain className="h-5 w-5" />, title: 'Research Papers', desc: 'Access to foundational and cutting-edge research in AI and ML.', color: 'from-aurora-fuchsia to-aurora-violet' },
];

const SOCIAL_LINKS = [
  { label: 'Follow on X', handle: '@vedolos', href: 'https://x.com/vedolos/', icon: <Twitter className="h-5 w-5" />, className: 'bg-[#0f1419] text-white hover:bg-black' },
  { label: 'Connect on LinkedIn', handle: 'Ansh Aneja', href: 'https://www.linkedin.com/in/anshaneja5/', icon: <Linkedin className="h-5 w-5" />, className: 'bg-[#0a66c2] text-white hover:bg-[#084d94]' },
];

const SUBSTACK_URL = 'https://anshaneja.substack.com/';

const NEWSLETTER_POINTS = [
  'New Claude Code, Cursor, and Codex features',
  'Breakthrough AI research and product changes',
  'Useful GenAI tools before they get noisy',
  'One clear weekly email to keep you updated',
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

/* ---- first-visit contribution modal ---- */
const ContributionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#04050f]/70 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong glass-sheen relative w-full max-w-md rounded-3xl p-7 shadow-glass"
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl glass text-soft hover:text-ink">
          <X className="h-5 w-5" />
        </button>
        <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-aurora-violet to-aurora-cyan text-[#04060f] shadow-glow">
          <GitBranch className="h-6 w-6" />
        </div>
        <h2 className="font-display text-2xl font-bold text-ink">Help us grow 🌱</h2>
        <p className="mt-3 text-sm leading-relaxed text-soft">
          mldl.study is an open-source community project. We rely on contributions from learners like you to make this resource better and more comprehensive.
        </p>
        <ul className="mt-4 space-y-1.5 text-sm text-soft">
          <li>• Add new resources</li>
          <li>• Fix typos or errors</li>
          <li>• Suggest improvements</li>
        </ul>
        <a href="https://github.com/anshaneja5/mldl.study" target="_blank" rel="noopener noreferrer" className="btn-aurora mt-6 w-full rounded-2xl py-3 text-sm">
          <GitBranch className="h-4 w-4" /> Visit GitHub Repository
        </a>
        <p className="mt-4 text-center text-xs text-faint">Your contribution can help someone learn 💡</p>
      </motion.div>
    </div>
  );
};

/* ---- roadmap card with cursor-tracking spotlight ---- */
const RoadmapCard = ({ roadmap, index }) => {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div custom={index} variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
      <Link
        to={roadmap.path}
        ref={ref}
        onMouseMove={handleMove}
        className="border-aurora group relative block overflow-hidden rounded-3xl glass glass-sheen p-6 transition-shadow duration-300 hover:shadow-glow"
      >
        {/* cursor spotlight */}
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(420px circle at var(--mx,50%) var(--my,0%), ${roadmap.glow}, transparent 60%)` }}
        />
        <div className="relative flex items-start gap-4">
          <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${roadmap.color} text-[#06070f] shadow-lg transition-transform duration-300 group-hover:scale-105`}>
            {roadmap.icon}
          </span>
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2">
              <span className="font-mono text-xs tracking-widest text-faint">{roadmap.step}</span>
              <span className="h-px w-6 bg-white/15" />
            </div>
            <h3 className="font-display text-xl font-bold text-ink">{roadmap.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-soft">{roadmap.description}</p>
          </div>
        </div>
        <div className="relative mt-5 flex items-center gap-1.5 text-sm font-medium text-aurora">
          <span>Start track</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
};

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-white/10 last:border-b-0">
    <button onClick={onClick} className="flex w-full items-center justify-between py-4 text-left">
      <span className="font-medium text-ink">{question}</span>
      <ChevronDown className={`h-4 w-4 shrink-0 text-soft transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] pb-4 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
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
    className={`glass glass-sheen mx-auto w-full max-w-4xl rounded-3xl p-7 sm:p-9 ${className}`}
  >
    {children}
  </motion.section>
);

const HomePage = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [openFAQs, setOpenFAQs] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('contributionModalSeen')) {
      setIsModalOpen(true);
      localStorage.setItem('contributionModalSeen', 'true');
    }
  }, []);

  const toggleFAQ = (i) => setOpenFAQs((p) => ({ ...p, [i]: !p[i] }));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };

  return (
    <>
      <Helmet>
        <title>Your Roadmap to AI Mastery | Machine Learning Roadmap</title>
        <meta name="description" content="Transform from beginner to machine learning professional with our comprehensive roadmap featuring free ML, DL, and GenAI resources. Join our community-driven journey today." />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://mldl.study" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <AuroraBackground />
      <ContributionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="flex min-h-screen flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="flex flex-grow flex-col items-center px-4 pb-20 pt-10 sm:pt-16">
          {/* Hero */}
          <motion.header
            initial="hidden"
            animate="visible"
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <motion.div variants={fadeUp} custom={0} className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-soft">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-aurora-cyan" />
              </span>
              The open-source AI learning roadmap
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
              Your path to
              <br />
              <span className="text-aurora-anim">AI mastery</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-soft">
              Go from complete beginner to AI professional with structured, hands-on learning paths — curated, free, and community-driven.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/prerequisites" className="btn-aurora rounded-2xl px-6 py-3 text-[15px]">
                <Compass className="h-[18px] w-[18px]" /> Start learning
              </Link>
              <a href="#roadmaps" className="flex items-center gap-2 rounded-2xl glass px-6 py-3 text-[15px] font-medium text-ink transition-all duration-300 hover:shadow-glow">
                <Map className="h-[18px] w-[18px]" /> Explore roadmaps
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="border-aurora glass-strong glass-sheen mx-auto mt-8 max-w-2xl rounded-3xl p-4 shadow-glass sm:p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-aurora">Follow the builder</p>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">Follow Ansh for AI, Claude Code, Cursor, and build updates</h2>
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
                    className={`flex items-center justify-center gap-3 rounded-2xl px-5 py-4 text-left font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow ${social.className}`}
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

            <motion.div variants={fadeUp} custom={5} className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-soft">
              <span className="inline-flex items-center gap-1.5"><Zap className="h-4 w-4 text-aurora-cyan" /> 100% Free</span>
              <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-aurora-violet" /> Community-Driven</span>
              <span className="inline-flex items-center gap-1.5"><BookOpen className="h-4 w-4 text-aurora-blue" /> Real-World Skills</span>
            </motion.div>
          </motion.header>

          {/* Newsletter CTA */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="border-aurora glass-strong glass-sheen relative mb-16 w-full max-w-5xl overflow-hidden rounded-[2rem] p-6 shadow-glass sm:p-8 lg:p-10"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-aurora-cyan/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-aurora-violet/25 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-aurora">
                  <Mail className="h-4 w-4" />
                  Free newsletter
                </div>
                <h2 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl md:text-5xl">
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
                    className="btn-aurora rounded-2xl px-7 py-4 text-base shadow-glow"
                  >
                    Subscribe free
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  <span className="text-sm font-medium text-soft">No spam. Unsubscribe anytime. Emails handled by Substack.</span>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="mb-4 font-display text-lg font-bold text-ink">What you will get</p>
                <ul className="space-y-3">
                  {NEWSLETTER_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-soft">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-aurora-cyan" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Roadmap cards */}
          <motion.div
            id="roadmaps"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-24 grid w-full max-w-5xl scroll-mt-24 grid-cols-1 gap-5 md:grid-cols-2"
          >
            {ROADMAPS.map((r, i) => (
              <RoadmapCard key={r.id} roadmap={r} index={i} />
            ))}
          </motion.div>

          {/* What's inside */}
          <SectionShell className="mb-12">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">What&apos;s inside these roadmaps?</h2>
            <p className="mt-2 text-soft">Everything you need to learn by doing — in one structured path.</p>
            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
              {FEATURES.map((f) => (
                <div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:bg-white/[0.04]">
                  <span className={`mb-3 inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${f.color} text-[#06070f]`}>{f.icon}</span>
                  <h3 className="font-semibold text-ink">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-soft">{f.desc}</p>
                </div>
              ))}
            </div>
          </SectionShell>

          {/* Video */}
          <SectionShell className="mb-12 overflow-hidden !p-0">
            <div className="p-7 sm:p-9">
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Watch this before you start</h2>
              <p className="mt-2 text-sm text-soft">This video sparked my interest in the field — non-technical, but highly motivating.</p>
            </div>
            <a href="https://www.youtube.com/watch?v=WXuK6gekU1Y" target="_blank" rel="noopener noreferrer" className="group relative block aspect-video">
              <img
                src="https://img.youtube.com/vi/WXuK6gekU1Y/0.jpg"
                alt="AI video thumbnail"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://img.youtube.com/vi/WXuK6gekU1Y/hqdefault.jpg'; }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[#04050f]/40 transition-colors group-hover:bg-[#04050f]/25">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-aurora-violet to-aurora-cyan text-[#04060f] shadow-glow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-1 h-9 w-9 fill-current" />
                </span>
              </div>
            </a>
          </SectionShell>

          {/* FAQ */}
          <SectionShell className="mb-12">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Frequently asked questions</h2>
            <div className="mt-5">
              {FAQ_DATA.map((faq, i) => (
                <FAQItem key={i} {...faq} isOpen={openFAQs[i]} onClick={() => toggleFAQ(i)} />
              ))}
            </div>
          </SectionShell>

          {/* Contribute CTA */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <button onClick={() => setIsModalOpen(true)} className="btn-aurora rounded-2xl px-7 py-3.5 text-[15px]">
              <GitBranch className="h-5 w-5" /> Contribute to the roadmap
            </button>
          </motion.div>
        </main>

        <Footer darkMode={darkMode} />
      </div>
      <BackToTopButton />
    </>
  );
};

export default HomePage;
