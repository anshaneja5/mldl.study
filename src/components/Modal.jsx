import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ topic, onClose, videoSource, existingProgress = {}, onProgressUpdate, darkMode }) => {
  const topicVideos = videoSource[topic.name] || [];

  const completionPercentage = topicVideos.length > 0
    ? Math.round((topicVideos.filter(video => 
        existingProgress[`${topic.name}_${video.url}`] === true
      ).length / topicVideos.length) * 100)
    : 0;

  const saveProgress = (videoUrl) => {
    const currentProgress = existingProgress[`${topic.name}_${videoUrl}`] || false;
    onProgressUpdate(topic.name, videoUrl, !currentProgress);
  };

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent body scroll when modal is open
    return () => {
      document.body.style.overflow = ""; // Restore body scroll when modal closes
    };
  }, []);

  // Animation classes
  const backdropClasses = "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm";
  const modalClasses = `relative w-full max-w-2xl rounded-xl shadow-2xl 
    ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
    transform transition-all duration-300 ease-out`;

  return (
    <div className={`${backdropClasses} animate-fadeIn`}>
      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <div className={modalClasses}>
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold pr-8">{topic.name}</h2>
            <button 
              onClick={onClose}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors
                ${darkMode 
                  ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'}`}
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4 bg-opacity-50 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Course Progress
              </span>
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {completionPercentage}%
              </span>
            </div>
            <div className={`mt-2 w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            {topicVideos.length > 0 ? (
              <ul className="space-y-4">
                {topicVideos.map((content, index) => (
                  <li key={index} className={`p-4 rounded-lg transition-colors
                    ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                    {content.url && (
                      <div className="flex justify-between items-center gap-4">
                        <a
                          href={content.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
                        >
                          {content.title}
                        </a>
                        <button
                          onClick={() => saveProgress(content.url)}
                          className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105
                            ${existingProgress[`${topic.name}_${content.url}`]
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : darkMode 
                                ? 'bg-gray-700 text-white hover:bg-gray-600'
                                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                            }`}
                        >
                          {existingProgress[`${topic.name}_${content.url}`] ? 'Completed ✓' : 'Mark Complete'}
                        </button>
                      </div>
                    )}

                    {content.articleLink && content.articleTitle && (
                      <div className="mt-2">
                        <a
                          href={content.articleLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'} hover:underline`}
                        >
                          📄 {content.articleTitle}
                        </a>
                      </div>
                    )}

                    {content.notes && (
                      <div className="mt-2 p-3 rounded-lg bg-opacity-10 
                        ${darkMode ? 'bg-red-500' : 'bg-red-50'}">
                        <p className={`text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                          📌 {content.notes}
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                No materials available for this topic.
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 
                transition-colors duration-200 transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
