import React from 'react';
import { Github, Linkedin, Compass, BookCopy, Shield, Waypoints, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const SOCIALS = [
  { icon: <Twitter className="h-[18px] w-[18px]" />, href: 'https://x.com/vedolos/', label: 'Follow on X', handle: '@vedolos', className: 'bg-[#0f1419] text-white' },
  { icon: <Linkedin className="h-[18px] w-[18px]" />, href: 'https://www.linkedin.com/in/anshaneja5/', label: 'Connect on LinkedIn', handle: 'Ansh Aneja', className: 'bg-[#0a66c2] text-white' },
  { icon: <Github className="h-[18px] w-[18px]" />, href: 'https://github.com/anshaneja5/mldl.study', label: 'GitHub', handle: 'Source code', className: 'glass text-ink' },
];

const SECTIONS = [
  {
    title: 'Navigation',
    icon: <Compass className="h-4 w-4" />,
    links: [
      { text: 'AI Roadmap', href: '/ai-roadmap' },
      { text: 'ML Roadmap', href: '/ml-roadmap' },
      { text: 'Deep Learning Roadmap', href: '/deep-learning-roadmap' },
    ],
  },
  {
    title: 'Guides',
    icon: <BookCopy className="h-4 w-4" />,
    links: [
      { text: 'GenAI Roadmap', href: '/generative-ai-roadmap' },
      { text: 'AI Agents Roadmap', href: '/ai-agents-roadmap' },
      { text: 'RAG Roadmap', href: '/rag-roadmap' },
    ],
  },
  {
    title: 'Resources',
    icon: <Shield className="h-4 w-4" />,
    links: [
      { text: 'Learn AI from Scratch', href: '/learn-ai-from-scratch' },
      { text: 'Books & Articles', href: '/books' },
      { text: 'Sitemap', href: '/sitemap.xml' },
    ],
  },
];

const FooterLink = ({ link }) => {
  const external = link.href.startsWith('http') || link.href.startsWith('mailto') || link.href.endsWith('.xml');
  const cls = 'text-sm text-soft transition-colors duration-200 hover:text-ink';
  return external ? (
    <a href={link.href} target={link.href.endsWith('.xml') || link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={cls}>
      {link.text}
    </a>
  ) : (
    <Link to={link.href} className={cls}>
      {link.text}
    </Link>
  );
};

const Footer = () => (
  <footer className="relative mt-auto border-t border-white/10">
    <div className="absolute inset-0 bg-white/[0.015]" />
    <div className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
        {/* Brand */}
        <div className="col-span-2">
          <Link to="/" className="group inline-flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-aurora-violet via-aurora-indigo to-aurora-cyan text-[#04060f] shadow-glow">
              <Waypoints className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span className="font-display text-xl font-bold text-ink">
              mldl<span className="text-aurora">.study</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-soft">
            Simplifying Machine Learning &amp; Deep Learning education, plus notes on Claude Code, Cursor, agentic coding, and the latest AI tools.
          </p>
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-aurora">Follow Ansh</p>
          </div>
          <div className="mt-3 grid max-w-md gap-2.5 sm:grid-cols-2">
            {SOCIALS.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`flex items-center gap-2.5 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow ${s.className}`}
              >
                {s.icon}
                <span className="flex flex-col leading-tight">
                  <span>{s.label}</span>
                  <span className="text-xs font-medium opacity-70">{s.handle}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        {SECTIONS.map((section, i) => (
          <div key={i}>
            <div className="flex items-center gap-2 text-faint">
              {section.icon}
              <h3 className="text-xs font-semibold uppercase tracking-widest">{section.title}</h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {section.links.map((link, j) => (
                <li key={j}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 text-center text-sm text-faint sm:flex-row sm:text-left">
        <span>
          © {new Date().getFullYear()} mldl.study · Built with <span className="text-rose-400">♥</span> by Ansh Aneja
        </span>
        <span className="flex items-center gap-2">
          <span>All Rights Reserved</span>
          <span className="opacity-40">•</span>
          <a href="https://github.com/anshaneja5/mldl.study/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
            License
          </a>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
