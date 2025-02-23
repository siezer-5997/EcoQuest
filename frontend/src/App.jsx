import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginSignup from './components/LoginSignup';
import MiniGames from './components/MiniGames';
import AboutSection from "./components/AboutSection";
import HowItWorksPage from "./components/HowItWorksPage";  {/* Import HowItWorksPage */}
import FeaturesPage from "./components/FeaturesPage";
import UploadEcoActionPage from './components/UploadEcoActionPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/minigames" element={<MiniGames />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />  {/* Route for HowItWorksPage */}
        <Route path="/uploadecoactionpage" element={<UploadEcoActionPage />} />  {/* Route for HowItWorksPage */}
        <Route path="/features" element={<FeaturesPage />} />  {/* Route for FeaturesPage */}
      </Routes>
    </Router>
  );
};

export default App;
