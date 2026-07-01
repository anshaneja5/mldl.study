import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Bookmark, Check, ExternalLink, FileText, Pin } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarksContext';

const DEFAULT_ACCENT = {
  fill: 'var(--pastel-blue)',
  loud: '#3300ff',
};

const Modal = ({ topic, onClose, videoSource, existingProgress = {}, onProgressUpdate, accent, roadmapType = 'Unknown' }) => {
  const a = { ...DEFAULT_ACCENT, ...(accent || {}) };
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
      transition={{ duration: 0.15 }}
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <motion.div
        className="brut-card-lg relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 1.06, rotate: -1 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.18, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Title bar */}
        <div className="brut-titlebar shrink-0">
          <span className="truncate">{roadmapType.toLowerCase().replace(/\s+/g, '_')}/{'{topic}'}</span>
          <button onClick={onClose} aria-label="Close" className="shrink-0 hover:text-hot-pink">
            <X size={16} />
          </button>
        </div>

        {/* Header */}
        <div
          className="shrink-0 border-b-[3px] border-ink px-6 pb-5 pt-5"
          style={{ background: a.fill }}
        >
          <h2 className="font-display text-2xl leading-tight text-ink">{topic.name}</h2>
        </div>

        {/* Progress */}
        {topicVideos.length > 0 && (
          <div className="shrink-0 border-b-[3px] border-ink px-6 py-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-soft">
                Progress: {completionPercentage}%
              </span>
              <button
                onClick={markAllAsComplete}
                className={`brut-btn px-3 py-1.5 text-xs ${isFullyCompleted ? 'brut-btn-pink' : ''}`}
              >
                {isFullyCompleted ? 'Mark all incomplete' : 'Mark all complete'}
              </button>
            </div>
            <div className="brut-progress">
              <div style={{ width: `${completionPercentage}%` }} data-full={completionPercentage === 100} />
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
                  <li
                    key={i}
                    className={`border-2 border-ink p-4 transition-transform duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut-sm ${
                      done ? 'bg-pastel-mint' : 'bg-surface'
                    }`}
                  >
                    {content.url && (
                      <div className="flex items-start justify-between gap-3">
                        <a
                          href={content.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-1 items-start gap-2 text-[15px] font-medium text-ink"
                        >
                          <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" style={{ color: a.loud }} />
                          <span className={`group-hover:underline ${done ? 'line-through decoration-2' : ''}`}>
                            {content.title}
                          </span>
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
                            className={`grid h-9 w-9 place-items-center border-2 border-ink transition-colors duration-100 ${
                              marked ? 'bg-cyber-yellow text-[#0a0a0a]' : 'bg-surface text-soft hover:text-ink'
                            }`}
                          >
                            <Bookmark className={`h-4 w-4 ${marked ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => saveProgress(content.url)}
                            className={`flex h-9 items-center gap-1.5 border-2 border-ink px-3 text-sm font-bold uppercase transition-colors duration-100 ${
                              done ? 'bg-acid text-[#0a0a0a]' : 'bg-surface text-ink hover:bg-acid hover:text-[#0a0a0a]'
                            }`}
                          >
                            {done ? <Check className="h-4 w-4" strokeWidth={3} /> : null}
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
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-2 hover:text-hot-pink"
                      >
                        <FileText className="h-4 w-4" /> {content.articleTitle}
                      </a>
                    )}

                    {content.notes && (
                      <div className="mt-3 flex items-start gap-2 border-2 border-ink bg-pastel-pink p-3">
                        <Pin className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                        <p className="text-sm text-ink">{content.notes}</p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="py-8 text-center font-mono text-soft">No materials available for this topic yet.</p>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t-[3px] border-ink p-4">
          <button onClick={onClose} className="brut-btn w-full py-3 text-sm">
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
