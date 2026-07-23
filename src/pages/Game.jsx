import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Game.css";
import PlayerCard from "../components/PlayerCard";
import RoleCard from "../components/RoleCard";
import RulesPanel from "../components/RulesPanel";
import GameHeader from "../components/GameHeader";

function Game() {
    const navigate = useNavigate();

    const [role, setRole] = useState("");
    const [room, setRoom] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState("");
    const [guessSubmitted, setGuessSubmitted] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const roomCode = localStorage.getItem("roomCode");

    useEffect(() => {
        getRole();
        getRoom();

        const interval = setInterval(async () => {

            try {

                const res = await axios.get(
                    `http://localhost:5000/api/room/${roomCode}`
                );

                setRoom(res.data.room);

                // Game finished?
                if (res.data.room.game_status === "finished") {

                    clearInterval(interval);

                    navigate("/reveal");

                }

            } catch (err) {
                console.log(err);
            }

        }, 2000);

        return () => clearInterval(interval);

    }, []);

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
        } catch (err) {
            console.log(err);
        }
    };

    const getRoom = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/room/${roomCode}`
            );

            setRoom(res.data.room);
        } catch (err) {
            console.log(err);
        }
    };

    const confirmGuess = async () => {
        if (!selectedPlayer) {
            alert("Please select a player.");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/api/room/select-player",
                {
                    roomCode,
                    selectedPlayer,
                }
            );

            if (res.data.correct) {

                localStorage.setItem(
                    "winner",
                    "👑 Badshah Team"
                );

            } else {

                localStorage.setItem(
                    "winner",
                    "🥷 Chor"
                );

            }

            localStorage.setItem("coins", 100);

            localStorage.setItem("xp", 25);

            setGuessSubmitted(true);

            alert("Answer Submitted. Waiting for all players...");
        } catch (err) {
            console.log(err);
        }
    };

    const leaveGame = () => {
        if (window.confirm("Leave Match?")) {
            localStorage.removeItem("roomCode");
            navigate("/home");
        }
    };

    return (
        <div className="game-page">

            {/* HEADER */}

            <GameHeader
                user={user}
                room={room}
                leaveGame={leaveGame}
            />

            {/* TOP INFO */}

            <div className="top-info">

                <div className="info-card">
                    <span>ROOM</span>
                    <h2>{room?.room_code}</h2>
                </div>

                <div className="info-card">
                    <span>PLAYERS</span>
                    <h2>{room?.players_count || 1}/4</h2>
                </div>

                <div className="info-card">
                    <span>ROUND</span>
                    <h2>1</h2>
                </div>

            </div>

            {/* BODY */}

            <div className="game-body">

                {/* LEFT */}

                <div className="players-panel">

                    <h2>Players</h2>

                    {[
                        room?.owner_name,
                        room?.player2,
                        room?.player3,
                        room?.player4,
                    ]
                        .filter(Boolean)
                        .map((player) => (
                            <PlayerCard
                                key={player}
                                player={player}
                                selectedPlayer={selectedPlayer}
                                setSelectedPlayer={setSelectedPlayer}
                                role={role}
                                owner={room?.owner_name}
                            />
                        ))}
                </div>

                {/* CENTER */}

                <RoleCard
                    role={role}
                    confirmGuess={confirmGuess}
                    guessSubmitted={guessSubmitted}
                />

                {/* RIGHT */}

                <RulesPanel
                    selectedPlayer={selectedPlayer}
                />

            </div>

        </div>

    );

}

export default Game;