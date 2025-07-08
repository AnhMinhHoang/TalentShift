import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import styles from "../assets/css/LoginRegister.module.css";
import axios from "axios";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

function LoginRegister() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isPublish, setisPublish] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "2",
  });

  const handleRegisterClick = () => setisPublish(true);
  const handleLoginClick = () => setisPublish(false);
  const emailPlaceHolder = user.role === "1" ? "Work Email" : "Email";

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // try {
    //     const response = await axios.post("http://localhost:8080/auth/login", {
    //         email: user.email,
    //         password: user.password,
    //     });

    //     alert("Login successful with role " + response.data.message);
    // }
    // catch (error) {
    //     if (error.response) {
    //         alert(error.response.data.error);
    //     } else {
    //         alert("Something went wrong. Try again.");
    //     }
    // }
    login(user.email);
    openNotification(
      "success",
      "Login succesfully!",
      "top",
      "Redirect to Homepage!"
    );
    navigate("/");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // try{
    //     await axios.post("http://localhost:8080/auth/register", user)
    //     alert("Registration successful! Please login.");
    //     setisPublish(false);
    // }
    // catch (error) {
    //     if (error.response) {
    //         alert(error.response.data.error);
    //     } else {
    //         alert("Something went wrong. Try again.");
    //     }
    // }
    openNotification("success", "Register succesfully!", "top", "");
    navigate("/register-addition");
  };

  const openNotification = (type, message, placement, description) => {
    notification[type]({
      message,
      description,
      placement,
      duration: 3,
    });
  };

  return (
    <main className={styles.Wrapper}>
      <div className={`${styles.container} ${isPublish ? styles.active : ""}`}>
        <div className={`${styles.formBox} login`}>
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            {/* Login input field */}
            <div className={styles.inputBox}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={user.email}
                required
                onChange={handleInputChange}
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className={styles.inputBox}>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                required
                onChange={handleInputChange}
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className={styles.forgotLink}>
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className={styles.btn}>
              Login
            </button>
            <p className={styles.signWith}>or login with Google</p>
            <div className={styles.socialIcons}>
              <a href="">
                <i className="bx bxl-google"></i>
              </a>
            </div>
          </form>
        </div>

        <div className={`${styles.formBox} ${styles.register}`}>
          <form onSubmit={handleRegister}>
            <h1>Register</h1>
            {/* Role selection */}
            <div className={styles.roleSelection}>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="2"
                  id="freelancer-radio"
                  checked={user.role === "2"}
                  onChange={handleInputChange}
                />{" "}
                Freelancer
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="1"
                  id="hirer-radio"
                  checked={user.role === "1"}
                  onChange={handleInputChange}
                />{" "}
                Hirer
              </label>
            </div>

            {/* Register input field */}
            <div className={styles.nameContainer}>
              <div className={`${styles.inputBox} ${styles.nameBox}`}>
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  name="firstName"
                  value={user.firstName}
                  onChange={handleInputChange}
                />
                <i className="bx bxs-user"></i>
              </div>
              <div className={`${styles.inputBox} ${styles.nameBox}`}>
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  name="lastName"
                  value={user.lastName}
                  onChange={handleInputChange}
                />
                <i className="bx bxs-user"></i>
              </div>
            </div>
            <div className={styles.inputBox}>
              <input
                type="email"
                id="email-input"
                placeholder={emailPlaceHolder}
                required
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
              <i className="bx bxs-envelope"></i>
            </div>
            <div className={styles.inputBox}>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={user.password}
                onChange={handleInputChange}
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className={styles.btn}>
              Register
            </button>
            <p className={styles.signWith}>or register with Google</p>
            <div className={styles.socialIcons}>
              <a href="">
                <i className="bx bxl-google"></i>
              </a>
            </div>
          </form>
        </div>

        {/* Toggle login register */}
        <div className={styles.toggleBox}>
          <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
            <h1>Hello, Welcome</h1>
            <p>Don't have an account?</p>
            <button className={styles.btn} onClick={handleRegisterClick}>
              Register
            </button>
          </div>
          <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
            <h1>Welcome Back</h1>
            <p>Already have an account?</p>
            <button className={styles.btn} onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginRegister;
