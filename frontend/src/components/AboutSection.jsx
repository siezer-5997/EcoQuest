import React from "react";
import Header from "./Header";
import "./AboutSection.css"; 
const AboutSection = () => {
  return (
    <div className="about-section">
      <Header />
      <div className="about-content">
        <h1 className="about-title">About Us</h1>
        <p className="about-description">
          We are Eco Quest, a passionate team committed to making sustainability
          accessible and fun. Our mission is to empower communities by transforming
          everyday recycling into an engaging experience.
        </p>
        <p className="about-description">
          Join us in our journey to create a greener, cleaner planet for future generations.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
