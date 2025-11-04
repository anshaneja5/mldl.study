import React, { useState, useEffect } from 'react';
import { Code2, Database, Brain, Cpu, BarChart3, GitBranch, ArrowLeft, RotateCcw, Sparkles, Bookmark, FilePlus, Clock, CheckCircle, XCircle, Target } from 'lucide-react';
import Navbar from './Navbar';
import '../App.css';
import { motion } from 'framer-motion';
import useDarkMode from './useDarkMode';
import BackToTopButton from './BackToTopButton';
import Footer from './Footer';

const QuestionBank = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, attempted: 0 });
  const [loading, setLoading] = useState(false);
  const [showTestSummary, setShowTestSummary] = useState(false);
  const [error, setError] = useState(null);
  const [isCreatingTest, setIsCreatingTest] = useState(false);
  const [selectedTestTopics, setSelectedTestTopics] = useState([]);
  const [numQuestions, setNumQuestions] = useState(10);
  const [timeLimit, setTimeLimit] = useState(15);
  const [isTestMode, setIsTestMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedQuestions');
    return savedBookmarks ? JSON.parse(savedBookmarks) : {};
  });


  useEffect(() => {
    localStorage.setItem('bookmarkedQuestions', JSON.stringify(bookmarks));
  }, [bookmarks]);

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
      iconColor: 'text-purple-600 dark:text-purple-400'
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
      iconColor: 'text-green-600 dark:text-green-400'
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
      iconColor: 'text-indigo-600 dark:text-indigo-400'
    },
    { 
      id: 'genai', 
      name: 'Generative AI', 
      icon: Sparkles, 
      color: 'from-blue-500 to-cyan-500',
      bgLight: 'bg-blue-50',
      bgDark: 'bg-blue-900/20',
      borderLight: 'border-blue-200',
      borderDark: 'border-blue-500/30',
      iconColor: 'text-blue-600'
    },
    { 
      id: 'rag', 
      name: 'RAG', 
      icon: Sparkles, 
      color: 'from-teal-500 to-cyan-500',
      bgLight: 'bg-teal-50',
      bgDark: 'bg-teal-900/20',
      borderLight: 'border-teal-200',
      borderDark: 'border-teal-500/30',
      iconColor: 'text-teal-600 dark:text-teal-400'
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
      iconColor: 'text-orange-600 dark:text-orange-400'
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
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      id: 'bookmarks',
      name: 'Bookmarked Questions',
      icon: Bookmark,
      color: 'from-pink-500 to-rose-500',
      bgLight: 'bg-pink-50',
      bgDark: 'bg-pink-900/20',
      borderLight: 'border-pink-200',
      borderDark: 'border-pink-500/30',
      iconColor: 'text-pink-600 dark:text-pink-400'
    }
  ];

  useEffect(() => {
    if (selectedTopic) {
      loadQuestions(selectedTopic);
    }
  }, [selectedTopic]);

  useEffect(() => {
    if (isTestMode && timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      setTimerId(timer);
      return () => clearInterval(timer);
    } else if (isTestMode && timeLeft === 0) {
      // Time is up, show summary
      setShowTestSummary(true);
      // Ensure the last question is submitted if an answer was selected
      if (selectedAnswer !== null && !showResult) handleSubmit(true);
    }
  }, [isTestMode, timeLeft]);

  const loadQuestions = async (topicId) => {
    setLoading(true);
    setError(null);
    try {
      if (topicId === 'bookmarks') {
        const allBookmarkedQuestions = [];
        const bookmarkedTopics = Object.keys(bookmarks);

        if (bookmarkedTopics.length === 0 || bookmarkedTopics.every(topic => bookmarks[topic].length === 0)) {
          throw new Error('You have no bookmarked questions yet.');
        }

        for (const topic of bookmarkedTopics) {
          if (bookmarks[topic].length > 0) {
            const basePath = import.meta.env.VITE_APP_QUESTIONS_BASE_PATH || '/data/questions';
            const response = await fetch(`${basePath}/${topic}.json`);
            if (response.ok) {
              const data = await response.json();
              const topicQuestions = data.questions
                .filter(q => bookmarks[topic].includes(q.id))
                .map(q => ({ ...q, topicId: topic })); // Add topicId for context
              allBookmarkedQuestions.push(...topicQuestions);
            }
          }
        }
        setQuestions(allBookmarkedQuestions);
      } else {
        const basePath = import.meta.env.VITE_APP_QUESTIONS_BASE_PATH || '/data/questions';
        const response = await fetch(`${basePath}/${topicId}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load questions for ${topicId}`);
        }
        const data = await response.json();
        if (!data.questions || data.questions.length === 0) {
          throw new Error('No questions available for this topic');
        }
        setQuestions(data.questions);
      }
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

  const loadTestQuestions = async () => {
    setShowTestSummary(false);
    if (selectedTestTopics.length === 0) {
      setError("Please select at least one topic.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const basePath = import.meta.env.VITE_APP_QUESTIONS_BASE_PATH || '/data/questions';
      let finalQuestions = [];
      const questionsPerTopic = Math.floor(numQuestions / selectedTestTopics.length);
      let remainder = numQuestions % selectedTestTopics.length;

      const fetchTopicQuestions = async (topicId) => {
        const response = await fetch(`${basePath}/${topicId}.json`);
        if (response.ok) {
          const data = await response.json();
          return (data.questions || []).map(q => ({ ...q, topicId }));
        }
        return [];
      };

      for (const topicId of selectedTestTopics) {
        let topicQuestions = [];
        let numToFetch = questionsPerTopic + (remainder > 0 ? 1 : 0);
        if (remainder > 0) remainder--;

        if (topicId === 'bookmarks') {
          const allBookmarkedQuestions = [];
          const bookmarkedTopicIds = Object.keys(bookmarks);
          for (const bookmarkedTopicId of bookmarkedTopicIds) {
            if (bookmarks[bookmarkedTopicId].length > 0) {
              const allTopicQs = await fetchTopicQuestions(bookmarkedTopicId);
              const bookmarkedQs = allTopicQs.filter(q => bookmarks[bookmarkedTopicId].includes(q.id));
              allBookmarkedQuestions.push(...bookmarkedQs);
            }
          }
          // Deduplicate and shuffle bookmarks before slicing
          const uniqueBookmarks = [...new Map(allBookmarkedQuestions.map(q => [q.id, q])).values()];
          topicQuestions = uniqueBookmarks.sort(() => 0.5 - Math.random()).slice(0, numToFetch);
        } else {
          const allTopicQs = await fetchTopicQuestions(topicId);
          topicQuestions = allTopicQs.sort(() => 0.5 - Math.random()).slice(0, numToFetch);
        }
        finalQuestions.push(...topicQuestions);
      }

      if (finalQuestions.length === 0) {
        throw new Error('No questions available for the selected topics.');
      }

      // Final shuffle of all collected questions
      const shuffled = finalQuestions.sort(() => 0.5 - Math.random());
      
      setQuestions(shuffled);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore({ correct: 0, attempted: 0 });
      setIsCreatingTest(false);
      setIsTestMode(true);
      setTimeLeft(timeLimit * 60);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmit = (isTimeUp = false) => {
    if (
      selectedAnswer !== null &&
      currentQuestion >= 0 &&
      currentQuestion < questions.length &&
      questions[currentQuestion] && !showResult
    ) {
      setShowResult(true);
      const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
      if (isCorrect) {
        setScore(prev => ({ correct: prev.correct + 1, attempted: prev.attempted + 1 }));
      } else {
        setScore(prev => ({ ...prev, attempted: prev.attempted + 1 }));
      }
      if (isTestMode && currentQuestion === questions.length - 1 && !isTimeUp) {
        setShowTestSummary(true);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else if (isTestMode && currentQuestion === questions.length - 1) {
      // Last question, show summary
      setShowTestSummary(true);
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
    if (isTestMode) {
      setTimeLeft(timeLimit * 60);
      setShowTestSummary(false);
      loadTestQuestions();
    }
  };

  const toggleBookmark = (topicId, questionId) => {
    setBookmarks(prev => {
      const newBookmarks = { ...prev };
      const topicBookmarks = newBookmarks[topicId] || [];
      
      if (topicBookmarks.includes(questionId)) {
        // Remove bookmark
        newBookmarks[topicId] = topicBookmarks.filter(id => id !== questionId);
        if (newBookmarks[topicId].length === 0) {
          delete newBookmarks[topicId];
        }
      } else {
        // Add bookmark
        newBookmarks[topicId] = [...topicBookmarks, questionId];
      }
      
      return newBookmarks;
    });
  };

  const handleTopicToggle = (topicId) => {
    setSelectedTestTopics(prev => prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]);
  };

  if (!selectedTopic && !isCreatingTest && !isTestMode) {
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

            <div className="text-center mb-12">
              <button
                onClick={() => setIsCreatingTest(true)}
                className={`
                  px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl
                  ${darkMode ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-emerald-500 text-white hover:bg-emerald-600'}
                `}
              >
                <FilePlus className="inline-block mr-2" /> Create a Custom Test
              </button>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } }
              }}
              initial="hidden"
              animate="visible"
            >
              {topics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <motion.div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`
                      ${darkMode ? `${topic.bgDark} border ${topic.borderDark}` : `${topic.bgLight} border ${topic.borderLight}`}
                      rounded-2xl p-8 cursor-pointer hover:scale-105 transition-all duration-300
                      ${topic.id === 'bookmarks' 
                        ? `relative overflow-hidden ${darkMode ? 'shadow-pink-500/20' : 'shadow-pink-200'}` 
                        : ''
                      }
                      shadow-lg hover:shadow-2xl group
                    `}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <div className={`
                      w-16 h-16 mb-6 rounded-xl flex items-center justify-center
                      bg-gradient-to-br ${topic.color}
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      <Icon size={32} className="text-white" />
                      {topic.id === 'bookmarks' && (
                        <div className={`absolute inset-0 rounded-xl ${
                          darkMode ? 'bg-pink-400/30' : 'bg-pink-300/30'
                        } animate-pulse`}></div>
                      )}
                    </div>
                    <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {topic.name}
                    </h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Click to start practicing
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        <BackToTopButton />
        <Footer darkMode={darkMode} />
      </>
    );
  }

  if (isCreatingTest) {
    return (
      <>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 transition-colors duration-300`}>
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setIsCreatingTest(false)}
              className={`mb-6 px-6 py-3 rounded-lg transition-all font-medium flex items-center gap-2 ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'}`}
            >
              <ArrowLeft size={20} /> Back to Topics
            </button>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
              <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Create Your Custom Test</h2>
              
              <div className="mb-8">
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>1. Select Topics</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {topics.map(topic => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicToggle(topic.id)}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        selectedTestTopics.includes(topic.id)
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200'
                          : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-500'
                      }`}
                    >
                      <topic.icon className={`mx-auto mb-2 ${selectedTestTopics.includes(topic.id) ? 'text-emerald-600 dark:text-emerald-400' : topic.iconColor}`} size={24} />
                      <span className={`${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{topic.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8 grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>2. Number of Questions</h3>
                  <input
                    type="number"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Math.max(1, parseInt(e.target.value, 10)))}
                    className={`w-full p-3 rounded-lg border-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
                    min="1"
                    max="50"
                  />
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>3. Time Limit (minutes)</h3>
                  <input
                    type="number"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Math.max(1, parseInt(e.target.value, 10)))}
                    className={`w-full p-3 rounded-lg border-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
                    min="1"
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-center mb-4">{error}</p>}

              <button
                onClick={loadTestQuestions}
                disabled={selectedTestTopics.length === 0 || loading}
                className="w-full px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-lg"
              >
                {loading ? 'Generating Test...' : 'Start Test'}
              </button>
            </div>
          </div>
        </div>
        <Footer darkMode={darkMode} />
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
              onClick={() => { setSelectedTopic(null); setIsCreatingTest(false); setError(null); }}
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

  if (showTestSummary) {
    const accuracy = score.attempted > 0 ? (score.correct / score.attempted) * 100 : 0;
    return (
      <>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 transition-colors duration-300`}>
          <div className="max-w-2xl mx-auto">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 text-center`}>
              <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Test Completed!</h2>
              <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Here's your performance summary.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-6 rounded-xl`}>
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="text-green-500" size={28} />
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Correct</h3>
                  </div>
                  <p className={`text-4xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{score.correct}</p>
                </div>
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-6 rounded-xl`}>
                  <div className="flex items-center justify-center gap-3">
                    <XCircle className="text-red-500" size={28} />
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Incorrect</h3>
                  </div>
                  <p className={`text-4xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{score.attempted - score.correct}</p>
                </div>
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-6 rounded-xl`}>
                  <div className="flex items-center justify-center gap-3">
                    <Target className="text-blue-500" size={28} />
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Accuracy</h3>
                  </div>
                  <p className={`text-4xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{accuracy.toFixed(1)}%</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => {
                    setIsCreatingTest(false);
                    setSelectedTopic(null);
                    setIsTestMode(false);
                    setShowTestSummary(false);
                    clearInterval(timerId);
                  }}
                  className={`
                    px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2
                    ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
                  `}
                >
                  <ArrowLeft size={20} /> Back to Topics
                </button>
                <button
                  onClick={handleReset}
                  className={`
                    px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2
                    ${darkMode ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-emerald-500 text-white hover:bg-emerald-600'}
                  `}
                >
                  <RotateCcw size={20} /> Retake Test
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer darkMode={darkMode} />
      </>
    );
  }

  if (!loading && questions.length === 0 && !isCreatingTest) {
    return (
      <>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
          <p className={`text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>No questions available</p>
        </div>
      </>
    );
  }

  const question = questions[currentQuestion];
  const isBookmarked = question && bookmarks[question.topicId || selectedTopic]?.includes(question.id);
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => { setSelectedTopic(null); setIsTestMode(false); clearInterval(timerId); setShowTestSummary(false); }}
            className={`mb-6 px-6 py-3 rounded-lg transition-all font-medium flex items-center gap-2 ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'}`}
          >
            <ArrowLeft size={20} /> Back to Topics
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
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{questions.length}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleBookmark(question.topicId || selectedTopic, question.id)}
                  className={`p-2 rounded-full transition-colors ${
                    isBookmarked
                      ? 'text-yellow-400 bg-yellow-500/20'
                      : darkMode
                      ? 'text-gray-400 hover:bg-gray-700'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                >
                  <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
                </button>
                {isTestMode && timeLeft !== null ? (
                  <div className={`flex items-center gap-2 font-semibold ${timeLeft < 60 ? 'text-red-500' : (darkMode ? 'text-gray-300' : 'text-gray-600')}`}>
                    <Clock size={20} />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                ) : (
                  <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Score: <span className="font-bold text-emerald-500">{score.correct}</span>/
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{score.attempted}</span>
                  </div>
                )}
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
                className={`hidden sm:flex
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
                  disabled={selectedAnswer === null || (isTestMode && timeLeft !== null && timeLeft === 0)}
                  className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={(isTestMode && timeLeft !== null && timeLeft === 0)}
                  className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                >
                  {currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next Question →'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <BackToTopButton />
      <Footer darkMode={darkMode} />
    </>
  );
};


export default QuestionBank;
