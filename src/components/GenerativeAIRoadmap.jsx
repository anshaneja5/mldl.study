import React from 'react';
import RoadmapView from './RoadmapView';
import content from '../../categorizedGenAIContent';

const topics = [
  { id: 1, name: 'Courses and Tutorials', x: 50, y: 8, icon: '📚' },
  { id: 2, name: 'Transformer Fundamentals', x: 28, y: 22, icon: '🧠' },
  { id: 3, name: 'Prompt Engineering', x: 72, y: 22, icon: '✨' },
  { id: 4, name: 'RAG (Retrieval-Augmented Generation)', x: 18, y: 38, icon: '🔎' },
  { id: 5, name: 'Vector Databases & Embeddings', x: 50, y: 38, icon: '🗄️' },
  { id: 6, name: 'Fine-tuning & PEFT', x: 82, y: 38, icon: '⚙️' },
  { id: 7, name: 'AI Agents & Agentic Workflows', x: 25, y: 56, icon: '🤖' },
  { id: 8, name: 'Multimodal Models', x: 55, y: 56, icon: '🎨' },
  { id: 9, name: 'LLM Evaluation & Benchmarks', x: 82, y: 56, icon: '📊' },
  { id: 10, name: 'Deployment & Production', x: 30, y: 76, icon: '🚀' },
  { id: 11, name: 'Implementation Guides', x: 70, y: 76, icon: '💻' },
  { id: 12, name: 'Resources & Latest Trends', x: 50, y: 92, icon: '🔥' },
];

const connections = [
  { from: 1, to: 2 }, { from: 1, to: 3 },
  { from: 2, to: 4 }, { from: 2, to: 5 },
  { from: 3, to: 5 }, { from: 3, to: 6 },
  { from: 4, to: 7 }, { from: 5, to: 7 }, { from: 5, to: 8 },
  { from: 6, to: 8 }, { from: 6, to: 9 },
  { from: 7, to: 10 }, { from: 8, to: 9 }, { from: 8, to: 11 },
  { from: 9, to: 10 }, { from: 9, to: 11 },
  { from: 10, to: 12 }, { from: 11, to: 12 },
];

const accent = {
  ringFrom: '#fbbf24',
  ringTo: '#fb923c',
  lineActive: '#fb923c',
  glow: 'rgba(251,146,60,0.28)',
  text: '#fcd34d',
};

const GenerativeAIRoadmap = () => (
  <RoadmapView
    topics={topics}
    connections={connections}
    content={content}
    storageKey="genaiRoadmapProgress"
    title="Generative AI Roadmap"
    subtitle="Dive into generative AI — transformers, RAG, agents, fine-tuning, and shipping to production."
    accent={accent}
    roadmapType="Generative AI"
    seo={{
      title: 'Generative AI Roadmap for Builders | mldl.study',
      description:
        'Follow a free generative AI roadmap covering Transformers, prompt engineering, RAG, vector databases, fine-tuning, AI agents, evaluation, and deployment.',
      keywords: 'generative AI roadmap, GenAI roadmap, AI agents roadmap, RAG roadmap, LLM roadmap, AI roadmap',
      canonical: 'https://mldl.study/genai',
    }}
    next={{
      title: 'Go deeper',
      desc: 'Read the foundational papers behind modern AI in the Research Papers section.',
      href: '/researchpapers',
      label: 'Explore Research Papers',
    }}
  />
);

export default GenerativeAIRoadmap;
