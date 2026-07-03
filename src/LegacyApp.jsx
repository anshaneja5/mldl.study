import { Route, Routes } from 'react-router-dom';
import MachineLearningRoadmap from './legacy/MachineLearningRoadmap';
import DeepLearning from './legacy/DeepLearningRoadmap';
import PrerequisiteRoadmap from './legacy/PrerequisiteRoadmap';
import GenerativeAIRoadmap from './legacy/GenerativeAIRoadmap';
import ResearchPaper from './legacy/ResearchPaper';
import Error404 from './legacy/Error404';
import HomePage from './legacy/HomePage';
import Books from './legacy/Books';
import Journey from './legacy/Journey';
import QuestionBank from './legacy/QuestionBank';
import Search from './legacy/Search';
import PrivacyPolicy from './legacy/PrivacyPolicy';
import TermsOfUse from './legacy/TermsOfUse';
import LearnerDashboard from './legacy/LearnerDashboard';
import Bookmarks from './legacy/Bookmarks';
import AIRoadmapGuide from './legacy/AIRoadmapGuide';
import MachineLearningGuide from './legacy/MachineLearningGuide';
import {
  AIAgentsGuide,
  DeepLearningGuide,
  GenerativeAIGuide,
  LearnAIFromScratchGuide,
  RAGGuide,
} from './legacy/LongTailGuides';

// The pre-revamp Aurora Glass site, kept as a frozen snapshot. The
// `.legacy-root` wrapper scopes the old design tokens/typography (see the
// LEGACY block in index.css); routes mirror the current site exactly.
const LegacyApp = () => (
  <div className="legacy-root">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ai-roadmap" element={<AIRoadmapGuide />} />
      <Route path="/ml-roadmap" element={<MachineLearningGuide />} />
      <Route path="/deep-learning-roadmap" element={<DeepLearningGuide />} />
      <Route path="/generative-ai-roadmap" element={<GenerativeAIGuide />} />
      <Route path="/ai-agents-roadmap" element={<AIAgentsGuide />} />
      <Route path="/rag-roadmap" element={<RAGGuide />} />
      <Route path="/learn-ai-from-scratch" element={<LearnAIFromScratchGuide />} />
      <Route path="/deeplearning" element={<DeepLearning />} />
      <Route path="/machinelearning" element={<MachineLearningRoadmap />} />
      <Route path="/prerequisites" element={<PrerequisiteRoadmap />} />
      <Route path="/researchpapers" element={<ResearchPaper />} />
      <Route path="/genai" element={<GenerativeAIRoadmap />} />
      <Route path="/books" element={<Books />} />
      <Route path="/journey" element={<Journey />} />
      <Route path="/questionbank" element={<QuestionBank />} />
      <Route path="/search" element={<Search />} />
      <Route path="/dashboard" element={<LearnerDashboard />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfUse />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  </div>
);

export default LegacyApp;
