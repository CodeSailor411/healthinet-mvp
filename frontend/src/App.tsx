import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import HealthRecordsPage from './pages/HealthRecordsPage';
import SpecialistInfoPage from './pages/SpecialistInfoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/health-records" element={<HealthRecordsPage />} />
        <Route path="/specialist-info/:type" element={<SpecialistInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
