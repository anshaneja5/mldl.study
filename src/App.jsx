import { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { BookmarksProvider } from './contexts/BookmarksContext';
import { GamificationProvider } from './contexts/GamificationContext';
import { UIModeProvider, useUIMode } from './contexts/UIModeContext';
import BrutalApp from './BrutalApp';
import ReactGA from 'react-ga4';

// The legacy (Aurora Glass) site is opt-in, so keep its component code out of
// the default bundle — only fetched when a visitor switches into legacy mode.
const LegacyApp = lazy(() => import('./LegacyApp'));

const trackingId = import.meta.env.VITE_APP_GA_TRACKING_ID;
if (trackingId) {
  ReactGA.initialize(trackingId);
}

// Renders the current site or the frozen legacy site based on UI mode.
// The URL, Router, and providers stay mounted across the switch.
const ModeSwitch = () => {
  const { mode } = useUIMode();
  if (mode === 'legacy') {
    return (
      <Suspense fallback={null}>
        <LegacyApp />
      </Suspense>
    );
  }
  return <BrutalApp />;
};

const App = () => {
  return (
    <UIModeProvider>
      <GamificationProvider>
        <BookmarksProvider>
          <Router>
            <div className="min-h-screen">
              <ModeSwitch />
            </div>
          </Router>
        </BookmarksProvider>
      </GamificationProvider>
    </UIModeProvider>
  );
};

export default App;
