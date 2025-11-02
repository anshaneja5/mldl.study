import { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { Book, ExternalLink, Search } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Helmet } from 'react-helmet';

const books = [
  { title: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TexnsorFlow', author: 'Aurélien Géron', link: 'https://www.bayanbox.ir/view/9006149947423722897/Hands-On-Machine-Learning-with-Scikit-Learn-Keras-and-TensorFlow.pdf', category: 'Machine Learning', cover: 'https://via.placeholder.com/100x150?text=Book+Cover', summary: 'A comprehensive guide to machine learning with practical examples.', rating: 4.5 },
  { title: 'Introduction to Machine Learning with Python', author: 'Andreas C. Müller, Sarah Guido', link: 'https://www.nrigroupindia.com/e-book/Introduction%20to%20Machine%20Learning%20with%20Python%20(%20PDFDrive.com%20)-min.pdf', category: 'Machine Learning', cover: 'https://via.placeholder.com/100x150?text=Book+Cover', summary: 'Introduction to machine learning concepts using Python.', rating: 4.2 },
  { title: 'Deep Learning', author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville', link: 'https://www.deeplearningbook.org/', category: 'Deep Learning', cover: 'https://via.placeholder.com/100x150?text=Book+Cover', summary: 'The definitive textbook on deep learning.', rating: 4.8 },
  { title: 'Deep Learning for Coders with fastai and PyTorch', author: 'Jeremy Howard, Sylvain Gugger', link: 'https://course.fast.ai/Resources/book.html', category: 'Deep Learning', cover: 'https://via.placeholder.com/100x150?text=Book+Cover', summary: 'Practical deep learning with fastai and PyTorch.', rating: 4.6 },
  { title: 'Grokking Deep Learning', author: 'Andrew W. Trask', link: 'https://cdn.ttgtmedia.com/rms/pdf/grokking_deep_learning.pdf', category: 'Deep Learning', cover: 'https://via.placeholder.com/100x150?text=Book+Cover', summary: 'An intuitive guide to deep learning concepts.', rating: 4.3 },
  { title: 'ISLR (Introduction to Statistical Learning)', author: 'Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani', link: 'https://www.stat.berkeley.edu/users/rabbee/s154/ISLR_First_Printing.pdf', category: 'Statistics', cover: 'https://via.placeholder.com/100x150?text=Book+Cover', summary: 'Introduction to statistical learning methods.', rating: 4.4 },
  { title: 'The Matrix Cookbook', author: 'Kaare Brandt Petersen, Michael Syskind Pedersen', link: 'https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf', category: 'Mathematics', cover: 'https://via.placeholder.com/100x150?text=Book+Cover', summary: 'A reference for matrix operations and derivatives.', rating: 4.0 },
  { title: 'Machine Learning Notebook', author: 'calvinfeng', link: 'https://calvinfeng.gitbook.io/machine-learning-notebook', category: 'Machine Learning', cover: 'https://via.placeholder.com/100x150?text=Book+Cover', summary: 'A notebook-style guide to machine learning.', rating: 4.1 },
  { title: 'Python for Data Analysis', author: 'Wes McKinney', link: 'https://wesmckinney.com/book/', category: 'Programming', cover: 'https://via.placeholder.com/100x150?text=Book+Cover', summary: 'Data analysis with Python and pandas.', rating: 4.5 }
];

const articles = [
  { title: 'When Do We Not Use Euclidean Distance?', author: 'Jed Lee', link: 'https://jedleee.medium.com/when-do-we-not-use-euclidean-distance-dd9009ddda43#:~:text=Another%20significant%20limitation%20of%20Euclidean,make%20as%20much%20sense%20anymore.', category: 'Mathematics', cover: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*mQDvJ3xFar1XAcPFiul0Pg.png', summary: 'Exploring limitations of Euclidean distance in data analysis.', rating: 4.0 },
  { title: 'Log of Odds', author: 'Archive', link: 'https://archive.ph/258fU', category: 'Statistics', cover: 'https://via.placeholder.com/100x150?text=Article+Cover', summary: 'Understanding log odds in statistical modeling.', rating: 3.8 },
  { title: 'ReLU Activation Function', author: 'BuiltIn', link: 'https://builtin.com/machine-learning/relu-activation-function#:~:text=ReLU%2C%20short%20for%20rectified%20linear,neural%20networks%20in%20machine%20learning.', category: 'Deep Learning', cover: 'https://via.placeholder.com/100x150?text=Article+Cover', summary: 'A guide to the ReLU activation function in neural networks.', rating: 4.2 },
  { title: 'TensorFlow Playground', author: 'TensorFlow', link: 'https://playground.tensorflow.org', category: 'Deep Learning', cover: 'https://via.placeholder.com/100x150?text=Article+Cover', summary: 'Interactive tool for understanding neural networks.', rating: 4.5 },
  { title: 'Matrix Derivatives Cribsheet', author: 'Gatsby UCL', link: 'https://www.gatsby.ucl.ac.uk/teaching/courses/sntn/sntn-2017/resources/Matrix_derivatives_cribsheet.pdf', category: 'Mathematics', cover: 'https://via.placeholder.com/100x150?text=Article+Cover', summary: 'Quick reference for matrix derivatives.', rating: 4.1 },
  { title: 'R2 Square', author: 'GFG', link: 'https://www.geeksforgeeks.org/ml-r-squared-in-regression-analysis/', category: 'Statistics', cover: 'https://via.placeholder.com/100x150?text=Article+Cover', summary: 'Explanation of R-squared in regression analysis.', rating: 4.3 },
  { title: 'An Illustrated Guide to Shape and Strides', author: 'Haphazard investigations', link: 'https://ajcr.net/stride-guide-part-1/', category: 'Programming', cover: 'https://via.placeholder.com/100x150?text=Article+Cover', summary: 'Visual guide to tensor shapes and strides.', rating: 4.4 },
  { title: 'Understanding AI', author: 'Lee Robinson', link: 'https://leerob.com/n/ai', category: 'AI', cover: 'https://via.placeholder.com/100x150?text=Article+Cover', summary: 'An overview of artificial intelligence concepts.', rating: 4.6 }
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
    <div className={darkMode ? 'dark' : ''}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Books and Articles
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 text-lg">
            A curated collection of essential resources for Machine Learning and Deep Learning
          </p>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className={`w-5 h-5 ${darkMode ? 'text-blue-300' : 'text-gray-500'} transition-colors duration-200`} />
              </div>
              <input
                type="text"
                placeholder="Search by title or author..."
                className={`w-full pl-10 pr-4 py-3 rounded-xl border shadow-sm transition-all duration-200 focus:ring-2 focus:border-transparent
                  ${darkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 hover:border-blue-400'
                  }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap border transition-all duration-200
                    ${selectedCategory === category
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                      : darkMode
                      ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400'
                    }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* External Import Section */}
          <div className={`mb-8 p-4 rounded-xl border transition-colors duration-300 ${
              darkMode ? 'bg-blue-900/10 border-blue-800' : 'bg-white border-gray-200 shadow-sm'
            }`}>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Import External Curated Lists
            </h3>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Add resources from external sources like Google Sheets (CSV format). Enter the URL below to import.
            </p>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://docs.google.com/spreadsheets/d/.../export?format=csv"
                className={`flex-1 px-3 py-2 rounded-lg border ${
                  darkMode
                    ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-500'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
                }`}
              />
              <button className={`px-4 py-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}>
                Import
              </button>
            </div>
          </div>

          {/* Books Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Book className="w-6 h-6" />
              Books
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book, index) => (
                <div
                  key={index}
                  className={`group relative ${darkMode ? 'bg-gray-800' : 'bg-white'} backdrop-blur-sm rounded-3xl p-8 border ${
                    darkMode ? 'border-indigo-500/20 hover:border-indigo-400/40' : 'border-gray-200 hover:border-blue-400/40'
                  } transition-all duration-500 hover:shadow-2xl ${
                    darkMode ? 'hover:shadow-indigo-500/10' : 'hover:shadow-blue-500/10'
                  } hover:-translate-y-2 overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-start gap-6">
                      <div className="relative flex-shrink-0">
                        <img
                          src={book.cover}
                          alt="Cover"
                          className="w-28 h-36 object-cover rounded-xl shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105"
                        />
                        <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-t from-black/20' : 'bg-gradient-to-t from-white/20'} to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        <div className="mt-2 flex justify-center">
                          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm px-3 py-1.5 rounded-full font-bold shadow-lg backdrop-blur-sm border border-white/20 flex items-center gap-1">
                            <span>{book.rating}</span>
                            <span className="text-yellow-300">⭐</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-xl leading-tight ${
                          darkMode ? 'text-white group-hover:text-indigo-300' : 'text-gray-900 group-hover:text-blue-600'
                        } transition-colors duration-300 mb-3`}>
                          {book.title}
                        </h3>
                        <p className={`text-sm mb-4 font-medium ${darkMode ? 'text-indigo-300' : 'text-gray-600'}`}>
                          by {book.author}
                        </p>
                        <p className={`text-sm mb-6 line-clamp-3 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {book.summary}
                        </p>
                        <div className="flex items-center justify-between mb-6">
                          <span className={`${getCategoryColor(book.category)} text-white text-xs px-4 py-2 rounded-full font-bold shadow-lg backdrop-blur-sm border border-white/20`}>
                            {book.category}
                          </span>
                        </div>
                        <div className={`border-t ${darkMode ? 'border-indigo-500/30' : 'border-gray-300/30'} pt-6`}>
                          <a
                            href={book.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-3 font-semibold transition-all duration-300 group-hover:gap-4 ${
                              darkMode ? 'text-indigo-300 hover:text-indigo-200' : 'text-blue-600 hover:text-blue-500'
                            }`}
                          >
                            <span>Read Book</span>
                            <ExternalLink className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <div
                  key={index}
                  className={`group relative ${darkMode ? 'bg-gray-800' : 'bg-white'} backdrop-blur-sm rounded-3xl p-8 border ${
                    darkMode ? 'border-indigo-500/20 hover:border-indigo-400/40' : 'border-gray-200 hover:border-blue-400/40'
                  } transition-all duration-500 hover:shadow-2xl ${
                    darkMode ? 'hover:shadow-indigo-500/10' : 'hover:shadow-blue-500/10'
                  } hover:-translate-y-2 overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-start gap-6">
                      <div className="relative flex-shrink-0">
                        <img
                          src={article.cover}
                          alt="Cover"
                          className="w-28 h-36 object-cover rounded-xl shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105"
                        />
                        <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-t from-black/20' : 'bg-gradient-to-t from-white/20'} to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        <div className="mt-2 flex justify-center">
                          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm px-3 py-1.5 rounded-full font-bold shadow-lg backdrop-blur-sm border border-white/20 flex items-center gap-1">
                            <span>{article.rating}</span>
                            <span className="text-yellow-300">⭐</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-xl leading-tight ${
                          darkMode ? 'text-white group-hover:text-indigo-300' : 'text-gray-900 group-hover:text-blue-600'
                        } transition-colors duration-300 mb-3`}>
                          {article.title}
                        </h3>
                        <p className={`text-sm mb-4 font-medium ${darkMode ? 'text-indigo-300' : 'text-gray-600'}`}>
                          by {article.author}
                        </p>
                        <p className={`text-sm mb-6 line-clamp-3 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {article.summary}
                        </p>
                        <div className="flex items-center justify-between mb-6">
                          <span className={`${getCategoryColor(article.category)} text-white text-xs px-4 py-2 rounded-full font-bold shadow-lg backdrop-blur-sm border border-white/20`}>
                            {article.category}
                          </span>
                        </div>
                        <div className={`border-t ${darkMode ? 'border-indigo-500/30' : 'border-gray-300/30'} pt-6`}>
                          <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-3 font-semibold transition-all duration-300 group-hover:gap-4 ${
                              darkMode ? 'text-indigo-300 hover:text-indigo-200' : 'text-blue-600 hover:text-blue-500'
                            }`}
                          >
                            <span>Read Article</span>
                            <ExternalLink className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </section>

          {/* Empty State */}
          {filteredBooks.length === 0 && filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No resources found</h3>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Books;