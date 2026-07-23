const express = require("express");
const router = express.Router();

const {
  createRoom,
  joinRoom,
  getRoom,
  startGame,
  getRole,
  selectPlayer,
  revealRoles,
} = require("../controllers/roomController");

router.post("/create", createRoom);
router.post("/join", joinRoom);
router.post("/select-player", selectPlayer);

router.post("/start-game", startGame);

router.post("/role", getRole);

router.get("/reveal/:roomCode", revealRoles);

router.get("/:roomCode", getRoom);

module.exports = router;