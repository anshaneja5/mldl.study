import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MachineLearningRoadmap from './components/MachineLearningRoadmap';
import DeepLearning from './components/DeepLearningRoadmap';
import PrerequisiteRoadmap from './components/PrerequisiteRoadmap';
import GenerativeAIRoadmap from './components/GenerativeAIRoadmap';
import ResearchPaper from './components/ResearchPaper';
import Error404 from './components/Error404';
import HomePage from './components/HomePage';
import Books from './components/Books';
import Journey from './components/Journey';
import QuestionBank from './components/QuestionBank';
import ReactGA from "react-ga4";

// Initialize Google Analytics with better error handling
if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
  ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
} else {
  console.warn(
    "Google Analytics measurement ID (VITE_GA_MEASUREMENT_ID) is not set. Analytics will not be initialized. " +
    "If you recently migrated, ensure your environment variables are updated from VITE_APP_GA_TRACKING_ID to VITE_GA_MEASUREMENT_ID."
  );
}

const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/deeplearning" element={<DeepLearning />} />
        <Route path="/machinelearning" element={<MachineLearningRoadmap />} />
        <Route path="/prerequisites" element={<PrerequisiteRoadmap />} />
        <Route path="/researchpapers" element={<ResearchPaper />} />
        <Route path="/genai" element={<GenerativeAIRoadmap />} />
        <Route path="/books" element={<Books />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/questionbank" element={<QuestionBank />} />
        <Route path="*" element={<Error404 />} />
      </Routes>

    </Router>
  );
};

export default App;