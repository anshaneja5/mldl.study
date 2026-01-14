import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Download } from 'lucide-react';

const ActivationFunctionsViz = ({ darkMode }) => {
  const canvasRef = useRef(null);
  const [selectedFunction, setSelectedFunction] = useState('sigmoid');
  const [inputValue, setInputValue] = useState(0);
  const [showDerivative, setShowDerivative] = useState(false);
  const [xRange, setXRange] = useState(10);

  const functions = {
    sigmoid: {
      name: 'Sigmoid',
      fn: (x) => 1 / (1 + Math.exp(-x)),
      derivative: (x) => {
        const s = 1 / (1 + Math.exp(-x));
        return s * (1 - s);
      },
      color: '#3b82f6',
      range: [-10, 10]
    },
    tanh: {
      name: 'Tanh',
      fn: (x) => Math.tanh(x),
      derivative: (x) => 1 - Math.tanh(x) ** 2,
      color: '#10b981',
      range: [-10, 10]
    },
    relu: {
      name: 'ReLU',
      fn: (x) => Math.max(0, x),
      derivative: (x) => x > 0 ? 1 : 0,
      color: '#f59e0b',
      range: [-10, 10]
    },
    leakyRelu: {
      name: 'Leaky ReLU',
      fn: (x) => x > 0 ? x : 0.01 * x,
      derivative: (x) => x > 0 ? 1 : 0.01,
      color: '#ef4444',
      range: [-10, 10]
    },
    elu: {
      name: 'ELU',
      fn: (x) => x > 0 ? x : 1.0 * (Math.exp(x) - 1),
      derivative: (x) => x > 0 ? 1 : 1.0 * Math.exp(x),
      color: '#8b5cf6',
      range: [-10, 10]
    },
    swish: {
      name: 'Swish',
      fn: (x) => x / (1 + Math.exp(-x)),
      derivative: (x) => {
        const sigmoid = 1 / (1 + Math.exp(-x));
        return sigmoid + x * sigmoid * (1 - sigmoid);
      },
      color: '#ec4899',
      range: [-10, 10]
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'activation-functions.png';
    link.href = url;
    link.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scaleX = width / (2 * xRange);
    const scaleY = 100;

    // Clear canvas
    ctx.fillStyle = darkMode ? '#1f2937' : '#f9fafb';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = darkMode ? '#374151' : '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = -xRange; i <= xRange; i += 2) {
      const x = centerX + i * scaleX;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let i = -4; i <= 4; i++) {
      const y = centerY - i * scaleY;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = darkMode ? '#9ca3af' : '#6b7280';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Draw function
    const func = functions[selectedFunction];
    ctx.strokeStyle = func.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let px = 0; px < width; px++) {
      const x = (px - centerX) / scaleX;
      const y = func.fn(x);
      const py = centerY - y * scaleY;
      
      if (px === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();

    // Draw derivative if enabled
    if (showDerivative) {
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      
      for (let px = 0; px < width; px++) {
        const x = (px - centerX) / scaleX;
        const dy = func.derivative(x);
        const py = centerY - dy * scaleY;
        
        if (px === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw current input point
    const outputY = func.fn(inputValue);
    const inputPx = centerX + inputValue * scaleX;
    const outputPy = centerY - outputY * scaleY;

    // Vertical line from x-axis to point
    ctx.strokeStyle = darkMode ? '#fff' : '#000';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(inputPx, centerY);
    ctx.lineTo(inputPx, outputPy);
    ctx.stroke();

    // Horizontal line from y-axis to point
    ctx.beginPath();
    ctx.moveTo(centerX, outputPy);
    ctx.lineTo(inputPx, outputPy);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw the point
    ctx.fillStyle = '#ef4444';
    ctx.strokeStyle = darkMode ? '#fff' : '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(inputPx, outputPy, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = darkMode ? '#fff' : '#000';
    ctx.font = '12px monospace';
    ctx.fillText(`(${inputValue.toFixed(2)}, ${outputY.toFixed(2)})`, inputPx + 10, outputPy - 10);

  }, [selectedFunction, inputValue, showDerivative, xRange, darkMode]);

  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Activation Functions Comparison
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Compare different activation functions used in neural networks and see their behavior.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className={`w-full border-2 rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
          />
          <div className={`mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className="inline-flex items-center mr-4">
              <span className={`w-8 h-0.5 mr-1`} style={{ backgroundColor: functions[selectedFunction].color }}></span> Function
            </span>
            {showDerivative && (
              <span className="inline-flex items-center">
                <span className="w-8 h-0.5 bg-pink-400 mr-1" style={{ borderTop: '2px dashed' }}></span> Derivative
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Activation Function
            </label>
            <select
              value={selectedFunction}
              onChange={(e) => setSelectedFunction(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {Object.entries(functions).map(([key, func]) => (
                <option key={key} value={key}>{func.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Input Value: {inputValue.toFixed(2)}
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={inputValue}
              onChange={(e) => setInputValue(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              X-Axis Range: ±{xRange}
            </label>
            <input
              type="range"
              min="5"
              max="20"
              step="1"
              value={xRange}
              onChange={(e) => setXRange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showDeriv"
              checked={showDerivative}
              onChange={(e) => setShowDerivative(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showDeriv" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Show Derivative
            </label>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Output
            </h3>
            <div className="space-y-1 text-sm">
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                f({inputValue.toFixed(2)}) = <strong>{functions[selectedFunction].fn(inputValue).toFixed(4)}</strong>
              </p>
              {showDerivative && (
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  f'({inputValue.toFixed(2)}) = <strong>{functions[selectedFunction].derivative(inputValue).toFixed(4)}</strong>
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
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
              onClick={() => {
                setInputValue(0);
                setShowDerivative(false);
                setXRange(10);
              }}
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
            <strong>Activation Functions:</strong> Introduce non-linearity in neural networks, allowing them to learn complex patterns. Different functions have different properties affecting gradient flow and training.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivationFunctionsViz;
