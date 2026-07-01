import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BrutalBackground from './BrutalBackground';
import useDarkMode from './useDarkMode';

const Error404 = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <>
      <BrutalBackground />

      <div className="flex min-h-screen flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="flex flex-grow flex-col items-center justify-center px-4 pb-20 pt-10 text-center sm:pt-14">
          <div className="relative">
            <h1 className="font-display text-[7rem] uppercase leading-none tracking-tight text-ink [text-shadow:6px_6px_0_var(--hot-pink)] sm:text-[11rem] sm:[text-shadow:9px_9px_0_var(--hot-pink)]">
              404
            </h1>
            <div
              className="brut-sticker absolute -right-8 -top-4 h-20 w-20 bg-cyber-yellow text-[10px] text-[#0a0a0a] sm:-right-14 sm:-top-6 sm:h-24 sm:w-24 sm:text-xs"
              aria-hidden="true"
            >
              Page Not Found
            </div>
          </div>
          <h2 className="mt-6 inline-block rotate-[-1deg] bg-electric px-3 py-1 font-display text-2xl uppercase text-white shadow-brut sm:text-3xl">
            Oops! Page Not Found
          </h2>
          <p className="mt-6 max-w-md text-soft">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="brut-btn mt-8 px-7 py-3">
            Go Back to Home
          </Link>
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </>
  );
};

export default Error404;
