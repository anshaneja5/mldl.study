import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarCheck, X } from 'lucide-react';
import { PRICE_FROM, TOPMATE_BRAND, TOPMATE_URL } from '../data/mentorship';

/**
 * Top-right nudge toward the Topmate 1:1s, mounted app-wide.
 *
 * Deliberately quiet: it waits out the first-visit contribution modal
 * (never two popups at once), slides in once, auto-hides, and stays
 * away for a week after it has been seen.
 */

const SEEN_KEY = 'mldlMentorshipToastSeen';
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // once a week is plenty for a promo
const SHOW_DELAY_MS = 8000;
const RETRY_DELAY_MS = 5000;
const AUTO_HIDE_MS = 15000;

const dueForToast = () => {
  try {
    const seen = Number(localStorage.getItem(SEEN_KEY));
    return !seen || Date.now() - seen > COOLDOWN_MS;
  } catch {
    return false; // storage blocked (private mode): stay silent rather than nag every page
  }
};

const markSeen = () => {
  try {
    localStorage.setItem(SEEN_KEY, String(Date.now()));
  } catch {
    /* nothing we can do; the toast just won't be remembered */
  }
};

/* A modal is actually on screen (contribution modal, resource modal, palette…).
   The mobile nav sheets keep their aria-modal node mounted and just hide it,
   so presence in the DOM is not enough — check that it is really visible. */
const modalIsOpen = () =>
  [...document.querySelectorAll('[aria-modal="true"]')].some((el) => {
    if (el.closest('[aria-hidden="true"]')) return false;
    const s = getComputedStyle(el);
    return s.display !== 'none' && s.visibility !== 'hidden' && Number(s.opacity) > 0.05;
  });

const MentorshipToast = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!dueForToast()) return;

    let timer;
    const attempt = () => {
      if (modalIsOpen()) {
        timer = setTimeout(attempt, RETRY_DELAY_MS);
        return;
      }
      markSeen();
      setOpen(true);
      timer = setTimeout(() => setOpen(false), AUTO_HIDE_MS);
    };

    timer = setTimeout(attempt, SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // top-28 clears the sticky navbar and the home page marquee strip below it.
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.22, ease: [0.34, 1.3, 0.64, 1] }}
          className="fixed right-4 top-28 z-[95] w-[min(calc(100vw-2rem),22rem)]"
          role="status"
        >
          <div className="brut-card-lg overflow-hidden">
            <div className="brut-titlebar">
              <span>1:1 mentorship</span>
              <button onClick={() => setOpen(false)} aria-label="Dismiss" className="hover:text-hot-pink">
                <X size={15} />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-3">
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center border-[3px] border-[#0a0a0a] text-[#0a0a0a] shadow-brut-sm"
                  style={{ background: TOPMATE_BRAND }}
                >
                  <CalendarCheck className="h-[18px] w-[18px]" strokeWidth={2.6} />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-base uppercase leading-tight text-ink">Need a hand?</p>
                  <p className="mt-1 text-sm leading-relaxed text-soft">
                    I&apos;m an SWE in Japan and I do 1:1 calls — resumes, interviews, career. Priority DM is
                    free, calls from {PRICE_FROM}.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <a
                  href={TOPMATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="brut-btn flex-1 px-3 py-2 text-xs text-[#0a0a0a]"
                  style={{ background: TOPMATE_BRAND }}
                >
                  Book a 1:1
                  <ArrowRight size={14} strokeWidth={3} />
                </a>
                <button onClick={() => setOpen(false)} className="brut-btn brut-btn-surface px-3 py-2 text-xs">
                  Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MentorshipToast;
