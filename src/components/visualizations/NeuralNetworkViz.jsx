import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const NeuralNetworkViz = ({ darkMode }) => {
  const canvasRef = useRef(null);
  const [layers, setLayers] = useState([3, 4, 4, 2]); // Input, hidden1, hidden2, output
  const [activations, setActivations] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeLayer, setActiveLayer] = useState(-1);

  const activationFunctions = {
    sigmoid: (x) => 1 / (1 + Math.exp(-x)),
    relu: (x) => Math.max(0, x),
    tanh: (x) => Math.tanh(x)
  };

  const initializeNetwork = () => {
    const initialActivations = layers.map(layerSize => 
      Array(layerSize).fill(0).map(() => Math.random())
    );
    setActivations(initialActivations);
  };

  const forwardPass = async () => {
    setIsAnimating(true);
    const newActivations = [...activations];
    
    // Initialize input layer with random values
    newActivations[0] = Array(layers[0]).fill(0).map(() => Math.random());
    setActivations([...newActivations]);
    setActiveLayer(0);
    
    for (let i = 1; i < layers.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Compute activations for current layer
      newActivations[i] = Array(layers[i]).fill(0).map(() => {
        const sum = newActivations[i - 1].reduce((acc, val) => acc + val * (Math.random() * 2 - 1), 0);
        return activationFunctions.sigmoid(sum);
      });
      
      setActivations([...newActivations]);
      setActiveLayer(i);
    }
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setActiveLayer(-1);
    setIsAnimating(false);
  };

  const resetNetwork = () => {
    initializeNetwork();
    setActiveLayer(-1);
    setIsAnimating(false);
  };

  useEffect(() => {
    initializeNetwork();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || activations.length === 0) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = darkMode ? '#1f2937' : '#f9fafb';
    ctx.fillRect(0, 0, width, height);

    const layerSpacing = width / (layers.length + 1);
    const nodePositions = [];

    // Calculate node positions
    layers.forEach((layerSize, layerIdx) => {
      const positions = [];
      const nodeSpacing = height / (layerSize + 1);
      
      for (let i = 0; i < layerSize; i++) {
        positions.push({
          x: layerSpacing * (layerIdx + 1),
          y: nodeSpacing * (i + 1)
        });
      }
      nodePositions.push(positions);
    });

    // Draw connections
    for (let i = 0; i < layers.length - 1; i++) {
      const currentLayer = nodePositions[i];
      const nextLayer = nodePositions[i + 1];
      
      currentLayer.forEach((startPos, startIdx) => {
        nextLayer.forEach((endPos, endIdx) => {
          // Calculate weight opacity based on activations
          const weight = activations[i][startIdx] * activations[i + 1][endIdx];
          const opacity = Math.min(weight, 0.5);
          
          const isActive = activeLayer === i + 1 || activeLayer === i;
          ctx.strokeStyle = isActive 
            ? `rgba(59, 130, 246, ${opacity + 0.3})`
            : `rgba(107, 114, 128, ${opacity})`;
          ctx.lineWidth = isActive ? 2 : 1;
          
          ctx.beginPath();
          ctx.moveTo(startPos.x, startPos.y);
          ctx.lineTo(endPos.x, endPos.y);
          ctx.stroke();
        });
      });
    }

    // Draw nodes
    layers.forEach((layerSize, layerIdx) => {
      const positions = nodePositions[layerIdx];
      
      positions.forEach((pos, nodeIdx) => {
        const activation = activations[layerIdx] ? activations[layerIdx][nodeIdx] : 0;
        const isActive = activeLayer === layerIdx;
        
        // Node circle
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
        
        // Color based on activation
        const intensity = Math.floor(activation * 255);
        ctx.fillStyle = isActive 
          ? `rgb(${255 - intensity}, ${intensity}, 255)`
          : `rgb(${intensity}, ${intensity}, ${intensity})`;
        ctx.fill();
        
        // Border
        ctx.strokeStyle = isActive ? '#3b82f6' : (darkMode ? '#fff' : '#000');
        ctx.lineWidth = isActive ? 3 : 2;
        ctx.stroke();
        
        // Activation value text
        if (isActive) {
          ctx.fillStyle = darkMode ? '#fff' : '#000';
          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(activation.toFixed(2), pos.x, pos.y + 35);
        }
      });
    });

    // Draw layer labels
    ctx.fillStyle = darkMode ? '#9ca3af' : '#6b7280';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    
    const labels = ['Input', ...Array(layers.length - 2).fill(0).map((_, i) => `Hidden ${i + 1}`), 'Output'];
    layers.forEach((_, idx) => {
      ctx.fillText(labels[idx], layerSpacing * (idx + 1), height - 10);
    });

  }, [activations, activeLayer, layers, darkMode]);

  return (
    <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Neural Network Forward Propagation
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Visualize how data flows through a neural network. Watch activations propagate from input to output.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas */}
        <div className="lg:col-span-2">
          <canvas
            ref={canvasRef}
            width={700}
            height={400}
            className={`w-full border-2 rounded-lg ${
              darkMode ? 'border-gray-600' : 'border-gray-300'
            }`}
          />
          <div className={`mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className="inline-flex items-center mr-4">
              <span className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-700 to-white border border-gray-400 mr-1"></span> Neuron Activation (0-1)
            </span>
            <span className="inline-flex items-center">
              <span className="w-8 h-0.5 bg-blue-500 mr-1"></span> Active Connections
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Network Architecture
            </h3>
            <div className="space-y-2 text-sm">
              {layers.map((size, idx) => (
                <div key={idx} className={`flex justify-between ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span>
                    {idx === 0 ? 'Input' : idx === layers.length - 1 ? 'Output' : `Hidden ${idx}`}:
                  </span>
                  <span className="font-mono font-bold">{size} neurons</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Network Info
            </h3>
            <div className="space-y-1 text-sm">
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Total Layers: <strong>{layers.length}</strong>
              </p>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Total Neurons: <strong>{layers.reduce((a, b) => a + b, 0)}</strong>
              </p>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Activation: <strong>Sigmoid</strong>
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={forwardPass}
              disabled={isAnimating}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-200 font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4 mr-2" />
              Run Forward Pass
            </button>
            <button
              onClick={resetNetwork}
              disabled={isAnimating}
              className={`w-full px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>

          <div className={`p-3 rounded-lg text-xs ${darkMode ? 'bg-blue-900/30 text-blue-200' : 'bg-blue-50 text-blue-800'}`}>
            <strong>Forward Propagation:</strong> Data flows from input through hidden layers to output. Each neuron's activation is computed based on weighted inputs from the previous layer.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralNetworkViz;
