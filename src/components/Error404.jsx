import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AuroraBackground from './AuroraBackground';
import useDarkMode from './useDarkMode';

const Error404 = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <>
      <AuroraBackground />

      <div className="flex min-h-screen flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="flex flex-grow flex-col items-center justify-center px-4 pb-20 pt-10 text-center sm:pt-14">
          <h1 className="text-aurora text-[7rem] font-extrabold leading-none tracking-tight sm:text-[10rem]">
            404
          </h1>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
            Oops! Page Not Found
          </h2>
          <p className="mt-3 max-w-md text-soft">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-aurora mt-8 rounded-2xl px-6 py-3">
            Go Back to Home
          </Link>
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </>
  );
};

export default Error404;
