import React, { useEffect, useRef, useState } from 'react';
import { X, Download, Share2 } from 'lucide-react';

/**
 * Shareable progress cards, drawn straight onto a canvas — no
 * html-to-image dependency. 1200×630 (standard OG size) so the PNG
 * looks native everywhere it lands.
 */

const W = 1200;
const H = 630;
const CREAM = '#fff4e0';
const INK = '#0a0a0a';
const ACID = '#c6ff00';
const PINK = '#ff2e88';
const YELLOW = '#ffd400';

export const drawShareCard = (canvas, { headline, pct, done, total, streak, levelName }) => {
  const ctx = canvas.getContext('2d');
  canvas.width = W;
  canvas.height = H;

  const display = (size) => `${size}px "Archivo Black", "Arial Black", sans-serif`;
  const mono = (size, weight = 600) => `${weight} ${size}px "JetBrains Mono", monospace`;

  // canvas + frame
  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, W - 14, H - 14);

  // halftone corner
  ctx.fillStyle = 'rgba(10,10,10,0.10)';
  for (let x = W - 320; x < W - 30; x += 34) {
    for (let y = 40; y < 300; y += 34) {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // brand chip
  ctx.fillStyle = ACID;
  ctx.fillRect(56, 56, 264, 54);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 5;
  ctx.strokeRect(56, 56, 264, 54);
  ctx.fillStyle = INK;
  ctx.font = mono(24, 700);
  ctx.textBaseline = 'middle';
  ctx.fillText('MLDL.STUDY', 88, 85);

  // headline (up to 2 lines)
  ctx.fillStyle = INK;
  ctx.font = display(74);
  ctx.textBaseline = 'alphabetic';
  const lines = headline.toUpperCase().split('\n').slice(0, 2);
  lines.forEach((line, i) => ctx.fillText(line, 56, 230 + i * 88));

  // progress bar
  const barY = 410;
  const barW = 780;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(56, barY, barW, 64);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 6;
  ctx.strokeRect(56, barY, barW, 64);
  const fillW = Math.max(0, Math.min(barW - 12, (barW - 12) * (pct / 100)));
  ctx.fillStyle = ACID;
  ctx.fillRect(62, barY + 6, fillW, 52);
  if (pct > 0 && pct < 100) {
    ctx.fillStyle = INK;
    ctx.fillRect(62 + fillW, barY + 6, 6, 52);
  }
  ctx.fillStyle = INK;
  ctx.font = display(46);
  ctx.fillText(`${pct}%`, 56 + barW + 28, barY + 50);

  // stat chips
  ctx.font = mono(26, 700);
  const chips = [
    { text: `${done}/${total} RESOURCES`, fill: '#ffffff' },
    streak > 0 ? { text: `🔥 ${streak}-DAY STREAK`, fill: YELLOW } : null,
    { text: `LVL: ${levelName.toUpperCase()}`, fill: PINK, ink: '#ffffff' },
  ].filter(Boolean);
  let cx = 56;
  const cy = 520;
  chips.forEach((chip) => {
    const w = ctx.measureText(chip.text).width + 48;
    ctx.fillStyle = chip.fill;
    ctx.fillRect(cx, cy, w, 52);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 5;
    ctx.strokeRect(cx, cy, w, 52);
    ctx.fillStyle = chip.ink || INK;
    ctx.textBaseline = 'middle';
    ctx.fillText(chip.text, cx + 24, cy + 28);
    ctx.textBaseline = 'alphabetic';
    cx += w + 20;
  });

  // rotated sticker
  ctx.save();
  ctx.translate(W - 150, H - 150);
  ctx.rotate((12 * Math.PI) / 180);
  ctx.fillStyle = PINK;
  ctx.beginPath();
  ctx.arc(0, 0, 92, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.font = display(26);
  ctx.textAlign = 'center';
  ctx.fillText('100%', 0, -8);
  ctx.fillText('FREE', 0, 26);
  ctx.restore();
};

export const shareText = ({ headline, pct, streak }) => {
  const flames = streak > 0 ? ` 🔥 ${streak}-day streak.` : '';
  return `${headline.replace('\n', ' ')} — ${pct}% done on mldl.study.${flames} Free AI/ML roadmaps, no signup: https://mldl.study`;
};

export const xIntentUrl = (opts) =>
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText(opts))}`;

const canvasBlob = (canvas) =>
  new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))), 'image/png');
  });

/**
 * Brutalist share window: live preview + Download / native share / X intent.
 * Canvas failure of any kind degrades to the plain-text X intent.
 */
const ShareDialog = ({ open, onClose, card }) => {
  const canvasRef = useRef(null);
  const [canvasOk, setCanvasOk] = useState(true);

  useEffect(() => {
    if (!open || !canvasRef.current) return;
    let cancelled = false;
    const draw = () => {
      if (cancelled || !canvasRef.current) return;
      try {
        drawShareCard(canvasRef.current, card);
        setCanvasOk(true);
      } catch {
        setCanvasOk(false);
      }
    };
    draw(); // immediate draw with fallback fonts…
    if (document.fonts?.ready) {
      document.fonts.ready.then(draw); // …then re-stamp once the real fonts land
    }
    return () => {
      cancelled = true;
    };
  }, [open, card]);

  if (!open) return null;

  const download = async () => {
    try {
      const blob = await canvasBlob(canvasRef.current);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mldl-progress.png';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(xIntentUrl(card), '_blank', 'noopener');
    }
  };

  const nativeShare = async () => {
    try {
      const blob = await canvasBlob(canvasRef.current);
      const file = new File([blob], 'mldl-progress.png', { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: shareText(card) });
        return;
      }
    } catch {
      /* fall through to intent */
    }
    window.open(xIntentUrl(card), '_blank', 'noopener');
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Share your progress"
    >
      <div className="brut-card-lg w-full max-w-2xl animate-stamp-in" onClick={(e) => e.stopPropagation()}>
        <div className="brut-titlebar">
          <span>share_progress.png</span>
          <button onClick={onClose} aria-label="Close" className="hover:text-hot-pink">
            <X size={16} />
          </button>
        </div>
        <div className="p-4 sm:p-6">
          {canvasOk ? (
            <canvas ref={canvasRef} className="w-full border-[3px] border-ink" aria-label="Progress card preview" />
          ) : (
            <p className="font-mono text-sm text-soft">
              Couldn&apos;t draw the card in this browser — you can still post your progress directly.
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            {canvasOk && (
              <>
                <button onClick={download} className="brut-btn px-4 py-2 text-sm">
                  <Download size={16} /> Download PNG
                </button>
                <button onClick={nativeShare} className="brut-btn brut-btn-pink px-4 py-2 text-sm">
                  <Share2 size={16} /> Share
                </button>
              </>
            )}
            <a
              href={xIntentUrl(card)}
              target="_blank"
              rel="noopener noreferrer"
              className="brut-btn brut-btn-surface px-4 py-2 text-sm"
            >
              Post to X ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareDialog;
