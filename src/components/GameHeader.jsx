import React from "react";

function GameHeader({ user, room, leaveGame }) {
  return (
    <div className="game-header">

      {/* Left */}

      <div className="profile-left">

        <div className="profile-avatar">
          👤
        </div>

        <div>

          <h3>{user?.full_name}</h3>

          <p className="online">
            🟢 Online
          </p>

        </div>

      </div>

      {/* Center */}

      <div className="center-logo">

        <h1>👑 PARCHI ROYALE</h1>

        <p>
          Room : {room?.room_code}
        </p>

      </div>

      {/* Right */}

      <div className="top-right">

        <div className="top-box">

          💰

          <br />

          {user?.coins || 0}

        </div>

        <div className="top-box">

          💎

          <br />

          {user?.diamonds || 0}

        </div>

        <div className="top-box">

          🏆

          <br />

          {user?.rank_name || "Bronze"}

        </div>

        <button
          className="leave-btn"
          onClick={leaveGame}
        >
          🚪 Exit
        </button>

      </div>

    </div>
  );
}

export default GameHeader;