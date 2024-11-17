import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MachineLearningRoadmap from './components/MachineLearningRoadmap';
import DeepLearning from './components/DeepLearningRoadmap';
import HomePage from './components/HomePage';
import Books from './components/Books';
import ReactGA from 'react-ga4';
const trackingId = import.meta.env.VITE_APP_GA_TRACKING_ID;
ReactGA.initialize(trackingId);

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/deeplearning" element={<DeepLearning />} />
          <Route path="/machinelearning" element={<MachineLearningRoadmap />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;