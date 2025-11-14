import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Brain, TrendingUp, Layers, GitBranch, Sparkles, Target } from 'lucide-react';
import Navbar from './Navbar';
import useDarkMode from './useDarkMode';
import BackToTopButton from './BackToTopButton';
import Footer from './Footer';
import LinearRegressionViz from './visualizations/LinearRegressionViz';
import KMeansViz from './visualizations/KMeansViz';
import NeuralNetworkViz from './visualizations/NeuralNetworkViz';
import GradientDescentViz from './visualizations/GradientDescentViz';
import DecisionBoundaryViz from './visualizations/DecisionBoundaryViz';

const Visualizations = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [activeViz, setActiveViz] = useState(null);

  const visualizations = [
    {
      id: 'linear-regression',
      title: 'Linear Regression',
      description: 'Visualize how a line fits to data points. Adjust slope and intercept to see real-time changes.',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      component: LinearRegressionViz,
      category: 'Regression'
    },
    {
      id: 'kmeans',
      title: 'K-Means Clustering',
      description: 'See how K-Means algorithm groups data points into clusters. Add points and watch clusters form.',
      icon: <GitBranch className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      component: KMeansViz,
      category: 'Clustering'
    },
    {
      id: 'neural-network',
      title: 'Neural Network',
      description: 'Explore how neural networks process data through layers. Visualize forward propagation.',
      icon: <Layers className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      component: NeuralNetworkViz,
      category: 'Deep Learning'
    },
    {
      id: 'gradient-descent',
      title: 'Gradient Descent',
      description: 'Watch gradient descent optimize a function. See how learning rate affects convergence.',
      icon: <Target className="w-6 h-6" />,
      color: 'from-orange-500 to-amber-500',
      component: GradientDescentViz,
      category: 'Optimization'
    },
    {
      id: 'decision-boundary',
      title: 'Decision Boundary',
      description: 'Visualize how different classifiers separate classes in 2D space.',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-indigo-500 to-blue-500',
      component: DecisionBoundaryViz,
      category: 'Classification'
    }
  ];

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

          {/* Visualization Grid or Active Component */}
          {!activeViz ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {visualizations.map((viz) => (
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
                    <div className={`text-xs font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {viz.category}
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
