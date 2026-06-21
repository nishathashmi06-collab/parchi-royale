import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="home-container">
      <div className="home-overlay">

        {/* Top Navbar */}
        <div className="top-bar">
          <div className="game-logo">
            <h2>👑 PARCHI ROYALE</h2>
            <p>Badshah • Wazir • Sipahi • Chor</p>
          </div>

          <div className="top-stats">
            <div className="stat-box">
              🪙 {user?.coins || 0}
            </div>

            <div className="stat-box diamond">
              💎 {user?.diamonds || 0}
            </div>

            <div className="stat-box rank">
              🏆 {user?.rank_name || "Bronze"}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="home-main">

          {/* Profile Card */}
          <div className="profile-card">
            <div className="avatar">👤</div>

            <h3>
              {user?.full_name || "Player"}
            </h3>

            <p>ID: {user?.id}</p>

            <p>
              Level: {user?.level || 1}
            </p>

            <p>
              Wins: {user?.wins || 0}
            </p>

            <p>
              Username: {user?.username}
            </p>
          </div>

          {/* Buttons */}
          <div className="action-section">
            <h1>WELCOME TO BATTLE</h1>

            <p>
              Welcome back, {user?.username}
            </p>

            <button
              className="action-btn create-btn"
              onClick={() => navigate("/create-room")}
            >
              🎮 Create Room
            </button>

            <button
              className="action-btn join-btn"
              onClick={() => navigate("/join-room")}
            >
              🚪 Join Room
            </button>

            <button className="action-btn leader-btn">
              📊 Leaderboard
            </button>

            <button
              className="action-btn logout-btn"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;