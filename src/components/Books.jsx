import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
const books = [
  { title: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow', author: 'Aurélien Géron', link: 'https://www.bayanbox.ir/view/9006149947423722897/Hands-On-Machine-Learning-with-Scikit-Learn-Keras-and-TensorFlow.pdf' },
  { title: 'Introduction to Machine Learning with Python', author: 'Andreas C. Müller, Sarah Guido', link: 'https://www.nrigroupindia.com/e-book/Introduction%20to%20Machine%20Learning%20with%20Python%20(%20PDFDrive.com%20)-min.pdf' },
  { title: 'Deep Learning', author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville', link: 'https://www.deeplearningbook.org/' },
  { link:"https://course.fast.ai/Resources/book.html", title:"Deep Learning for Coders with fastai and PyTorch", author:"Jeremy Howard, Sylvain Gugger"},
  { title:"Grokking Deep Learning", author:"Andrew W. Trask", link:"https://cdn.ttgtmedia.com/rms/pdf/grokking_deep_learning.pdf"},
  { title: 'ISLR (Introduction to Statistical Learning)', author: 'Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani', link: 'https://www.stat.berkeley.edu/users/rabbee/s154/ISLR_First_Printing.pdf' },
  { title: 'The Matrix Cookbook', author: 'Kaare Brandt Petersen, Michael Syskind Pedersen', link: 'https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf' },
  { title: 'Machine Learning Notebook',author: 'calvinfeng', link: 'https://calvinfeng.gitbook.io/machine-learning-notebook'},
  { title: 'Python for Data Analysis',author: "Wes McKinney", link:'https://wesmckinney.com/book/'}
];

const articles = [
  { title: 'When Do We Not Use Euclidean Distance?', author: 'Jed Lee', link: 'https://jedleee.medium.com/when-do-we-not-use-euclidean-distance-dd9009ddda43#:~:text=Another%20significant%20limitation%20of%20Euclidean,make%20as%20much%20sense%20anymore.' },
  { title: 'Log of Odds', author: 'Archive', link: 'https://archive.ph/258fU' },
  { title: 'ReLU Activation Function', author: 'BuiltIn', link: 'https://builtin.com/machine-learning/relu-activation-function#:~:text=ReLU%2C%20short%20for%20rectified%20linear,neural%20networks%20in%20machine%20learning.' },
  { title: 'TensorFlow Playground', author: 'TensorFlow', link: 'https://playground.tensorflow.org' },
  { title: 'Matrix Derivatives Cribsheet', author: 'Gatsby UCL', link: 'https://www.gatsby.ucl.ac.uk/teaching/courses/sntn/sntn-2017/resources/Matrix_derivatives_cribsheet.pdf' },
  { title: 'R2 Square', author: 'GFG', link: 'https://www.geeksforgeeks.org/ml-r-squared-in-regression-analysis/' },
  { title: "An Illustrated Guide to Shape and Strides",author:"Haphazard investigations", link : "https://ajcr.net/stride-guide-part-1/"},
  { title: "Understanding AI", author: "Lee Robinson", link:"https://leerob.com/n/ai"}
];

const Books = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  return (
    <div className={`min-h-screen bg-${darkMode ? 'black' : 'white'} text-${darkMode ? 'white' : 'black'} p-4 md:p-8`}>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Recommended Books and Articles</h1>

      {/* Books Section */}
      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">📚 Books</h2>
        <ul className="list-disc pl-5 space-y-4">
          {books.map((book, index) => (
            <li key={index} className="text-lg">
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-${darkMode ? 'blue-300' : 'blue-600'} underline`}
              >
                {book.title}
              </a>{' '}
              by {book.author}
            </li>
          ))}
        </ul>
      </section>

      {/* Articles Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">📄 Random Articles</h2>
        <ul className="list-disc pl-5 space-y-4">
          {articles.map((article, index) => (
            <li key={index} className="text-lg">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-${darkMode ? 'green-300' : 'green-600'} underline`}
              >
                {article.title}
              </a>{' '}
              by {article.author}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Books;
