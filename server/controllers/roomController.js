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

    // OWNER
    if (room.owner_name === username) {
      role = room.player1_role;
    }

    // PLAYER 2
    else if (room.player2 === username) {
      role = room.player2_role;
    }

    // PLAYER 3
    else if (room.player3 === username) {
      role = room.player3_role;
    }

    // PLAYER 4
    else if (room.player4 === username) {
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


// SELECT PLAYER (WAZIR GUESS)
// SELECT PLAYER (WAZIR GUESS)

const selectPlayer = async (req, res) => {
  try {
    const { roomCode, selectedPlayer } = req.body;

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

    let correct = false;

    // Check if selected player is Chor
    if (
      (room.owner_name === selectedPlayer &&
        room.player1_role === "Chor") ||

      (room.player2 === selectedPlayer &&
        room.player2_role === "Chor") ||

      (room.player3 === selectedPlayer &&
        room.player3_role === "Chor") ||

      (room.player4 === selectedPlayer &&
        room.player4_role === "Chor")
    ) {
      correct = true;
    }

    const winner = correct
      ? "Badshah Team"
      : "Chor";

    // Save result
    await db.promise().query(
      `UPDATE rooms
       SET
       selected_player = ?,
       winner = ?,
       game_status = 'finished'
       WHERE room_code = ?`,
      [
        selectedPlayer,
        winner,
        roomCode,
      ]
    );

    res.json({
      success: true,
      correct,
      winner,
      selectedPlayer,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// REVEAL ALL ROLES

const revealRoles = async (req, res) => {
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

    const room = rooms[0];

    res.json({
      success: true,

      room: {
        owner_name: room.owner_name,
        player2: room.player2,
        player3: room.player3,
        player4: room.player4,

        player1_role: room.player1_role,
        player2_role: room.player2_role,
        player3_role: room.player3_role,
        player4_role: room.player4_role,

        winner: room.winner,
        selected_player: room.selected_player,
      },
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
  selectPlayer,
  revealRoles,   // 👈 add
};