import React, { useState } from "react";
import Header from "./Header";
import "./UploadEcoActionPage.css";

const UploadEcoActionPage = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // When the user submits the form, call the analyze endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/analyzeEcoAction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, description }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Error analyzing eco action");
        return;
      }
      setAnalysisResult(data.analysis);
    } catch (error) {
      console.error("Analysis error:", error);
    }
  };

  // When the user asks a follow-up question, send it to the ask endpoint
  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!chatInput) return;

    // Add the user's question to chat history
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", text: chatInput },
    ]);

    try {
      const response = await fetch("http://localhost:5000/api/askEcoAction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: chatInput, context: analysisResult }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Error getting answer");
        return;
      }
      // Append the AI's response to chat history
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", text: data.answer },
      ]);
    } catch (error) {
      console.error("Error asking question:", error);
    }
    setChatInput("");
  };

  return (
    <div className="upload-eco-action-page">
      <Header />
      <div className="upload-content">
        <h1 className="upload-title">Upload Your Eco-Friendly Action</h1>
        <form onSubmit={handleSubmit}>
          <div className="image-upload">
            <label htmlFor="image-upload">
              Upload an image of your eco-friendly action (e.g., tree planting)
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
            />
            {image && (
              <img
                src={image}
                alt="Uploaded preview"
                className="image-preview"
              />
            )}
          </div>
          <div className="description">
            <label htmlFor="description">Provide a description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain your eco-friendly action..."
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>

        {analysisResult && (
          <div className="analysis-section">
            <h2>Analysis</h2>
            <p className="analysis-result">{analysisResult}</p>
          </div>
        )}

        {analysisResult && (
          <div className="chat-section">
            <h2>Ask a Question</h2>
            <div className="chat-history">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${msg.sender}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleAskQuestion} className="chat-form">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask a question about your eco action..."
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}

        <h2>Evaluation by Others</h2>
        <div className="ratings">
          {/** Evaluation details */}
          <div className="rating">
            <h3>Evaluator 1</h3>
            <p>Rating: Not yet rated</p>
            <p>Comment: No comment yet</p>
          </div>
          <div className="rating">
            <h3>Evaluator 2</h3>
            <p>Rating: Not yet rated</p>
            <p>Comment: No comment yet</p>
          </div>
          <div className="rating">
            <h3>Evaluator 3</h3>
            <p>Rating: Not yet rated</p>
            <p>Comment: No comment yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadEcoActionPage;
