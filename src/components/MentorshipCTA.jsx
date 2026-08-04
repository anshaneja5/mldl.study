import { motion } from 'framer-motion';
import { ArrowRight, CalendarCheck, MessageSquare, Video } from 'lucide-react';
import { PITCH, PRICE_FROM, SESSIONS, TOPMATE_BRAND, TOPMATE_URL } from '../data/mentorship';

/** Topmate promo (Brutal UI). Lives on the home page and the Journey page. */

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

const MentorshipCTA = ({ className = '' }) => (
  <motion.section
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.25 }}
    className={`brut-card-lg relative w-full max-w-5xl rotate-[0.4deg] bg-pastel-blue p-6 sm:p-8 lg:p-10 ${className}`}
  >
    <div
      className="brut-sticker absolute -right-4 -top-8 hidden h-20 w-20 text-[11px] text-[#0a0a0a] sm:flex md:h-24 md:w-24 md:text-xs"
      style={{ background: TOPMATE_BRAND }}
      aria-hidden="true"
    >
      FROM {PRICE_FROM}
    </div>

    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      <div>
        <div className="brut-chip mb-4 bg-surface">
          <Video className="h-4 w-4" />
          1:1 mentorship · new
        </div>
        <h2 className="font-display text-3xl uppercase leading-tight text-ink sm:text-4xl md:text-5xl">
          Stuck? Book a{' '}
          <span className="inline-block rotate-[-1.2deg] px-2 text-[#0a0a0a] shadow-brut-sm" style={{ background: TOPMATE_BRAND }}>
            1:1
          </span>{' '}
          with me
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-soft sm:text-lg">{PITCH}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={TOPMATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="brut-btn whitespace-nowrap px-7 py-4 text-base text-[#0a0a0a]"
            style={{ background: TOPMATE_BRAND }}
          >
            <CalendarCheck className="h-5 w-5" strokeWidth={2.6} />
            Book a session
            <ArrowRight className="h-5 w-5" strokeWidth={3} />
          </a>
          <span className="text-sm font-medium text-soft">
            Priority DM is free. Calls start at {PRICE_FROM}. Booking handled by Topmate.
          </span>
        </div>
      </div>

      <div className="border-[3px] border-ink bg-surface p-5 shadow-brut-sm">
        <p className="mb-4 font-display text-lg uppercase text-ink">What you can book</p>
        <ul className="space-y-2.5">
          {SESSIONS.map((s) => (
            <li key={s.title} className="flex items-center gap-3 border-b-2 border-ink pb-2.5 last:border-b-0 last:pb-0">
              <span className="grid h-8 w-8 shrink-0 place-items-center border-2 border-[#0a0a0a] text-[#0a0a0a]" style={{ background: TOPMATE_BRAND }}>
                {s.free ? <MessageSquare className="h-4 w-4" strokeWidth={2.6} /> : <Video className="h-4 w-4" strokeWidth={2.6} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-bold text-ink">{s.title}</span>
                <span className="block font-mono text-[11px] uppercase tracking-wider text-faint">{s.meta}</span>
              </span>
              {s.free && (
                <span className="shrink-0 border-2 border-[#0a0a0a] bg-acid px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-[#0a0a0a]">
                  Free
                </span>
              )}
              {s.tag && (
                <span className="shrink-0 border-2 border-[#0a0a0a] bg-cyber-yellow px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-[#0a0a0a]">
                  {s.tag}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.section>
);

export default MentorshipCTA;
