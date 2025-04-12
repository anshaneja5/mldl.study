import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { ArrowRight, Users, Rocket, Star, Trophy, Heart, Target, Zap } from 'lucide-react';
import Navbar from './Navbar';

const journeyData = [
  {
    date: "March 2024",
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
    date: "April 2024",
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
    date: "May 2024",
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
    date: "June 2024",
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
    date: "July 2024",
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
    date: "August 2024",
    title: "Startup Journey",
    description: "Shared the inspiring story of building a startup during college",
    redditLinks: [
      "https://www.reddit.com/r/Btechtards/comments/1jwlqys/story_of_how_i_finally_built_a_startup_in_my/",
      "https://www.reddit.com/r/developersIndia/comments/1jwosyj/story_of_how_i_finally_built_a_startup_in_my/"
    ],
    icon: <Target className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    milestone: "10K Users"
  }
];

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
    <div className="relative w-full">
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
  const [darkMode, setDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setIsTransitioning(true);
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
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

      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-slate-50 text-gray-900'}`}>
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          isTransitioning={isTransitioning}
        />
    
        <main className="flex-grow flex flex-col items-center px-4 py-12">
          {/* Hero Section */}
          <header className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium">
              Our Story
            </div>
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              The Journey of <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">mldl.study</span>
            </h1>
            <p className={`text-lg mb-8 max-w-xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              From a simple idea to a thriving community resource. Follow our growth story and milestones.
            </p>
          </header>

          {/* Timeline Section */}
          <div className="w-full max-w-6xl mx-auto px-4">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1.5 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full hidden md:block" />
              
              {/* Timeline Items */}
              <div className="space-y-16 md:space-y-24">
                {journeyData.map((item, index) => (
                  <div key={index} className="relative">
                    {/* Milestone Card */}
                    <div className={`relative w-full md:w-5/12 ${index % 2 === 0 ? 'md:ml-auto md:mr-8' : 'md:mr-auto md:ml-8'}`}>
                      <div className={`p-8 rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transform transition-all duration-300 hover:scale-[1.02]`}>
                        <div className="flex items-center mb-6">
                          <div className={`p-4 rounded-xl bg-gradient-to-r ${item.color} text-white mr-6`}>
                            {item.icon}
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.date}</span>
                            <h3 className="text-2xl font-bold mt-1">{item.title}</h3>
                          </div>
                        </div>
                        <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {item.description}
                        </p>
                        <div className="space-y-6">
                          {item.redditLinks.map((link, linkIndex) => (
                            <RedditEmbed key={linkIndex} url={link} />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Milestone Dot */}
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold text-lg shadow-xl hidden md:flex`}>
                      <span className="text-center text-sm leading-tight">{item.milestone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
            <p className={`mb-8 max-w-xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Be part of our growing community and help shape the future of ML/DL education.
            </p>
            <a
              href="https://github.com/anshaneja5/mldl.study"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span>Contribute on GitHub</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </main>
      </div>
    </>
  );
};

export default Journey; 