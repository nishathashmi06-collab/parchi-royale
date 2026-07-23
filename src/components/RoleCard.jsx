import React from "react";

function RoleCard({ role, confirmGuess, guessSubmitted }) {
  return (
    <div className="role-panel">

      <h2>Your Secret Role</h2>

      <div className="role-card">

        <div className="role-icon">

          {role === "Badshah" && "👑"}
          {role === "Wazir" && "🧙"}
          {role === "Sipahi" && "⚔"}
          {role === "Chor" && "🥷"}

        </div>

        <h1>{role}</h1>

      </div>

      {role === "Badshah" && (
        <p className="waiting">
          👑 Wait...
          <br />
          Wazir is finding Chor
        </p>
      )}

      {role === "Sipahi" && (
        <p className="waiting">
          ⚔ Protect Your Badshah
        </p>
      )}

      {role === "Chor" && (
        <p className="waiting">
          🥷 Stay Hidden...
        </p>
      )}

      {role === "Wazir" && (
        <>
          <h3 className="choose">
            Select The Chor
          </h3>

          <button
            className="confirm-btn"
            onClick={confirmGuess}
            disabled={guessSubmitted}
          >
            {guessSubmitted ? "Waiting..." : "Confirm Guess"}
          </button>
        </>
      )}

    </div>
  );
}

export default RoleCard;