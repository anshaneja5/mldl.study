import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Download, Layers } from 'lucide-react';

const PCAViz = ({ darkMode }) => {
  const canvasRef = useRef(null);
  const [dataPoints, setDataPoints] = useState([]);
  const [numComponents, setNumComponents] = useState(2);
  const [showOriginal, setShowOriginal] = useState(true);
  const [showProjected, setShowProjected] = useState(true);
  const [varianceExplained, setVarianceExplained] = useState([]);
  const [principalComponents, setPrincipalComponents] = useState([]);

  const generateData = () => {
    const points = [];
    const numPoints = 50;
    
    // Generate correlated 3D data
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * 2 * Math.PI;
      const noise1 = (Math.random() - 0.5) * 50;
      const noise2 = (Math.random() - 0.5) * 30;
      const noise3 = (Math.random() - 0.5) * 20;
      
      points.push({
        x: 300 + Math.cos(t) * 150 + noise1,
        y: 200 + Math.sin(t) * 100 + noise2,
        z: 150 + Math.sin(t * 2) * 50 + noise3
      });
    }
    
    setDataPoints(points);
    computePCA(points);
  };

  const computePCA = (points) => {
    if (points.length === 0) return;

    // Calculate mean
    const mean = {
      x: points.reduce((sum, p) => sum + p.x, 0) / points.length,
      y: points.reduce((sum, p) => sum + p.y, 0) / points.length,
      z: points.reduce((sum, p) => sum + p.z, 0) / points.length
    };

    // Center the data
    const centered = points.map(p => ({
      x: p.x - mean.x,
      y: p.y - mean.y,
      z: p.z - mean.z
    }));

    // Compute covariance matrix (simplified 2D projection for visualization)
    let covXX = 0, covYY = 0, covXY = 0;
    centered.forEach(p => {
      covXX += p.x * p.x;
      covYY += p.y * p.y;
      covXY += p.x * p.y;
    });
    const n = centered.length;
    covXX /= n;
    covYY /= n;
    covXY /= n;

    // Compute eigenvalues and eigenvectors (2D for visualization)
    const trace = covXX + covYY;
    const det = covXX * covYY - covXY * covXY;
    const lambda1 = trace / 2 + Math.sqrt(trace * trace / 4 - det);
    const lambda2 = trace / 2 - Math.sqrt(trace * trace / 4 - det);

    // Eigenvectors
    const v1 = { x: covXY, y: lambda1 - covXX };
    const v2 = { x: covXY, y: lambda2 - covXX };

    // Normalize
    const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
    
    const pc1 = { x: v1.x / mag1, y: v1.y / mag1 };
    const pc2 = { x: v2.x / mag2, y: v2.y / mag2 };

    setPrincipalComponents([pc1, pc2]);
    
    // Variance explained
    const totalVar = lambda1 + lambda2;
    setVarianceExplained([
      (lambda1 / totalVar * 100).toFixed(1),
      (lambda2 / totalVar * 100).toFixed(1)
    ]);
  };

  const projectPoint = (point, pc) => {
    // Project point onto principal component
    const dot = point.x * pc.x + point.y * pc.y;
    return {
      x: dot * pc.x,
      y: dot * pc.y
    };
  };

  const resetVisualization = () => {
    generateData();
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'pca-visualization.png';
    link.href = url;
    link.click();
  };

  useEffect(() => {
    generateData();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dataPoints.length === 0) return;

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

    // Calculate mean for centering
    const mean = {
      x: dataPoints.reduce((sum, p) => sum + p.x, 0) / dataPoints.length,
      y: dataPoints.reduce((sum, p) => sum + p.y, 0) / dataPoints.length
    };

    // Draw principal component axes
    if (principalComponents.length > 0) {
      principalComponents.forEach((pc, idx) => {
        if (idx >= numComponents) return;
        
        ctx.strokeStyle = idx === 0 ? '#10b981' : '#f59e0b';
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
        
        const scale = 200;
        ctx.beginPath();
        ctx.moveTo(mean.x - pc.x * scale, mean.y - pc.y * scale);
        ctx.lineTo(mean.x + pc.x * scale, mean.y + pc.y * scale);
        ctx.stroke();

        // Draw arrow head
        const angle = Math.atan2(pc.y, pc.x);
        const arrowSize = 10;
        ctx.fillStyle = idx === 0 ? '#10b981' : '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(mean.x + pc.x * scale, mean.y + pc.y * scale);
        ctx.lineTo(
          mean.x + pc.x * scale - arrowSize * Math.cos(angle - Math.PI / 6),
          mean.y + pc.y * scale - arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          mean.x + pc.x * scale - arrowSize * Math.cos(angle + Math.PI / 6),
          mean.y + pc.y * scale - arrowSize * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();
      });
    }

    // Draw data points and projections
    dataPoints.forEach(point => {
      // Draw original point
      if (showOriginal) {
        ctx.fillStyle = '#3b82f6';
        ctx.strokeStyle = darkMode ? '#fff' : '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // Draw projected points
      if (showProjected && principalComponents.length > 0) {
        const centered = { x: point.x - mean.x, y: point.y - mean.y };
        
        if (numComponents >= 1) {
          const proj1 = projectPoint(centered, principalComponents[0]);
          ctx.fillStyle = '#10b981';
          ctx.globalAlpha = 0.6;
          ctx.beginPath();
          ctx.arc(mean.x + proj1.x, mean.y + proj1.y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;

          // Draw projection line
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(mean.x + proj1.x, mean.y + proj1.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
    });

  }, [dataPoints, principalComponents, darkMode, showOriginal, showProjected, numComponents]);

  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Principal Component Analysis (PCA)
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Dimensionality reduction technique that finds the directions of maximum variance in high-dimensional data.
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
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span> Original Data
            </span>
            <span className="inline-flex items-center mr-4">
              <span className="w-8 h-0.5 bg-green-500 mr-1"></span> PC1
            </span>
            <span className="inline-flex items-center">
              <span className="w-8 h-0.5 bg-orange-500 mr-1"></span> PC2
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Number of Components: {numComponents}
            </label>
            <input
              type="range"
              min="1"
              max="2"
              value={numComponents}
              onChange={(e) => setNumComponents(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showOrig"
                checked={showOriginal}
                onChange={(e) => setShowOriginal(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="showOrig" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Show Original Data
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showProj"
                checked={showProjected}
                onChange={(e) => setShowProjected(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="showProj" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Show Projections
              </label>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Variance Explained
            </h3>
            <div className="space-y-2">
              {varianceExplained.map((variance, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>PC{idx + 1}:</span>
                    <span className="font-bold">{variance}%</span>
                  </div>
                  <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${idx === 0 ? 'bg-green-500' : 'bg-orange-500'}`}
                      style={{ width: `${variance}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Statistics
            </h3>
            <div className="space-y-1 text-sm">
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Data Points: <strong>{dataPoints.length}</strong>
              </p>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Components: <strong>{numComponents}</strong>
              </p>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Total Variance: <strong>100%</strong>
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={generateData}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-200 font-medium flex items-center justify-center"
            >
              <Layers className="w-4 h-4 mr-2" />
              Generate New Data
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
            <strong>PCA:</strong> Finds orthogonal axes (principal components) that capture the maximum variance in the data. The first PC captures the most variance, the second captures the next most, and so on.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCAViz;
