import React, { useState, useRef, useEffect } from 'react';
import categorizedVideos from '../../categorizedMLContent';
import Modal from './Modal';
import ReactGA from 'react-ga4';

const topics = [
  { id: 1, name: 'Introduction to Machine Learning', x: 50, y: 10, color: '#2563eb' },
  { id: 2, name: 'Data Preprocessing', x: 25, y: 30, color: '#2563eb' },
  { id: 3, name: 'Regression Techniques', x: 50, y: 30, color: '#2563eb' },
  { id: 4, name: 'Classification Techniques', x: 75, y: 30, color: '#2563eb' },
  { id: 5, name: 'Clustering Algorithms', x: 25, y: 50, color: '#3b82f6' },
  { id: 6, name: 'Dimensionality Reduction', x: 50, y: 50, color: '#3b82f6' },
  { id: 7, name: 'Model Evaluation & Tuning', x: 75, y: 50, color: '#3b82f6' },
  { id: 8, name: 'Feature Selection & Engineering', x: 37.5, y: 70, color: '#60a5fa' },
  { id: 9, name: 'Ensemble Learning', x: 62.5, y: 70, color: '#60a5fa' },
];

const connections = [
  { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 4 },
  { from: 2, to: 5 }, { from: 2, to: 6 }, { from: 3, to: 6 }, { from: 4, to: 7 },
  { from: 5, to: 8 }, { from: 6, to: 8 }, { from: 7, to: 9 }, { from: 8, to: 9 },
];

const MachineLearningRoadmap = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [hoveredTopic, setHoveredTopic] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const closeModal = () => {
    setSelectedTopic(null);
  };

  const getConnectionColor = (from, to) => {
    if (hoveredTopic) {
      if (from === hoveredTopic.id || to === hoveredTopic.id) {
        return darkMode ? '#60a5fa' : '#3b82f6';
      }
      return darkMode ? '#333333' : '#e5e7eb';
    }
    return darkMode ? '#4B5563' : '#d1d5db';
  };

  const MobileView = () => (
    <div className="w-full max-w-lg px-4">
      <div className="space-y-3">
        {topics.map((topic) => (
          <button
            key={topic.id}
            className="w-full p-3 rounded-lg text-white shadow-sm transition-all duration-300 hover:shadow-md flex items-center space-x-3"
            style={{ backgroundColor: topic.color }}
            onClick={() => handleTopicClick(topic)}
          >
            <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-sm font-medium shrink-0">
              {topic.id}
            </div>
            <span className="text-sm text-left">{topic.name}</span>
            <svg 
              className="w-4 h-4 ml-auto shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );

  const DesktopView = () => (
    <div ref={containerRef} className="relative w-full max-w-6xl h-[600px] rounded-lg overflow-hidden p-4">
      <svg className="absolute top-0 left-0 w-full h-full">
        {connections.map((conn, index) => {
          const from = topics.find(t => t.id === conn.from);
          const to = topics.find(t => t.id === conn.to);
          return (
            <line
              key={index}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke={getConnectionColor(conn.from, conn.to)}
              strokeWidth="1.5"
              className="transition-all duration-300"
            />
          );
        })}
      </svg>
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${topic.x}%`,
            top: `${topic.y}%`,
          }}
        >
          <button
            className={`relative px-3 py-2 rounded-md text-white shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md ${
              hoveredTopic && hoveredTopic.id !== topic.id ? 'opacity-60' : 'opacity-100'
            }`}
            style={{
              backgroundColor: topic.color,
              maxWidth: '180px',
            }}
            onClick={() => handleTopicClick(topic)}
            onMouseEnter={() => setHoveredTopic(topic)}
            onMouseLeave={() => setHoveredTopic(null)}
          >
            <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-medium">
              {topic.id}
            </div>
            <span className="text-xs sm:text-sm whitespace-normal leading-tight">
              {topic.name}
            </span>
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center px-4">Machine Learning Roadmap</h1>
      <p className="text-sm mb-6 text-gray-600 dark:text-gray-400 text-center px-4">
        {isMobile ? 'Follow the sequence to master machine learning' : 'Follow the numbered path to master machine learning concepts'}
      </p>
      {isMobile ? <MobileView /> : <DesktopView />}
      {selectedTopic && (
        <Modal topic={selectedTopic} onClose={closeModal} videoSource={categorizedVideos} />
      )}
      <div className="w-full px-4 mt-4 sm:mt-8">
        <div className="max-w-xl mx-auto bg-blue-100 dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transition-all duration-300">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 dark:text-white mb-3">
            Ready to dive deeper into AI?
          </h2>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
            Continue your learning journey with our comprehensive Deep Learning Roadmap.
          </p>
          <button
            onClick={() => window.location.href = '/deeplearning'}
            className="bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 transition-all duration-300"
          >
            Explore Deep Learning Roadmap
          </button>
        </div>
      </div>
      <div className="pb-8"></div>
    </div>
  );
};

export default MachineLearningRoadmap;