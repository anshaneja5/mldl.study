import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-6xl md:text-8xl font-bold mb-4 text-purple-600">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-center">
        Oops! Page Not Found
      </h2>
      <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 text-center mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-purple-600 dark:bg-purple-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-purple-700 dark:hover:bg-purple-400 transition-all duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default Error404;
