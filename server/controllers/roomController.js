const db = require("../config/db");

// CREATE ROOM
// CREATE ROOM
const createRoom = async (req, res) => {
  try {
    const { owner_id, owner_name } = req.body;

    const roomCode =
      "ROOM-" + Math.floor(100000 + Math.random() * 900000);

    await db.promise().query(
      `INSERT INTO rooms
      (room_code, owner_id, owner_name)
      VALUES (?, ?, ?)`,
      [roomCode, owner_id, owner_name]
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


const getRoom = async (req, res) => {
  try {
    const { roomCode } = req.params;

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

    res.json({
      success: true,
      room: rooms[0],
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const startGame = async (req, res) => {
  try {
    const { roomCode } = req.body;

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

    const roles = [
      "Badshah",
      "Wazir",
      "Sipahi",
      "Chor",
    ];

    roles.sort(() => Math.random() - 0.5);

    await db.promise().query(
      `UPDATE rooms
       SET game_started = 1,
       player1_role = ?,
       player2_role = ?,
       player3_role = ?,
       player4_role = ?
       WHERE room_code = ?`,
      [
        roles[0],
        roles[1],
        roles[2],
        roles[3],
        roomCode,
      ]
    );

    res.json({
      success: true,
      message: "Game Started",
      roles,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getRole = async (req, res) => {
  try {
    const { roomCode, username } = req.body;

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

    let role = "";

    if (room.player2 === username) {
      role = room.player2_role;
    } else if (room.player3 === username) {
      role = room.player3_role;
    } else if (room.player4 === username) {
      role = room.player4_role;
    }

    res.json({
      success: true,
      role,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createRoom,
  joinRoom,
  getRoom,
  startGame,
  getRole,
};