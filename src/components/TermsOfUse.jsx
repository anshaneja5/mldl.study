import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import useDarkMode from './useDarkMode';

const TermsOfUse = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <>
      <Helmet>
        <title>Terms of Use | mldl.study</title>
        <meta name="description" content="Terms of Use for mldl.study." />
      </Helmet>

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Terms of Use
          </h1>
          <div className={`prose dark:prose-invert lg:prose-xl mx-auto mt-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>This is a placeholder for the Terms of Use page. Content will be added here soon.</p>
            <p>By using this website, you will be agreeing to the terms and conditions outlined in this document.</p>
          </div>
        </div>
      </div>

      <Footer darkMode={darkMode} />
    </>
  );
};

export default TermsOfUse;