const db = require("../config/db");

// CREATE ROOM
const createRoom = async (req, res) => {
  try {
    const { owner_id } = req.body;

    const roomCode =
      "ROOM-" + Math.floor(100000 + Math.random() * 900000);

    await db.promise().query(
      `INSERT INTO rooms (room_code, owner_id)
       VALUES (?, ?)`,
      [roomCode, owner_id]
    );

    res.status(201).json({
      success: true,
      roomCode,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Room creation failed",
    });
  }
};

// JOIN ROOM
const joinRoom = async (req, res) => {
  try {
    const { roomCode, username } = req.body;

    console.log("ROOM:", roomCode);
    console.log("USERNAME:", username);

    const [rooms] = await db.promise().query(
      "SELECT * FROM rooms WHERE room_code = ?",
      [roomCode]
    );

    if (rooms.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Room Not Found",
      });
    }

    const room = rooms[0];

    if (room.players_count >= 4) {
      return res.status(400).json({
        success: false,
        message: "Room Full",
      });
    }

    if (room.players_count === 1) {
      await db.promise().query(
        "UPDATE rooms SET player2 = ?, players_count = 2 WHERE room_code = ?",
        [username, roomCode]
      );
    } else if (room.players_count === 2) {
      await db.promise().query(
        "UPDATE rooms SET player3 = ?, players_count = 3 WHERE room_code = ?",
        [username, roomCode]
      );
    } else if (room.players_count === 3) {
      await db.promise().query(
        "UPDATE rooms SET player4 = ?, players_count = 4 WHERE room_code = ?",
        [username, roomCode]
      );
    }

    const [updatedRoom] = await db.promise().query(
      "SELECT * FROM rooms WHERE room_code = ?",
      [roomCode]
    );

    res.status(200).json({
      success: true,
      message: "Joined Successfully",
      room: updatedRoom[0],
    });

  } catch (error) {
    console.log("JOIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRoom,
  joinRoom,
};