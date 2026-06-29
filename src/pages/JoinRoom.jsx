import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function JoinRoom() {
  const navigate = useNavigate();

  const [roomCode, setRoomCode] = useState("");

  const handleJoin = async () => {
    try {
      if (!roomCode) {
        alert("Enter Room Code");
        return;
      }

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.post(
        "http://localhost:5000/api/room/join",
        {
          roomCode,
          username: user.username,
        }
      );

      alert(res.data.message);

      localStorage.setItem(
        "roomCode",
        roomCode
      );

      navigate("/role");

    } catch (error) {
      alert(
        error?.response?.data?.message ||
        "Join Failed"
      );
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
          padding: "30px",
          textAlign: "center",
          border: "2px solid gold",
          borderRadius: "15px",
          background: "#1a1a1a",
        }}
      >
        <h1>🚪 Join Room</h1>

        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            borderRadius: "8px",
          }}
        />

        <br />
        <br />

        <button
          onClick={handleJoin}
          style={{
            padding: "12px 25px",
            cursor: "pointer",
          }}
        >
          Join Room
        </button>

        <br />
        <br />

        <button
          onClick={() => navigate("/home")}
          style={{
            padding: "12px 25px",
            cursor: "pointer",
          }}
        >
          Back Home
        </button>
      </div>
    </div>
  );
}

export default JoinRoom;