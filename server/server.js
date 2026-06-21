const express = require("express");
const cors = require("cors");
const roomRoutes = require("./routes/roomRoutes");
require("dotenv").config();

console.log(process.env.DB_USER);
console.log(process.env.DB_NAME);

require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes);

app.get("/", (req, res) => {
  res.send("Parchi Royale Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});