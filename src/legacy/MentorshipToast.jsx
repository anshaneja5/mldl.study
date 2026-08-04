import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarCheck, X } from 'lucide-react';
import { PRICE_FROM, TOPMATE_URL } from '../data/mentorship';

/**
 * Aurora Glass twin of src/components/MentorshipToast.jsx — same timing,
 * same localStorage key, so switching UI modes does not re-nag the visitor.
 */

const SEEN_KEY = 'mldlMentorshipToastSeen';
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
const SHOW_DELAY_MS = 8000;
const RETRY_DELAY_MS = 5000;
const AUTO_HIDE_MS = 15000;

const dueForToast = () => {
  try {
    const seen = Number(localStorage.getItem(SEEN_KEY));
    return !seen || Date.now() - seen > COOLDOWN_MS;
  } catch {
    return false;
  }
};

const markSeen = () => {
  try {
    localStorage.setItem(SEEN_KEY, String(Date.now()));
  } catch {
    /* storage blocked; the toast just won't be remembered */
  }
};

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed right-4 top-24 z-[95] w-[min(calc(100vw-2rem),22rem)]"
          role="status"
        >
          <div className="glass-strong glass-sheen border-aurora rounded-3xl p-4 shadow-glass">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#e0554b] text-[#0a0a0a]">
                <CalendarCheck className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-bold leading-tight text-ink">Need a hand?</p>
                <p className="mt-1 text-sm leading-relaxed text-soft">
                  I&apos;m an SWE in Japan and I do 1:1 calls — resumes, interviews, career. Priority DM is
                  free, calls from {PRICE_FROM}.
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Dismiss" className="shrink-0 text-soft hover:text-ink">
                <X size={16} />
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <a
                href={TOPMATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-aurora flex-1 rounded-xl px-3 py-2 text-xs"
              >
                Book a 1:1
                <ArrowRight size={14} />
              </a>
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl glass px-3 py-2 text-xs font-semibold text-soft hover:text-ink"
              >
                Later
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MentorshipToast;
