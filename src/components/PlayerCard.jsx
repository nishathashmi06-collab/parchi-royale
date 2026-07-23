import React from "react";

function PlayerCard({
  player,
  selectedPlayer,
  setSelectedPlayer,
  role,
  owner,
}) {
  return (
    <div
      className={
        selectedPlayer === player
          ? "player-card active"
          : "player-card"
      }
      onClick={() => {
        if (role === "Wazir" && player !== owner) {
          setSelectedPlayer(player);
        }
      }}
    >
      <div className="player-level">
        LV 1
      </div>

      <div className="player-info">
        <h3>{player}</h3>

        <p className="online">
          🟢 Online
        </p>
      </div>
    </div>
  );
}

export default PlayerCard;