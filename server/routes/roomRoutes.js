const express = require("express");
const router = express.Router();

const {
  createRoom,
  joinRoom,
  getRoom,
  startGame,
  getRole,
} = require("../controllers/roomController");

router.post("/create", createRoom);
router.post("/join", joinRoom);

router.post("/start-game", startGame);

router.post("/role", getRole);

router.get("/:roomCode", getRoom);

module.exports = router;