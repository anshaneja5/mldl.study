import React, { useState } from 'react';
import ReactGA from 'react-ga4';
import { Book, ExternalLink, Search, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import AuroraBackground from './AuroraBackground';
import { Helmet } from 'react-helmet';
import useDarkMode from './useDarkMode';

const books = [
  { title: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow', author: 'Aurélien Géron', link: 'https://www.bayanbox.ir/view/9006149947423722897/Hands-On-Machine-Learning-with-Scikit-Learn-Keras-and-TensorFlow.pdf', category: 'Machine Learning' },
  { title: 'Introduction to Machine Learning with Python', author: 'Andreas C. Müller, Sarah Guido', link: 'https://www.nrigroupindia.com/e-book/Introduction%20to%20Machine%20Learning%20with%20Python%20(%20PDFDrive.com%20)-min.pdf', category: 'Machine Learning' },
  { title: 'Deep Learning', author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville', link: 'https://www.deeplearningbook.org/', category: 'Deep Learning' },
  { title: 'Deep Learning for Coders with fastai and PyTorch', author: 'Jeremy Howard, Sylvain Gugger', link: 'https://course.fast.ai/Resources/book.html', category: 'Deep Learning' },
  { title: 'Grokking Deep Learning', author: 'Andrew W. Trask', link: 'https://cdn.ttgtmedia.com/rms/pdf/grokking_deep_learning.pdf', category: 'Deep Learning' },
  { title: 'ISLR (Introduction to Statistical Learning)', author: 'Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani', link: 'https://www.stat.berkeley.edu/users/rabbee/s154/ISLR_First_Printing.pdf', category: 'Statistics' },
  { title: 'The Matrix Cookbook', author: 'Kaare Brandt Petersen, Michael Syskind Pedersen', link: 'https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf', category: 'Mathematics' },
  { title: 'Machine Learning Notebook', author: 'calvinfeng', link: 'https://calvinfeng.gitbook.io/machine-learning-notebook', category: 'Machine Learning' },
  { title: 'Python for Data Analysis', author: 'Wes McKinney', link: 'https://wesmckinney.com/book/', category: 'Programming' }
];

const articles = [
  { title: 'When Do We Not Use Euclidean Distance?', author: 'Jed Lee', link: 'https://jedleee.medium.com/when-do-we-not-use-euclidean-distance-dd9009ddda43#:~:text=Another%20significant%20limitation%20of%20Euclidean,make%20as%20much%20sense%20anymore.', category: 'Mathematics' },
  { title: 'Log of Odds', author: 'Archive', link: 'https://archive.ph/258fU', category: 'Statistics' },
  { title: 'ReLU Activation Function', author: 'BuiltIn', link: 'https://builtin.com/machine-learning/relu-activation-function#:~:text=ReLU%2C%20short%20for%20rectified%20linear,neural%20networks%20in%20machine%20learning.', category: 'Deep Learning' },
  { title: 'TensorFlow Playground', author: 'TensorFlow', link: 'https://playground.tensorflow.org', category: 'Deep Learning' },
  { title: 'Matrix Derivatives Cribsheet', author: 'Gatsby UCL', link: 'https://www.gatsby.ucl.ac.uk/teaching/courses/sntn/sntn-2017/resources/Matrix_derivatives_cribsheet.pdf', category: 'Mathematics' },
  { title: 'R2 Square', author: 'GFG', link: 'https://www.geeksforgeeks.org/ml-r-squared-in-regression-analysis/', category: 'Statistics' },
  { title: 'An Illustrated Guide to Shape and Strides', author: 'Haphazard investigations', link: 'https://ajcr.net/stride-guide-part-1/', category: 'Programming' },
  { title: 'Understanding AI', author: 'Lee Robinson', link: 'https://leerob.com/n/ai', category: 'AI' }
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

const ResourceCard = ({ item, index, ctaLabel }) => (
  <motion.a
    custom={index}
    variants={fadeUp}
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    className="glass glass-sheen group flex flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
  >
    <div className="flex items-start justify-between gap-3">
      <h3 className="line-clamp-2 text-lg font-semibold text-ink">{item.title}</h3>
      <span className="shrink-0 rounded-full glass px-3 py-1 text-xs font-medium text-soft">
        {item.category}
      </span>
    </div>
    <p className="mb-5 mt-2 text-sm text-soft">by {item.author}</p>
    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-aurora">
      {ctaLabel}
      <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </span>
  </motion.a>
);

const Books = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });

  const [darkMode, toggleDarkMode] = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set([...books, ...articles].map(item => item.category))];

  const filteredBooks = books.filter(book =>
    (selectedCategory === 'all' || book.category === selectedCategory) &&
    (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     book.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredArticles = articles.filter(article =>
    (selectedCategory === 'all' || article.category === selectedCategory) &&
    (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     article.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <Helmet>
        <title>Books and Articles | ML/DL Learning Resources</title>
        <meta
          name="description"
          content="A curated collection of essential books and articles for Machine Learning and Deep Learning. Access comprehensive learning resources from experts in the field."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://mldl.study/books" />
      </Helmet>

      <AuroraBackground />

      <div className="flex min-h-screen flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} isTransitioning={false} />

        <main className="mx-auto w-full max-w-7xl flex-grow px-4 pb-20 pt-10 sm:pt-14">
          {/* Page header */}
          <motion.header
            initial="hidden"
            animate="visible"
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <motion.h1 variants={fadeUp} custom={0} className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Books &amp; <span className="text-aurora">Articles</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={1} className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-soft">
              A curated collection of essential resources for Machine Learning and Deep Learning
            </motion.p>
          </motion.header>

          {/* Search and Filter Controls */}
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                <Search className="h-5 w-5 text-faint" />
              </div>
              <input
                type="text"
                placeholder="Search by title or author..."
                className="w-full rounded-2xl glass py-2.5 pl-11 pr-4 text-ink outline-none transition-all duration-300 placeholder:text-faint focus:shadow-glow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-aurora-violet to-aurora-cyan text-[#06070f] shadow-glow'
                      : 'glass text-soft hover:text-ink hover:shadow-glow'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Books Section */}
          <section className="mb-16">
            <h2 className="mb-6 flex items-center gap-2 font-display text-2xl font-bold text-ink">
              <Book className="h-6 w-6 text-aurora-violet" />
              Books
            </h2>
            <motion.div
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredBooks.map((book, index) => (
                <ResourceCard key={index} item={book} index={index} ctaLabel="Read Book" />
              ))}
            </motion.div>
          </section>

          {/* Articles Section */}
          <section>
            <h2 className="mb-6 flex items-center gap-2 font-display text-2xl font-bold text-ink">
              <FileText className="h-6 w-6 text-aurora-cyan" />
              Articles
            </h2>
            <motion.div
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredArticles.map((article, index) => (
                <ResourceCard key={index} item={article} index={index} ctaLabel="Read Article" />
              ))}
            </motion.div>
          </section>

          {/* Empty State */}
          {filteredBooks.length === 0 && filteredArticles.length === 0 && (
            <div className="py-16 text-center">
              <div className="mb-4 text-5xl">🔍</div>
              <h3 className="mb-2 font-display text-xl font-semibold text-ink">No resources found</h3>
              <p className="text-soft">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </>
  );
};

export default Books;
