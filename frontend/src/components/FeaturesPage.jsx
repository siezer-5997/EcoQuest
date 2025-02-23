import React from "react";
import Header from "./Header"; // Assuming the header is a reusable component
import "./FeaturesPage.css"

const FeaturesPage = () => {
  return (
    <div className="features-page">
      <Header />
      <div className="features-content">
        <h1 className="features-title">EcoQuest Features</h1>
        <p className="hero-subtitle">
          Turn your everyday recycling into a fun, rewarding experience.
        </p>
        <p className="features-description">
          EcoQuest offers a range of exciting features to make recycling more engaging and help you build sustainable habits:
        </p>
        <ul className="features-list">
          <li>Transform everyday recycling tasks into fun, engaging challenges where you earn points and unlock rewards.</li>
          <li>Set personalized sustainability goals and track your progress over time.</li>
          <li>Join eco-friendly communities, compete in challenges, and interact with others to foster collaboration.</li>
          <li>Access educational resources to learn more about recycling and sustainability practices.</li>
          <li>Earn rewards for your actions, including digital badges, discounts, and donation opportunities to environmental causes.</li>
          <li>Enjoy a dynamic, mobile-first, fully responsive design for an engaging experience on any device.</li>
        </ul>
      </div>
    </div>
  );
};

export default FeaturesPage;
