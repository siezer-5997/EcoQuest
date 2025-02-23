import React from "react";
import Header from "./Header";
import "./HowItWorksPage.css"

const HowItWorksPage = () => {
  return (
    <div className="how-it-works-page">
      <Header />
      <div className="how-it-works-content">
        <h1 className="how-it-works-title">How EcoQuest Works</h1>
        <p className="hero-subtitle">
          Turn your everyday recycling into a fun, rewarding experience.
        </p>
        <p className="how-it-works-description">
          EcoQuest combines sustainability with gamification to make recycling easier, more fun, and rewarding:
        </p>
        <ul className="how-it-works-list">
          <li>Sign up and create your profile to track your sustainability progress.</li>
          <li>Complete eco-challenges by recycling specific items or reaching recycling milestones.</li>
          <li>Earn points for your actions and unlock rewards such as badges, discounts, or donations to environmental causes.</li>
          <li>Join local or global eco-challenges and compete with friends, family, or the EcoQuest community.</li>
          <li>Get valuable tips and resources on sustainable living and recycling best practices.</li>
          <li>Access your personal recycling stats, achievements, and set new sustainability goals.</li>
        </ul>
      </div>
    </div>
  );
};

export default HowItWorksPage;
