import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Brain, TrendingUp, Layers, GitBranch, Sparkles, Target, Activity, Cpu, BarChart3, Search, Filter } from 'lucide-react';
import Navbar from './Navbar';
import useDarkMode from './useDarkMode';
import BackToTopButton from './BackToTopButton';
import Footer from './Footer';
import LinearRegressionViz from './visualizations/LinearRegressionViz';
import KMeansViz from './visualizations/KMeansViz';
import NeuralNetworkViz from './visualizations/NeuralNetworkViz';
import GradientDescentViz from './visualizations/GradientDescentViz';
import DecisionBoundaryViz from './visualizations/DecisionBoundaryViz';
import LogisticRegressionViz from './visualizations/LogisticRegressionViz';
import PCAViz from './visualizations/PCAViz';
import ActivationFunctionsViz from './visualizations/ActivationFunctionsViz';

const Visualizations = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [activeViz, setActiveViz] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const visualizations = [
    {
      id: 'linear-regression',
      title: 'Linear Regression',
      description: 'Fit a line to data points with interactive slope and intercept controls. Calculate MSE in real-time.',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      component: LinearRegressionViz,
      category: 'Regression',
      difficulty: 'Beginner',
      tags: ['supervised', 'regression', 'linear']
    },
    {
      id: 'logistic-regression',
      title: 'Logistic Regression',
      description: 'Binary classification with sigmoid function. Train model and visualize decision boundary with probabilities.',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-cyan-500 to-blue-500',
      component: LogisticRegressionViz,
      category: 'Classification',
      difficulty: 'Beginner',
      tags: ['supervised', 'classification', 'sigmoid']
    },
    {
      id: 'kmeans',
      title: 'K-Means Clustering',
      description: 'Watch clusters form as K-Means iteratively groups data points. Adjust K value and see convergence.',
      icon: <GitBranch className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      component: KMeansViz,
      category: 'Clustering',
      difficulty: 'Beginner',
      tags: ['unsupervised', 'clustering', 'iterative']
    },
    {
      id: 'pca',
      title: 'Principal Component Analysis',
      description: 'Dimensionality reduction showing principal components and variance explained in data.',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-500',
      component: PCAViz,
      category: 'Dimensionality Reduction',
      difficulty: 'Intermediate',
      tags: ['unsupervised', 'dimensionality', 'variance']
    },
    {
      id: 'decision-boundary',
      title: 'Decision Boundary',
      description: 'Compare Linear SVM, RBF, and Polynomial kernels for classification in 2D space.',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-indigo-500 to-blue-500',
      component: DecisionBoundaryViz,
      category: 'Classification',
      difficulty: 'Intermediate',
      tags: ['supervised', 'classification', 'svm']
    },
    {
      id: 'neural-network',
      title: 'Neural Network Forward Pass',
      description: 'Visualize data flowing through a multi-layer neural network with animated activations.',
      icon: <Layers className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      component: NeuralNetworkViz,
      category: 'Deep Learning',
      difficulty: 'Intermediate',
      tags: ['deep learning', 'neural network', 'forward propagation']
    },
    {
      id: 'activation-functions',
      title: 'Activation Functions',
      description: 'Compare Sigmoid, ReLU, Tanh, Leaky ReLU, ELU, and Swish with their derivatives.',
      icon: <Cpu className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-500',
      component: ActivationFunctionsViz,
      category: 'Deep Learning',
      difficulty: 'Beginner',
      tags: ['deep learning', 'neural network', 'activation']
    },
    {
      id: 'gradient-descent',
      title: 'Gradient Descent',
      description: 'Optimize cost function with adjustable learning rate. Watch convergence path in real-time.',
      icon: <Target className="w-6 h-6" />,
      color: 'from-orange-500 to-amber-500',
      component: GradientDescentViz,
      category: 'Optimization',
      difficulty: 'Intermediate',
      tags: ['optimization', 'gradient', 'learning rate']
    }
  ];

  const categories = ['All', ...new Set(visualizations.map(v => v.category))];

  const filteredVisualizations = visualizations.filter(viz => {
    const matchesSearch = viz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         viz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         viz.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || viz.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ActiveComponent = activeViz ? visualizations.find(v => v.id === activeViz)?.component : null;

  return (
    <>
      <Helmet>
        <title>ML/DL Visualizations | Interactive Learning</title>
        <meta 
          name="description" 
          content="Interactive visualizations of machine learning and deep learning algorithms. Learn by doing with real-time, hands-on visualizations." 
        />
      </Helmet>

      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-slate-50 text-gray-900'}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium">
              Interactive Learning
            </div>
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ML/DL <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">Visualizations</span>
            </h1>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Explore machine learning and deep learning concepts through interactive visualizations. 
              No backend required - everything runs in your browser!
            </p>
          </div>

          {/* Search and Filter - Only show when not viewing a specific visualization */}
          {!activeViz && (
            <div className="max-w-7xl mx-auto mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    placeholder="Search visualizations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer`}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing {filteredVisualizations.length} of {visualizations.length} visualizations
              </div>
            </div>
          )}

          {/* Visualization Grid or Active Component */}
          {!activeViz ? (
            <>
              {filteredVisualizations.length === 0 ? (
                <div className="text-center py-12">
                  <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    No visualizations found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {filteredVisualizations.map((viz) => (
                    <div
                      key={viz.id}
                      onClick={() => setActiveViz(viz.id)}
                      className={`cursor-pointer group relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
                        darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                      } shadow-sm hover:shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                      <div className="mb-4">
                        <div className={`inline-block p-3 rounded-lg bg-gradient-to-r ${viz.color} text-white mb-3`}>
                          {viz.icon}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {viz.category}
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            viz.difficulty === 'Beginner' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}>
                            {viz.difficulty}
                          </span>
                        </div>
                      </div>
                      <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {viz.title}
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {viz.description}
                      </p>
                      <div className="mt-4 flex items-center text-sm font-medium text-blue-500">
                        Try it out <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="max-w-7xl mx-auto">
              <button
                onClick={() => setActiveViz(null)}
                className={`mb-6 px-4 py-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-white hover:bg-gray-50 text-gray-900'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                ← Back to Visualizations
              </button>
              {ActiveComponent && <ActiveComponent darkMode={darkMode} />}
            </div>
          )}
        </main>

        <BackToTopButton />
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
};

export default Visualizations;
