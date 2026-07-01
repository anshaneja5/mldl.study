import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, CheckCircle2, Code, Layers, Rocket, Sparkles } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import BrutalBackground from './BrutalBackground';
import BackToTopButton from './BackToTopButton';
import useDarkMode from './useDarkMode';
import { AuthorBlock, DEFAULT_OG_IMAGE } from './SEOGuidePage';

const SITE_URL = 'https://mldl.study';

const PHASE_FILLS = ['bg-pastel-mint', 'bg-pastel-blue', 'bg-pastel-pink', 'bg-pastel-yellow', 'bg-pastel-mint'];

const phases = [
  {
    title: '1. Learn Python, math, and data basics',
    description: 'Start with Python, NumPy, Pandas, linear algebra, calculus, probability, and statistics so machine learning concepts make sense instead of feeling like formulas to memorize.',
    href: '/prerequisites',
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: '2. Build the machine learning foundation',
    description: 'Move into regression, classification, clustering, preprocessing, feature engineering, model evaluation, and classical ML workflows with Scikit-learn style projects.',
    href: '/machinelearning',
    icon: <Brain className="h-5 w-5" />,
  },
  {
    title: '3. Understand deep learning',
    description: 'Learn neural networks, CNNs, RNNs, LSTMs, encoder-decoder models, Transformers, and NLP so you understand the systems behind modern AI products.',
    href: '/deeplearning',
    icon: <Layers className="h-5 w-5" />,
  },
  {
    title: '4. Move into modern generative AI',
    description: 'Study prompt engineering, RAG, vector databases, embeddings, fine-tuning, multimodal models, AI agents, evaluation, and deployment for real GenAI applications.',
    href: '/genai',
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: '5. Ship projects and keep learning',
    description: 'Turn the roadmap into proof: build projects, read papers, track new tools like Claude Code, Cursor, and Codex, and keep improving with weekly updates.',
    href: '/researchpapers',
    icon: <Rocket className="h-5 w-5" />,
  },
];

const faqs = [
  {
    question: 'What is the best AI roadmap for beginners?',
    answer: 'The best AI roadmap starts with Python and math, then machine learning, deep learning, and generative AI. mldl.study follows that sequence with free resources and progress tracking.',
  },
  {
    question: 'Should I learn machine learning before generative AI?',
    answer: 'Yes, learning machine learning and deep learning first makes generative AI easier to understand. You can still try GenAI tools early, but the foundations help you build better systems.',
  },
  {
    question: 'How long does it take to learn AI?',
    answer: 'A beginner can build practical AI foundations in 6 to 12 months with consistent study and projects. The exact timeline depends on your math, programming, and project experience.',
  },
  {
    question: 'Does this AI roadmap include agents and RAG?',
    answer: 'Yes. The generative AI roadmap covers RAG, vector databases, embeddings, AI agents, evaluation, and deployment after the ML and deep learning foundations.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${SITE_URL}/ai-roadmap#article`,
      headline: 'AI Roadmap for Beginners',
      description: 'A free AI roadmap from Python and math to machine learning, deep learning, generative AI, RAG, agents, and deployment.',
      url: `${SITE_URL}/ai-roadmap`,
      author: { '@type': 'Person', name: 'Ansh Aneja', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'mldl.study', url: SITE_URL },
      dateModified: '2026-06-18',
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/ai-roadmap#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'AI Roadmap', item: `${SITE_URL}/ai-roadmap` },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/ai-roadmap#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
};

const AIRoadmapGuide = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <>
      <Helmet>
        <title>AI Roadmap for Beginners: Learn AI, ML, DL and GenAI | mldl.study</title>
        <meta name="description" content="Follow a free AI roadmap for beginners covering Python, math, machine learning, deep learning, generative AI, RAG, AI agents, and projects." />
        <meta name="keywords" content="AI roadmap, learn AI, artificial intelligence roadmap, machine learning roadmap, generative AI roadmap, AI roadmap for beginners" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/ai-roadmap`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="AI Roadmap for Beginners: Learn AI, ML, DL and GenAI | mldl.study" />
        <meta property="og:description" content="Follow a free AI roadmap for beginners covering Python, math, machine learning, deep learning, generative AI, RAG, AI agents, and projects." />
        <meta property="og:url" content={`${SITE_URL}/ai-roadmap`} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vedolos" />
        <meta name="twitter:creator" content="@vedolos" />
        <meta name="twitter:title" content="AI Roadmap for Beginners: Learn AI, ML, DL and GenAI | mldl.study" />
        <meta name="twitter:description" content="Follow a free AI roadmap for beginners covering Python, math, machine learning, deep learning, generative AI, RAG, AI agents, and projects." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <BrutalBackground />
      <div className="flex min-h-screen flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="mx-auto w-full max-w-6xl flex-grow px-4 pb-20 pt-10 sm:pt-16">
          <section className="mx-auto max-w-4xl text-center">
            <p className="brut-chip mb-4 bg-pastel-mint">
              <Sparkles className="h-4 w-4" />
              Free AI roadmap
            </p>
            <h1 className="font-display text-5xl uppercase leading-tight tracking-tight text-ink sm:text-6xl">
              AI Roadmap for Beginners
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-soft">
              A practical path to learn artificial intelligence from scratch: Python, math, machine learning, deep learning, generative AI, RAG, agents, deployment, and projects.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/prerequisites" className="brut-btn px-6 py-3 text-[15px]">
                Start the roadmap <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/machinelearning" className="brut-btn brut-btn-surface px-6 py-3 text-[15px]">
                Open ML roadmap
              </Link>
            </div>
          </section>

          <section className="mt-16 grid gap-5 lg:grid-cols-5">
            {phases.map((phase, index) => (
              <Link key={phase.title} to={phase.href} className={`brut-hover group block border-[3px] border-ink p-5 shadow-brut ${PHASE_FILLS[index % PHASE_FILLS.length]} ${index % 2 === 0 ? 'rotate-[-0.6deg]' : 'rotate-[0.6deg]'} hover:rotate-0`}>
                <span className="mb-4 inline-grid h-11 w-11 place-items-center border-[3px] border-[#0a0a0a] bg-acid text-[#0a0a0a] shadow-brut-sm transition-transform duration-150 group-hover:-rotate-6">
                  {phase.icon}
                </span>
                <h2 className="font-display text-lg uppercase text-ink">{phase.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-soft">{phase.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold uppercase text-ink">
                  Study this step <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
                </span>
              </Link>
            ))}
          </section>

          <section className="brut-card-lg mt-16 p-7 sm:p-10">
            <h2 className="font-display text-3xl uppercase text-ink">How to use this AI roadmap</h2>
            <div className="mt-5 grid gap-6 text-sm leading-relaxed text-soft md:grid-cols-2">
              <p>
                If you are new to AI, do not start by jumping straight into LLM apps. First build enough Python, math, and machine learning intuition to understand what models are doing. Then use the deep learning and GenAI tracks to connect those foundations to modern systems.
              </p>
              <p>
                The goal is not to finish every resource. The goal is to move through the roadmap in order, build small projects at each stage, and gradually develop the judgment needed to choose the right model, dataset, evaluation method, and deployment path.
              </p>
            </div>
          </section>

          <section className="mt-16">
            <AuthorBlock />
          </section>

          <section className="mt-16 grid gap-4 md:grid-cols-2">
            {[
              'Use the roadmap order instead of collecting random courses.',
              'Track progress topic by topic so you know what to revisit.',
              'Build projects after each major phase, not only at the end.',
              'Subscribe for weekly updates on new AI tools and breakthroughs.',
            ].map((item) => (
              <div key={item} className="brut-card-sm p-5">
                <CheckCircle2 className="mb-3 h-5 w-5 text-hot-pink" />
                <p className="font-medium text-ink">{item}</p>
              </div>
            ))}
          </section>

          <section className="brut-card-lg mt-16 p-7 sm:p-10">
            <h2 className="font-display text-3xl uppercase text-ink">AI roadmap FAQ</h2>
            <div className="mt-6 divide-y-2 divide-ink">
              {faqs.map((faq) => (
                <div key={faq.question} className="py-5">
                  <h3 className="font-bold text-ink">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-soft">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 text-center">
            <span className="mx-auto mb-4 grid h-14 w-14 rotate-[-3deg] place-items-center border-[3px] border-[#0a0a0a] bg-acid text-[#0a0a0a] shadow-brut-sm">
              <Code className="h-8 w-8" />
            </span>
            <h2 className="font-display text-3xl uppercase text-ink">Ready to start?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-soft">
              Start with the foundations, then move into machine learning, deep learning, and GenAI as your skills grow.
            </p>
            <Link to="/prerequisites" className="brut-btn mt-6 px-7 py-3.5 text-[15px]">
              Begin with prerequisites
            </Link>
          </section>
        </main>
        <Footer darkMode={darkMode} />
      </div>
      <BackToTopButton />
    </>
  );
};

export default AIRoadmapGuide;
