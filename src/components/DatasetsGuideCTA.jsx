import { motion } from 'framer-motion';
import { ArrowRight, Check, Database, FileDown } from 'lucide-react';
import {
  DATASETS_GUIDE_BRAND,
  DATASETS_GUIDE_POINTS,
  DATASETS_GUIDE_PRICE,
  DATASETS_GUIDE_URL,
} from '../data/datasetsGuide';

/**
 * Datasets Guide promo (Brutal UI). Full section for the home page;
 * `variant="compact"` is a one-row strip for dense pages like Books.
 * Checkout and PDF delivery are handled by Polar via a static link.
 */

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

const CompactCTA = ({ className }) => (
  <motion.section
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    className={`brut-card mx-auto w-full max-w-6xl p-5 sm:p-6 ${className}`}
  >
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center border-[3px] border-[#0a0a0a] text-[#0a0a0a] shadow-brut-sm"
          style={{ background: DATASETS_GUIDE_BRAND }}
        >
          <Database className="h-5 w-5" strokeWidth={2.6} />
        </span>
        <div>
          <p className="font-display text-lg uppercase text-ink">Practice needs data</p>
          <p className="mt-1 text-sm leading-relaxed text-soft">
            The Datasets Guide (PDF): the datasets worth practicing on, stage by stage — and
            where to find them. Instant download, {DATASETS_GUIDE_PRICE}.
          </p>
        </div>
      </div>
      <a
        href={DATASETS_GUIDE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="brut-btn shrink-0 whitespace-nowrap px-6 py-3 text-[15px] text-[#0a0a0a]"
        style={{ background: DATASETS_GUIDE_BRAND }}
      >
        Get the PDF
        <ArrowRight className="h-4 w-4" strokeWidth={3} />
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
    className={`brut-card-lg relative w-full max-w-5xl rotate-[-0.4deg] bg-pastel-mint p-6 sm:p-8 lg:p-10 ${className}`}
  >
    <div
      className="brut-sticker absolute -right-4 -top-8 hidden h-20 w-20 text-[11px] text-[#0a0a0a] sm:flex md:h-24 md:w-24 md:text-xs"
      style={{ background: DATASETS_GUIDE_BRAND }}
      aria-hidden="true"
    >
      {DATASETS_GUIDE_PRICE} PDF
    </div>

    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      <div>
        <div className="brut-chip mb-4 bg-surface">
          <Database className="h-4 w-4" />
          datasets guide · new
        </div>
        <h2 className="font-display text-3xl uppercase leading-tight text-ink sm:text-4xl md:text-5xl">
          Roadmaps tell you what to learn.{' '}
          <span
            className="inline-block rotate-[-1.2deg] px-2 text-[#0a0a0a] shadow-brut-sm"
            style={{ background: DATASETS_GUIDE_BRAND }}
          >
            Data
          </span>{' '}
          is how you learn it.
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-soft">
          The Datasets Guide is a curated PDF of the datasets that actually matter for ML and
          DL practice — matched to each stage of these roadmaps, so you always know what to
          build with next.
        </p>
        <a
          href={DATASETS_GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="brut-btn mt-6 inline-flex px-7 py-3.5 text-[15px] text-[#0a0a0a]"
          style={{ background: DATASETS_GUIDE_BRAND }}
        >
          <FileDown className="h-4 w-4" strokeWidth={3} />
          Get the guide — {DATASETS_GUIDE_PRICE}
          <ArrowRight className="h-4 w-4" strokeWidth={3} />
        </a>
        <p className="mt-3 text-xs text-soft">
          One-time purchase · instant download · secure checkout by Polar
        </p>
      </div>

      <ul className="brut-card flex flex-col gap-3 bg-surface p-5 sm:p-6">
        {DATASETS_GUIDE_POINTS.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <span
              className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center border-[2.5px] border-[#0a0a0a] text-[#0a0a0a] shadow-brut-sm"
              style={{ background: DATASETS_GUIDE_BRAND }}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3.5} />
            </span>
            <span className="text-sm leading-relaxed text-ink">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.section>
);

const DatasetsGuideCTA = ({ variant = 'full', className = '' }) =>
  variant === 'compact' ? <CompactCTA className={className} /> : <FullCTA className={className} />;

export default DatasetsGuideCTA;
