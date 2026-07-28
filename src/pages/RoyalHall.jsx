import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/RoyalHall.css";

function RoyalHall() {
  const navigate = useNavigate();
  const location = useLocation();

  const room = location.state?.room;

  const [countdown, setCountdown] = useState(8);
  const [showKing, setShowKing] = useState(false);
  const [kingText, setKingText] = useState(true);

  const players = [
    { username: room?.owner_name || "Owner" },
    { username: room?.player2 || "Empty Slot" },
    { username: room?.player3 || "Empty Slot" },
    { username: room?.player4 || "Empty Slot" },
  ];

  // King Entry Animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setKingText(false);
      setShowKing(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/role", {
            state: {
              room,
            },
          });
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate, room]);

  return (
    <div className="royalHall">
      <h1 className="title">👑 PARCHI ROYALE 👑</h1>

      <p className="subtitle">
        Welcome to the Royal Palace
      </p>

      <div className="throne">

        {kingText && (
          <div className="kingMessage">
            👑 Badshah Padhar Rahe Hain...
          </div>
        )}

        {showKing && (
          <div className="king">
            👑
          </div>
        )}

      </div>

      <div className="players">
        {players.map((player, index) => (
          <div className="player" key={index}>
            👤 {player.username}
          </div>
        ))}
      </div>

      <div className="loading">
        🏰 Royal Court opens in {countdown}s
      </div>
    </div>
  );
}

export default RoyalHall;