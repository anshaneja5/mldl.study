import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Bookmark, Check, ExternalLink, FileText, Pin } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarksContext';

const DEFAULT_ACCENT = {
  ringFrom: '#8b5cf6',
  ringTo: '#22d3ee',
  text: '#a5b4fc',
  glow: 'rgba(124,92,255,0.25)',
};

const Modal = ({ topic, onClose, videoSource, existingProgress = {}, onProgressUpdate, accent, roadmapType = 'Unknown' }) => {
  const a = accent || DEFAULT_ACCENT;
  const topicVideos = videoSource[topic.name] || [];
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const completed = topicVideos.filter((v) => existingProgress[`${topic.name}_${v.url}`] === true).length;
  const completionPercentage = topicVideos.length > 0 ? Math.round((completed / topicVideos.length) * 100) : 0;
  const isFullyCompleted = topicVideos.length > 0 && completed === topicVideos.length;

  const saveProgress = (videoUrl) => {
    onProgressUpdate(topic.name, videoUrl, !(existingProgress[`${topic.name}_${videoUrl}`] || false));
  };

  const markAllAsComplete = () => {
    const newState = !isFullyCompleted;
    const bulk = {};
    topicVideos.forEach((v) => {
      if (v.url) bulk[`${topic.name}_${v.url}`] = newState;
    });
    onProgressUpdate(topic.name, null, null, bulk);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-[#04050f]/70 backdrop-blur-md" onClick={onClose} />

      <motion.div
        className="glass-strong glass-sheen relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl shadow-glass"
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="pointer-events-none absolute -top-16 left-1/2 h-40 w-3/4 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: a.glow }}
        />

        {/* Header */}
        <div className="relative flex items-start justify-between gap-4 border-b border-white/10 px-6 pt-6 pb-5">
          <div className="flex-1">
            <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: a.text }}>
              {roadmapType}
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold leading-tight text-ink">{topic.name}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl glass text-soft transition-colors hover:text-ink"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress */}
        {topicVideos.length > 0 && (
          <div className="border-b border-white/10 px-6 py-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-soft">Course progress</span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-soft">{completionPercentage}%</span>
                <button
                  onClick={markAllAsComplete}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    isFullyCompleted
                      ? 'bg-emerald-500/90 text-white hover:bg-emerald-500'
                      : 'glass text-ink hover:shadow-glow'
                  }`}
                >
                  {isFullyCompleted ? 'Mark all incomplete' : 'Mark all complete'}
                </button>
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%`, background: `linear-gradient(90deg, ${a.ringFrom}, ${a.ringTo})` }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {topicVideos.length > 0 ? (
            <ul className="space-y-3">
              {topicVideos.map((content, i) => {
                const done = existingProgress[`${topic.name}_${content.url}`];
                const marked = content.url && isBookmarked(topic.name, content.url);
                return (
                  <li key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]">
                    {content.url && (
                      <div className="flex items-start justify-between gap-3">
                        <a
                          href={content.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-1 items-start gap-2 text-[15px] font-medium text-ink"
                        >
                          <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" style={{ color: a.text }} />
                          <span className="group-hover:underline">{content.title}</span>
                        </a>
                        <div className="flex shrink-0 gap-2">
                          <button
                            onClick={() =>
                              toggleBookmark({
                                title: content.title,
                                url: content.url,
                                articleLink: content.articleLink,
                                articleTitle: content.articleTitle,
                                notes: content.notes,
                                category: topic.name,
                                roadmapType,
                              })
                            }
                            title={marked ? 'Remove bookmark' : 'Add bookmark'}
                            className={`grid h-9 w-9 place-items-center rounded-xl transition-all duration-200 ${
                              marked ? 'bg-aurora-amber text-[#1a1206]' : 'glass text-soft hover:text-ink'
                            }`}
                          >
                            <Bookmark className={`h-4 w-4 ${marked ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => saveProgress(content.url)}
                            className={`flex h-9 items-center gap-1.5 rounded-xl px-3 text-sm font-medium transition-all duration-200 ${
                              done ? 'bg-emerald-500/90 text-white' : 'glass text-ink hover:shadow-glow'
                            }`}
                          >
                            {done ? <Check className="h-4 w-4" /> : null}
                            {done ? 'Done' : 'Mark'}
                          </button>
                        </div>
                      </div>
                    )}

                    {content.articleLink && content.articleTitle && (
                      <a
                        href={content.articleLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:underline"
                      >
                        <FileText className="h-4 w-4" /> {content.articleTitle}
                      </a>
                    )}

                    {content.notes && (
                      <div className="mt-3 flex items-start gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3">
                        <Pin className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                        <p className="text-sm text-rose-300">{content.notes}</p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="py-8 text-center text-soft">No materials available for this topic yet.</p>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-4">
          <button onClick={onClose} className="btn-aurora w-full rounded-2xl py-3 text-sm">
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
