import React from 'react';
import RoadmapView from './RoadmapView';
import content from '../../categorizedDLContent';

const topics = [
  { id: 1, name: 'Introduction to Deep Learning', x: 50, y: 10, icon: '🧠' },
  { id: 2, name: 'Artificial Neural Networks (ANNs)', x: 25, y: 30, icon: '🔗' },
  { id: 3, name: 'Convolutional Neural Networks (CNNs)', x: 50, y: 30, icon: '👁️' },
  { id: 4, name: 'Recurrent Neural Networks (RNNs)', x: 75, y: 30, icon: '⏱️' },
  { id: 5, name: 'LSTMs and GRUs', x: 25, y: 52, icon: '📊' },
  { id: 6, name: 'Encoder-Decoder Architecture', x: 50, y: 52, icon: '🔄' },
  { id: 7, name: 'Transformers', x: 50, y: 74, icon: '🤖' },
  { id: 8, name: 'Natural Language Processing', x: 78, y: 52, icon: '💬' },
];

const connections = [
  { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 4 },
  { from: 2, to: 5 }, { from: 3, to: 6 }, { from: 4, to: 8 },
  { from: 5, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 8 },
];

const accent = {
  ringFrom: '#a78bfa',
  ringTo: '#e879f9',
  lineActive: '#c084fc',
  glow: 'rgba(192,132,252,0.30)',
  text: '#d8b4fe',
};

const DeepLearningRoadmap = () => (
  <RoadmapView
    topics={topics}
    connections={connections}
    content={content}
    storageKey="dlRoadmapProgress"
    title="Deep Learning Roadmap"
    subtitle="Explore neural networks and modern deep learning architectures, from ANNs to Transformers."
    accent={accent}
    roadmapType="Deep Learning"
    seo={{
      title: 'Deep Learning Roadmap for Beginners | mldl.study',
      description:
        'Follow a free deep learning roadmap covering neural networks, CNNs, RNNs, LSTMs, encoder-decoder models, Transformers, NLP, and curated resources.',
      keywords: 'deep learning roadmap, neural network roadmap, learn deep learning, AI roadmap, machine learning roadmap',
      canonical: 'https://mldl.study/deeplearning',
    }}
    next={{
      title: 'Onward to Generative AI',
      desc: 'Build on Transformers and dive into LLMs, RAG, agents and more.',
      href: '/genai',
      label: 'Explore Generative AI',
    }}
  />
);

export default DeepLearningRoadmap;
