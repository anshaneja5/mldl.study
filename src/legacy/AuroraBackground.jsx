import React from 'react';

/**
 * Aurora Glass ambient background.
 * A single fixed, non-interactive layer shared across every page:
 *   · deep base wash
 *   · faint blueprint grid that fades toward the center
 *   · slow-drifting blurred aurora blobs (violet → cyan → blue → fuchsia)
 *   · top vignette + film grain for depth
 *
 * Colors come from CSS tokens (--aurora-*) so it adapts to light/dark.
 * Animations are transform/opacity only and pause under prefers-reduced-motion.
 */
const AuroraBackground = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${className}`}
    >
      {/* base radial wash + concentrated hero glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% -10%, var(--aurora-c), transparent 60%)',
        }}
      />
      <div
        className="absolute left-1/2 top-[6%] h-[52vh] w-[80vw] max-w-[900px] -translate-x-1/2 rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(ellipse at center, var(--aurora-a), transparent 65%)' }}
      />

      {/* blueprint grid, masked so it dissolves at the edges */}
      <div
        className="absolute inset-0 bg-grid-dark bg-grid opacity-100 hidden dark:block"
        style={{
          maskImage:
            'radial-gradient(80% 60% at 50% 30%, #000 0%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(80% 60% at 50% 30%, #000 0%, transparent 80%)',
        }}
      />
      <div
        className="absolute inset-0 bg-grid-light bg-grid opacity-100 dark:hidden"
        style={{
          maskImage:
            'radial-gradient(80% 60% at 50% 30%, #000 0%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(80% 60% at 50% 30%, #000 0%, transparent 80%)',
        }}
      />

      {/* drifting aurora blobs */}
      <div
        className="absolute -top-[18%] -left-[10%] h-[60vh] w-[60vh] rounded-full blur-[120px] animate-aurora-1 will-change-transform"
        style={{ background: 'radial-gradient(circle at 30% 30%, var(--aurora-a), transparent 68%)' }}
      />
      <div
        className="absolute top-[8%] right-[-12%] h-[58vh] w-[58vh] rounded-full blur-[120px] animate-aurora-2 will-change-transform"
        style={{ background: 'radial-gradient(circle at 60% 40%, var(--aurora-b), transparent 68%)' }}
      />
      <div
        className="absolute bottom-[-22%] left-1/2 h-[64vh] w-[64vh] -translate-x-1/2 rounded-full blur-[130px] animate-aurora-3 will-change-transform"
        style={{ background: 'radial-gradient(circle at 50% 50%, var(--aurora-d), transparent 70%)' }}
      />
      <div
        className="absolute top-1/2 left-1/4 h-[40vh] w-[40vh] rounded-full blur-[120px] animate-aurora-2 will-change-transform"
        style={{ background: 'radial-gradient(circle at 50% 50%, var(--aurora-c), transparent 70%)', animationDelay: '-6s' }}
      />

      {/* top + bottom vignette to anchor content (dark only) */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,7,19,0.30) 0%, transparent 14%, transparent 72%, rgba(6,7,19,0.65) 100%)',
        }}
      />

      {/* film grain */}
      <div className="grain absolute inset-0" />
    </div>
  );
};

export default AuroraBackground;
