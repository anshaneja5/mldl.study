import { motion } from 'framer-motion';
import { ArrowRight, CalendarCheck, MessageSquare, Video } from 'lucide-react';
import { PITCH, PRICE_FROM, SESSIONS, TOPMATE_URL } from '../data/mentorship';

/** Topmate promo, Aurora Glass flavour. Mirrors src/components/MentorshipCTA.jsx. */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

/* Roadmap-sized strip: same offer, no session list. */
const CompactCTA = ({ className }) => (
  <motion.section
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    className={`glass glass-sheen mx-auto w-full max-w-6xl rounded-3xl p-5 sm:p-6 ${className}`}
  >
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#e0554b] text-[#0a0a0a]">
          <CalendarCheck className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display text-lg font-bold text-ink">Stuck on this roadmap?</p>
          <p className="mt-1 text-sm leading-relaxed text-soft">
            Book a 1:1 with me — resume reviews, interview prep, and career guidance. Priority DM is free,
            calls start at {PRICE_FROM}.
          </p>
        </div>
      </div>
      <a
        href={TOPMATE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-aurora shrink-0 whitespace-nowrap rounded-2xl px-6 py-3 text-[15px]"
      >
        Book a 1:1
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  </motion.section>
);

const FullCTA = ({ className }) => (
  <motion.section
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.25 }}
    className={`border-aurora glass-strong glass-sheen relative w-full max-w-5xl overflow-hidden rounded-[2rem] p-6 shadow-glass sm:p-8 lg:p-10 ${className}`}
  >
    <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-aurora-violet/25 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-aurora-cyan/20 blur-3xl" />

    <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      <div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-aurora">
          <Video className="h-4 w-4" />
          1:1 mentorship
        </div>
        <h2 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl md:text-5xl">
          Stuck? Book a 1:1 with me
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-soft sm:text-lg">{PITCH}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={TOPMATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-aurora whitespace-nowrap rounded-2xl px-7 py-4 text-base shadow-glow"
          >
            <CalendarCheck className="h-5 w-5" />
            Book a session
            <ArrowRight className="h-5 w-5" />
          </a>
          <span className="text-sm font-medium text-soft">
            Priority DM is free. Calls start at {PRICE_FROM}. Booking handled by Topmate.
          </span>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
        <p className="mb-4 font-display text-lg font-bold text-ink">What you can book</p>
        <ul className="space-y-3">
          {SESSIONS.map((s) => (
            <li key={s.title} className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-aurora-cyan">
                {s.free ? <MessageSquare className="h-4 w-4" /> : <Video className="h-4 w-4" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-ink">{s.title}</span>
                <span className="block text-xs text-soft">{s.meta}</span>
              </span>
              {/* solid pills with dark ink: the tinted variants wash out in legacy light mode */}
              {s.free && (
                <span className="shrink-0 rounded-full bg-aurora-cyan px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#04060f]">
                  Free
                </span>
              )}
              {s.tag && (
                <span className="shrink-0 rounded-full bg-aurora-amber px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#04060f]">
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

const MentorshipCTA = ({ className = '', variant }) =>
  variant === 'compact' ? <CompactCTA className={className} /> : <FullCTA className={className} />;

export default MentorshipCTA;
