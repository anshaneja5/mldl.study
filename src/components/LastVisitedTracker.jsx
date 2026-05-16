import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { saveLastVisitedRoadmap } from '../hooks/useLastVisitedRoadmap';

const LastVisitedTracker = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    saveLastVisitedRoadmap(pathname);
  }, [pathname]);

  return null;
};

export default LastVisitedTracker;
