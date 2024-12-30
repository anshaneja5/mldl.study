import React, { useState, useRef, useEffect } from 'react';
import { Github } from 'lucide-react';
import Modal from './Modal';
import ReactGA from 'react-ga4';
import genai from "../../categorizedGenAIContent"
const topics = [
  { id: 1, name: 'Courses and Tutorials', x: 50, y: 10, color: '#2563eb' },
  { id: 2, name: 'Transformer Fundamentals', x: 30, y: 35, color: '#2563eb' },
  { id: 3, name: 'Implementation Guides', x: 70, y: 35, color: '#2563eb' },
  { id: 4, name: 'Educational Channels', x: 30, y: 65, color: '#3b82f6' },
  { id: 5, name: 'Visualization and Research', x: 70, y: 65, color: '#3b82f6' },
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
  const containerRef = useRef(null);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('genaiRoadmapProgress')) || {};
    setTopicProgress(savedProgress);

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
      <div className="bg-blue-50 bg-yellow-900/20 border border-blue-200 border-yellow-700 rounded-lg p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <svg 
              className="h-5 w-5 text-blue-600 dark:text-yellow-400" 
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
            <h3 className="text-base font-semibold text-blue-800 light:text-yellow-200">
              Under Construction
            </h3>
            <p className="mt-2 text-sm text-gray-700 light:text-yellow-300">
              This roadmap is actively being developed. We welcome contributions!
            </p>
            <a
              href="https://github.com/anshaneja5/mldl.study"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-2 text-blue-700 light:text-yellow-200 hover:text-blue-800 dark:hover:text-yellow-100 hover:underline font-medium"
            >
              <Github className="w-4 h-4 mr-1.5" />
              Contribute on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
  

  const MobileView = () => (
    <div className="w-full max-w-lg px-4">
      <div className="space-y-3">
        {topics.map((topic) => (
          <div 
            key={topic.id} 
            className="w-full rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <button
              className="w-full p-3 rounded-lg text-white shadow-sm transition-all duration-300 flex items-center space-x-3"
              style={{ backgroundColor: topic.color }}
              onClick={() => setSelectedTopic(topic)}
            >
              <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-sm font-medium shrink-0">
                {topic.id}
              </div>
              <span className="text-sm text-left flex-grow">{topic.name}</span>
              <svg 
                className="w-4 h-4 ml-auto shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
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
            onClick={() => setSelectedTopic(topic)}
            onMouseEnter={() => setHoveredTopic(topic)}
            onMouseLeave={() => setHoveredTopic(null)}
          >
            <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-medium">
              {topic.id}
            </div>
            <span className="text-xs sm:text-sm whitespace-normal leading-tight block">
              {topic.name}
            </span>
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center px-4">
        Generative AI Roadmap
      </h1>
      <ContributionBanner />
      <p className="text-sm mb-6 text-gray-600 dark:text-gray-400 text-center px-4">
        {isMobile ? 'Follow the sequence to master GenAI concepts' : 'Follow the numbered path to master Generative AI concepts'}
      </p>
      {isMobile ? <MobileView /> : <DesktopView />}
      {selectedTopic && (
        <Modal
          topic={selectedTopic}
          onClose={() => setSelectedTopic(null)}
          videoSource={genai}
          existingProgress={topicProgress}
          onProgressUpdate={(topicName, videoUrl, completed) => {
            const newProgress = {
              ...topicProgress,
              [`${topicName}_${videoUrl}`]: completed,
            };
            setTopicProgress(newProgress);
            localStorage.setItem('genaiRoadmapProgress', JSON.stringify(newProgress));
          }}
          darkMode={darkMode}
        />
      )}
      <div className="w-full px-4 mt-4 sm:mt-8">
        <div className="max-w-xl mx-auto bg-blue-50 dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transition-all duration-300">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 dark:text-white mb-3">
            Want to learn Deep Learning?
          </h2>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
            Check out our comprehensive Deep Learning Roadmap for a structured learning path.
          </p>
          <button
            onClick={() => window.location.href = '/deeplearning'}
            className="bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 transition-all duration-300"
          >
            Explore DL Roadmap 🎓
          </button>
        </div>
      </div>
      <div className="pb-8"></div>
    </div>
  );
};

export default GenerativeAIRoadmap;