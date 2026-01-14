import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const GradientDescentViz = ({ darkMode }) => {
  const canvasRef = useRef(null);
  const [learningRate, setLearningRate] = useState(0.1);
  const [position, setPosition] = useState({ x: -2, y: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [history, setHistory] = useState([]);

  // Cost function: f(x) = x^2 (simple parabola)
  const costFunction = (x) => x * x;
  
  // Derivative: f'(x) = 2x
  const gradient = (x) => 2 * x;

  const runStep = () => {
    const currentX = position.x;
    const grad = gradient(currentX);
    const newX = currentX - learningRate * grad;
    const newY = costFunction(newX);
    
    setPosition({ x: newX, y: newY });
    setHistory(prev => [...prev, { x: newX, y: newY }]);
    setIteration(prev => prev + 1);
  };

  const resetVisualization = () => {
    setPosition({ x: -2, y: costFunction(-2) });
    setIsRunning(false);
    setIteration(0);
    setHistory([]);
  };

  useEffect(() => {
    setPosition({ x: -2, y: costFunction(-2) });
    setHistory([{ x: -2, y: costFunction(-2) }]);
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        runStep();
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isRunning, position, learningRate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = darkMode ? '#1f2937' : '#f9fafb';
    ctx.fillRect(0, 0, width, height);

    // Scale and offset for visualization
    const scaleX = width / 6; // -3 to 3
    const scaleY = height / 10; // 0 to 10
    const offsetX = width / 2;
    const offsetY = height - 20;

    // Transform from world to canvas coordinates
    const worldToCanvas = (x, y) => ({
      x: x * scaleX + offsetX,
      y: offsetY - y * scaleY
    });

    // Draw axes
    ctx.strokeStyle = darkMode ? '#6b7280' : '#9ca3af';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, offsetY);
    ctx.lineTo(width, offsetY);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    const yAxisPos = worldToCanvas(0, 0);
    ctx.moveTo(yAxisPos.x, 0);
    ctx.lineTo(yAxisPos.x, height);
    ctx.stroke();

    // Draw cost function curve
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let x = -3; x <= 3; x += 0.1) {
      const y = costFunction(x);
      const canvasPos = worldToCanvas(x, y);
      
      if (x === -3) {
        ctx.moveTo(canvasPos.x, canvasPos.y);
      } else {
        ctx.lineTo(canvasPos.x, canvasPos.y);
      }
    }
    ctx.stroke();

    // Draw history path
    if (history.length > 1) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      
      history.forEach((point, idx) => {
        const canvasPos = worldToCanvas(point.x, point.y);
        if (idx === 0) {
          ctx.moveTo(canvasPos.x, canvasPos.y);
        } else {
          ctx.lineTo(canvasPos.x, canvasPos.y);
        }
      });
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw history points
      history.forEach((point, idx) => {
        const canvasPos = worldToCanvas(point.x, point.y);
        ctx.fillStyle = idx === history.length - 1 ? '#ef4444' : '#10b981';
        ctx.beginPath();
        ctx.arc(canvasPos.x, canvasPos.y, idx === history.length - 1 ? 8 : 4, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Draw current position
    const currentPos = worldToCanvas(position.x, position.y);
    ctx.fillStyle = '#ef4444';
    ctx.strokeStyle = darkMode ? '#fff' : '#000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(currentPos.x, currentPos.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Draw gradient arrow
    const arrowLength = 50;
    const grad = gradient(position.x);
    const arrowEndX = currentPos.x - arrowLength * Math.sign(grad);
    
    ctx.strokeStyle = '#f59e0b';
    ctx.fillStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(currentPos.x, currentPos.y);
    ctx.lineTo(arrowEndX, currentPos.y);
    ctx.stroke();
    
    // Arrow head
    const headSize = 8;
    ctx.beginPath();
    ctx.moveTo(arrowEndX, currentPos.y);
    ctx.lineTo(arrowEndX + headSize * Math.sign(grad), currentPos.y - headSize);
    ctx.lineTo(arrowEndX + headSize * Math.sign(grad), currentPos.y + headSize);
    ctx.closePath();
    ctx.fill();

    // Draw labels
    ctx.fillStyle = darkMode ? '#9ca3af' : '#6b7280';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    
    // X-axis labels
    for (let x = -2; x <= 2; x += 1) {
      const pos = worldToCanvas(x, 0);
      ctx.fillText(x.toString(), pos.x, offsetY + 20);
    }
    
    // Title labels
    ctx.fillText('x', width - 20, offsetY - 10);
    ctx.fillText('f(x) = x²', yAxisPos.x + 40, 30);

  }, [position, history, darkMode]);

  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Gradient Descent Optimization
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Watch gradient descent find the minimum of f(x) = x². Adjust learning rate to see different convergence behaviors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas */}
        <div className="lg:col-span-2">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className={`w-full border-2 rounded-lg ${
              darkMode ? 'border-gray-600' : 'border-gray-300'
            }`}
          />
          <div className={`mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className="inline-flex items-center mr-4">
              <span className="w-8 h-0.5 bg-blue-500 mr-1"></span> Cost Function
            </span>
            <span className="inline-flex items-center mr-4">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span> Current Position
            </span>
            <span className="inline-flex items-center mr-4">
              <span className="w-8 h-0.5 bg-green-500 mr-1"></span> Path
            </span>
            <span className="inline-flex items-center">
              <span className="w-6 h-0.5 bg-orange-500 mr-1"></span> Gradient
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Learning Rate (α): {learningRate.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={learningRate}
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
              disabled={isRunning}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {learningRate < 0.1 ? 'Slow' : learningRate < 0.3 ? 'Moderate' : 'Fast'}
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Current State
            </h3>
            <div className="space-y-1 text-sm">
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                x: <strong className="font-mono">{position.x.toFixed(4)}</strong>
              </p>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                f(x): <strong className="font-mono">{position.y.toFixed(4)}</strong>
              </p>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Gradient: <strong className="font-mono">{gradient(position.x).toFixed(4)}</strong>
              </p>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Iterations: <strong>{iteration}</strong>
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Convergence
            </h3>
            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.max(0, Math.min(100, (1 - Math.abs(position.x) / 2) * 100))}%` }}
              ></div>
            </div>
            <p className={`text-xs mt-1 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Distance from optimum (x=0)
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-200 font-medium flex items-center justify-center"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </>
              )}
            </button>
            <button
              onClick={runStep}
              disabled={isRunning}
              className={`w-full px-4 py-2 rounded-lg transition-colors font-medium ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Step
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
            <strong>Gradient Descent:</strong> Updates position by moving in the opposite direction of the gradient, scaled by the learning rate: x_new = x - α × ∇f(x)
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientDescentViz;
