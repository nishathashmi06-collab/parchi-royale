import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert(res.data.message);

      navigate("/home");

    } catch (error) {
      alert(
        error?.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="overlay">
        <div className="login-box">
          <h1>PARCHI ROYALE</h1>

          <p>Badshah • Wazir • Sipahi • Chor</p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button
            className="login-btn"
            onClick={handleLogin}
          >
            LOGIN
          </button>

          <button
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;