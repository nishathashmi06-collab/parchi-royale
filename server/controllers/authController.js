const db = require("../config/db");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { full_name, username, email, password } = req.body;

    if (!full_name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const [existing] = await db
      .promise()
      .query(
        "SELECT * FROM users WHERE email = ? OR username = ?",
        [email, username]
      );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email or Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.promise().query(
      `INSERT INTO users
      (full_name, username, email, password)
      VALUES (?, ?, ?, ?)`,
      [full_name, username, email, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: "Registration Successful",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// module.exports = {
//   register,
// };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await db
      .promise()
      .query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

    if (user.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user[0].password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login Successful",
      user: user[0],
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
  register,
  login,
};