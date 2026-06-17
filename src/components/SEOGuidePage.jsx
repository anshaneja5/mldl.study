import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Github, Linkedin, Mail, Sparkles, Twitter } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import AuroraBackground from './AuroraBackground';
import BackToTopButton from './BackToTopButton';
import useDarkMode from './useDarkMode';

export const SITE_URL = 'https://mldl.study';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`;

export const buildGuideSchema = ({ path, title, description, faqs, steps = [] }) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${SITE_URL}${path}#article`,
      headline: title,
      description,
      url: `${SITE_URL}${path}`,
      author: { '@type': 'Person', name: 'Ansh Aneja', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'mldl.study', url: SITE_URL },
      dateModified: '2026-06-18',
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}${path}#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: title, item: `${SITE_URL}${path}` },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}${path}#steps`,
      name: `${title} steps`,
      itemListElement: steps.map((step, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: step.title,
        description: step.description,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}${path}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
});

export const AuthorBlock = () => (
  <aside className="glass glass-sheen rounded-3xl p-5">
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-aurora">Maintained by</p>
    <h2 className="mt-2 font-display text-2xl font-bold text-ink">Ansh Aneja</h2>
    <p className="mt-2 text-sm leading-relaxed text-soft">
      I build and maintain mldl.study, track new AI tools and breakthroughs, and share weekly notes on Claude Code, Cursor, Codex, GenAI systems, and practical learning paths.
    </p>
    <div className="mt-4 grid gap-2 sm:grid-cols-2">
      <a href="https://x.com/vedolos/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-2xl bg-[#0f1419] px-4 py-3 text-sm font-semibold text-white">
        <Twitter className="h-4 w-4" />
        Follow on X
      </a>
      <a href="https://www.linkedin.com/in/anshaneja5/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-2xl bg-[#0a66c2] px-4 py-3 text-sm font-semibold text-white">
        <Linkedin className="h-4 w-4" />
        LinkedIn
      </a>
      <a href="https://github.com/anshaneja5/mldl.study" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-2xl glass px-4 py-3 text-sm font-semibold text-ink">
        <Github className="h-4 w-4" />
        GitHub
      </a>
      <a href="https://anshaneja.substack.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-2xl glass px-4 py-3 text-sm font-semibold text-ink">
        <Mail className="h-4 w-4" />
        Newsletter
      </a>
    </div>
  </aside>
);

const SEOGuidePage = ({
  badge,
  path,
  title,
  description,
  keywords,
  intro,
  steps,
  bodyTitle,
  body,
  checklist,
  faqs,
  primaryCta,
  secondaryCta,
}) => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const canonical = `${SITE_URL}${path}`;
  const schema = buildGuideSchema({ path, title, description, faqs, steps });

  return (
    <>
      <Helmet>
        <title>{title} | mldl.study</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${title} | mldl.study`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vedolos" />
        <meta name="twitter:creator" content="@vedolos" />
        <meta name="twitter:title" content={`${title} | mldl.study`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <AuroraBackground />
      <div className="flex min-h-screen flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="mx-auto w-full max-w-6xl flex-grow px-4 pb-20 pt-10 sm:pt-16">
          <section className="mx-auto max-w-4xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-semibold text-aurora">
              <Sparkles className="h-4 w-4" />
              {badge}
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-tight text-ink sm:text-6xl">{title}</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-soft">{intro}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to={primaryCta.href} className="btn-aurora rounded-2xl px-6 py-3 text-[15px]">
                {primaryCta.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to={secondaryCta.href} className="rounded-2xl glass px-6 py-3 text-[15px] font-semibold text-ink transition-all duration-300 hover:shadow-glow">
                {secondaryCta.label}
              </Link>
            </div>
          </section>

          <section className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="glass glass-sheen rounded-3xl p-5">
                <p className="font-mono text-xs text-faint">{String(index + 1).padStart(2, '0')}</p>
                <h2 className="mt-2 font-display text-xl font-bold text-ink">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-soft">{step.description}</p>
              </article>
            ))}
          </section>

          <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.45fr]">
            <article className="glass glass-sheen rounded-[2rem] p-7 sm:p-10">
              <h2 className="font-display text-3xl font-bold text-ink">{bodyTitle}</h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-soft sm:text-base">
                {body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
            <AuthorBlock />
          </section>

          <section className="mt-16 grid gap-4 md:grid-cols-2">
            {checklist.map((item) => (
              <div key={item} className="glass rounded-2xl p-5">
                <CheckCircle2 className="mb-3 h-5 w-5 text-aurora-cyan" />
                <p className="font-medium text-ink">{item}</p>
              </div>
            ))}
          </section>

          <section className="glass glass-sheen mt-16 rounded-[2rem] p-7 sm:p-10">
            <h2 className="font-display text-3xl font-bold text-ink">Frequently asked questions</h2>
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

export default SEOGuidePage;
