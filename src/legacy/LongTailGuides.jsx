import React from 'react';
import SEOGuidePage from './SEOGuidePage';

const guides = {
  deepLearning: {
    badge: 'Deep learning roadmap',
    path: '/deep-learning-roadmap',
    title: 'Deep Learning Roadmap for Beginners',
    description: 'Follow a free deep learning roadmap covering neural networks, CNNs, RNNs, LSTMs, Transformers, NLP, projects, and modern AI foundations.',
    keywords: 'deep learning roadmap, neural network roadmap, learn deep learning, deep learning for beginners, AI roadmap',
    intro: 'A practical path from neural network basics to CNNs, RNNs, Transformers, NLP, and the deep learning foundations behind modern AI systems.',
    steps: [
      { title: 'Neural network basics', description: 'Understand perceptrons, activations, loss functions, gradient descent, backpropagation, and the training loop.' },
      { title: 'Computer vision models', description: 'Learn CNNs, pooling, image classification, transfer learning, and the intuition behind visual feature extraction.' },
      { title: 'Sequence models', description: 'Study RNNs, LSTMs, GRUs, encoder-decoder models, attention, and the path toward Transformers.' },
      { title: 'Transformers and NLP', description: 'Move into self-attention, tokenization, embeddings, language modeling, and modern NLP workflows.' },
      { title: 'Projects and evaluation', description: 'Build small models, compare metrics, avoid overfitting, and prepare for generative AI and LLM systems.' },
    ],
    bodyTitle: 'Why deep learning belongs after machine learning',
    body: [
      'Deep learning is easier to understand after you know the machine learning workflow: datasets, train/test splits, metrics, overfitting, and model comparison. Without those foundations, neural networks feel like black boxes.',
      'This roadmap keeps the order practical. Start with neural network basics, then learn architecture families such as CNNs and sequence models, then move into Transformers and NLP. Once those ideas click, generative AI concepts become much easier to reason about.',
    ],
    checklist: [
      'Learn backpropagation conceptually before chasing frameworks.',
      'Build at least one vision and one text project.',
      'Understand overfitting and regularization early.',
      'Move to GenAI only after Transformers make sense.',
    ],
    faqs: [
      { question: 'What is the best way to start deep learning?', answer: 'Start with neural network basics, then learn CNNs, sequence models, Transformers, and practical evaluation. Python and machine learning basics should come first.' },
      { question: 'Do I need advanced math for deep learning?', answer: 'You need enough linear algebra, calculus, and probability to understand tensors, gradients, optimization, and loss functions. You can deepen the math while building projects.' },
      { question: 'Should I learn PyTorch or TensorFlow first?', answer: 'Either works, but many learners prefer PyTorch because it feels more Pythonic and is common in research and modern AI examples.' },
    ],
    primaryCta: { href: '/deeplearning', label: 'Open interactive DL roadmap' },
    secondaryCta: { href: '/machinelearning', label: 'Start with ML first' },
  },
  generativeAI: {
    badge: 'Generative AI roadmap',
    path: '/generative-ai-roadmap',
    title: 'Generative AI Roadmap for Builders',
    description: 'Follow a free generative AI roadmap covering LLMs, prompt engineering, RAG, vector databases, fine-tuning, agents, evaluation, and deployment.',
    keywords: 'generative AI roadmap, GenAI roadmap, LLM roadmap, prompt engineering roadmap, RAG roadmap, AI agents roadmap',
    intro: 'A builder-focused GenAI roadmap for learning LLMs, prompt engineering, RAG, vector databases, agents, fine-tuning, evaluation, and production deployment.',
    steps: [
      { title: 'Transformer and LLM basics', description: 'Understand tokens, embeddings, attention, context windows, model families, and why LLMs behave the way they do.' },
      { title: 'Prompt engineering', description: 'Learn instruction design, examples, constraints, structured outputs, tool-use prompts, and prompt evaluation.' },
      { title: 'RAG and vector databases', description: 'Build retrieval pipelines with embeddings, chunking, search, reranking, citations, and vector stores.' },
      { title: 'Agents and workflows', description: 'Study planning, tools, memory, multi-step execution, agent-native UX, and safety boundaries.' },
      { title: 'Evaluation and deployment', description: 'Measure quality, latency, hallucinations, cost, and reliability before shipping GenAI systems.' },
    ],
    bodyTitle: 'How to learn GenAI without getting lost in hype',
    body: [
      'Generative AI changes quickly, but the core learning path is stable: understand LLM basics, learn prompting, build RAG, evaluate outputs, then move into agents and deployment. The tools change; the system design principles matter longer.',
      'This roadmap is for builders who want to make useful products, not just collect AI demos. It connects concepts such as embeddings, vector search, model evaluation, fine-tuning, tool use, and production constraints into one practical sequence.',
    ],
    checklist: [
      'Build a small RAG app before building agents.',
      'Evaluate outputs instead of trusting demos.',
      'Track cost, latency, and hallucination risk.',
      'Follow new model and tooling changes weekly.',
    ],
    faqs: [
      { question: 'What should I learn first in generative AI?', answer: 'Start with Transformer and LLM basics, then prompt engineering, RAG, vector databases, evaluation, fine-tuning, agents, and deployment.' },
      { question: 'Is RAG required for GenAI apps?', answer: 'RAG is not required for every app, but it is one of the most important patterns when your app needs private, current, or domain-specific knowledge.' },
      { question: 'Are AI agents part of generative AI?', answer: 'Yes. Agents combine LLMs with tools, memory, planning, and workflows so systems can take multi-step actions instead of only generating text.' },
    ],
    primaryCta: { href: '/genai', label: 'Open interactive GenAI roadmap' },
    secondaryCta: { href: '/ai-agents-roadmap', label: 'Explore AI agents' },
  },
  aiAgents: {
    badge: 'AI agents roadmap',
    path: '/ai-agents-roadmap',
    title: 'AI Agents Roadmap for Builders',
    description: 'Learn AI agents with a practical roadmap covering LLMs, tools, memory, planning, RAG, evaluation, agent workflows, and deployment.',
    keywords: 'AI agents roadmap, agentic AI roadmap, learn AI agents, LLM agents, agentic workflows, AI roadmap',
    intro: 'A practical roadmap for understanding and building AI agents: LLMs, tools, memory, planning, retrieval, evaluation, reliability, and production workflows.',
    steps: [
      { title: 'LLM and prompt foundations', description: 'Understand how instructions, context, examples, and structured outputs shape agent behavior.' },
      { title: 'Tools and function calling', description: 'Let models call APIs, search, run code, retrieve files, and interact with external systems safely.' },
      { title: 'Memory and retrieval', description: 'Use RAG, summaries, vector search, and state to give agents durable context without stuffing prompts.' },
      { title: 'Planning and orchestration', description: 'Learn when to use simple workflows, planners, routers, multi-agent setups, and human approval gates.' },
      { title: 'Evaluation and safety', description: 'Measure task success, regressions, tool errors, latency, cost, and failure modes before trusting automation.' },
    ],
    bodyTitle: 'What makes an AI agent different from a chatbot',
    body: [
      'A chatbot mostly responds. An agent can use tools, inspect state, plan steps, call APIs, revise its approach, and complete tasks. That power is useful only when paired with evaluation, permissions, and clear product boundaries.',
      'This roadmap focuses on agentic systems that can actually ship. Start with simple tool-calling workflows, add retrieval and memory only when needed, and measure whether the agent completes real user goals reliably.',
    ],
    checklist: [
      'Start with workflows before complex multi-agent systems.',
      'Give tools narrow permissions and observable outputs.',
      'Use human approval for risky actions.',
      'Evaluate full task success, not only answer quality.',
    ],
    faqs: [
      { question: 'What is an AI agent?', answer: 'An AI agent is a system that uses an AI model with tools, context, memory, or workflows to complete multi-step tasks.' },
      { question: 'Do I need RAG for AI agents?', answer: 'Many agents benefit from RAG when they need private or changing knowledge, but simple agents can start with tool calling and structured prompts.' },
      { question: 'What should I learn before AI agents?', answer: 'Learn LLM basics, prompt engineering, APIs, RAG, and evaluation before building more autonomous agent workflows.' },
    ],
    primaryCta: { href: '/genai', label: 'Open GenAI roadmap' },
    secondaryCta: { href: '/rag-roadmap', label: 'Learn RAG first' },
  },
  rag: {
    badge: 'RAG roadmap',
    path: '/rag-roadmap',
    title: 'RAG Roadmap for Generative AI',
    description: 'Learn retrieval-augmented generation with a free RAG roadmap covering embeddings, chunking, vector databases, reranking, evaluation, and production patterns.',
    keywords: 'RAG roadmap, retrieval augmented generation roadmap, vector database roadmap, embeddings roadmap, generative AI roadmap',
    intro: 'A focused RAG roadmap for building AI systems that can answer with private, current, or domain-specific knowledge using retrieval-augmented generation.',
    steps: [
      { title: 'Understand the RAG loop', description: 'Learn how retrieval, context construction, generation, and citations work together in a GenAI app.' },
      { title: 'Embeddings and chunking', description: 'Create useful chunks, choose embedding models, preserve metadata, and avoid losing meaning during preprocessing.' },
      { title: 'Vector search and reranking', description: 'Use vector databases, hybrid search, filters, rerankers, and query rewriting to improve retrieval quality.' },
      { title: 'Prompting with context', description: 'Design prompts that use retrieved evidence, cite sources, handle missing answers, and reduce hallucination.' },
      { title: 'Evaluation and monitoring', description: 'Measure retrieval relevance, answer faithfulness, latency, cost, freshness, and production regressions.' },
    ],
    bodyTitle: 'Why RAG is one of the most useful GenAI patterns',
    body: [
      'RAG lets an AI app answer from knowledge that was not baked into the model: company docs, notes, research papers, course material, or fast-changing product information. That makes it one of the first serious patterns builders should learn.',
      'A good RAG system is not just a vector database. It is a full pipeline: document preparation, chunking, embeddings, retrieval, reranking, prompt construction, answer generation, citations, and evaluation.',
    ],
    checklist: [
      'Keep source metadata with every chunk.',
      'Evaluate retrieval before blaming the model.',
      'Use citations and refusal behavior for trust.',
      'Monitor freshness, latency, and cost in production.',
    ],
    faqs: [
      { question: 'What is RAG in AI?', answer: 'RAG means retrieval-augmented generation. It retrieves relevant context from external data and gives it to a model before generating an answer.' },
      { question: 'Do I need a vector database for RAG?', answer: 'A vector database is common, but not always required. Some systems use hybrid search, keyword search, or small in-memory indexes depending on scale.' },
      { question: 'What is the hardest part of RAG?', answer: 'Retrieval quality is usually the hardest part: chunking, metadata, ranking, query rewriting, and evaluation matter as much as the model prompt.' },
    ],
    primaryCta: { href: '/genai', label: 'Open GenAI roadmap' },
    secondaryCta: { href: '/ai-agents-roadmap', label: 'Explore agents' },
  },
  learnAI: {
    badge: 'Learn AI from scratch',
    path: '/learn-ai-from-scratch',
    title: 'Learn AI from Scratch',
    description: 'Learn AI from scratch with a structured path covering Python, math, machine learning, deep learning, generative AI, projects, and weekly AI updates.',
    keywords: 'learn AI from scratch, how to learn AI, AI roadmap for beginners, learn machine learning, learn generative AI',
    intro: 'A beginner-friendly path for learning AI from scratch without getting lost in random courses, hype threads, or disconnected tutorials.',
    steps: [
      { title: 'Start with Python basics', description: 'Learn enough Python to manipulate data, write functions, use notebooks, and understand examples in AI courses.' },
      { title: 'Learn the math that matters', description: 'Focus on linear algebra, probability, statistics, and calculus concepts used in models and evaluation.' },
      { title: 'Study machine learning', description: 'Learn supervised and unsupervised learning, preprocessing, metrics, feature engineering, and model tuning.' },
      { title: 'Add deep learning', description: 'Move into neural networks, CNNs, sequence models, Transformers, and NLP after ML basics are clear.' },
      { title: 'Build with GenAI tools', description: 'Learn prompting, RAG, vector databases, AI agents, evaluation, and deployment through practical projects.' },
    ],
    bodyTitle: 'A realistic way to learn AI as a beginner',
    body: [
      'Learning AI from scratch is not about memorizing every algorithm. It is about building layers of understanding: programming, data, math, models, evaluation, and then modern GenAI workflows.',
      'Use mldl.study as a map. Start small, finish projects, revisit weak topics, and keep up with major AI shifts through the newsletter instead of trying to track every launch manually.',
    ],
    checklist: [
      'Do not skip Python and data basics.',
      'Build projects while learning, not after everything.',
      'Learn evaluation early so you can judge model quality.',
      'Follow a weekly update source to stay current.',
    ],
    faqs: [
      { question: 'Can I learn AI from scratch?', answer: 'Yes. Start with Python and math, then machine learning, deep learning, and generative AI. A structured roadmap makes the field much easier to navigate.' },
      { question: 'How long does it take to learn AI from scratch?', answer: 'Most beginners need 6 to 12 months for practical foundations if they study consistently and build projects.' },
      { question: 'What should I build first while learning AI?', answer: 'Start with simple data projects such as prediction, classification, clustering, and recommendation systems before moving into LLM or agent projects.' },
    ],
    primaryCta: { href: '/ai-roadmap', label: 'Open AI roadmap' },
    secondaryCta: { href: '/prerequisites', label: 'Start prerequisites' },
  },
};

export const DeepLearningGuide = () => <SEOGuidePage {...guides.deepLearning} />;
export const GenerativeAIGuide = () => <SEOGuidePage {...guides.generativeAI} />;
export const AIAgentsGuide = () => <SEOGuidePage {...guides.aiAgents} />;
export const RAGGuide = () => <SEOGuidePage {...guides.rag} />;
export const LearnAIFromScratchGuide = () => <SEOGuidePage {...guides.learnAI} />;
