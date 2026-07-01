import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');
const siteUrl = 'https://mldl.study';
const ogImage = `${siteUrl}/og-image.svg`;

const routes = [
  {
    path: '/',
    title: 'AI Roadmap & Machine Learning Roadmap for Beginners | mldl.study',
    description: 'Follow a free AI roadmap, machine learning roadmap, deep learning roadmap, and GenAI roadmap with curated resources, projects, papers, and progress tracking.',
    keywords: 'AI roadmap, machine learning roadmap, ML roadmap, deep learning roadmap, generative AI roadmap, learn AI, learn machine learning',
    type: 'website',
  },
  {
    path: '/ai-roadmap',
    title: 'AI Roadmap for Beginners: Learn AI, ML, DL and GenAI | mldl.study',
    description: 'Follow a free AI roadmap for beginners covering Python, math, machine learning, deep learning, generative AI, RAG, AI agents, and projects.',
    keywords: 'AI roadmap, learn AI, artificial intelligence roadmap, machine learning roadmap, generative AI roadmap, AI roadmap for beginners',
    type: 'article',
  },
  {
    path: '/ml-roadmap',
    title: 'Machine Learning Roadmap for Beginners: Free ML Path | mldl.study',
    description: 'Follow a free machine learning roadmap for beginners covering Python, math, preprocessing, regression, classification, clustering, evaluation, projects, and deployment.',
    keywords: 'machine learning roadmap, ML roadmap, machine learning roadmap for beginners, learn machine learning, AI roadmap',
    type: 'article',
  },
  {
    path: '/deep-learning-roadmap',
    title: 'Deep Learning Roadmap for Beginners | mldl.study',
    description: 'Follow a free deep learning roadmap covering neural networks, CNNs, RNNs, LSTMs, Transformers, NLP, projects, and modern AI foundations.',
    keywords: 'deep learning roadmap, neural network roadmap, learn deep learning, deep learning for beginners, AI roadmap',
    type: 'article',
  },
  {
    path: '/generative-ai-roadmap',
    title: 'Generative AI Roadmap for Builders | mldl.study',
    description: 'Follow a free generative AI roadmap covering LLMs, prompt engineering, RAG, vector databases, fine-tuning, agents, evaluation, and deployment.',
    keywords: 'generative AI roadmap, GenAI roadmap, LLM roadmap, prompt engineering roadmap, RAG roadmap, AI agents roadmap',
    type: 'article',
  },
  {
    path: '/ai-agents-roadmap',
    title: 'AI Agents Roadmap for Builders | mldl.study',
    description: 'Learn AI agents with a practical roadmap covering LLMs, tools, memory, planning, RAG, evaluation, agent workflows, and deployment.',
    keywords: 'AI agents roadmap, agentic AI roadmap, learn AI agents, LLM agents, agentic workflows, AI roadmap',
    type: 'article',
  },
  {
    path: '/rag-roadmap',
    title: 'RAG Roadmap for Generative AI | mldl.study',
    description: 'Learn retrieval-augmented generation with a free RAG roadmap covering embeddings, chunking, vector databases, reranking, evaluation, and production patterns.',
    keywords: 'RAG roadmap, retrieval augmented generation roadmap, vector database roadmap, embeddings roadmap, generative AI roadmap',
    type: 'article',
  },
  {
    path: '/learn-ai-from-scratch',
    title: 'Learn AI from Scratch | mldl.study',
    description: 'Learn AI from scratch with a structured path covering Python, math, machine learning, deep learning, generative AI, projects, and weekly AI updates.',
    keywords: 'learn AI from scratch, how to learn AI, AI roadmap for beginners, learn machine learning, learn generative AI',
    type: 'article',
  },
  {
    path: '/machinelearning',
    title: 'Machine Learning Roadmap for Beginners | mldl.study',
    description: 'Follow a free machine learning roadmap from Python and math to regression, classification, clustering, evaluation, feature engineering, and ensemble learning.',
    keywords: 'machine learning roadmap, ML roadmap, learn machine learning, machine learning for beginners, AI roadmap',
    type: 'article',
  },
  {
    path: '/deeplearning',
    title: 'Deep Learning Roadmap for Beginners | mldl.study',
    description: 'Follow a free deep learning roadmap covering neural networks, CNNs, RNNs, LSTMs, encoder-decoder models, Transformers, NLP, and curated resources.',
    keywords: 'deep learning roadmap, neural network roadmap, learn deep learning, AI roadmap, machine learning roadmap',
    type: 'article',
  },
  {
    path: '/genai',
    title: 'Generative AI Roadmap for Builders | mldl.study',
    description: 'Follow a free generative AI roadmap covering Transformers, prompt engineering, RAG, vector databases, fine-tuning, AI agents, evaluation, and deployment.',
    keywords: 'generative AI roadmap, GenAI roadmap, AI agents roadmap, RAG roadmap, LLM roadmap, AI roadmap',
    type: 'article',
  },
];

const escapeAttr = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

/* Static JSON-LD so crawlers that skip JS still get structured data.
   The SPA adds richer page-level schema client-side via react-helmet. */
const ROADMAP_APP_ROUTES = new Set(['/machinelearning', '/deeplearning', '/genai', '/prerequisites']);

const buildJsonLd = (route, canonical) => {
  if (route.path === '/') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'mldl.study',
      url: siteUrl,
      description: route.description,
      inLanguage: 'en',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/search?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    };
  }
  if (ROADMAP_APP_ROUTES.has(route.path)) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Course',
      '@id': `${canonical}#course`,
      name: route.title.replace(' | mldl.study', ''),
      description: route.description,
      url: canonical,
      isAccessibleForFree: true,
      provider: { '@type': 'Organization', name: 'mldl.study', url: siteUrl },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', category: 'Free' },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'PT10H',
      },
    };
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonical}#article`,
    headline: route.title.replace(' | mldl.study', ''),
    description: route.description,
    url: canonical,
    mainEntityOfPage: canonical,
    image: ogImage,
    author: { '@type': 'Person', name: 'Ansh Aneja', url: siteUrl },
    publisher: { '@type': 'Organization', name: 'mldl.study', url: siteUrl },
  };
};

const replaceTag = (html, pattern, replacement) => html.replace(pattern, replacement);

const renderRoute = (template, route) => {
  const canonical = route.path === '/' ? `${siteUrl}/` : `${siteUrl}${route.path}`;
  let html = template;

  html = replaceTag(html, /<title>.*?<\/title>/, `<title>${escapeAttr(route.title)}</title>`);
  html = replaceTag(html, /<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeAttr(route.description)}" />`);
  html = replaceTag(html, /<meta\s+name="keywords"\s+content="[^"]*"\s*\/>/, `<meta name="keywords" content="${escapeAttr(route.keywords)}" />`);
  html = replaceTag(html, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`);
  html = replaceTag(html, /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/, `<meta property="og:type" content="${route.type}" />`);
  html = replaceTag(html, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeAttr(route.title)}" />`);
  html = replaceTag(html, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeAttr(route.description)}" />`);
  html = replaceTag(html, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`);
  html = replaceTag(html, /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/, `<meta property="og:image" content="${ogImage}" />`);
  html = replaceTag(html, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`);
  html = replaceTag(html, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`);
  html = replaceTag(html, /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:image" content="${ogImage}" />`);

  const jsonLd = JSON.stringify(buildJsonLd(route, canonical)).replaceAll('</', '<\\/');
  html = html.replace('</head>', `  <script type="application/ld+json">${jsonLd}</script>\n  </head>`);

  return html;
};

const template = await readFile(indexPath, 'utf8');

await Promise.all(
  routes.map(async (route) => {
    const html = renderRoute(template, route);
    const outDir = route.path === '/' ? distDir : path.join(distDir, route.path.slice(1));
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, 'index.html'), html);
  }),
);

console.log(`Prerendered ${routes.length} SEO routes`);
