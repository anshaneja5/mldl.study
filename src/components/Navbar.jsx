import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Waypoints, ChevronDown, Coffee, Github, Linkedin, Twitter } from 'lucide-react';

const PRIMARY = [
  { path: '/prerequisites', label: 'Prerequisites' },
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

const Logo = () => (
  <Link to="/" className="group flex items-center gap-2.5">
    <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-aurora-violet via-aurora-indigo to-aurora-cyan text-[#04060f] shadow-glow transition-transform duration-300 group-hover:scale-105">
      <Waypoints className="h-5 w-5" strokeWidth={2.4} />
      <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/30" />
    </span>
    <span className="font-display text-lg font-bold tracking-tight text-ink">
      mldl<span className="text-aurora">.study</span>
    </span>
  </Link>
);

const ThemeToggle = ({ darkMode, toggleDarkMode, className = '' }) => (
  <button
    onClick={toggleDarkMode}
    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    className={`group relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl glass transition-all duration-300 hover:shadow-glow ${className}`}
  >
    <span className="relative z-10 text-ink transition-transform duration-500 group-hover:rotate-[18deg]">
      {darkMode ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </span>
  </button>
);

const DesktopLinks = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const linkClass = (active) =>
    `relative px-1 py-1 text-sm font-medium transition-colors duration-300 ${
      active ? 'text-ink' : 'text-soft hover:text-ink'
    }`;

  return (
    <ul className="flex items-center gap-6">
      {PRIMARY.map((item) => {
        const active = location.pathname === item.path;
        return (
          <li key={item.path}>
            <Link to={item.path} className={linkClass(active)} aria-current={active ? 'page' : undefined}>
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-px rounded-full bg-gradient-to-r from-aurora-violet to-aurora-cyan transition-all duration-300 ${
                  active ? 'w-full opacity-100' : 'w-0 opacity-0'
                }`}
              />
            </Link>
          </li>
        );
      })}

      <li
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          className="flex items-center gap-1 px-1 py-1 text-sm font-medium text-soft transition-colors hover:text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          More
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
        <div
          className={`absolute right-0 top-full w-52 origin-top-right pt-3 transition-all duration-200 ${
            open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
          }`}
        >
          <div className="glass-strong glass-sheen overflow-hidden rounded-2xl p-1.5 shadow-glass">
            {SECONDARY.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block rounded-xl px-3.5 py-2 text-sm transition-colors ${
                    active ? 'text-aurora bg-white/5' : 'text-soft hover:bg-white/5 hover:text-ink'
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
      className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 bg-[#04050f]/70 backdrop-blur-md" />
      <div
        className={`glass-strong glass-sheen absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[2rem] p-6 shadow-glass transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-white/15" />
        <div className="mb-5 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-ink">Menu</span>
          <button onClick={onClose} aria-label="Close menu" className="grid h-9 w-9 place-items-center rounded-xl glass text-ink">
            <X size={20} />
          </button>
        </div>

        <nav className="grid grid-cols-2 gap-2">
          {allItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`rounded-2xl px-4 py-3 text-[15px] font-medium transition-colors ${
                  active ? 'text-aurora glass' : 'text-soft hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-aurora">Follow Ansh</p>
          <p className="mt-1 text-sm text-soft">Get AI resources, Claude Code, Cursor, agentic coding, and build notes.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#0f1419] px-4 py-3 text-sm font-semibold text-white shadow-lg"
            >
              <Twitter size={18} />
              Follow on X
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#0a66c2] px-4 py-3 text-sm font-semibold text-white shadow-lg"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-medium text-ink"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? 'Light mode' : 'Dark mode'}
          </button>
          <div className="flex items-center gap-2">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl glass text-ink">
              <Github size={18} />
            </a>
            <a href={BMC_URL} target="_blank" rel="noopener noreferrer" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl glass text-aurora-amber">
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
        <nav
          className={`mx-auto flex h-14 max-w-7xl items-center justify-between rounded-2xl px-3 transition-all duration-500 sm:px-5 ${
            scrolled ? 'glass-strong glass-sheen shadow-glass' : 'border border-transparent'
          }`}
        >
          <Logo />

          <div className="hidden items-center gap-7 md:flex">
            <DesktopLinks />
            <div className="flex items-center gap-2 border-l border-white/10 pl-5">
              <div className="hidden items-center gap-2 rounded-2xl glass px-2 py-1 lg:flex">
                <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-faint xl:inline">Follow</span>
                <a
                  href={X_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Ansh on X"
                  className="flex h-9 items-center gap-1.5 rounded-xl bg-[#0f1419] px-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
                >
                  <Twitter className="h-[16px] w-[16px]" />
                  <span>X</span>
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with Ansh on LinkedIn"
                  className="flex h-9 items-center gap-1.5 rounded-xl bg-[#0a66c2] px-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
                >
                  <Linkedin className="h-[16px] w-[16px]" />
                  <span>LinkedIn</span>
                </a>
              </div>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                className="grid h-9 w-9 place-items-center rounded-xl glass text-ink transition-all duration-300 hover:shadow-glow"
              >
                <Github className="h-[18px] w-[18px]" />
              </a>
              <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <a
                href={BMC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-r from-aurora-amber to-amber-500 px-3.5 text-sm font-semibold text-[#1a1206] transition-transform duration-300 hover:scale-[1.03]"
              >
                <Coffee className="h-[16px] w-[16px]" />
                <span>Support</span>
              </a>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-xl glass text-ink md:hidden"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={22} />
          </button>
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
