import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Download, Play, Pause } from 'lucide-react';

const LogisticRegressionViz = ({ darkMode }) => {
  const canvasRef = useRef(null);
  const [threshold, setThreshold] = useState(0.5);
  const [learningRate, setLearningRate] = useState(0.1);
  const [isTraining, setIsTraining] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [weights, setWeights] = useState({ w1: 0, w2: 0, b: 0 });
  const [classAPoints, setClassAPoints] = useState([]);
  const [classBPoints, setClassBPoints] = useState([]);
  const [activeClass, setActiveClass] = useState('A');
  const [showProbabilities, setShowProbabilities] = useState(true);
  const [colorScheme, setColorScheme] = useState('default');

  const sigmoid = (z) => 1 / (1 + Math.exp(-z));

  const generateInitialData = () => {
    const pointsA = [];
    const pointsB = [];
    
    // Generate class A points (negative class)
    for (let i = 0; i < 20; i++) {
      pointsA.push({
        x: Math.random() * 200 + 50,
        y: Math.random() * 200 + 50
      });
    }
    
    // Generate class B points (positive class)
    for (let i = 0; i < 20; i++) {
      pointsB.push({
        x: Math.random() * 200 + 300,
        y: Math.random() * 200 + 150
      });
    }
    
    setClassAPoints(pointsA);
    setClassBPoints(pointsB);
  };

  const predict = (x, y) => {
    const z = weights.w1 * (x / 100) + weights.w2 * (y / 100) + weights.b;
    return sigmoid(z);
  };

  const trainStep = () => {
    const allPoints = [
      ...classAPoints.map(p => ({ ...p, label: 0 })),
      ...classBPoints.map(p => ({ ...p, label: 1 }))
    ];

    let dw1 = 0, dw2 = 0, db = 0;
    const m = allPoints.length;

    allPoints.forEach(point => {
      const pred = predict(point.x, point.y);
      const error = pred - point.label;
      dw1 += error * (point.x / 100);
      dw2 += error * (point.y / 100);
      db += error;
    });

    setWeights({
      w1: weights.w1 - learningRate * (dw1 / m),
      w2: weights.w2 - learningRate * (dw2 / m),
      b: weights.b - learningRate * (db / m)
    });
    setIteration(prev => prev + 1);
  };

  const calculateAccuracy = () => {
    const allPoints = [
      ...classAPoints.map(p => ({ ...p, label: 0 })),
      ...classBPoints.map(p => ({ ...p, label: 1 }))
    ];

    let correct = 0;
    allPoints.forEach(point => {
      const pred = predict(point.x, point.y);
      const predictedClass = pred >= threshold ? 1 : 0;
      if (predictedClass === point.label) correct++;
    });

    return ((correct / allPoints.length) * 100).toFixed(1);
  };

  const handleCanvasClick = (e) => {
    if (isTraining) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newPoint = { x, y };
    
    if (activeClass === 'A') {
      setClassAPoints([...classAPoints, newPoint]);
    } else {
      setClassBPoints([...classBPoints, newPoint]);
    }
  };

  const resetVisualization = () => {
    generateInitialData();
    setWeights({ w1: 0, w2: 0, b: 0 });
    setIteration(0);
    setIsTraining(false);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'logistic-regression.png';
    link.href = url;
    link.click();
  };

  const colors = {
    default: { A: '#3b82f6', B: '#ef4444' },
    vibrant: { A: '#06b6d4', B: '#f59e0b' },
    pastel: { A: '#93c5fd', B: '#fca5a5' }
  };

  useEffect(() => {
    generateInitialData();
  }, []);

  useEffect(() => {
    let interval;
    if (isTraining) {
      interval = setInterval(() => {
        trainStep();
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTraining, weights, classAPoints, classBPoints]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = darkMode ? '#1f2937' : '#f9fafb';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = darkMode ? '#374151' : '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i <= height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Draw decision boundary and probability heatmap
    if (showProbabilities) {
      const gridSize = 10;
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const prob = predict(x, y);
          const alpha = Math.abs(prob - 0.5) * 0.4;
          ctx.fillStyle = prob >= 0.5 
            ? `rgba(239, 68, 68, ${alpha})`
            : `rgba(59, 130, 246, ${alpha})`;
          ctx.fillRect(x, y, gridSize, gridSize);
        }
      }
    }

    // Draw decision boundary line
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    
    // Find points where sigmoid = threshold
    const points = [];
    for (let x = 0; x <= width; x += 5) {
      // Solve for y where sigmoid(w1*x + w2*y + b) = threshold
      // w2*y = logit(threshold) - w1*x - b
      if (Math.abs(weights.w2) > 0.001) {
        const logitThreshold = Math.log(threshold / (1 - threshold));
        const y = (logitThreshold - weights.w1 * (x / 100) - weights.b) / weights.w2 * 100;
        if (y >= 0 && y <= height) {
          points.push({ x, y });
        }
      }
    }
    
    if (points.length > 0) {
      ctx.moveTo(points[0].x, points[0].y);
      points.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Draw class A points
    classAPoints.forEach(point => {
      const prob = predict(point.x, point.y);
      ctx.fillStyle = colors[colorScheme].A;
      ctx.strokeStyle = darkMode ? '#fff' : '#000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Draw probability label
      if (showProbabilities && iteration > 0) {
        ctx.fillStyle = darkMode ? '#fff' : '#000';
        ctx.font = '9px monospace';
        ctx.fillText(prob.toFixed(2), point.x + 10, point.y - 5);
      }
    });

    // Draw class B points
    classBPoints.forEach(point => {
      const prob = predict(point.x, point.y);
      ctx.fillStyle = colors[colorScheme].B;
      ctx.strokeStyle = darkMode ? '#fff' : '#000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y - 8);
      ctx.lineTo(point.x - 7, point.y + 5);
      ctx.lineTo(point.x + 7, point.y + 5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Draw probability label
      if (showProbabilities && iteration > 0) {
        ctx.fillStyle = darkMode ? '#fff' : '#000';
        ctx.font = '9px monospace';
        ctx.fillText(prob.toFixed(2), point.x + 10, point.y - 5);
      }
    });

  }, [classAPoints, classBPoints, weights, threshold, darkMode, showProbabilities, colorScheme, iteration]);

  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Logistic Regression with Sigmoid
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Binary classification using logistic regression. Train the model and watch the decision boundary form. Click to add points.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas */}
        <div className="lg:col-span-2">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            onClick={handleCanvasClick}
            className={`w-full border-2 rounded-lg cursor-crosshair ${
              darkMode ? 'border-gray-600' : 'border-gray-300'
            }`}
          />
          <div className={`mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className="inline-flex items-center mr-4">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span> Class A (0)
            </span>
            <span className="inline-flex items-center mr-4">
              <span className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-red-500 mr-1"></span> Class B (1)
            </span>
            <span className="inline-flex items-center">
              <span className="w-8 h-0.5 bg-purple-500 mr-1" style={{ borderTop: '2px dashed' }}></span> Decision Boundary
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Decision Threshold: {threshold.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Learning Rate: {learningRate.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={learningRate}
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
              disabled={isTraining}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Color Scheme
            </label>
            <select
              value={colorScheme}
              onChange={(e) => setColorScheme(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="default">Default</option>
              <option value="vibrant">Vibrant</option>
              <option value="pastel">Pastel</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showProbs"
              checked={showProbabilities}
              onChange={(e) => setShowProbabilities(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showProbs" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Show Probabilities
            </label>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Add Points for Class
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveClass('A')}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  activeClass === 'A'
                    ? 'bg-blue-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Class A ●
              </button>
              <button
                onClick={() => setActiveClass('B')}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  activeClass === 'B'
                    ? 'bg-red-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Class B ▲
              </button>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Model Statistics
            </h3>
            <div className="space-y-1 text-sm">
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Iterations: <strong>{iteration}</strong>
              </p>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Accuracy: <strong>{calculateAccuracy()}%</strong>
              </p>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Total Points: <strong>{classAPoints.length + classBPoints.length}</strong>
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setIsTraining(!isTraining)}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-200 font-medium flex items-center justify-center"
            >
              {isTraining ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause Training
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Training
                </>
              )}
            </button>
            <button
              onClick={downloadImage}
              className={`w-full px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Image
            </button>
            <button
              onClick={resetVisualization}
              className={`w-full px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>

          <div className={`p-3 rounded-lg text-xs ${darkMode ? 'bg-blue-900/30 text-blue-200' : 'bg-blue-50 text-blue-800'}`}>
            <strong>Logistic Regression:</strong> Uses the sigmoid function σ(z) = 1/(1+e^-z) to predict probabilities for binary classification. The model learns weights to separate the two classes.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticRegressionViz;
