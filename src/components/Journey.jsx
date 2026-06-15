import React, { useState, useEffect } from 'react'; // Keep useEffect for RedditEmbed
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Rocket, Star, Trophy, Heart, Target } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import AuroraBackground from './AuroraBackground';
import BackToTopButton from './BackToTopButton';
import useDarkMode from './useDarkMode';

const journeyData = [
  {
    date: "October 2024",
    title: "The Beginning",
    description: "Launched the initial version of mldl.study with a comprehensive ML/DL roadmap",
    redditLinks: [
      "https://www.reddit.com/r/developersIndia/comments/1fe87pk/the_ultimate_roadmap_for_learning_machine/"
    ],
    icon: <Rocket className="w-6 h-6" />,
    color: "from-blue-500 to-indigo-500",
    milestone: "Launch"
  },
  {
    date: "November 2024",
    title: "First Milestone",
    description: "Reached 450 users in just 25 days after launch",
    redditLinks: [
      "https://www.reddit.com/r/developersIndia/comments/1gnw686/built_a_roadmap_site_and_got_450_users_in_25_days/"
    ],
    icon: <Users className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    milestone: "450 Users"
  },
  {
    date: "November 2024",
    title: "Growing Strong",
    description: "Hit 2000 users within 30 days, showing strong community interest",
    redditLinks: [
      "https://www.reddit.com/r/developersIndia/comments/1gtyl8w/2000_users_in_last_30_days_i_am_soo_soo_happy/"
    ],
    icon: <Star className="w-6 h-6" />,
    color: "from-yellow-500 to-amber-500",
    milestone: "2K Users"
  },
  {
    date: "December 2024",
    title: "Open Source Release",
    description: "Project reached 4000 users and was open-sourced to the community",
    redditLinks: [
      "https://www.reddit.com/r/opensource/comments/1gutx79/4000_users_in_2_months_project_now_open_sourced/"
    ],
    icon: <Heart className="w-6 h-6" />,
    color: "from-pink-500 to-rose-500",
    milestone: "4K Users"
  },
  {
    date: "January 2025",
    title: "Self-Hosted Success",
    description: "Achieved 5000 users in 3 months, with strong community support",
    redditLinks: [
      "https://www.reddit.com/r/selfhosted/comments/1hkqtyc/greatful_to_you_guys_5000_users_in_last_3_months/"
    ],
    icon: <Trophy className="w-6 h-6" />,
    color: "from-purple-500 to-violet-500",
    milestone: "5K Users"
  },
  {
    date: "April 2025",
    title: "Startup Journey",
    description: "Shared the inspiring story of building mldl.study in college",
    redditLinks: [
      "https://www.reddit.com/r/Btechtards/comments/1jwlqys/story_of_how_i_finally_built_a_startup_in_my/",
      "https://www.reddit.com/r/developersIndia/comments/1jwosyj/story_of_how_i_finally_built_a_startup_in_my/"
    ],
    icon: <Target className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    milestone: "10K Users"
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

// Reddit Embed Component
const RedditEmbed = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.reddit.com/widgets.js';
    script.async = true;
    script.charset = 'UTF-8';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-2">
      <blockquote
        className="reddit-embed"
        data-embed-height="400"
        data-embed-showedits="false"
        data-embed-showmedia="false"
        data-embed-showparent="false"
      >
        <a href={url}>View on Reddit</a>
      </blockquote>
    </div>
  );
};

const Journey = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  const [darkMode, toggleDarkModeHook] = useDarkMode();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleDarkMode = () => {
    setIsTransitioning(true);
    toggleDarkModeHook();
    setTimeout(() => setIsTransitioning(false), 300);
  };

  useEffect(() => {
    // Load Reddit embed script
    const script = document.createElement('script');
    script.src = 'https://embed.reddit.com/widgets.js';
    script.async = true;
    script.charset = 'UTF-8';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Journey | mldl.study</title>
        <meta
          name="description"
          content="Follow our journey from launch to 10K users. See how mldl.study grew from a simple idea to a thriving community resource."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://mldl.study/journey" />
      </Helmet>

      <AuroraBackground />

      <div className="flex min-h-screen flex-col">
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isTransitioning={isTransitioning}
        />

        <main className="mx-auto w-full max-w-4xl flex-grow px-4 pb-20 pt-10 sm:pt-14">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-aurora">
              Our Story
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
              The Journey of <span className="text-aurora">mldl.study</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-soft">
              From a simple idea to a thriving community resource. Follow our growth story and milestones.
            </p>
          </motion.header>

          {/* Timeline */}
          <div className="relative mx-auto max-w-3xl">
            {/* vertical connector rail */}
            <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-aurora-violet/60 via-aurora-cyan/40 to-aurora-fuchsia/50 sm:left-7" aria-hidden="true" />

            <div className="space-y-10">
              {journeyData.map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative pl-16 sm:pl-20"
                >
                  {/* timeline node */}
                  <span
                    className={`absolute left-0 top-1 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${item.color} text-[#06070f] shadow-glow sm:h-[3.75rem] sm:w-[3.75rem]`}
                  >
                    {item.icon}
                  </span>

                  {/* milestone card */}
                  <div className="glass glass-sheen rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow sm:p-8">
                    <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="font-mono text-xs uppercase tracking-widest text-faint">{item.date}</span>
                      <span className={`rounded-full bg-gradient-to-r ${item.color} px-3 py-0.5 font-mono text-[11px] font-semibold text-[#06070f]`}>
                        {item.milestone}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-lg leading-relaxed text-soft">
                      {item.description}
                    </p>
                    <div className="mt-6 space-y-6">
                      {item.redditLinks.map((link, linkIndex) => (
                        <RedditEmbed key={linkIndex} url={link} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto mt-16 max-w-2xl"
          >
            <div className="glass glass-sheen rounded-3xl p-8 text-center sm:p-10">
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Join Our Journey</h2>
              <p className="mx-auto mt-3 max-w-xl text-soft">
                Be part of our growing community and help shape the future of ML/DL education.
              </p>
              <a
                href="https://github.com/anshaneja5/mldl.study"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-aurora mt-7 rounded-2xl px-6 py-3 text-[15px]"
              >
                <span>Contribute on GitHub</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </main>

        <Footer darkMode={darkMode} />
      </div>

      <BackToTopButton />
    </>
  );
};

export default Journey;
