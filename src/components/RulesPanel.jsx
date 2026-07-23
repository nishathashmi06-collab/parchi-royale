import React from "react";

function RulesPanel({ selectedPlayer }) {
  return (
    <div className="rules-panel">

      <h2>📜 Game Rules</h2>

      <ul>
        <li>👑 Badshah doesn't know who Chor is.</li>
        <li>🧙 Wazir must identify the Chor.</li>
        <li>⚔ Sipahi protects Badshah.</li>
        <li>🥷 Chor wins if Wazir guesses wrong.</li>
      </ul>

      <hr />

      <div className="status-box">

        <h3>🎯 Current Turn</h3>

        <p>Wazir</p>

      </div>

      <div className="status-box">

        <h3>📡 Game Status</h3>

        <p>Running</p>

      </div>

      <div className="status-box">

        <h3>👤 Selected Player</h3>

        <p>{selectedPlayer || "None"}</p>

      </div>

    </div>
  );
}

export default RulesPanel;