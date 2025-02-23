import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <main className="main-content">
        <section className="hero-section">
          <h1 className="hero-title">Game Driven sustainability app</h1>
          <p className="hero-subtitle">
            Turn your everyday recycling into a fun, rewarding experience.
          </p>
          <div className="hero-info">
            <p>Learn what to recycle and where</p>
            <p>Earn points and rewards for recycling</p>
            <p>Join a community of eco-enthusiasts</p>
          </div>
          <button className="cta-button">
            <Link to="/login">Get Started</Link>
          </button>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
