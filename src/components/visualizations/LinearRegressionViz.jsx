import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

const LinearRegressionViz = ({ darkMode }) => {
  const canvasRef = useRef(null);
  const [slope, setSlope] = useState(1);
  const [intercept, setIntercept] = useState(50);
  const [dataPoints, setDataPoints] = useState([
    { x: 50, y: 100 },
    { x: 100, y: 150 },
    { x: 150, y: 180 },
    { x: 200, y: 220 },
    { x: 250, y: 270 },
    { x: 300, y: 310 },
    { x: 350, y: 350 }
  ]);

  const calculateMSE = () => {
    let sumSquaredError = 0;
    dataPoints.forEach(point => {
      const predicted = slope * point.x + intercept;
      const error = point.y - predicted;
      sumSquaredError += error * error;
    });
    return (sumSquaredError / dataPoints.length).toFixed(2);
  };

  const fitLine = () => {
    // Calculate best fit using least squares
    const n = dataPoints.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    
    dataPoints.forEach(point => {
      sumX += point.x;
      sumY += point.y;
      sumXY += point.x * point.y;
      sumX2 += point.x * point.x;
    });

    const newSlope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const newIntercept = (sumY - newSlope * sumX) / n;
    
    setSlope(Number(newSlope.toFixed(3)));
    setIntercept(Number(newIntercept.toFixed(2)));
  };

  const resetVisualization = () => {
    setSlope(1);
    setIntercept(50);
    setDataPoints([
      { x: 50, y: 100 },
      { x: 100, y: 150 },
      { x: 150, y: 180 },
      { x: 200, y: 220 },
      { x: 250, y: 270 },
      { x: 300, y: 310 },
      { x: 350, y: 350 }
    ]);
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setDataPoints([...dataPoints, { x, y }]);
  };

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

    // Draw regression line
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, intercept);
    ctx.lineTo(width, slope * width + intercept);
    ctx.stroke();

    // Draw data points
    dataPoints.forEach(point => {
      // Draw error line
      const predicted = slope * point.x + intercept;
      ctx.strokeStyle = darkMode ? '#ef4444' : '#dc2626';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x, predicted);
      ctx.stroke();

      // Draw point
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = darkMode ? '#fff' : '#000';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [slope, intercept, dataPoints, darkMode]);

  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Linear Regression
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Adjust the slope and intercept to fit the line to the data points. Click on the canvas to add new points.
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
              <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span> Data Points
            </span>
            <span className="inline-flex items-center mr-4">
              <span className="w-8 h-0.5 bg-blue-500 mr-1"></span> Regression Line
            </span>
            <span className="inline-flex items-center">
              <span className="w-8 h-0.5 bg-red-500 mr-1"></span> Error
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Slope (m): {slope.toFixed(3)}
            </label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.01"
              value={slope}
              onChange={(e) => setSlope(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Intercept (b): {intercept.toFixed(2)}
            </label>
            <input
              type="range"
              min="-100"
              max="300"
              step="1"
              value={intercept}
              onChange={(e) => setIntercept(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Equation
            </h3>
            <p className={`font-mono text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              y = {slope.toFixed(3)}x + {intercept.toFixed(2)}
            </p>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Mean Squared Error
            </h3>
            <p className={`font-mono text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {calculateMSE()}
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={fitLine}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-200 font-medium"
            >
              Best Fit Line
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
            <strong>Tip:</strong> Try to minimize the Mean Squared Error by adjusting slope and intercept, or click "Best Fit Line" to see the optimal solution!
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinearRegressionViz;
