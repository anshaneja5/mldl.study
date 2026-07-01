import React, { useState, useEffect } from 'react';
import { Code2, Database, Brain, Cpu, BarChart3, GitBranch, ArrowLeft, RotateCcw, Sparkles, Bookmark, FilePlus, Clock, CheckCircle, XCircle, Target } from 'lucide-react';
import Navbar from './Navbar';
import '../App.css';
import { motion } from 'framer-motion';
import useDarkMode from './useDarkMode';
import BackToTopButton from './BackToTopButton';
import Footer from './Footer';
import BrutalBackground from './BrutalBackground';

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
      color: 'bg-acid text-[#0a0a0a]',
    },
    {
      id: 'sql',
      name: 'SQL',
      icon: Database,
      color: 'bg-electric text-white',
    },
    {
      id: 'ml',
      name: 'Machine Learning',
      icon: Brain,
      color: 'bg-hot-pink text-white',
    },
    {
      id: 'dl',
      name: 'Deep Learning',
      icon: Cpu,
      color: 'bg-cyber-yellow text-[#0a0a0a]',
    },
    {
      id: 'genai',
      name: 'Generative AI',
      icon: Sparkles,
      color: 'bg-acid text-[#0a0a0a]',
    },
    {
      id: 'rag',
      name: 'RAG',
      icon: Sparkles,
      color: 'bg-electric text-white',
    },
    {
      id: 'statistics',
      name: 'Statistics',
      icon: BarChart3,
      color: 'bg-hot-pink text-white',
    },
    {
      id: 'algorithms',
      name: 'Algorithms',
      icon: GitBranch,
      color: 'bg-cyber-yellow text-[#0a0a0a]',
    },
    {
      id: 'bookmarks',
      name: 'Bookmarked Questions',
      icon: Bookmark,
      color: 'bg-acid text-[#0a0a0a]',
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
        <BrutalBackground />
        <div className="flex min-h-screen flex-col">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="mx-auto w-full max-w-7xl flex-grow px-4 pb-20 pt-10 sm:pt-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mx-auto mb-12 max-w-2xl text-center"
            >
              <span className="brut-chip mb-4 bg-pastel-blue">
                Practice & Quiz
              </span>
              <h1 className="font-display text-4xl uppercase tracking-tight text-ink sm:text-5xl">
                Question <span className="inline-block rotate-[-1deg] bg-electric px-2 text-white shadow-brut-sm">Bank</span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-soft">
                Test your knowledge across various topics.
              </p>
              <p className="mt-1 font-mono text-sm text-faint">
                Select a topic to start practicing
              </p>
            </motion.div>

            <div className="mb-12 text-center">
              <button
                onClick={() => setIsCreatingTest(true)}
                className="brut-btn px-6 py-3 text-[15px]"
              >
                <FilePlus className="h-[18px] w-[18px]" /> Create a Custom Test
              </button>
            </div>

            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
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
                    className={`brut-card brut-hover group relative cursor-pointer p-7 ${index % 2 === 0 ? 'rotate-[-0.6deg]' : 'rotate-[0.6deg]'}`}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <div className={`mb-5 grid h-14 w-14 place-items-center border-[3px] border-[#0a0a0a] shadow-brut-sm ${topic.color} transition-transform duration-150 group-hover:-rotate-6`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="font-display text-xl uppercase text-ink">
                      {topic.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-soft">
                      Click to start practicing
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </main>
          <Footer darkMode={darkMode} />
        </div>
        <BackToTopButton />
      </>
    );
  }

  if (isCreatingTest) {
    return (
      <>
        <BrutalBackground />
        <div className="flex min-h-screen flex-col">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="mx-auto w-full max-w-7xl flex-grow px-4 pb-20 pt-10 sm:pt-14">
            <div className="mx-auto max-w-4xl">
              <button
                onClick={() => setIsCreatingTest(false)}
                className="brut-btn brut-btn-surface mb-6 px-5 py-2.5 text-sm"
              >
                <ArrowLeft size={18} /> Back to Topics
              </button>
              <div className="brut-card p-8">
                <h2 className="font-display text-3xl uppercase text-ink">Create Your Custom Test</h2>

                <div className="mt-8 mb-8">
                  <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-wider text-soft">1. Select Topics</h3>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                    {topics.map(topic => {
                      const isSelected = selectedTestTopics.includes(topic.id);
                      return (
                        <button
                          key={topic.id}
                          onClick={() => handleTopicToggle(topic.id)}
                          className={`border-[3px] p-4 text-center transition-all duration-150 ${
                            isSelected
                              ? 'border-[#0a0a0a] bg-acid text-[#0a0a0a] shadow-brut-sm'
                              : 'border-ink bg-surface hover:bg-surface-soft'
                          }`}
                        >
                          <topic.icon className={`mx-auto mb-2 ${isSelected ? 'text-[#0a0a0a]' : 'text-soft'}`} size={24} />
                          <span className={`text-sm ${isSelected ? 'font-bold text-[#0a0a0a]' : 'text-soft'}`}>{topic.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-8 grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-wider text-soft">2. Number of Questions</h3>
                    <input
                      type="number"
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(Math.max(1, parseInt(e.target.value, 10)))}
                      className="w-full border-[3px] border-ink bg-surface px-4 py-2.5 font-mono text-ink outline-none placeholder:text-faint"
                      min="1"
                      max="50"
                    />
                  </div>
                  <div>
                    <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-wider text-soft">3. Time Limit (minutes)</h3>
                    <input
                      type="number"
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(Math.max(1, parseInt(e.target.value, 10)))}
                      className="w-full border-[3px] border-ink bg-surface px-4 py-2.5 font-mono text-ink outline-none placeholder:text-faint"
                      min="1"
                    />
                  </div>
                </div>

                {error && <p className="mb-4 text-center font-bold text-hot-pink">{error}</p>}

                <button
                  onClick={loadTestQuestions}
                  disabled={selectedTestTopics.length === 0 || loading}
                  className="brut-btn w-full px-6 py-3.5 text-[15px] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? 'Generating Test...' : 'Start Test'}
                </button>
              </div>
            </div>
          </main>
          <Footer darkMode={darkMode} />
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <BrutalBackground />
        <div className="flex min-h-screen flex-col">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="mx-auto flex w-full max-w-7xl flex-grow items-center justify-center px-4 pb-20 pt-10 sm:pt-14">
            <div className="text-center">
              <div className="mx-auto mb-4 h-14 w-14 animate-spin border-[3px] border-[#0a0a0a] bg-acid shadow-brut-sm"></div>
              <p className="font-mono text-xl font-bold uppercase tracking-wider text-ink">Loading questions...</p>
            </div>
          </main>
          <Footer darkMode={darkMode} />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <BrutalBackground />
        <div className="flex min-h-screen flex-col">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="mx-auto flex w-full max-w-7xl flex-grow items-center justify-center px-4 pb-20 pt-10 sm:pt-14">
            <div className="brut-card-lg max-w-md rotate-[-0.8deg] p-8 text-center">
              <div className="mb-4 text-6xl">😞</div>
              <h2 className="mb-4 font-display text-2xl uppercase text-ink">Oops!</h2>
              <p className="mb-6 text-soft">{error}</p>
              <button
                onClick={() => { setSelectedTopic(null); setIsCreatingTest(false); setError(null); }}
                className="brut-btn brut-btn-surface mx-auto px-5 py-2.5"
              >
                <ArrowLeft size={18} />
                Back to Topics
              </button>
            </div>
          </main>
          <Footer darkMode={darkMode} />
        </div>
      </>
    );
  }

  if (showTestSummary) {
    const accuracy = score.attempted > 0 ? (score.correct / score.attempted) * 100 : 0;
    return (
      <>
        <BrutalBackground />
        <div className="flex min-h-screen flex-col">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="mx-auto w-full max-w-7xl flex-grow px-4 pb-20 pt-10 sm:pt-14">
            <div className="mx-auto max-w-2xl">
              <div className="brut-card-lg p-8 text-center">
                <h2 className="font-display text-4xl uppercase text-ink">Test Completed!</h2>
                <p className="mt-3 mb-8 text-lg text-soft">Here's your performance summary.</p>

                <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div className="rotate-[-0.8deg] border-[3px] border-ink bg-pastel-mint p-6 shadow-brut-sm">
                    <div className="flex items-center justify-center gap-3">
                      <CheckCircle className="text-ink" size={28} />
                      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-soft">Correct</h3>
                    </div>
                    <p className="mt-2 font-mono text-4xl font-bold text-ink">{score.correct}</p>
                  </div>
                  <div className="rotate-[0.8deg] border-[3px] border-ink bg-pastel-pink p-6 shadow-brut-sm">
                    <div className="flex items-center justify-center gap-3">
                      <XCircle className="text-ink" size={28} />
                      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-soft">Incorrect</h3>
                    </div>
                    <p className="mt-2 font-mono text-4xl font-bold text-ink">{score.attempted - score.correct}</p>
                  </div>
                  <div className="rotate-[-0.8deg] border-[3px] border-ink bg-pastel-blue p-6 shadow-brut-sm">
                    <div className="flex items-center justify-center gap-3">
                      <Target className="text-ink" size={28} />
                      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-soft">Accuracy</h3>
                    </div>
                    <p className="mt-2 font-mono text-4xl font-bold text-ink">{accuracy.toFixed(1)}%</p>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <button
                    onClick={() => {
                      setIsCreatingTest(false);
                      setSelectedTopic(null);
                      setIsTestMode(false);
                      setShowTestSummary(false);
                      clearInterval(timerId);
                    }}
                    className="brut-btn brut-btn-surface px-6 py-3 text-[15px]"
                  >
                    <ArrowLeft size={18} /> Back to Topics
                  </button>
                  <button
                    onClick={handleReset}
                    className="brut-btn px-6 py-3 text-[15px]"
                  >
                    <RotateCcw size={18} /> Retake Test
                  </button>
                </div>
              </div>
            </div>
          </main>
          <Footer darkMode={darkMode} />
        </div>
      </>
    );
  }

  if (!loading && questions.length === 0 && !isCreatingTest) {
    return (
      <>
        <BrutalBackground />
        <div className="flex min-h-screen flex-col">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="mx-auto flex w-full max-w-7xl flex-grow items-center justify-center px-4 pb-20 pt-10 sm:pt-14">
            <p className="font-mono text-xl font-bold uppercase tracking-wider text-ink">No questions available</p>
          </main>
          <Footer darkMode={darkMode} />
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
      <BrutalBackground />
      <div className="flex min-h-screen flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="mx-auto w-full max-w-7xl flex-grow px-4 pb-20 pt-10 sm:pt-14">
          <button
            onClick={() => { setSelectedTopic(null); setIsTestMode(false); clearInterval(timerId); setShowTestSummary(false); }}
            className="brut-btn brut-btn-surface mb-6 px-5 py-2.5 text-sm"
          >
            <ArrowLeft size={18} /> Back to Topics
          </button>
          <div className="brut-card p-6 sm:p-8">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between border-b-2 border-ink pb-4">
              <div className="flex items-center gap-4">
                <div className="text-soft">
                  Question <span className="font-bold text-ink">{currentQuestion + 1}</span> of{' '}
                  <span className="font-bold text-ink">{questions.length}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleBookmark(question.topicId || selectedTopic, question.id)}
                  className={`grid h-9 w-9 place-items-center border-2 transition-all duration-150 ${
                    isBookmarked
                      ? 'border-[#0a0a0a] bg-cyber-yellow text-[#0a0a0a] shadow-brut-sm'
                      : 'border-ink bg-surface text-soft hover:text-ink'
                  }`}
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                >
                  <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                </button>
                {isTestMode && timeLeft !== null ? (
                  <div className={`flex items-center gap-2 font-mono font-bold ${timeLeft < 60 ? 'text-hot-pink' : 'text-soft'}`}>
                    <Clock size={18} />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                ) : (
                  <div className="text-soft">
                    Score: <span className="bg-acid px-1 font-bold text-[#0a0a0a]">{score.correct}</span>/
                    <span className="font-bold text-ink">{score.attempted}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="brut-progress">
                <div style={{ width: `${progress}%` }} data-full={progress >= 100} />
              </div>
            </div>

            {/* Difficulty Badge */}
            <div className="mb-6">
              <span
                className={`inline-block border-2 border-ink px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wide text-ink shadow-brut-sm ${
                  question.difficulty === 'easy'
                    ? 'bg-pastel-mint'
                    : question.difficulty === 'medium'
                    ? 'bg-pastel-yellow'
                    : 'bg-pastel-pink'
                }`}
              >
                {question.difficulty.toUpperCase()}
              </span>
            </div>

            {/* Question */}
            <h2 className="mb-8 font-display text-2xl text-ink sm:text-3xl">
              {question.question}
            </h2>

            {/* Options */}
            <div className="mb-8 space-y-3">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`cursor-pointer border-[3px] p-5 transition-all duration-150 ${
                    showResult
                      ? index === question.correctAnswer
                        ? 'border-[#0a0a0a] bg-acid text-[#0a0a0a] shadow-brut-sm'
                        : index === selectedAnswer
                        ? 'border-[#0a0a0a] bg-hot-pink text-white shadow-brut-sm'
                        : 'border-ink bg-surface text-soft opacity-60'
                      : selectedAnswer === index
                      ? 'border-[#0a0a0a] bg-electric text-white shadow-brut-sm'
                      : 'border-ink bg-surface text-soft hover:bg-surface-soft hover:text-ink'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-4 font-mono text-lg font-bold">
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
                className={`mb-8 border-[3px] border-ink p-6 text-ink shadow-brut-sm ${
                  selectedAnswer === question.correctAnswer
                    ? 'bg-pastel-mint'
                    : 'bg-pastel-pink'
                }`}
              >
                <p className="mb-3 font-display text-xl uppercase text-ink">
                  {selectedAnswer === question.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
                </p>
                <p className="text-lg text-soft">{question.explanation}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="brut-btn brut-btn-surface px-5 py-2.5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              <button
                onClick={handleReset}
                className="brut-btn brut-btn-surface hidden px-5 py-2.5 sm:inline-flex"
              >
                <RotateCcw size={18} />
                Reset
              </button>

              {!showResult ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null || (isTestMode && timeLeft !== null && timeLeft === 0)}
                  className="brut-btn px-6 py-3 text-[15px] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={(isTestMode && timeLeft !== null && timeLeft === 0)}
                  className="brut-btn px-6 py-3 text-[15px] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next Question →'}
                </button>
              )}
            </div>
          </div>
        </main>
        <Footer darkMode={darkMode} />
      </div>

      <BackToTopButton />
    </>
  );
};


export default QuestionBank;
