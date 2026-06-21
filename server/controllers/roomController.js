const db = require("../config/db");

const createRoom = async (req, res) => {
  try {
    const { owner_id } = req.body;

    const roomCode =
      "ROOM-" + Math.floor(100000 + Math.random() * 900000);

    await db.promise().query(
      `INSERT INTO rooms
      (room_code, owner_id)
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

// module.exports = {
//   createRoom,
// };

const joinRoom = async (req, res) => {
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

    await db.promise().query(
      "UPDATE rooms SET players_count = players_count + 1 WHERE room_code = ?",
      [roomCode]
    );

    res.json({
      success: true,
      message: "Joined Successfully",
      room: rooms[0],
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