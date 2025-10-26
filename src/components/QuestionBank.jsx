import React, { useState, useEffect } from 'react';
import { Code2, Database, Brain, Cpu, BarChart3, GitBranch, ArrowLeft, RotateCcw } from 'lucide-react';
import Navbar from './Navbar';
import '../App.css';

const QuestionBank = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, attempted: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  const topics = [
    { 
      id: 'python', 
      name: 'Python Basics', 
      icon: Code2, 
      color: 'from-blue-500 to-cyan-500',
      bgLight: 'bg-blue-50',
      bgDark: 'bg-blue-900/20',
      borderLight: 'border-blue-200',
      borderDark: 'border-blue-500/30',
      iconColor: 'text-blue-600'
    },
    { 
      id: 'sql', 
      name: 'SQL', 
      icon: Database, 
      color: 'from-purple-500 to-pink-500',
      bgLight: 'bg-purple-50',
      bgDark: 'bg-purple-900/20',
      borderLight: 'border-purple-200',
      borderDark: 'border-purple-500/30',
      iconColor: 'text-purple-600'
    },
    { 
      id: 'ml', 
      name: 'Machine Learning', 
      icon: Brain, 
      color: 'from-green-500 to-teal-500',
      bgLight: 'bg-green-50',
      bgDark: 'bg-green-900/20',
      borderLight: 'border-green-200',
      borderDark: 'border-green-500/30',
      iconColor: 'text-green-600'
    },
    { 
      id: 'dl', 
      name: 'Deep Learning', 
      icon: Cpu, 
      color: 'from-indigo-500 to-blue-500',
      bgLight: 'bg-indigo-50',
      bgDark: 'bg-indigo-900/20',
      borderLight: 'border-indigo-200',
      borderDark: 'border-indigo-500/30',
      iconColor: 'text-indigo-600'
    },
    { 
      id: 'statistics', 
      name: 'Statistics', 
      icon: BarChart3, 
      color: 'from-orange-500 to-red-500',
      bgLight: 'bg-orange-50',
      bgDark: 'bg-orange-900/20',
      borderLight: 'border-orange-200',
      borderDark: 'border-orange-500/30',
      iconColor: 'text-orange-600'
    },
    { 
      id: 'algorithms', 
      name: 'Algorithms', 
      icon: GitBranch, 
      color: 'from-yellow-500 to-orange-500',
      bgLight: 'bg-yellow-50',
      bgDark: 'bg-yellow-900/20',
      borderLight: 'border-yellow-200',
      borderDark: 'border-yellow-500/30',
      iconColor: 'text-yellow-600'
    }
  ];

  useEffect(() => {
    if (selectedTopic) {
      loadQuestions(selectedTopic);
    }
  }, [selectedTopic]);

  const loadQuestions = async (topicId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/data/questions/${topicId}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load questions for ${topicId}`);
      }
      const data = await response.json();
      if (!data.questions || data.questions.length === 0) {
        throw new Error('No questions available for this topic');
      }
      setQuestions(data.questions);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore({ correct: 0, attempted: 0 });
    } catch (error) {
      console.error('Error loading questions:', error);
      setError(error.message);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
      const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
      if (isCorrect) {
        setScore(prev => ({ correct: prev.correct + 1, attempted: prev.attempted + 1 }));
      } else {
        setScore(prev => ({ ...prev, attempted: prev.attempted + 1 }));
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore({ correct: 0, attempted: 0 });
  };

  // Use questions directly since we don't have filtering
  const currentQuestions = questions;

  if (!selectedTopic) {
    return (
      <>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className={`text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Question Bank 📚
              </h1>
              <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Test your knowledge across various topics
              </p>
              <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Select a topic to start practicing
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topics.map(topic => {
                const Icon = topic.icon;
                return (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`
                      ${darkMode ? `${topic.bgDark} border ${topic.borderDark}` : `${topic.bgLight} border ${topic.borderLight}`}
                      rounded-2xl p-8 cursor-pointer hover:scale-105 transition-all duration-300 
                      shadow-lg hover:shadow-2xl group
                    `}
                  >
                    <div className={`
                      w-16 h-16 mb-6 rounded-xl flex items-center justify-center
                      bg-gradient-to-br ${topic.color}
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {topic.name}
                    </h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Click to start practicing
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-500 mx-auto mb-4"></div>
            <p className={`text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>Loading questions...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center px-4`}>
          <div className={`
            ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
            rounded-2xl p-8 max-w-md text-center border shadow-lg
          `}>
            <div className="text-6xl mb-4">😞</div>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Oops!</h2>
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{error}</p>
            <button
              onClick={() => setSelectedTopic(null)}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center gap-2 mx-auto"
            >
              <ArrowLeft size={20} />
              Back to Topics
            </button>
          </div>
        </div>
      </>
    );
  }

  if (questions.length === 0) {
    return (
      <>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
          <p className={`text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>No questions available</p>
        </div>
      </>
    );
  }

  const question = currentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedTopic(null)}
            className={`
              mb-6 px-6 py-3 rounded-lg transition-all font-medium flex items-center gap-2
              ${darkMode 
                ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
              }
            `}
          >
            <ArrowLeft size={20} />
            Back to Topics
          </button>

          <div className={`
            ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
            rounded-2xl shadow-xl p-8 border transition-colors duration-300
          `}>
            {/* Header */}
            <div className={`
              flex justify-between items-center mb-6 pb-4 
              ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b
            `}>
              <div className="flex items-center gap-4">
                <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Question <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{currentQuestion + 1}</span> of{' '}
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{currentQuestions.length}</span>
                </div>
              </div>
              <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Score: <span className="font-bold text-emerald-500">{score.correct}</span>/
                <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{score.attempted}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Difficulty Badge */}
            <div className="mb-6">
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  question.difficulty === 'easy'
                    ? darkMode 
                      ? 'bg-green-900/30 text-green-400 border border-green-500/50'
                      : 'bg-green-100 text-green-700 border border-green-300'
                    : question.difficulty === 'medium'
                    ? darkMode
                      ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/50'
                      : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                    : darkMode
                      ? 'bg-red-900/30 text-red-400 border border-red-500/50'
                      : 'bg-red-100 text-red-700 border border-red-300'
                }`}
              >
                {question.difficulty.toUpperCase()}
              </span>
            </div>

            {/* Question */}
            <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    showResult
                      ? index === question.correctAnswer
                        ? darkMode
                          ? 'border-green-500 bg-green-900/20 text-white'
                          : 'border-green-500 bg-green-50 text-gray-900'
                        : index === selectedAnswer
                        ? darkMode
                          ? 'border-red-500 bg-red-900/20 text-white'
                          : 'border-red-500 bg-red-50 text-gray-900'
                        : darkMode
                          ? 'border-gray-700 bg-gray-700/30 text-gray-300'
                          : 'border-gray-200 bg-gray-50 text-gray-700'
                      : selectedAnswer === index
                      ? darkMode
                        ? 'border-emerald-500 bg-emerald-900/20 text-white'
                        : 'border-emerald-500 bg-emerald-50 text-gray-900'
                      : darkMode
                        ? 'border-gray-700 bg-gray-700/30 text-gray-300 hover:border-emerald-400 hover:bg-gray-700/50'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-emerald-400 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="font-bold mr-4 text-lg">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="text-lg">{option}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Explanation */}
            {showResult && (
              <div
                className={`p-6 rounded-xl mb-8 border-2 ${
                  selectedAnswer === question.correctAnswer
                    ? darkMode
                      ? 'bg-green-900/20 border-green-500/50 text-green-100'
                      : 'bg-green-50 border-green-300 text-green-900'
                    : darkMode
                      ? 'bg-red-900/20 border-red-500/50 text-red-100'
                      : 'bg-red-50 border-red-300 text-red-900'
                }`}
              >
                <p className="font-bold text-xl mb-3">
                  {selectedAnswer === question.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
                </p>
                <p className="text-lg">{question.explanation}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center flex-wrap gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`
                  px-6 py-3 rounded-lg transition-all font-medium flex items-center gap-2
                  ${darkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400'
                  }
                  disabled:cursor-not-allowed
                `}
              >
                ← Previous
              </button>

              <button
                onClick={handleReset}
                className={`
                  px-6 py-3 rounded-lg transition-all font-medium flex items-center gap-2
                  ${darkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                `}
              >
                <RotateCcw size={18} />
                Reset
              </button>

              {!showResult ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={currentQuestion === currentQuestions.length - 1}
                  className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                >
                  Next Question →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionBank;