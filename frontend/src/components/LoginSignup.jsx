import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormValues({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/signup";

    if (!isLogin && formValues.password !== formValues.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Error during authentication");
        return;
      }

      alert(data.message);

      if (!isLogin) {
        // After signup, redirect to the login page
        navigate("/login");
      } else {
        // After login, save token and username, then redirect to MiniGames
        localStorage.setItem("token", data.token);
        // For demonstration, we'll store the username from the form.
        // In production, you should return the username from the API.
        localStorage.setItem("username", formValues.username || "User");
        navigate("/minigames");
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className="login-signup-page">
      <div className="form-container">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}
          <button type="submit" className="cta-button">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="toggle-section">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <button onClick={toggleMode} className="toggle-btn">
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button onClick={toggleMode} className="toggle-btn">
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
