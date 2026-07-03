import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { Trophy, Target, BookOpen, CheckCircle, Circle, TrendingUp, Award, Calendar, BarChart3, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import AuroraBackground from './AuroraBackground';
import useDarkMode from './useDarkMode';
import BackToTopButton from './BackToTopButton';
import categorizedMLContent from '../../categorizedMLContent';
import categorizedDLContent from '../../categorizedDLContent';
import categorizedGenAIContent from '../../categorizedGenAIContent';
import categorizedPrerequisiteContent from '../../categorizedPrerequisiteContent';

// Animation variants — fadeUp + stagger like HomePage
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* Circular progress ring with a gradient stroke (inlined, mirrors RoadmapView's ProgressRing) */
const ProgressRing = ({ progress, size = 64, stroke = 6, from, to, id, children }) => {
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
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(124,92,255,0.12)" strokeWidth={stroke} />
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
      <span className="absolute grid place-items-center">{children}</span>
    </span>
  );
};

const LearnerDashboard = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  const [darkMode, baseToggleDarkMode] = useDarkMode();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState({});
  const [stats, setStats] = useState({
    totalTopics: 0,
    completedTopics: 0,
    inProgressTopics: 0,
    percentComplete: 0
  });

  const toggleDarkMode = () => {
    setIsTransitioning(true);
    baseToggleDarkMode();
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Roadmaps configuration with localStorage keys and content
  const roadmaps = [
    {
      id: 'prerequisiteRoadmapProgress',
      title: 'Prerequisites',
      path: '/prerequisites',
      color: 'from-emerald-500 to-teal-500',
      ringFrom: '#34d399',
      ringTo: '#2dd4bf',
      icon: <BookOpen className="w-5 h-5" />,
      content: categorizedPrerequisiteContent
    },
    {
      id: 'mlRoadmapProgress',
      title: 'Machine Learning',
      path: '/machinelearning',
      color: 'from-blue-500 to-indigo-500',
      ringFrom: '#60a5fa',
      ringTo: '#6366f1',
      icon: <Target className="w-5 h-5" />,
      content: categorizedMLContent
    },
    {
      id: 'dlRoadmapProgress',
      title: 'Deep Learning',
      path: '/deeplearning',
      color: 'from-violet-500 to-fuchsia-500',
      ringFrom: '#a78bfa',
      ringTo: '#e879f9',
      icon: <TrendingUp className="w-5 h-5" />,
      content: categorizedDLContent
    },
    {
      id: 'genaiRoadmapProgress',
      title: 'Generative AI',
      path: '/genai',
      color: 'from-amber-500 to-orange-500',
      ringFrom: '#fbbf24',
      ringTo: '#fb923c',
      icon: <Award className="w-5 h-5" />,
      content: categorizedGenAIContent
    }
  ];

  // Load progress from localStorage
  useEffect(() => {
    const loadProgress = () => {
      const savedProgress = {};
      let totalVideos = 0;
      let completedVideos = 0;

      roadmaps.forEach(roadmap => {
        // Calculate total resources from content
        const roadmapContent = roadmap.content;
        if (roadmapContent) {
          Object.keys(roadmapContent).forEach(topicName => {
            const videos = roadmapContent[topicName];
            totalVideos += videos.length;
          });
        }

        // Load progress from localStorage
        const roadmapProgress = localStorage.getItem(roadmap.id);
        if (roadmapProgress) {
          try {
            const parsed = JSON.parse(roadmapProgress);
            savedProgress[roadmap.id] = parsed;

            // Calculate completed count - the progress object has keys like "TopicName_videoUrl"
            // and values are boolean (true for completed)
            Object.keys(parsed).forEach(key => {
              if (parsed[key] === true) {
                completedVideos++;
              }
            });
          } catch (e) {
            console.error('Error parsing progress for', roadmap.id, e);
          }
        }
      });

      setProgress(savedProgress);
      setStats({
        totalTopics: totalVideos,
        completedTopics: completedVideos,
        inProgressTopics: 0, // Not tracked in the current system
        percentComplete: totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0
      });
    };

    loadProgress();
  }, []);

  // Calculate progress for each roadmap
  const getRoadmapProgress = (roadmapId) => {
    const roadmap = roadmaps.find(r => r.id === roadmapId);
    const roadmapData = progress[roadmapId] || {};

    // Calculate total resources from content
    let total = 0;
    if (roadmap && roadmap.content) {
      Object.keys(roadmap.content).forEach(topicName => {
        const videos = roadmap.content[topicName];
        total += videos.length;
      });
    }

    // Count completed videos
    const completed = Object.keys(roadmapData).filter(v => roadmapData[v] === true).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { completed, inProgress: 0, total, percent };
  };

  // Get recent activity (last 5 updates)
  const getRecentActivity = () => {
    const activities = [];

    roadmaps.forEach(roadmap => {
      const roadmapProgress = progress[roadmap.id] || {};
      Object.keys(roadmapProgress).forEach(videoKey => {
        // Extract topic name from key format "TopicName_videoUrl"
        const topicName = videoKey.split('_')[0];
        const isCompleted = roadmapProgress[videoKey] === true;

        if (isCompleted) {
          activities.push({
            roadmap: roadmap.title,
            topic: topicName,
            status: 'completed',
            roadmapId: roadmap.id
          });
        }
      });
    });

    // Return last 5 items
    return activities.slice(-5).reverse();
  };

  const recentActivity = getRecentActivity();

  // Summary stat tiles
  const statCards = [
    { label: 'Total Resources', value: stats.totalTopics, icon: <BookOpen className="h-5 w-5" />, gradient: 'from-aurora-blue to-aurora-indigo' },
    { label: 'Completed', value: stats.completedTopics, icon: <CheckCircle className="h-5 w-5" />, gradient: 'from-emerald-400 to-teal-400' },
    { label: 'Remaining', value: stats.totalTopics - stats.completedTopics, icon: <Circle className="h-5 w-5" />, gradient: 'from-aurora-amber to-orange-400' },
  ];

  return (
    <>
      <Helmet>
        <title>Learner Dashboard | Track Your Progress</title>
        <meta
          name="description"
          content="Track your learning progress across all ML/DL roadmaps. Monitor completed topics and continue your journey to AI mastery."
        />
      </Helmet>

      <AuroraBackground />

      <div className="flex min-h-screen flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} isTransitioning={isTransitioning} />

        <main className="mx-auto w-full max-w-7xl flex-grow px-4 pb-20 pt-10 sm:pt-14">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-aurora">
              <Trophy className="h-4 w-4" /> Your Progress
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Your Learning Dashboard
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-soft">
              Track your progress and stay motivated on your AI learning journey.
            </p>
          </motion.div>

          {/* Overall Stats */}
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            animate="visible"
            className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {statCards.map((card) => (
              <motion.div
                key={card.label}
                variants={fadeUp}
                className="glass glass-sheen rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-soft">{card.label}</span>
                  <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${card.gradient} text-[#06070f]`}>
                    {card.icon}
                  </span>
                </div>
                <div className="font-mono text-4xl font-bold text-ink">{card.value}</div>
              </motion.div>
            ))}

            {/* Overall Progress — circular gradient ring */}
            <motion.div
              variants={fadeUp}
              className="glass glass-sheen flex items-center justify-between gap-4 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <div>
                <div className="mb-1 flex items-center gap-2 text-sm font-medium text-soft">
                  <BarChart3 className="h-4 w-4 text-aurora-violet" /> Overall Progress
                </div>
                <div className="font-mono text-4xl font-bold text-ink">{stats.percentComplete}%</div>
              </div>
              <ProgressRing
                progress={stats.percentComplete}
                size={72}
                stroke={7}
                from="#7c5cff"
                to="#22d3ee"
                id="ring-dashboard-overall"
              >
                <span className="font-mono text-xs font-semibold text-ink">{stats.percentComplete}%</span>
              </ProgressRing>
            </motion.div>
          </motion.div>

          {/* Roadmap Progress Cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <h2 className="mb-6 font-display text-2xl font-bold text-ink">
              Progress by Roadmap
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {roadmaps.map((roadmap, index) => {
                const roadmapProgress = getRoadmapProgress(roadmap.id);
                return (
                  <motion.div
                    key={roadmap.id}
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="glass glass-sheen rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${roadmap.color} text-[#06070f] shadow-lg`}>
                        {roadmap.icon}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-semibold text-ink">
                          {roadmap.title}
                        </h3>
                        <p className="font-mono text-xs text-faint">
                          {roadmapProgress.completed} of {roadmapProgress.total} resources
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar — roadmap accent */}
                    <div className="mb-3 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${roadmap.color}`}
                        style={{ width: `${roadmapProgress.percent}%`, transition: 'width 0.7s cubic-bezier(0.22,1,0.36,1)' }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-medium text-soft">
                        {roadmapProgress.percent}% Complete
                      </span>
                      <Link
                        to={roadmap.path}
                        className="group inline-flex items-center gap-1.5 text-sm font-medium text-aurora"
                      >
                        Continue
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Activity */}
          {recentActivity.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass glass-sheen rounded-3xl p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-aurora-violet to-aurora-cyan text-[#06070f]">
                  <Calendar className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl font-bold text-ink">
                  Recent Activity
                </h2>
              </div>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 shrink-0 text-emerald-400" />
                      <div className="min-w-0">
                        <p className="font-medium text-ink">
                          {activity.topic}
                        </p>
                        <p className="text-sm text-faint">
                          {activity.roadmap}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full glass px-3 py-1 text-xs font-medium text-emerald-400">
                      Completed
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {stats.totalTopics === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass glass-sheen rounded-3xl px-6 py-16 text-center"
            >
              <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-aurora-violet to-aurora-cyan text-[#06070f] shadow-glow">
                <BookOpen className="h-8 w-8" />
              </span>
              <h3 className="mb-2 font-display text-xl font-bold text-ink">
                Start Your Learning Journey
              </h3>
              <p className="mb-6 text-soft">
                Begin exploring roadmaps to track your progress.
              </p>
              <Link
                to="/"
                className="btn-aurora rounded-2xl px-6 py-3 text-[15px]"
              >
                Explore Roadmaps <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          )}
        </main>

        <Footer darkMode={darkMode} />
      </div>

      <BackToTopButton />
    </>
  );
};

export default LearnerDashboard;
