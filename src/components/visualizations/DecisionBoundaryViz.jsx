import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

const DecisionBoundaryViz = ({ darkMode }) => {
  const canvasRef = useRef(null);
  const [algorithm, setAlgorithm] = useState('linear');
  const [classAPoints, setClassAPoints] = useState([]);
  const [classBPoints, setClassBPoints] = useState([]);
  const [activeClass, setActiveClass] = useState('A');

  const generateInitialData = () => {
    const pointsA = [];
    const pointsB = [];
    
    // Generate class A points (top-left region)
    for (let i = 0; i < 15; i++) {
      pointsA.push({
        x: Math.random() * 250 + 50,
        y: Math.random() * 150 + 50
      });
    }
    
    // Generate class B points (bottom-right region)
    for (let i = 0; i < 15; i++) {
      pointsB.push({
        x: Math.random() * 250 + 300,
        y: Math.random() * 150 + 200
      });
    }
    
    setClassAPoints(pointsA);
    setClassBPoints(pointsB);
  };

  const handleCanvasClick = (e) => {
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
  };

  const drawLinearBoundary = (ctx, width, height) => {
    // Simple linear decision boundary
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(0, height / 2 + 100);
    ctx.lineTo(width, height / 2 - 100);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const drawRadialBoundary = (ctx, width, height) => {
    // Radial decision boundary (circle)
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 150;
    
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const drawPolynomialBoundary = (ctx, width, height) => {
    // Polynomial decision boundary (curve)
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    
    for (let x = 0; x <= width; x += 1) {
      const y = height / 2 + Math.sin(x / 50) * 80 + (x - width / 2) / 3;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);
  };

  useEffect(() => {
    generateInitialData();
  }, []);

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

    // Draw decision boundary based on selected algorithm
    if (algorithm === 'linear') {
      drawLinearBoundary(ctx, width, height);
    } else if (algorithm === 'radial') {
      drawRadialBoundary(ctx, width, height);
    } else if (algorithm === 'polynomial') {
      drawPolynomialBoundary(ctx, width, height);
    }

    // Draw class A points (blue)
    classAPoints.forEach(point => {
      ctx.fillStyle = '#3b82f6';
      ctx.strokeStyle = darkMode ? '#fff' : '#000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    // Draw class B points (red)
    classBPoints.forEach(point => {
      // Draw as triangle
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = darkMode ? '#fff' : '#000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y - 8);
      ctx.lineTo(point.x - 7, point.y + 5);
      ctx.lineTo(point.x + 7, point.y + 5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });

  }, [classAPoints, classBPoints, algorithm, darkMode]);

  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Decision Boundary Visualization
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          See how different classifiers separate two classes. Click to add points and switch between algorithms.
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
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span> Class A
            </span>
            <span className="inline-flex items-center mr-4">
              <span className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-red-500 mr-1"></span> Class B
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
              Classification Algorithm
            </label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="linear">Linear SVM</option>
              <option value="radial">Radial Basis Function</option>
              <option value="polynomial">Polynomial Kernel</option>
            </select>
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
              Dataset Statistics
            </h3>
            <div className="space-y-1 text-sm">
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Class A: <strong>{classAPoints.length} points</strong>
              </p>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Class B: <strong>{classBPoints.length} points</strong>
              </p>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Total: <strong>{classAPoints.length + classBPoints.length}</strong>
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Algorithm Info
            </h3>
            <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {algorithm === 'linear' && 'Linear SVM finds a straight line that best separates the two classes with maximum margin.'}
              {algorithm === 'radial' && 'RBF kernel creates circular decision boundaries, useful for non-linearly separable data.'}
              {algorithm === 'polynomial' && 'Polynomial kernel creates curved decision boundaries by mapping data to higher dimensions.'}
            </p>
          </div>

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

          <div className={`p-3 rounded-lg text-xs ${darkMode ? 'bg-blue-900/30 text-blue-200' : 'bg-blue-50 text-blue-800'}`}>
            <strong>Decision Boundary:</strong> The line or curve that separates different classes in classification. Different algorithms create different boundary shapes.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionBoundaryViz;
