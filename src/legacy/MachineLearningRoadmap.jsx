import React from 'react';
import RoadmapView from './RoadmapView';
import content from '../../categorizedMLContent';

const topics = [
  { id: 1, name: 'Introduction to Machine Learning', x: 50, y: 10, icon: '📚' },
  { id: 2, name: 'Data Preprocessing', x: 20, y: 30, icon: '🧹' },
  { id: 3, name: 'Regression Techniques', x: 50, y: 30, icon: '📊' },
  { id: 4, name: 'Classification Techniques', x: 80, y: 30, icon: '🔍' },
  { id: 5, name: 'Clustering Algorithms', x: 20, y: 52, icon: '🔢' },
  { id: 6, name: 'Dimensionality Reduction', x: 50, y: 52, icon: '📉' },
  { id: 7, name: 'Model Evaluation & Tuning', x: 80, y: 52, icon: '⚖️' },
  { id: 8, name: 'Feature Selection & Engineering', x: 35, y: 74, icon: '🔧' },
  { id: 9, name: 'Ensemble Learning', x: 65, y: 74, icon: '🧩' },
];

const connections = [
  { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 4 },
  { from: 2, to: 5 }, { from: 2, to: 6 }, { from: 3, to: 6 }, { from: 4, to: 7 },
  { from: 5, to: 8 }, { from: 6, to: 8 }, { from: 7, to: 9 }, { from: 8, to: 9 },
];

const accent = {
  ringFrom: '#60a5fa',
  ringTo: '#6366f1',
  lineActive: '#6366f1',
  glow: 'rgba(99,102,241,0.30)',
  text: '#a5b4fc',
};

const MachineLearningRoadmap = () => (
  <RoadmapView
    topics={topics}
    connections={connections}
    content={content}
    storageKey="mlRoadmapProgress"
    title="Machine Learning Roadmap"
    subtitle="Master the core concepts and algorithms of ML — from data preprocessing to ensemble methods."
    accent={accent}
    roadmapType="Machine Learning"
    seo={{
      title: 'Machine Learning Roadmap for Beginners | mldl.study',
      description:
        'Follow a free machine learning roadmap from Python and math to regression, classification, clustering, evaluation, feature engineering, and ensemble learning.',
      keywords: 'machine learning roadmap, ML roadmap, learn machine learning, machine learning for beginners, AI roadmap',
      canonical: 'https://mldl.study/machinelearning',
    }}
    next={{
      title: 'Ready to dive deeper?',
      desc: 'Continue your journey with neural networks in the Deep Learning roadmap.',
      href: '/deeplearning',
      label: 'Explore Deep Learning',
    }}
  />
);

export default MachineLearningRoadmap;
