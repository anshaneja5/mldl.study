import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { Trophy, Target, BookOpen, CheckCircle, Circle, TrendingUp, Award, Calendar, BarChart3 } from 'lucide-react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import useDarkMode from './useDarkMode';
import BackToTopButton from './BackToTopButton';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
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

  // Roadmaps configuration with localStorage keys
  const roadmaps = [
    {
      id: 'prerequisiteRoadmapProgress',
      title: 'Prerequisites',
      path: '/prerequisites',
      color: 'from-emerald-500 to-teal-500',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 'mlRoadmapProgress',
      title: 'Machine Learning',
      path: '/machinelearning',
      color: 'from-blue-500 to-indigo-500',
      icon: <Target className="w-5 h-5" />
    },
    {
      id: 'dlRoadmapProgress',
      title: 'Deep Learning',
      path: '/deeplearning',
      color: 'from-purple-500 to-pink-500',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: 'genaiRoadmapProgress',
      title: 'Generative AI',
      path: '/genai',
      color: 'from-amber-500 to-orange-500',
      icon: <Award className="w-5 h-5" />
    }
  ];

  // Load progress from localStorage
  useEffect(() => {
    const loadProgress = () => {
      const savedProgress = {};
      let totalVideos = 0;
      let completedVideos = 0;

      roadmaps.forEach(roadmap => {
        const roadmapProgress = localStorage.getItem(roadmap.id);
        if (roadmapProgress) {
          try {
            const parsed = JSON.parse(roadmapProgress);
            savedProgress[roadmap.id] = parsed;
            
            // Calculate stats - the progress object has keys like "TopicName_videoUrl"
            // and values are boolean (true for completed)
            Object.keys(parsed).forEach(key => {
              totalVideos++;
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
    const roadmapData = progress[roadmapId] || {};
    const videos = Object.keys(roadmapData);
    const completed = videos.filter(v => roadmapData[v] === true).length;
    const total = videos.length;
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

  return (
    <>
      <Helmet>
        <title>Learner Dashboard | Track Your Progress</title>
        <meta 
          name="description" 
          content="Track your learning progress across all ML/DL roadmaps. Monitor completed topics and continue your journey to AI mastery." 
        />
      </Helmet>

      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-slate-50 text-gray-900'}`}>
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Navbar 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            isTransitioning={isTransitioning}
          />
        </motion.div>

        <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center mb-4">
              <Trophy className={`w-8 h-8 mr-3 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
              <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Your Learning Dashboard
              </h1>
            </div>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Track your progress and stay motivated on your AI learning journey
            </p>
          </motion.div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Resources</span>
                <BookOpen className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              </div>
              <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {stats.totalTopics}
              </div>
            </motion.div>

            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Completed</span>
                <CheckCircle className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
              </div>
              <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {stats.completedTopics}
              </div>
            </motion.div>

            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Remaining</span>
                <Circle className={`w-5 h-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
              </div>
              <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {stats.totalTopics - stats.completedTopics}
              </div>
            </motion.div>

            <motion.div
              custom={3}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Overall Progress</span>
                <BarChart3 className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
              </div>
              <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {stats.percentComplete}%
              </div>
            </motion.div>
          </div>

          {/* Roadmap Progress Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-12"
          >
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Progress by Roadmap
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roadmaps.map((roadmap, index) => {
                const roadmapProgress = getRoadmapProgress(roadmap.id);
                return (
                  <motion.div
                    key={roadmap.id}
                    custom={index + 4}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${roadmap.color} text-white mr-3`}>
                          {roadmap.icon}
                        </div>
                        <div>
                          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {roadmap.title}
                          </h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {roadmapProgress.completed} of {roadmapProgress.total} resources
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className={`w-full h-3 rounded-full mb-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${roadmap.color} transition-all duration-500`}
                        style={{ width: `${roadmapProgress.percent}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {roadmapProgress.percent}% Complete
                      </span>
                      <Link 
                        to={roadmap.path}
                        className={`text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}
                      >
                        Continue →
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="flex items-center mb-6">
                <Calendar className={`w-6 h-6 mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Recent Activity
                </h2>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                  >
                    <div className="flex items-center">
                      <CheckCircle className={`w-5 h-5 mr-3 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {activity.topic}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {activity.roadmap}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                    }`}>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className={`text-center py-16 px-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <BookOpen className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Start Your Learning Journey
              </h3>
              <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Begin exploring roadmaps to track your progress
              </p>
              <Link 
                to="/"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium transition-all"
              >
                Explore Roadmaps
              </Link>
            </motion.div>
          )}
        </main>

        <BackToTopButton />
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
};

export default LearnerDashboard;
