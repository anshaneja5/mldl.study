import React from 'react';
import { Github, Linkedin, Compass, BookCopy, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = ({ darkMode }) => {
  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com/anshaneja5/mldl.study', label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/anshaneja5/', label: 'LinkedIn' },
  ];

  const footerSections = [
    {
      title: 'Navigation',
      icon: <Compass className="w-4 h-4" />,
      links: [
        { text: 'ML Roadmap', href: '/machinelearning' },
        { text: 'DL Roadmap', href: '/deeplearning' },
        { text: 'Books & Articles', href: '/books' },
      ],
    },
    {
      title: 'Resources',
      icon: <BookCopy className="w-4 h-4" />,
      links: [
        { text: 'About', href: '/' },
        { text: 'Contact Us', href: 'mailto:anshanejaa@gmail.com' },
        { text: 'Contribute', href: 'https://github.com/anshaneja5/mldl.study#contributing' },
      ],
    },
    {
      title: 'Legal',
      icon: <Shield className="w-4 h-4" />,
      links: [
        { text: 'Privacy Policy', href: '/privacy' },
        { text: 'Terms of Use', href: '/terms' },
        { text: 'Sitemap', href: '/sitemap.xml' },
      ],
    },
  ];

  return (
    <footer className={`border-t ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:justify-items-center">
          {/* About & Socials */}
          <div className="md:col-span-2 md:justify-self-start">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                mldl.study
              </h2>
            </Link>
            <p className={`mt-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Simplifying ML & DL education for everyone.
            </p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`transition-all duration-300 ease-in-out hover:scale-125 ${
                    darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className={section.title === 'Legal' ? 'md:justify-self-end' : ''}>
              <div className="flex items-center gap-2">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{section.icon}</span>
                <h3
                  className={`text-sm font-semibold tracking-wider uppercase ${
                    darkMode ? 'text-gray-300' : 'text-gray-800'
                  }`}
                >
                  {section.title}
                </h3>
              </div>
              <ul className="mt-4 space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {/* Use <a> for sitemap, mailto, and external links */}
                    {link.href.startsWith('http') ||
                    link.href.startsWith('mailto') ||
                    link.href.endsWith('.xml') ? (
                      <a
                        href={link.href}
                        target={link.href.endsWith('.xml') || link.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className={`text-sm transition-all duration-200 ease-in-out hover:translate-x-1 hover:font-semibold inline-block ${
                          darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {link.text}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className={`text-sm transition-all duration-200 ease-in-out hover:translate-x-1 hover:font-semibold inline-block ${
                          darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {link.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div
          className={`mt-12 pt-8 border-t ${
            darkMode ? 'border-gray-800' : 'border-gray-200'
          } text-center text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
        >
          &copy; {new Date().getFullYear()} MLDL.Study • Built with ❤️ by Ansh Aneja <br />
          <div className="mt-1">
            <span>All Rights Reserved</span>
            <span className="mx-2">•</span>
            <a
              href="https://github.com/anshaneja5/mldl.study/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline ${darkMode ? 'hover:text-white' : 'hover:text-black'}`}
            >
              License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
