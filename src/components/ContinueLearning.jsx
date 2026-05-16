import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { getLastVisitedRoadmap } from '../hooks/useLastVisitedRoadmap';

const ContinueLearning = ({ darkMode }) => {
  const lastVisited = getLastVisitedRoadmap();
  if (!lastVisited) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`w-full max-w-5xl mb-10 rounded-xl border p-5 transition-colors duration-300 ${
        darkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200 shadow-sm'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-start gap-3">
          <div
            className={`p-2.5 rounded-lg bg-gradient-to-r ${lastVisited.color} text-white shrink-0`}
          >
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <p
              className={`text-xs font-medium uppercase tracking-wide ${
                darkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}
            >
              Continue learning
            </p>
            <h2
              className={`text-lg font-semibold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {lastVisited.title}
            </h2>
            <p
              className={`text-sm mt-0.5 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {lastVisited.description}
            </p>
          </div>
        </div>
        <Link
          to={lastVisited.path}
          className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r ${lastVisited.color} text-white font-medium hover:opacity-90 transition-opacity shrink-0`}
        >
          Resume
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ContinueLearning;
