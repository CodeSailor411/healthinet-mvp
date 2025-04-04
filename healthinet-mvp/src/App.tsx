import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import HealthRecordsPage from './pages/HealthRecordsPage';
import SpecialistInfoPage from './pages/SpecialistInfoPage';
import NearbySpecialistsPage from './pages/NearbySpecialistsPage';
import TestRunner from './pages/TestRunner';

// Create a wrapper component to use location for AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/health-records" element={<HealthRecordsPage />} />
        <Route path="/specialist-info/:specialistType" element={<SpecialistInfoPage />} />
        <Route path="/nearby-specialists" element={<NearbySpecialistsPage />} />
        <Route path="/test" element={<TestRunner />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <AnimatedRoutes />
      </Router>
    </MotionConfig>
  );
};

export default App;