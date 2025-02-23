import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  // Retrieve token and username from localStorage
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <header className="header">
      <svg
        className="green-wave"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#cde5d3"
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,106.7C960,117,1056,139,1152,144C1248,149,1344,139,1392,133.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>

      <nav className="nav-menu">
        <div className="logo-text">
          <Link to="/">Eco Quest</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/how-it-works">How it works</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/minigames">MiniGames</Link></li>
          <li><Link to="/uploadecoactionpage">Upload Eco Action</Link></li>
        </ul>
        <div className="nav-button-container">
          {token && username ? (
            <>
              <span className="username">{username}</span>
              <button className="logout-button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-button">
              Login/Signup
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
