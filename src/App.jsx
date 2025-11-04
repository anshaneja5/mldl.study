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
import Search from './components/Search';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import ReactGA from 'react-ga4';
const trackingId = import.meta.env.VITE_APP_GA_TRACKING_ID;
if (trackingId) {
  ReactGA.initialize(trackingId);
}

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
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
          <Route path="/search" element={<Search />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
