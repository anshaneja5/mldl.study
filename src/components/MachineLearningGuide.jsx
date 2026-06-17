import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, BookOpen, Brain, CheckCircle2, GitBranch, SlidersHorizontal, Wrench } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import AuroraBackground from './AuroraBackground';
import BackToTopButton from './BackToTopButton';
import useDarkMode from './useDarkMode';
import { AuthorBlock, DEFAULT_OG_IMAGE } from './SEOGuidePage';

const SITE_URL = 'https://mldl.study';

const steps = [
  {
    title: 'Python and data handling',
    description: 'Learn Python, NumPy, Pandas, Matplotlib, notebooks, and the basic workflow for loading, cleaning, and exploring datasets.',
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: 'Math and statistics',
    description: 'Build enough linear algebra, calculus, probability, and statistics to understand optimization, distributions, loss functions, and evaluation.',
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: 'Core ML algorithms',
    description: 'Study regression, classification, clustering, dimensionality reduction, decision trees, random forests, and gradient boosting.',
    icon: <Brain className="h-5 w-5" />,
  },
  {
    title: 'Evaluation and tuning',
    description: 'Learn train/test splits, cross-validation, metrics, overfitting, bias-variance, hyperparameter tuning, and model comparison.',
    icon: <SlidersHorizontal className="h-5 w-5" />,
  },
  {
    title: 'Projects and deployment',
    description: 'Build practical projects, create pipelines, document results, deploy simple models, and prepare for deep learning or GenAI next.',
    icon: <Wrench className="h-5 w-5" />,
  },
];

const faqs = [
  {
    question: 'What should I learn first in machine learning?',
    answer: 'Start with Python, data handling, statistics, and linear algebra. Then learn supervised learning, unsupervised learning, model evaluation, and feature engineering.',
  },
  {
    question: 'Is this ML roadmap beginner friendly?',
    answer: 'Yes. The roadmap starts with prerequisites and then moves through core ML topics in a structured order with curated resources and progress tracking.',
  },
  {
    question: 'Do I need deep learning before machine learning?',
    answer: 'No. Learn classical machine learning first. Deep learning becomes easier once you understand datasets, loss functions, evaluation, overfitting, and model tuning.',
  },
  {
    question: 'What projects should I build while learning ML?',
    answer: 'Start with tabular projects such as house price prediction, churn prediction, classification, clustering, and recommendation systems before moving into deep learning projects.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${SITE_URL}/ml-roadmap#article`,
      headline: 'Machine Learning Roadmap for Beginners',
      description: 'A free machine learning roadmap covering Python, math, data preprocessing, regression, classification, clustering, evaluation, tuning, projects, and deployment.',
      url: `${SITE_URL}/ml-roadmap`,
      author: { '@type': 'Person', name: 'Ansh Aneja', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'mldl.study', url: SITE_URL },
      dateModified: '2026-06-18',
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/ml-roadmap#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'ML Roadmap', item: `${SITE_URL}/ml-roadmap` },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/ml-roadmap#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
};

const MachineLearningGuide = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <>
      <Helmet>
        <title>Machine Learning Roadmap for Beginners: Free ML Path | mldl.study</title>
        <meta name="description" content="Follow a free machine learning roadmap for beginners covering Python, math, preprocessing, regression, classification, clustering, evaluation, projects, and deployment." />
        <meta name="keywords" content="machine learning roadmap, ML roadmap, machine learning roadmap for beginners, learn machine learning, AI roadmap" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/ml-roadmap`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Machine Learning Roadmap for Beginners: Free ML Path | mldl.study" />
        <meta property="og:description" content="Follow a free machine learning roadmap for beginners covering Python, math, preprocessing, regression, classification, clustering, evaluation, projects, and deployment." />
        <meta property="og:url" content={`${SITE_URL}/ml-roadmap`} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vedolos" />
        <meta name="twitter:creator" content="@vedolos" />
        <meta name="twitter:title" content="Machine Learning Roadmap for Beginners: Free ML Path | mldl.study" />
        <meta name="twitter:description" content="Follow a free machine learning roadmap for beginners covering Python, math, preprocessing, regression, classification, clustering, evaluation, projects, and deployment." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <AuroraBackground />
      <div className="flex min-h-screen flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="mx-auto w-full max-w-6xl flex-grow px-4 pb-20 pt-10 sm:pt-16">
          <section className="mx-auto max-w-4xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-semibold text-aurora">
              <GitBranch className="h-4 w-4" />
              Free ML roadmap
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-tight text-ink sm:text-6xl">
              Machine Learning Roadmap for Beginners
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-soft">
              A structured ML roadmap from Python and math to preprocessing, regression, classification, clustering, model evaluation, feature engineering, ensemble learning, and projects.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/machinelearning" className="btn-aurora rounded-2xl px-6 py-3 text-[15px]">
                Open interactive ML roadmap <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/ai-roadmap" className="rounded-2xl glass px-6 py-3 text-[15px] font-semibold text-ink transition-all duration-300 hover:shadow-glow">
                See full AI roadmap
              </Link>
            </div>
          </section>

          <section className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <article key={step.title} className="glass glass-sheen rounded-3xl p-5">
                <span className="mb-4 inline-grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-400 text-[#04060f]">
                  {step.icon}
                </span>
                <p className="font-mono text-xs text-faint">{String(index + 1).padStart(2, '0')}</p>
                <h2 className="mt-1 font-display text-lg font-bold text-ink">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-soft">{step.description}</p>
              </article>
            ))}
          </section>

          <section className="glass glass-sheen mt-16 rounded-[2rem] p-7 sm:p-10">
            <h2 className="font-display text-3xl font-bold text-ink">The practical order for learning machine learning</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-soft sm:text-base">
              <p>
                A good machine learning roadmap should not start with random algorithms. It should start with data: how to load it, clean it, inspect it, split it, and measure whether a model is actually improving. Once that workflow is clear, algorithms become tools instead of isolated theory.
              </p>
              <p>
                mldl.study organizes ML topics in a sequence that builds intuition: introduction, preprocessing, regression, classification, clustering, dimensionality reduction, model evaluation, feature engineering, and ensemble learning. After that, the deep learning and GenAI roadmaps become much easier to follow.
              </p>
            </div>
          </section>

          <section className="mt-16">
            <AuthorBlock />
          </section>

          <section className="mt-16 grid gap-4 md:grid-cols-2">
            {[
              'Learn preprocessing before advanced models.',
              'Compare models with proper validation, not vibes.',
              'Build small tabular projects before neural networks.',
              'Use the interactive roadmap to track each topic.',
            ].map((item) => (
              <div key={item} className="glass rounded-2xl p-5">
                <CheckCircle2 className="mb-3 h-5 w-5 text-aurora-cyan" />
                <p className="font-medium text-ink">{item}</p>
              </div>
            ))}
          </section>

          <section className="glass glass-sheen mt-16 rounded-[2rem] p-7 sm:p-10">
            <h2 className="font-display text-3xl font-bold text-ink">Machine learning roadmap FAQ</h2>
            <div className="mt-6 divide-y divide-white/10">
              {faqs.map((faq) => (
                <div key={faq.question} className="py-5">
                  <h3 className="font-semibold text-ink">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-soft">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer darkMode={darkMode} />
      </div>
      <BackToTopButton />
    </>
  );
};

export default MachineLearningGuide;
