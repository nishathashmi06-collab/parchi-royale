import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateRoom() {
    const navigate = useNavigate();

    const [roomCode, setRoomCode] = useState("");
    const [roomData, setRoomData] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));

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

    const getRoomDetails = async (code) => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/room/${code}`
            );

            setRoomData(res.data.room);

        } catch (error) {
            console.log(error);
        }
    };

    const handleStartGame = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/room/start-game",
                {
                    roomCode,
                }
            );

            alert(res.data.message);

            localStorage.setItem("roomCode", roomCode);

            navigate("/role");

        } catch (error) {
            console.log(error);
            alert("Game Start Failed");
        }
    };

    useEffect(() => {
        createRoom();
    }, []);

    useEffect(() => {
        if (!roomCode) return;

        getRoomDetails(roomCode);

        const interval = setInterval(() => {
            getRoomDetails(roomCode);
        }, 3000);

        return () => clearInterval(interval);
    }, [roomCode]);

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
                    width: "600px",
                    textAlign: "center",
                    padding: "30px",
                    border: "2px solid gold",
                    borderRadius: "15px",
                    background: "#1a1a1a",
                }}
            >
                <h1>🎮 Waiting Room</h1>

                <h2>{roomCode}</h2>

                <h3>Players</h3>

                <div
                    style={{
                        textAlign: "left",
                        marginTop: "20px",
                        fontSize: "20px",
                    }}
                >
                    <p>👑 Owner</p>

                    <p>
                        👤 {roomData?.player2 || "Empty Slot"}
                    </p>

                    <p>
                        👤 {roomData?.player3 || "Empty Slot"}
                    </p>

                    <p>
                        👤 {roomData?.player4 || "Empty Slot"}
                    </p>
                </div>

                <h2>
                    Players: {roomData?.players_count || 1}/4
                </h2>

                <button
                    onClick={() =>
                        navigator.clipboard.writeText(roomCode)
                    }
                >
                    Copy Room Code
                </button>

                <br />
                <br />

                <button
                    onClick={handleStartGame}
                    style={{
                        padding: "12px 25px",
                        marginRight: "10px",
                        cursor: "pointer",
                    }}
                >
                    🎮 Start Game
                </button>

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

export default CreateRoom;