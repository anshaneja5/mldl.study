import React from 'react';

/**
 * Brutal ambient background.
 * A single fixed, non-interactive layer shared across every page:
 * flat canvas color (painted by <html>) plus a subtle oversized
 * halftone-dot pattern. No blur, no gradients — cheap to paint.
 *
 * Dot color comes from the --halftone token so it adapts to theme.
 */
const BrutalBackground = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${className}`}
    >
      {/* fine halftone field */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(var(--halftone) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* oversized dot cluster anchoring the top-right corner */}
      <div
        className="absolute -right-24 -top-24 h-[46vh] w-[46vh]"
        style={{
          backgroundImage: 'radial-gradient(var(--halftone) 4px, transparent 4px)',
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(circle at 70% 30%, #000 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 70% 30%, #000 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default BrutalBackground;
