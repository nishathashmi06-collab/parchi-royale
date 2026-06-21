import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateRoom() {
  const navigate = useNavigate();

  const [roomCode, setRoomCode] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    createRoom();
  }, []);

  const createRoom = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/room/create",
        {
          owner_id: user.id,
        }
      );

      setRoomCode(res.data.roomCode);

    } catch (error) {
      console.log(error);
      alert("Room creation failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "500px",
          textAlign: "center",
          padding: "30px",
          border: "2px solid gold",
          borderRadius: "15px",
        }}
      >
        <h1>🎮 Room Created</h1>

        <h2>{roomCode}</h2>

        <p>Waiting for players...</p>

        <p>Players: 1 / 4</p>

        <button
          onClick={() =>
            navigator.clipboard.writeText(roomCode)
          }
        >
          Copy Room Code
        </button>

        <br />
        <br />

        <button onClick={() => navigate("/home")}>
          Back Home
        </button>
      </div>
    </div>
  );
}

export default CreateRoom;