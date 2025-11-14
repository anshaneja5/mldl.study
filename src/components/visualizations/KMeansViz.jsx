import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';

const KMeansViz = ({ darkMode }) => {
  const canvasRef = useRef(null);
  const [k, setK] = useState(3);
  const [numPoints, setNumPoints] = useState(50);
  const [dataPoints, setDataPoints] = useState([]);
  const [centroids, setCentroids] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [iteration, setIteration] = useState(0);

  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  const generateRandomPoints = (count = numPoints) => {
    const points = [];
    for (let i = 0; i < count; i++) {
      points.push({
        x: Math.random() * 580 + 10,
        y: Math.random() * 380 + 10,
        cluster: -1
      });
    }
    setDataPoints(points);
    initializeCentroids(points, k);
    setIteration(0);
  };

  const handleCanvasClick = (e) => {
    if (isRunning) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newPoint = {
      x,
      y,
      cluster: -1
    };
    
    const newPoints = [...dataPoints, newPoint];
    setDataPoints(newPoints);
    if (centroids.length > 0) {
      assignClustersForPoints(newPoints);
    }
  };

  const initializeCentroids = (points, clusterCount) => {
    const shuffled = [...points].sort(() => 0.5 - Math.random());
    const newCentroids = shuffled.slice(0, clusterCount).map((p, i) => ({
      x: p.x,
      y: p.y,
      color: colors[i % colors.length]
    }));
    setCentroids(newCentroids);
  };

  const distance = (p1, p2) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  const assignClusters = () => {
    return assignClustersForPoints(dataPoints);
  };

  const assignClustersForPoints = (points) => {
    const newPoints = points.map(point => {
      let minDist = Infinity;
      let cluster = 0;
      
      centroids.forEach((centroid, idx) => {
        const dist = distance(point, centroid);
        if (dist < minDist) {
          minDist = dist;
          cluster = idx;
        }
      });
      
      return { ...point, cluster };
    });
    
    setDataPoints(newPoints);
    return newPoints;
  };

  const updateCentroids = (points) => {
    const newCentroids = centroids.map((centroid, idx) => {
      const clusterPoints = points.filter(p => p.cluster === idx);
      if (clusterPoints.length === 0) return centroid;
      
      const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0);
      const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0);
      
      return {
        x: sumX / clusterPoints.length,
        y: sumY / clusterPoints.length,
        color: centroid.color
      };
    });
    
    setCentroids(newCentroids);
  };

  const runKMeansStep = () => {
    const newPoints = assignClusters();
    updateCentroids(newPoints);
    setIteration(prev => prev + 1);
  };

  const resetVisualization = () => {
    generateRandomPoints(50);
    setIsRunning(false);
    setIteration(0);
  };

  useEffect(() => {
    generateRandomPoints(50);
  }, []);

  useEffect(() => {
    if (dataPoints.length > 0 && centroids.length !== k) {
      initializeCentroids(dataPoints, k);
      setIteration(0);
    }
  }, [k]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        runKMeansStep();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, dataPoints, centroids]);

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

    // Draw lines from points to centroids
    dataPoints.forEach(point => {
      if (point.cluster >= 0) {
        const centroid = centroids[point.cluster];
        ctx.strokeStyle = centroid.color + '40';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(centroid.x, centroid.y);
        ctx.stroke();
      }
    });

    // Draw data points
    dataPoints.forEach(point => {
      if (point.cluster >= 0) {
        ctx.fillStyle = centroids[point.cluster].color;
      } else {
        ctx.fillStyle = darkMode ? '#9ca3af' : '#6b7280';
      }
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw centroids
    centroids.forEach(centroid => {
      ctx.fillStyle = centroid.color;
      ctx.strokeStyle = darkMode ? '#fff' : '#000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centroid.x, centroid.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Draw X mark inside centroid
      ctx.strokeStyle = darkMode ? '#000' : '#fff';
      ctx.lineWidth = 2;
      const size = 5;
      ctx.beginPath();
      ctx.moveTo(centroid.x - size, centroid.y - size);
      ctx.lineTo(centroid.x + size, centroid.y + size);
      ctx.moveTo(centroid.x + size, centroid.y - size);
      ctx.lineTo(centroid.x - size, centroid.y + size);
      ctx.stroke();
    });
  }, [dataPoints, centroids, darkMode]);

  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          K-Means Clustering
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Watch K-Means algorithm group data points into clusters. Click to add points or adjust K value.
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
              <span className="w-3 h-3 rounded-full bg-gray-500 mr-1"></span> Data Points
            </span>
            <span className="inline-flex items-center">
              <span className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white mr-1"></span> Centroids
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Number of Clusters (K): {k}
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setK(Math.max(2, k - 1))}
                disabled={isRunning}
                className={`p-2 rounded-lg ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="range"
                min="2"
                max="6"
                value={k}
                onChange={(e) => setK(parseInt(e.target.value))}
                disabled={isRunning}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <button
                onClick={() => setK(Math.min(6, k + 1))}
                disabled={isRunning}
                className={`p-2 rounded-lg ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Number of Points: {numPoints}
            </label>
            <input
              type="range"
              min="20"
              max="150"
              step="10"
              value={numPoints}
              onChange={(e) => setNumPoints(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 disabled:opacity-50"
            />
            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Regenerate data to apply
            </p>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Statistics
            </h3>
            <div className="space-y-1 text-sm">
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Points: <strong>{dataPoints.length}</strong>
              </p>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Iterations: <strong>{iteration}</strong>
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                if (isRunning) {
                  setIsRunning(false);
                } else {
                  setIsRunning(true);
                }
              }}
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
              onClick={runKMeansStep}
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
            <strong>How it works:</strong> K-Means assigns each point to the nearest centroid, then updates centroids to the mean of their cluster points. This repeats until convergence.
          </div>
        </div>
      </div>
    </div>
  );
};

export default KMeansViz;
