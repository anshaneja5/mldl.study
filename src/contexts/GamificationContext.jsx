import React, { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react';
import prerequisiteContent from '../../categorizedPrerequisiteContent';
import mlContent from '../../categorizedMLContent';
import dlContent from '../../categorizedDLContent';
import genaiContent from '../../categorizedGenAIContent';

/**
 * Gamification without accounts: XP, levels, streaks, and unlock states
 * are all derived from the same localStorage the roadmaps already write,
 * so existing users get their XP retroactively. One new key is added
 * (the activity log) to power streaks.
 */

export const XP_PER_RESOURCE = 10;
const ACTIVITY_LOG_KEY = 'mldlActivityLog';
const ACTIVITY_LOG_MAX = 400;

export const ROADMAPS = [
  { slug: 'prerequisites', label: 'Prerequisites', path: '/prerequisites', storageKey: 'prerequisiteRoadmapProgress', content: prerequisiteContent },
  { slug: 'machinelearning', label: 'Machine Learning', path: '/machinelearning', storageKey: 'mlRoadmapProgress', content: mlContent },
  { slug: 'deeplearning', label: 'Deep Learning', path: '/deeplearning', storageKey: 'dlRoadmapProgress', content: dlContent },
  { slug: 'genai', label: 'Generative AI', path: '/genai', storageKey: 'genaiRoadmapProgress', content: genaiContent },
];

export const LEVELS = [
  { xp: 0, name: 'Perceptron' },
  { xp: 250, name: 'Gradient Descender' },
  { xp: 750, name: 'Backpropagator' },
  { xp: 1750, name: 'Transformer' },
  { xp: 3200, name: 'Superintelligence(ish)' },
];

const safeRead = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const todayStamp = () => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
};

const dayBefore = (stamp) => {
  const d = new Date(`${stamp}T12:00:00`);
  d.setDate(d.getDate() - 1);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
};

/* Count only resources that exist in the current content — stale
   localStorage keys from removed resources never inflate XP. */
const countDone = (content, progress) => {
  let done = 0;
  let total = 0;
  for (const [topic, items] of Object.entries(content)) {
    total += items.length;
    for (const item of items) {
      if (progress[`${topic}_${item.url}`] === true) done += 1;
    }
  }
  return { done, total };
};

export const computeStats = () => {
  const roadmaps = {};
  let completed = 0;
  for (const r of ROADMAPS) {
    const progress = safeRead(r.storageKey, {});
    const { done, total } = countDone(r.content, progress);
    roadmaps[r.slug] = {
      slug: r.slug,
      label: r.label,
      path: r.path,
      storageKey: r.storageKey,
      done,
      total,
      pct: total === 0 ? 0 : Math.round((done / total) * 100),
    };
    completed += done;
  }

  const xp = completed * XP_PER_RESOURCE;
  let levelIndex = 0;
  for (let i = 0; i < LEVELS.length; i += 1) {
    if (xp >= LEVELS[i].xp) levelIndex = i;
  }
  const nextLevel = LEVELS[levelIndex + 1] || null;
  const levelFloor = LEVELS[levelIndex].xp;
  const progressToNext = nextLevel
    ? Math.round(((xp - levelFloor) / (nextLevel.xp - levelFloor)) * 100)
    : 100;

  const log = safeRead(ACTIVITY_LOG_KEY, []);
  const days = new Set(Array.isArray(log) ? log : []);
  let streak = 0;
  let cursor = todayStamp();
  if (!days.has(cursor)) cursor = dayBefore(cursor); // streak survives until midnight
  while (days.has(cursor)) {
    streak += 1;
    cursor = dayBefore(cursor);
  }

  return {
    xp,
    completed,
    streak,
    level: {
      index: levelIndex,
      name: LEVELS[levelIndex].name,
      nextName: nextLevel ? nextLevel.name : null,
      nextAt: nextLevel ? nextLevel.xp : null,
      progressToNext,
    },
    roadmaps,
    /* Motivation badges only — nothing is ever actually gated. */
    unlocked: {
      prerequisites: true,
      machinelearning: true,
      deeplearning: (roadmaps.machinelearning?.pct ?? 0) >= 60,
      genai: (roadmaps.deeplearning?.pct ?? 0) >= 60,
    },
  };
};

const GamificationContext = createContext(null);

export const GamificationProvider = ({ children }) => {
  const [stats, setStats] = useState(() => computeStats());
  const [levelUp, setLevelUp] = useState(null); // { name } when a completion crosses a threshold

  const refresh = useCallback(() => {
    setStats((prev) => {
      const next = computeStats();
      if (next.level.index > prev.level.index) {
        setLevelUp({ name: next.level.name });
      }
      return next;
    });
  }, []);

  /* Called by roadmap views whenever progress changes; a completion
     stamps today into the activity log that powers streaks. */
  const notifyProgress = useCallback((completedSomething) => {
    if (completedSomething) {
      try {
        const log = safeRead(ACTIVITY_LOG_KEY, []);
        const today = todayStamp();
        if (!log.includes(today)) {
          log.push(today);
          localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(log.slice(-ACTIVITY_LOG_MAX)));
        }
      } catch {
        /* private mode: streaks stay at zero, everything else works */
      }
    }
    refresh();
  }, [refresh]);

  const dismissLevelUp = useCallback(() => setLevelUp(null), []);

  useEffect(() => {
    // Pick up changes from other tabs
    window.addEventListener('storage', refresh);
    return () => window.removeEventListener('storage', refresh);
  }, [refresh]);

  const value = useMemo(
    () => ({ ...stats, levelUp, notifyProgress, dismissLevelUp, refresh }),
    [stats, levelUp, notifyProgress, dismissLevelUp, refresh]
  );

  return <GamificationContext.Provider value={value}>{children}</GamificationContext.Provider>;
};

export const useGamification = () => {
  const ctx = useContext(GamificationContext);
  if (!ctx) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return ctx;
};
