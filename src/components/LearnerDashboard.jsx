import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { Trophy, Target, BookOpen, CheckCircle, Circle, TrendingUp, Award, Calendar, BarChart3, ArrowRight, Share2 } from 'lucide-react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import BrutalBackground from './BrutalBackground';
import useDarkMode from './useDarkMode';
import BackToTopButton from './BackToTopButton';
import ShareDialog from './ShareCard';
import { useGamification } from '../contexts/GamificationContext';
import categorizedMLContent from '../../categorizedMLContent';
import categorizedDLContent from '../../categorizedDLContent';
import categorizedGenAIContent from '../../categorizedGenAIContent';
import categorizedPrerequisiteContent from '../../categorizedPrerequisiteContent';

// Animation variants — snappy fadeUp + stagger like HomePage
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: 'easeOut' },
  }),
};

const LearnerDashboard = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  const [darkMode, baseToggleDarkMode] = useDarkMode();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState({});
  const [shareOpen, setShareOpen] = useState(false);
  const { streak, level, roadmaps: gamifiedRoadmaps } = useGamification();
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
      fill: 'var(--pastel-mint)',
      loud: '#00873c',
      icon: <BookOpen className="w-5 h-5" />,
      content: categorizedPrerequisiteContent
    },
    {
      id: 'mlRoadmapProgress',
      title: 'Machine Learning',
      path: '/machinelearning',
      fill: 'var(--pastel-blue)',
      loud: '#3300ff',
      icon: <Target className="w-5 h-5" />,
      content: categorizedMLContent
    },
    {
      id: 'dlRoadmapProgress',
      title: 'Deep Learning',
      path: '/deeplearning',
      fill: 'var(--pastel-pink)',
      loud: '#ff2e88',
      icon: <TrendingUp className="w-5 h-5" />,
      content: categorizedDLContent
    },
    {
      id: 'genaiRoadmapProgress',
      title: 'Generative AI',
      path: '/genai',
      fill: 'var(--pastel-yellow)',
      loud: '#e07800',
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

  // Share card data — overall totals from the gamification context
  const shareTotals = Object.values(gamifiedRoadmaps).reduce(
    (acc, r) => ({ done: acc.done + r.done, total: acc.total + r.total }),
    { done: 0, total: 0 }
  );
  const sharePct = shareTotals.total === 0 ? 0 : Math.round((shareTotals.done / shareTotals.total) * 100);
  const shareCard = {
    headline: "I'm learning AI.\nNo fluff.",
    pct: sharePct,
    done: shareTotals.done,
    total: shareTotals.total,
    streak,
    levelName: level.name,
  };

  // Summary stat tiles
  const statCards = [
    { label: 'Total Resources', value: stats.totalTopics, icon: <BookOpen className="h-5 w-5" />, fill: 'var(--pastel-blue)' },
    { label: 'Completed', value: stats.completedTopics, icon: <CheckCircle className="h-5 w-5" />, fill: 'var(--pastel-mint)' },
    { label: 'Remaining', value: stats.totalTopics - stats.completedTopics, icon: <Circle className="h-5 w-5" />, fill: 'var(--pastel-yellow)' },
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

      <BrutalBackground />

      <div className="flex min-h-screen flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} isTransitioning={isTransitioning} />

        <main className="mx-auto w-full max-w-7xl flex-grow px-4 pb-20 pt-10 sm:pt-14">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <span className="brut-chip mb-4 bg-pastel-yellow">
              <Trophy className="h-4 w-4" /> Your Progress
            </span>
            <h1 className="font-display text-4xl uppercase tracking-tight text-ink sm:text-5xl">
              Your Learning Dashboard
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-soft">
              Track your progress and stay motivated on your AI learning journey.
            </p>
            <button onClick={() => setShareOpen(true)} className="brut-btn brut-btn-pink mt-6 px-6 py-3 text-sm">
              <Share2 className="h-4 w-4" strokeWidth={3} /> Share my progress
            </button>
          </motion.div>

          {/* Overall Stats */}
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            initial="hidden"
            animate="visible"
            className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {statCards.map((card, i) => (
              <motion.div
                key={card.label}
                variants={fadeUp}
                className={`border-[3px] border-ink p-6 shadow-brut ${i % 2 === 0 ? 'rotate-[-0.5deg]' : 'rotate-[0.5deg]'}`}
                style={{ background: card.fill }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-soft">{card.label}</span>
                  <span className="grid h-11 w-11 place-items-center border-[3px] border-ink bg-surface text-ink">
                    {card.icon}
                  </span>
                </div>
                <div className="font-display text-4xl text-ink">{card.value}</div>
              </motion.div>
            ))}

            {/* Overall Progress — loud acid tile */}
            <motion.div
              variants={fadeUp}
              className="rotate-[-0.5deg] border-[3px] border-[#0a0a0a] bg-acid p-6 shadow-brut"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#0a0a0a]">
                  <BarChart3 className="h-4 w-4" /> Overall Progress
                </span>
              </div>
              <div className="font-display text-4xl text-[#0a0a0a]">{stats.percentComplete}%</div>
              <div className="mt-3 h-3 border-2 border-[#0a0a0a] bg-white">
                <div
                  className="h-full bg-[#0a0a0a]"
                  style={{ width: `${stats.percentComplete}%`, transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1)' }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Roadmap Progress Cards */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3, ease: 'easeOut' }}
            className="mb-12"
          >
            <h2 className="mb-6 font-display text-2xl uppercase text-ink">
              Progress by Roadmap
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {roadmaps.map((roadmap, index) => {
                const roadmapProgress = getRoadmapProgress(roadmap.id);
                return (
                  <motion.div
                    key={roadmap.id}
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className={`brut-hover border-[3px] border-ink p-6 shadow-brut ${index % 2 === 0 ? 'rotate-[-0.5deg]' : 'rotate-[0.5deg]'} hover:rotate-0`}
                    style={{ background: roadmap.fill }}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className="grid h-12 w-12 shrink-0 place-items-center border-[3px] border-[#0a0a0a] text-white shadow-brut-sm"
                        style={{ background: roadmap.loud }}
                      >
                        {roadmap.icon}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-lg uppercase text-ink">
                          {roadmap.title}
                        </h3>
                        <p className="font-mono text-xs font-bold text-soft">
                          {roadmapProgress.completed} of {roadmapProgress.total} resources
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar — roadmap accent */}
                    <div className="brut-progress mb-3 w-full">
                      <div
                        data-full={roadmapProgress.percent === 100}
                        style={{ width: `${roadmapProgress.percent}%`, background: roadmap.loud }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-soft">
                        {roadmapProgress.percent}% Complete
                      </span>
                      <Link
                        to={roadmap.path}
                        className="group inline-flex items-center gap-1.5 text-sm font-bold uppercase text-ink"
                      >
                        Continue
                        <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" strokeWidth={3} />
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
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3, ease: 'easeOut' }}
              className="brut-card p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center border-[3px] border-[#0a0a0a] bg-electric text-white shadow-brut-sm">
                  <Calendar className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl uppercase text-ink">
                  Recent Activity
                </h2>
              </div>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-2 border-ink bg-surface-soft p-4 transition-colors duration-150 hover:bg-surface"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 shrink-0 text-ink" strokeWidth={3} />
                      <div className="min-w-0">
                        <p className="font-bold text-ink">
                          {activity.topic}
                        </p>
                        <p className="font-mono text-xs text-faint">
                          {activity.roadmap}
                        </p>
                      </div>
                    </div>
                    <span className="brut-chip bg-pastel-mint">
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
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3, ease: 'easeOut' }}
              className="brut-card px-6 py-16 text-center"
            >
              <span className="mx-auto mb-5 grid h-16 w-16 place-items-center border-[3px] border-[#0a0a0a] bg-acid text-[#0a0a0a] shadow-brut-sm">
                <BookOpen className="h-8 w-8" />
              </span>
              <h3 className="mb-2 font-display text-xl uppercase text-ink">
                Start Your Learning Journey
              </h3>
              <p className="mb-6 text-soft">
                Begin exploring roadmaps to track your progress.
              </p>
              <Link
                to="/"
                className="brut-btn px-6 py-3 text-[15px]"
              >
                Explore Roadmaps <ArrowRight className="h-4 w-4" strokeWidth={3} />
              </Link>
            </motion.div>
          )}
        </main>

        <Footer darkMode={darkMode} />
      </div>

      <ShareDialog open={shareOpen} onClose={() => setShareOpen(false)} card={shareCard} />
      <BackToTopButton />
    </>
  );
};

export default LearnerDashboard;
