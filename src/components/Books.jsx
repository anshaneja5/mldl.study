import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { Book, ExternalLink, Search } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Helmet } from 'react-helmet';

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

const Books = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });

  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

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

  const getCategoryColor = (category) => {
    const colors = {
      'Machine Learning': 'bg-blue-500',
      'Deep Learning': 'bg-purple-500',
      'Statistics': 'bg-green-500',
      'Mathematics': 'bg-red-500',
      'Programming': 'bg-yellow-500',
      'AI': 'bg-indigo-500'
    };
    return colors[category] || 'bg-gray-500';
  };

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

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} isTransitioning={false} />

      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Books and Articles
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 text-lg">
            A curated collection of essential resources for Machine Learning and Deep Learning
          </p>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by title or author..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 
                          bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                          shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent
                          transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                            ${selectedCategory === category
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Books Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Book className="w-6 h-6" />
              Books
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md 
                             transition-all duration-200 border border-gray-200 dark:border-gray-700`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                          by {book.author}
                        </p>
                      </div>
                      <span className={`${getCategoryColor(book.category)} text-white text-xs px-2 py-1 rounded-full`}>
                        {book.category}
                      </span>
                    </div>
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span>Read Book</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Articles Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md 
                             transition-all duration-200 border border-gray-200 dark:border-gray-700`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                          by {article.author}
                        </p>
                      </div>
                      <span className={`${getCategoryColor(article.category)} text-white text-xs px-2 py-1 rounded-full`}>
                        {article.category}
                      </span>
                    </div>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span>Read Article</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Empty State */}
          {filteredBooks.length === 0 && filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No resources found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer darkMode={darkMode} />
    </>
  );
};

export default Books;
