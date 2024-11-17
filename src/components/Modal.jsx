import React, { useState, useEffect } from 'react';

const Modal = ({ topic, onClose, videoSource }) => {
  const topicVideos = videoSource[topic.name] || []; // Use the passed video source
  const [completedVideos, setCompletedVideos] = useState({});

  // Load completed videos from localStorage
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('completedVideos')) || {};
    setCompletedVideos(savedProgress);
  }, []);

  // Save completed videos to localStorage
  const saveProgress = (videoUrl) => {
    const updatedProgress = { ...completedVideos, [videoUrl]: !completedVideos[videoUrl] };
    setCompletedVideos(updatedProgress);
    localStorage.setItem('completedVideos', JSON.stringify(updatedProgress));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl m-4 w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{topic.name}</h2>
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
                        completedVideos[content.url]
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-black'
                      }`}
                    >
                      {completedVideos[content.url] ? 'Completed' : 'Complete'}
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
