import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft, Map, FileText, ExternalLink } from 'lucide-react';
import { ROADMAPS } from '../contexts/GamificationContext';

/**
 * Cmd/Ctrl+K palette over everything the site already knows:
 * pages, roadmap topics, and every curated resource. No search
 * library — a small subsequence scorer is plenty at this scale
 * (~450 entries).
 */

const PAGES = [
  { label: 'Home', path: '/' },
  { label: 'Prerequisites Roadmap', path: '/prerequisites' },
  { label: 'Machine Learning Roadmap', path: '/machinelearning' },
  { label: 'Deep Learning Roadmap', path: '/deeplearning' },
  { label: 'Generative AI Roadmap', path: '/genai' },
  { label: 'Research Papers', path: '/researchpapers' },
  { label: 'Books', path: '/books' },
  { label: 'Question Bank', path: '/questionbank' },
  { label: 'Learner Dashboard', path: '/dashboard' },
  { label: 'Bookmarks', path: '/bookmarks' },
  { label: 'Search', path: '/search' },
  { label: 'My Journey', path: '/journey' },
  { label: 'AI Roadmap Guide', path: '/ai-roadmap' },
  { label: 'ML Roadmap Guide', path: '/ml-roadmap' },
  { label: 'Deep Learning Guide', path: '/deep-learning-roadmap' },
  { label: 'Generative AI Guide', path: '/generative-ai-roadmap' },
  { label: 'AI Agents Guide', path: '/ai-agents-roadmap' },
  { label: 'RAG Guide', path: '/rag-roadmap' },
  { label: 'Learn AI From Scratch', path: '/learn-ai-from-scratch' },
];

const score = (query, text) => {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  const idx = t.indexOf(q);
  if (idx !== -1) return 200 - idx; // substring: earlier is better
  // subsequence with gap penalty
  let ti = 0;
  let gaps = 0;
  for (const ch of q) {
    const found = t.indexOf(ch, ti);
    if (found === -1) return -1;
    gaps += found - ti;
    ti = found + 1;
  }
  return Math.max(1, 90 - gaps);
};

const buildIndex = () => {
  const entries = PAGES.map((p) => ({ kind: 'page', label: p.label, sub: p.path, path: p.path }));
  for (const r of ROADMAPS) {
    for (const [topic, items] of Object.entries(r.content)) {
      entries.push({
        kind: 'topic',
        label: topic,
        sub: `${r.label} · ${items.length} resources`,
        path: `${r.path}?topic=${encodeURIComponent(topic)}`,
      });
      for (const item of items) {
        entries.push({
          kind: 'resource',
          label: item.title,
          sub: `${r.label} → ${topic}`,
          url: item.url,
        });
      }
    }
  }
  return entries;
};

const KIND_ICON = { page: FileText, topic: Map, resource: ExternalLink };

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const indexRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const onOpenEvent = () => setOpen(true);
    window.addEventListener('mldl:open-palette', onOpenEvent);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mldl:open-palette', onOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      if (!indexRef.current) {
        try {
          indexRef.current = buildIndex();
        } catch {
          indexRef.current = PAGES.map((p) => ({ kind: 'page', label: p.label, sub: p.path, path: p.path }));
        }
      }
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const results = useMemo(() => {
    if (!open || !indexRef.current) return [];
    if (!query.trim()) {
      return indexRef.current.filter((e) => e.kind !== 'resource').slice(0, 9);
    }
    return indexRef.current
      .map((e) => ({ e, s: score(query.trim(), e.label) }))
      .filter(({ s }) => s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map(({ e }) => e);
  }, [open, query]);

  useEffect(() => setActive(0), [query]);

  const run = useCallback(
    (entry) => {
      if (!entry) return;
      setOpen(false);
      if (entry.url) {
        window.open(entry.url, '_blank', 'noopener');
      } else {
        navigate(entry.path);
      }
    },
    [navigate]
  );

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(results[active]);
    }
  };

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-idx="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 p-4 pt-[12vh]"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="brut-card-lg w-full max-w-xl animate-stamp-in" onClick={(e) => e.stopPropagation()}>
        <div className="brut-titlebar">
          <span>cmd_k — search everything</span>
          <span className="hidden sm:inline">esc to close</span>
        </div>
        <div className="flex items-center gap-3 border-b-[3px] border-ink bg-surface px-4 py-3">
          <Search size={18} className="shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Jump to a topic, resource, or page…"
            className="w-full bg-transparent font-mono text-sm text-ink placeholder:text-faint focus:outline-none"
            aria-label="Search"
          />
        </div>
        <ul ref={listRef} className="max-h-[46vh] overflow-y-auto bg-surface" role="listbox">
          {results.length === 0 && (
            <li className="px-4 py-6 font-mono text-sm text-faint">No matches. Try fewer letters?</li>
          )}
          {results.map((r, i) => {
            const Icon = KIND_ICON[r.kind];
            return (
              <li key={`${r.kind}-${r.label}-${i}`} data-idx={i} role="option" aria-selected={i === active}>
                <button
                  onClick={() => run(r)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-3 border-b-2 border-ink/20 px-4 py-3 text-left ${
                    i === active ? 'bg-acid text-[#0a0a0a]' : 'text-ink'
                  }`}
                >
                  <Icon size={15} className="shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{r.label}</span>
                    <span className={`block truncate font-mono text-xs ${i === active ? 'text-[#0a0a0a]/70' : 'text-faint'}`}>
                      {r.sub}
                    </span>
                  </span>
                  {i === active && <CornerDownLeft size={14} className="shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-2 border-t-[3px] border-ink bg-surface-soft px-4 py-2 font-mono text-[11px] text-faint">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>topics deep-link into their roadmap</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
