import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Lobby() {
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const roomCode = localStorage.getItem("roomCode");

  const getRoom = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/room/${roomCode}`
      );

      setRoom(res.data.room);

      // Auto move to Role Screen
      if (res.data.room.game_started === 1) {
        navigate("/pick-card");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const startGame = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/room/start-game",
        {
          roomCode,
        }
      );

      alert(res.data.message);

      navigate("/royal-hall", {
        state: {
          room: res.data.room,
        },
      });

    } catch (err) {
      console.log(err);
      alert("Unable to Start Game");
    }
  };

  useEffect(() => {
    if (!roomCode) return;

    getRoom();

    const interval = setInterval(() => {
      getRoom();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const isOwner = room?.owner_id === user?.id;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "650px",
          background: "#1a1a1a",
          border: "2px solid gold",
          borderRadius: "15px",
          padding: "30px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          🎮 Waiting Lobby
        </h1>

        <h2
          style={{
            textAlign: "center",
            color: "#00bfff",
          }}
        >
          {room?.room_code}
        </h2>

        <hr />

        <h3>Players</h3>

        <p>👑 {room?.owner_name || "Owner"}</p>

        <p>👤 {room?.player2 || "Empty Slot"}</p>

        <p>👤 {room?.player3 || "Empty Slot"}</p>

        <p>👤 {room?.player4 || "Empty Slot"}</p>

        <hr />

        <h2>
          Players : {room?.players_count || 1}/4
        </h2>

        {room?.players_count === 4 ? (
          <h2 style={{ color: "lime" }}>
            ✅ All Players Joined
          </h2>
        ) : (
          <h2 style={{ color: "orange" }}>
            ⏳ Waiting For Players...
          </h2>
        )}

        <br />

        {isOwner ? (
          <>
            <button
              onClick={startGame}
              style={{
                padding: "12px 25px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              🎮 Start Game
            </button>

            <button
              onClick={() =>
                navigator.clipboard.writeText(roomCode)
              }
              style={{
                padding: "12px 25px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              📋 Copy Room Code
            </button>
          </>
        ) : (
          <h2 style={{ color: "skyblue" }}>
            ⏳ Waiting For Host...
          </h2>
        )}

        <br />
        <br />

        <button
          onClick={() => {
            localStorage.removeItem("roomCode");
            navigate("/home");
          }}
          style={{
            padding: "12px 25px",
            cursor: "pointer",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          🚪 Leave Room
        </button>
      </div>
    </div>
  );
}

export default Lobby;