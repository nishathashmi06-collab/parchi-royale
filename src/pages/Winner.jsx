import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Winner.css";

function Winner() {

    const navigate = useNavigate();

    const winner = localStorage.getItem("winner");

    const coins = localStorage.getItem("coins");

    const xp = localStorage.getItem("xp");

    const playAgain = () => {

        navigate("/create-room");

    };

    return (

        <div className="winner-page">

            <div className="winner-card">

                <h1>🏆 WINNER</h1>

                <h2>{winner}</h2>

                <h3>🪙 +{coins} Coins</h3>

                <h3>⭐ +{xp} XP</h3>

                <button
                    className="winner-btn"
                    onClick={playAgain}
                >
                    🔄 Play Again
                </button>

                <button
                    className="winner-btn home"
                    onClick={() => navigate("/home")}
                >
                    🏠 Home
                </button>

            </div>

        </div>

    );

}

export default Winner;