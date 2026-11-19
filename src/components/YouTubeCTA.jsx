import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Play, Youtube } from 'lucide-react';
import {
  FEATURED_VIDEO,
  IG_GRADIENT,
  IG_HANDLE,
  IG_URL,
  VIDEOS,
  YT_BRAND,
  YT_PITCH,
  YT_SUBSCRIBE_URL,
  ytThumb,
  ytWatch,
} from '../data/youtube';

/**
 * YouTube + Instagram promo (Brutal UI) for the home and Journey pages.
 * The featured video is a thumbnail until clicked, so no YouTube iframe
 * (or its cookies and ~1MB of JS) loads for visitors who never press play.
 */

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

const FeaturedPlayer = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden border-[3px] border-[#0a0a0a] bg-[#0a0a0a] shadow-brut">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${FEATURED_VIDEO.id}?autoplay=1&rel=0`}
          title={FEATURED_VIDEO.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play: ${FEATURED_VIDEO.title}`}
        >
          <img
            src={ytThumb(FEATURED_VIDEO.id, 'maxresdefault')}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = ytThumb(FEATURED_VIDEO.id);
            }}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span
            className="absolute left-1/2 top-1/2 grid h-16 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center border-[3px] border-[#0a0a0a] text-white shadow-brut-sm transition-transform duration-150 group-hover:scale-110"
            style={{ background: YT_BRAND }}
          >
            <Play className="h-8 w-8 fill-white" strokeWidth={0} />
          </span>
        </button>
      )}
    </div>
  );
};

const VideoTile = ({ video }) => (
  <a
    href={ytWatch(video.id)}
    target="_blank"
    rel="noopener noreferrer"
    className="group block border-[3px] border-[#0a0a0a] bg-surface shadow-brut-sm transition-transform duration-150 hover:-translate-y-1"
  >
    <span className="relative block aspect-video overflow-hidden border-b-[3px] border-[#0a0a0a]">
      <img src={ytThumb(video.id)} alt="" loading="lazy" className="h-full w-full object-cover" />
      <span className="absolute bottom-1.5 right-1.5 border-2 border-[#0a0a0a] bg-cyber-yellow px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-[#0a0a0a]">
        {video.views} views
      </span>
    </span>
    <span className="block p-2.5 text-xs font-bold leading-snug text-ink group-hover:underline sm:text-[13px]">
      {video.title}
    </span>
  </a>
);

const YouTubeCTA = ({ className = '' }) => (
  <motion.section
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    className={`brut-card-lg relative w-full max-w-5xl rotate-[-0.4deg] bg-pastel-pink p-6 sm:p-8 lg:p-10 ${className}`}
  >
    <div
      className="brut-sticker absolute -right-4 -top-8 hidden h-20 w-20 text-[11px] text-white sm:flex md:h-24 md:w-24 md:text-xs"
      style={{ background: YT_BRAND }}
      aria-hidden="true"
    >
      NEW VLOGS
    </div>

    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <div className="brut-chip mb-4 bg-surface">
          <Youtube className="h-4 w-4" style={{ color: YT_BRAND }} />
          YouTube + Instagram
        </div>
        <h2 className="font-display text-3xl uppercase leading-tight text-ink sm:text-4xl md:text-5xl">
          Life as an SWE in{' '}
          <span className="inline-block rotate-[-1.2deg] px-2 text-white shadow-brut-sm" style={{ background: YT_BRAND }}>
            Japan
          </span>
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-soft sm:text-lg">{YT_PITCH}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={YT_SUBSCRIBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="brut-btn whitespace-nowrap px-7 py-4 text-base text-white"
            style={{ background: YT_BRAND }}
          >
            <Youtube className="h-5 w-5" strokeWidth={2.6} />
            Subscribe
            <ArrowRight className="h-5 w-5" strokeWidth={3} />
          </a>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="brut-btn whitespace-nowrap px-6 py-4 text-base text-white"
            style={{ background: IG_GRADIENT }}
          >
            <Instagram className="h-5 w-5" strokeWidth={2.6} />
            {IG_HANDLE}
          </a>
        </div>
      </div>

      <FeaturedPlayer />
    </div>

    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {VIDEOS.map((v) => (
        <VideoTile key={v.id} video={v} />
      ))}
    </div>
  </motion.section>
);

export default YouTubeCTA;
