import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Reveal.css";

function Reveal() {
  const navigate = useNavigate();

  const roomCode = localStorage.getItem("roomCode");

  const [room, setRoom] = useState(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    getReveal();
  }, []);

  const getReveal = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/room/reveal/${roomCode}`
      );

      setRoom(res.data.room);

      // Reveal animation
      setTimeout(() => setStep(1), 1000);
      setTimeout(() => setStep(2), 2000);
      setTimeout(() => setStep(3), 3000);
      setTimeout(() => setStep(4), 4000);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reveal-page">

      <h1>🎴 Revealing All Roles...</h1>

      <div className="cards">

        <div className="card">
          {step >= 1 ? (
            <>
              <h2>{room?.owner_name}</h2>
              <h3>{room?.player1_role}</h3>
            </>
          ) : (
            "🃏"
          )}
        </div>

        <div className="card">
          {step >= 2 ? (
            <>
              <h2>{room?.player2}</h2>
              <h3>{room?.player2_role}</h3>
            </>
          ) : (
            "🃏"
          )}
        </div>

        <div className="card">
          {step >= 3 ? (
            <>
              <h2>{room?.player3}</h2>
              <h3>{room?.player3_role}</h3>
            </>
          ) : (
            "🃏"
          )}
        </div>

        <div className="card">
          {step >= 4 ? (
            <>
              <h2>{room?.player4}</h2>
              <h3>{room?.player4_role}</h3>
            </>
          ) : (
            "🃏"
          )}
        </div>

      </div>

      {step === 4 && (

        <div className="winner-box">

          <h1>
            🏆 {room?.winner}
          </h1>

          <button
            className="continue-btn"
            onClick={() => navigate("/winner")}
          >
            Continue →
          </button>

        </div>

      )}

    </div>
  );
}

export default Reveal;