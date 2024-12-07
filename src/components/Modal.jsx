import React, { useState, useEffect } from 'react';

const Modal = ({ topic, onClose, videoSource, existingProgress = {}, onProgressUpdate }) => {
  const topicVideos = videoSource[topic.name] || []; // Use the passed video source

  // Calculate completion percentage
  const completionPercentage = topicVideos.length > 0 
    ? Math.round((topicVideos.filter(video => 
        existingProgress[`${topic.name}_${video.url}`] === true
      ).length / topicVideos.length) * 100)
    : 0;

  const saveProgress = (videoUrl) => {
    // Toggle the progress for this specific video
    const currentProgress = existingProgress[`${topic.name}_${videoUrl}`] || false;
    onProgressUpdate(topic.name, videoUrl, !currentProgress);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl m-4 w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{topic.name}</h2>
          <div className="flex items-center">
            <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600">
              {completionPercentage}%
            </span>
          </div>
        </div>

        {topicVideos.length > 0 ? (
          <ul className="list-decimal pl-5 mb-4">
            {topicVideos.map((content, index) => (
              <li key={index} className="mb-4">
                {/* Video Link */}
                {content.url && (
                  <div className="flex justify-between items-center">
                    <a
                      href={content.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {content.title}
                    </a>
                    <button
                      onClick={() => saveProgress(content.url)}
                      className={`ml-4 px-4 py-1 rounded ${
                        existingProgress[`${topic.name}_${content.url}`]
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-black'
                      }`}
                    >
                      {existingProgress[`${topic.name}_${content.url}`] ? 'Completed' : 'Complete'}
                    </button>
                  </div>
                )}

                {/* Article Link */}
                {content.articleLink && content.articleTitle && (
                  <div>
                    <a
                      href={content.articleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      {content.articleTitle}
                    </a>
                  </div>
                )}

                {/* Notes Section */}
                {content.notes && (
                  <div>
                    <p className="text-red-600">{content.notes}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No materials available for this topic.</p>
        )}

        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;