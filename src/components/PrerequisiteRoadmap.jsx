import React from 'react';
import RoadmapView from './RoadmapView';
import content from '../../categorizedPrerequisiteContent';

const topics = [
  { id: 1, name: 'Linear Algebra', x: 25, y: 28, icon: '📐' },
  { id: 2, name: 'Calculus', x: 50, y: 28, icon: '∫' },
  { id: 3, name: 'Probability and Statistics', x: 75, y: 28, icon: '🎲' },
  { id: 4, name: 'Matrices', x: 30, y: 58, icon: '🔢' },
  { id: 5, name: 'Python', x: 62, y: 62, icon: '🐍' },
];

const connections = [
  { from: 1, to: 4 },
  { from: 2, to: 4 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
];

const accent = {
  fill: 'var(--pastel-mint)',
  loud: '#00873c',
};

const PrerequisiteRoadmap = () => (
  <RoadmapView
    topics={topics}
    connections={connections}
    content={content}
    storageKey="prerequisiteRoadmapProgress"
    title="Prerequisites Roadmap"
    subtitle="Build the mathematical and programming foundations every ML practitioner needs."
    accent={accent}
    roadmapType="Prerequisites"
    seo={{
      title: 'AI and ML Prerequisites Roadmap | mldl.study',
      description:
        'Learn the prerequisites for AI and machine learning with a free roadmap for Python, linear algebra, calculus, statistics, matrices, and core math foundations.',
      keywords: 'AI prerequisites, machine learning prerequisites, ML math roadmap, Python for machine learning, AI roadmap',
      canonical: 'https://mldl.study/prerequisites',
    }}
    next={{
      title: 'Foundations covered?',
      desc: 'Put your math and Python skills to work in the Machine Learning roadmap.',
      href: '/machinelearning',
      label: 'Start Machine Learning',
    }}
  />
);

export default PrerequisiteRoadmap;
