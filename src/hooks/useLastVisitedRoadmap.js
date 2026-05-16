const STORAGE_KEY = 'mldl.lastVisitedRoadmap';

export const ROADMAP_PAGES = {
  '/prerequisites': {
    title: 'Prerequisites',
    description: 'Pick up where you left off in foundational math and programming.',
    path: '/prerequisites',
    color: 'from-emerald-500 to-teal-500',
  },
  '/machinelearning': {
    title: 'Machine Learning',
    description: 'Continue your machine learning learning path.',
    path: '/machinelearning',
    color: 'from-blue-500 to-indigo-500',
  },
  '/deeplearning': {
    title: 'Deep Learning',
    description: 'Resume exploring neural networks and deep learning.',
    path: '/deeplearning',
    color: 'from-purple-500 to-pink-500',
  },
  '/genai': {
    title: 'Generative AI',
    description: 'Get back to generative AI and transformer models.',
    path: '/genai',
    color: 'from-amber-500 to-orange-500',
  },
};

export function saveLastVisitedRoadmap(pathname) {
  if (!ROADMAP_PAGES[pathname]) return;
  localStorage.setItem(STORAGE_KEY, pathname);
}

export function getLastVisitedRoadmap() {
  const pathname = localStorage.getItem(STORAGE_KEY);
  return pathname ? ROADMAP_PAGES[pathname] ?? null : null;
}
