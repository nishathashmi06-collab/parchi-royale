import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      if (
        !formData.full_name ||
        !formData.username ||
        !formData.email ||
        !formData.password
      ) {
        alert("All fields are required");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          full_name: formData.full_name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      alert(res.data.message);

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="register-container">
      <div className="register-overlay">
        <div className="register-box">
          <h1>CREATE ACCOUNT</h1>
          <p>Join Parchi Royale and start your battle</p>

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          <button
            className="register-main-btn"
            onClick={handleRegister}
          >
            REGISTER
          </button>

          <button
            className="back-login-btn"
            onClick={() => navigate("/")}
          >
            BACK TO LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;