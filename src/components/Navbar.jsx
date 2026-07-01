import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Waypoints, ChevronDown, Coffee, Github, Linkedin, Twitter, Zap, Flame, Command } from 'lucide-react';
import { useGamification } from '../contexts/GamificationContext';

const PRIMARY = [
  { path: '/prerequisites', label: 'Prereqs' },
  { path: '/machinelearning', label: 'ML' },
  { path: '/deeplearning', label: 'DL' },
  { path: '/genai', label: 'GenAI' },
  { path: '/dashboard', label: 'Dashboard' },
];

const SECONDARY = [
  { path: '/bookmarks', label: 'Bookmarks' },
  { path: '/search', label: 'Search' },
  { path: '/books', label: 'Books' },
  { path: '/researchpapers', label: 'Papers' },
  { path: '/journey', label: 'Journey' },
  { path: '/questionbank', label: 'Questions' },
];

const BMC_URL = 'https://buymeacoffee.com/anshaneja';
const REPO_URL = 'https://github.com/anshaneja5/mldl.study';
const X_URL = 'https://x.com/vedolos/';
const LINKEDIN_URL = 'https://www.linkedin.com/in/anshaneja5/';

const openPalette = () => window.dispatchEvent(new Event('mldl:open-palette'));

const Logo = () => (
  <Link to="/" className="group flex items-center gap-2.5">
    <span className="grid h-9 w-9 place-items-center border-[3px] border-[#0a0a0a] bg-acid text-[#0a0a0a] shadow-brut-sm transition-transform duration-150 group-hover:-rotate-6">
      <Waypoints className="h-5 w-5" strokeWidth={2.6} />
    </span>
    <span className="font-display text-lg tracking-tight text-ink">
      MLDL<span className="bg-hot-pink px-1 text-white">.STUDY</span>
    </span>
  </Link>
);

const ThemeToggle = ({ darkMode, toggleDarkMode, className = '' }) => (
  <button
    onClick={toggleDarkMode}
    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    className={`grid h-9 w-9 place-items-center border-[3px] border-ink bg-surface text-ink shadow-brut-sm transition-transform duration-150 hover:-translate-y-0.5 ${className}`}
  >
    {darkMode ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
  </button>
);

const XpChip = ({ className = '' }) => {
  const { xp, streak, level } = useGamification();
  return (
    <Link
      to="/dashboard"
      className={`brut-chip bg-pastel-yellow text-ink transition-transform duration-150 hover:-translate-y-0.5 ${className}`}
      title={`Level: ${level.name}`}
      aria-label={`${xp} XP, level ${level.name}${streak > 0 ? `, ${streak}-day streak` : ''}`}
    >
      <Zap size={12} strokeWidth={3} />
      {xp} XP
      {streak > 0 && (
        <span className="flex items-center gap-0.5 text-hot-pink">
          <Flame size={12} strokeWidth={3} />
          {streak}
        </span>
      )}
    </Link>
  );
};

const DesktopLinks = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <ul className="flex items-center gap-4">
      {PRIMARY.map((item) => {
        const active = location.pathname === item.path;
        return (
          <li key={item.path}>
            <Link
              to={item.path}
              aria-current={active ? 'page' : undefined}
              className={`px-1.5 py-0.5 text-sm font-bold uppercase tracking-wide transition-colors duration-100 ${
                active ? 'bg-acid text-[#0a0a0a] shadow-brut-sm' : 'text-soft hover:bg-acid hover:text-[#0a0a0a]'
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}

      <li className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <button
          className="flex items-center gap-1 px-1.5 py-0.5 text-sm font-bold uppercase tracking-wide text-soft hover:bg-acid hover:text-[#0a0a0a]"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          More
          <ChevronDown className={`h-4 w-4 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
        </button>
        <div
          className={`absolute right-0 top-full w-52 pt-2 transition-all duration-100 ${
            open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div className="brut-card p-1.5">
            {SECONDARY.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 text-sm font-bold uppercase tracking-wide ${
                    active ? 'bg-acid text-[#0a0a0a]' : 'text-soft hover:bg-acid hover:text-[#0a0a0a]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </li>
    </ul>
  );
};

const MobileSheet = ({ isOpen, onClose, darkMode, toggleDarkMode }) => {
  const location = useLocation();

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && isOpen && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const allItems = [...PRIMARY, ...SECONDARY];

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-200 ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div
        className={`absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto border-t-[3px] border-ink bg-surface p-6 transition-transform duration-200 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-5 flex items-center justify-between">
          <span className="font-display text-lg uppercase text-ink">Menu</span>
          <div className="flex items-center gap-2">
            <XpChip />
            <button onClick={onClose} aria-label="Close menu" className="grid h-9 w-9 place-items-center border-[3px] border-ink bg-surface text-ink shadow-brut-sm">
              <X size={20} />
            </button>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-3">
          {allItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`border-[3px] border-ink px-4 py-3 text-[15px] font-bold uppercase tracking-wide shadow-brut-sm ${
                  active ? 'bg-acid text-[#0a0a0a]' : 'bg-surface text-ink'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="brut-card mt-5 p-4">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-hot-pink">Follow Ansh</p>
          <p className="mt-1 text-sm text-soft">Get AI resources, Claude Code, Cursor, agentic coding, and build notes.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-center gap-2 border-[3px] border-[#0a0a0a] bg-[#0f1419] px-4 py-3 text-sm font-bold uppercase text-white shadow-brut-sm"
            >
              <Twitter size={18} />
              Follow on X
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-center gap-2 border-[3px] border-[#0a0a0a] bg-[#0a66c2] px-4 py-3 text-sm font-bold uppercase text-white shadow-brut-sm"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t-[3px] border-ink pt-5">
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 border-[3px] border-ink bg-surface px-4 py-2.5 text-sm font-bold uppercase text-ink shadow-brut-sm"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? 'Light mode' : 'Dark mode'}
          </button>
          <div className="flex items-center gap-2">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" onClick={onClose} className="grid h-10 w-10 place-items-center border-[3px] border-ink bg-surface text-ink shadow-brut-sm">
              <Github size={18} />
            </a>
            <a href={BMC_URL} target="_blank" rel="noopener noreferrer" onClick={onClose} className="grid h-10 w-10 place-items-center border-[3px] border-[#0a0a0a] bg-cyber-yellow text-[#0a0a0a] shadow-brut-sm">
              <Coffee size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-canvas">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />

          <div className="hidden items-center gap-5 md:flex">
            <DesktopLinks />
            <div className="flex items-center gap-2 border-l-[3px] border-ink pl-5">
              <XpChip className="hidden lg:inline-flex" />
              <button
                onClick={openPalette}
                aria-label="Open command palette"
                className="hidden h-9 items-center gap-1.5 border-[3px] border-ink bg-surface px-2.5 font-mono text-xs font-bold uppercase text-ink shadow-brut-sm transition-transform duration-150 hover:-translate-y-0.5 lg:flex"
              >
                <Command size={13} strokeWidth={3} />
                K
              </button>
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Ansh on X"
                className="flex h-9 items-center gap-1.5 border-[3px] border-[#0a0a0a] bg-[#0f1419] px-3 text-sm font-bold text-white shadow-brut-sm transition-transform duration-150 hover:-translate-y-0.5"
              >
                <Twitter className="h-[16px] w-[16px]" />
                <span className="hidden xl:inline">X</span>
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Ansh on LinkedIn"
                className="flex h-9 items-center gap-1.5 border-[3px] border-[#0a0a0a] bg-[#0a66c2] px-3 text-sm font-bold text-white shadow-brut-sm transition-transform duration-150 hover:-translate-y-0.5"
              >
                <Linkedin className="h-[16px] w-[16px]" />
                <span className="hidden xl:inline">in</span>
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                className="grid h-9 w-9 place-items-center border-[3px] border-ink bg-surface text-ink shadow-brut-sm transition-transform duration-150 hover:-translate-y-0.5"
              >
                <Github className="h-[18px] w-[18px]" />
              </a>
              <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <a
                href={BMC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 items-center gap-1.5 border-[3px] border-[#0a0a0a] bg-cyber-yellow px-3 text-sm font-bold uppercase text-[#0a0a0a] shadow-brut-sm transition-transform duration-150 hover:-translate-y-0.5"
              >
                <Coffee className="h-[16px] w-[16px]" />
                <span>Support</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <XpChip />
            <button
              onClick={() => setMobileOpen(true)}
              className="grid h-10 w-10 place-items-center border-[3px] border-ink bg-surface text-ink shadow-brut-sm"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      <MobileSheet
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </>
  );
};

export default Navbar;
