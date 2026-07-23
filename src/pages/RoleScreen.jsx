import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RoleScreen() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const roomCode = localStorage.getItem("roomCode");

  const getRole = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/room/role",
        {
          roomCode,
          username: user.username,
        }
      );

      setRole(res.data.role);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRole();

    const timer = setTimeout(() => {
      navigate("/game");
    }, 3000);

    return () => clearTimeout(timer);

  }, []);

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
        <h1>🎴 Your Secret Role</h1>

        <h2
          style={{
            color: "gold",
            fontSize: "45px",
            marginTop: "20px",
          }}
        >
          {role || "Loading..."}
        </h2>

        <p
          style={{
            marginTop: "20px",
            color: "#ccc",
          }}
        >
          Game will start in 3 seconds...
        </p>
      </div>
    </div>
  );
}

export default RoleScreen;