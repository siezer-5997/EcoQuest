import React from "react";
import Header from "./Header";
import RecyclingGame from "./RecyclingGame";
import "./MiniGames.css"; // Optionally add styles specific to the minigames page

const MiniGames = () => {
  return (
    <div className="minigames-page">
      <Header />
      <main className="minigames-content">
        <RecyclingGame />
      </main>
    </div>
  );
};

export default MiniGames;
