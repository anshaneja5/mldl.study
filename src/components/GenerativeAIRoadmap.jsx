import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Github } from 'lucide-react';
import Modal from './Modal';
import Navbar from './Navbar';
import ReactGA from 'react-ga4';
import genai from "../../categorizedGenAIContent";
import Footer from './Footer';

const topics = [
  { id: 1, name: 'Courses and Tutorials', x: 50, y: 10, color: '#2563eb', icon: '📚' },
  { id: 2, name: 'Transformer Fundamentals', x: 30, y: 35, color: '#2563eb', icon: '🧠' },
  { id: 3, name: 'Implementation Guides', x: 70, y: 35, color: '#2563eb', icon: '💻' },
  { id: 4, name: 'Educational Channels', x: 30, y: 65, color: '#3b82f6', icon: '🎓' },
  { id: 5, name: 'Visualization and Research', x: 70, y: 65, color: '#3b82f6', icon: '🔍' },
];

const connections = [
  { from: 1, to: 2 }, { from: 1, to: 3 },
  { from: 2, to: 4 }, { from: 2, to: 5 },
  { from: 3, to: 5 },
];

const GenerativeAIRoadmap = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [hoveredTopic, setHoveredTopic] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [topicProgress, setTopicProgress] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTopics, setFilteredTopics] = useState(topics);
  const [sortBy, setSortBy] = useState('id');
  const containerRef = useRef(null);

  // Load progress and dark mode settings and check mobile view
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('genaiRoadmapProgress');
      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress);
        setTopicProgress(parsedProgress);
      }

      const savedDarkMode = localStorage.getItem('darkMode');
      let shouldUseDarkMode;
      
      if (savedDarkMode !== null) {
        shouldUseDarkMode = savedDarkMode === 'true';
      } else {
        // Detect browser's theme preference
        shouldUseDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      setDarkMode(shouldUseDarkMode);
      document.documentElement.classList.toggle('dark', shouldUseDarkMode);

      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    } catch (error) {
      console.error('Error loading progress:', error);
      setTopicProgress({});
    }
  }, []);

  // Filter and sort topics based on search term and sort option
  useEffect(() => {
    let filtered = topics;
    
    // Apply search filter
    if (searchTerm) {
      filtered = topics.filter(topic => 
        topic.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'id') {
        return a.id - b.id;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'progress') {
        const progressA = calculateTopicProgress(a.name);
        const progressB = calculateTopicProgress(b.name);
        return progressB - progressA;
      }
      return 0;
    });
    
    setFilteredTopics(filtered);
  }, [searchTerm, sortBy, topicProgress]);

  const calculateTopicProgress = (topicName) => {
    const topicVideos = genai[topicName] || [];
    if (topicVideos.length === 0) return 0;
    
    const completedVideos = topicVideos.filter(
      (video) => topicProgress[`${topicName}_${video.url}`] === true
    ).length;
    
    return Math.round((completedVideos / topicVideos.length) * 100);
  };

  const calculateOverallProgress = () => {
    if (Object.keys(topicProgress).length === 0) return 0;
    
    const totalProgress = topics.reduce((acc, topic) => {
      return acc + calculateTopicProgress(topic.name);
    }, 0);
    
    return Math.round(totalProgress / topics.length);
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    ReactGA.event({
      category: 'User Interaction',
      action: 'Topic Clicked',
      label: topic.name
    });
  };

  const closeModal = () => {
    setSelectedTopic(null);
  };

  const updateTopicProgress = (topicName, videoUrl, completed, bulkUpdates = null) => {
    try {
      let newProgress;
      
      if (bulkUpdates) {
        // Handle bulk updates for "Mark as Complete" functionality
        newProgress = {
          ...topicProgress,
          ...bulkUpdates
        };
      } else {
        // Handle single video update
        const progressKey = `${topicName}_${videoUrl}`;
        newProgress = {
          ...topicProgress,
          [progressKey]: completed
        };
      }
      
      setTopicProgress(newProgress);
      localStorage.setItem('genaiRoadmapProgress', JSON.stringify(newProgress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };
  
  // Toggle dark mode and persist in localStorage
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  const overallProgress = calculateOverallProgress();

  const getConnectionColor = (from, to) => {
    if (hoveredTopic) {
      if (from === hoveredTopic.id || to === hoveredTopic.id) {
        return darkMode ? '#60a5fa' : '#3b82f6';
      }
      return darkMode ? '#333333' : '#e5e7eb';
    }
    return darkMode ? '#4B5563' : '#d1d5db';
  };

  const ContributionBanner = () => (
    <div className="w-full max-w-xl px-4 mb-6">
      <div className="bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <svg 
              className="h-5 w-5 text-blue-600 dark:text-blue-400" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-blue-800 dark:text-blue-200">
              Under Construction
            </h3>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              This roadmap is actively being developed. We welcome contributions!
            </p>
            <a
              href="https://github.com/anshaneja5/mldl.study"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-2 text-blue-700 dark:text-blue-200 hover:text-blue-800 dark:hover:text-blue-100 hover:underline font-medium"
            >
              <Github className="w-4 h-4 mr-1.5" />
              Contribute on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile View - Card Layout
  const MobileView = () => (
    <div className="grid grid-cols-1 gap-4">
      {filteredTopics.map((topic) => {
        const progress = calculateTopicProgress(topic.name);
        return (
          <div
            key={topic.id}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg`}
            onClick={() => handleTopicClick(topic)}
          >
            <div 
              className="h-2"
              style={{ backgroundColor: topic.color }}
            ></div>
            <div className="p-4">
              <div className="flex items-center mb-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl mr-3"
                  style={{ backgroundColor: `${topic.color}20` }}
                >
                  {topic.icon}
                </div>
                <h3 className="text-lg font-semibold">{topic.name}</h3>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${progress}%`,
                      backgroundColor: topic.color
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {genai[topic.name]?.length || 0} resources
                </span>
                <button 
                  className="px-3 py-1 text-sm rounded-full"
                  style={{ 
                    backgroundColor: `${topic.color}20`,
                    color: topic.color
                  }}
                >
                  View Resources
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Desktop View - Graph Visualization
  const DesktopView = () => {
    // For graph view, we need to maintain the original positions
    // but still respect the filtering
    const visibleTopics = filteredTopics;
    
    return (
      <div ref={containerRef} className="relative w-full max-w-7xl h-[800px] rounded-lg overflow-hidden p-4 mx-auto">
        <svg className="absolute top-0 left-0 w-full h-full">
          {connections.map((conn, index) => {
            const from = topics.find((t) => t.id === conn.from);
            const to = topics.find((t) => t.id === conn.to);
            
            // Only draw connections if both topics are visible
            if (!visibleTopics.some(t => t.id === from.id) || 
                !visibleTopics.some(t => t.id === to.id)) {
              return null;
            }
            
            return (
              <line
                key={index}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke={getConnectionColor(conn.from, conn.to)}
                strokeWidth="2.5"
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
        {visibleTopics.map((topic) => {
          const progress = calculateTopicProgress(topic.name);
          return (
            <div
              key={topic.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${topic.x}%`, top: `${topic.y}%` }}
            >
              <button
                className={`relative px-6 py-5 rounded-lg text-white shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  hoveredTopic && hoveredTopic.id !== topic.id ? 'opacity-60' : 'opacity-100'
                }`}
                style={{ backgroundColor: topic.color, maxWidth: '240px', minWidth: '200px' }}
                onClick={() => handleTopicClick(topic)}
                onMouseEnter={() => setHoveredTopic(topic)}
                onMouseLeave={() => setHoveredTopic(null)}
              >
                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-medium">
                  {topic.id}
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{topic.icon}</span>
                  <span className="text-sm font-medium whitespace-normal leading-tight">
                    {topic.name}
                  </span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2.5">
                  <div
                    className="bg-white h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="text-xs mt-1 text-right">{progress}%</div>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Generative AI Roadmap | Your Roadmap to GenAI Mastery</title>
        <meta
          name="description"
          content="Navigate our comprehensive Generative AI Roadmap featuring expert resources, tutorials, and progress tracking to master generative AI techniques."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://mldl.study/genai" />
      </Helmet>

      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} isTransitioning={false} />

      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Generative AI Roadmap
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Follow this comprehensive roadmap to master generative AI concepts, from transformers to advanced implementations.
            </p>
          </div>

          {/* Progress Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-semibold mb-2">Your Progress</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {overallProgress}% of the roadmap completed
                </p>
              </div>
              <div className="w-full md:w-2/3">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Under Construction Box - Centered */}
          <div className="flex justify-center mb-8">
            <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-200 p-4 rounded-lg shadow-md max-w-2xl w-full">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">
                    This roadmap is currently under construction
                  </p>
                  <p className="text-sm mt-1">
                    We're working on adding more comprehensive content. Check back soon!
                  </p>
                  <a 
                    href="https://github.com/anshaneja5/mldl.study" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-2 text-yellow-700 dark:text-yellow-300 hover:underline"
                  >
                    <Github className="w-4 h-4 mr-1" />
                    <span>Contribute on GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search topics..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute right-3 top-2.5 text-gray-500">
                🔍
              </span>
            </div>
            {isMobile && (
              <div className="flex items-center">
                <label className="mr-2 text-sm">Sort by:</label>
                <select
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="id">Order</option>
                  <option value="name">Name</option>
                  <option value="progress">Progress</option>
                </select>
              </div>
            )}
          </div>

          {/* Roadmap View */}
          <div className="mb-8">
            {isMobile ? <MobileView /> : <DesktopView />}
          </div>

          {/* Empty State */}
          {filteredTopics.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No topics found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}

          {/* Next Steps Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Want to learn Deep Learning?</h2>
                <p className="text-blue-100">
                  Start with our comprehensive Deep Learning Roadmap.
                </p>
              </div>
              <a
                href="/deeplearning"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Explore Deep Learning
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedTopic && (
        <Modal
          topic={selectedTopic}
          onClose={() => setSelectedTopic(null)}
          videoSource={genai}
          existingProgress={topicProgress}
          onProgressUpdate={updateTopicProgress}
          darkMode={darkMode}
        />
      )}

      <Footer darkMode={darkMode} />
    </>
  );
};

export default GenerativeAIRoadmap;
