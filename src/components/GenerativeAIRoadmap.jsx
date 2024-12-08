import React from 'react';

const GenerativeAIRoadmap = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-gray-900 dark:text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Generative AI Roadmap
      </h1>
      <div className="w-full px-4 mt-6">
        <div className="max-w-xl mx-auto bg-purple-100 dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transition-all duration-300">
          <h2 className="text-lg sm:text-xl font-semibold text-purple-800 dark:text-white mb-3">
            Contribute to Generative AI Resources
          </h2>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
            This roadmap is under construction. You can help us create an amazing resource for learning Generative AI!
          </p>
          <a
            href="https://github.com/anshaneja5/mldl.study"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 dark:bg-purple-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-purple-700 dark:hover:bg-purple-400 transition-all duration-300"
          >
            Contribute Now 🚀
          </a>
        </div>
        <div className="max-w-xl mx-auto mt-6 bg-purple-100 dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transition-all duration-300">
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
            Content Coming Soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GenerativeAIRoadmap;
