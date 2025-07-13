import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/Auth.module.css";
import { useAuth } from "../AuthContext";
import { notification } from "antd";
import { useGoogleLogin } from '@react-oauth/google';
import { Modal } from 'antd';
import axios from "axios";
import apiPublic from "../../services/apiPublic";
import Loading from '../../components/Loading/Loading.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { login, register, userData } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState('FREELANCER');
  const [googleUser, setGoogleUser] = useState(null);

  useEffect(() => {
    document
      .querySelector(`.${styles.authCard}`)
      .classList.add(styles.fadeInUp);
  }, []);

  const openNotification = (type, message, placement, description) => {
    notification[type]({
      message,
      description,
      placement,
      duration: 3,
      showProgress: true,
      pauseOnHover: true,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNavigate = () => {
    if (userData && userData.fillingForm) {
      openNotification(
        "success",
        "Login successful!",
        "top",
        "Redirecting to Homepage!"
      );
      navigate("/");
    }
    else if (userData && !userData.fillingForm) {
      openNotification(
        "warning",
        "Account not verified",
        "top",
        "Please fill in all of your neccessary information before continue using our service!"
      );
      if (userData.role === "FREELANCER") {
        navigate("/register-additional");
      } else if (userData.role === "HIRER") {
        navigate("/hirer-additional");
      }
    }
  }

  useEffect(() => {
    if (userData) {
      handleNavigate();
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.password);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Invalid email or password");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const userInfo = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${credentialResponse.access_token}` },
        })
        .then(res => res.data);

      const email = userInfo.email;
      const response = await apiPublic.post('/auth/google-check', { email });
      const data = await response.data;
      if (data.exists) {
        await login(email, null, true);
      } else {
        setGoogleUser(userInfo);
        setRoleModalVisible(true);
      }
    } catch (error) {
      openNotification('error', 'Google Login Failed', 'top', error.message || 'Something went wrong');
    }
  };

  const handleRoleSelect = async () => {
    try {
      const payload = {
        fullName: `${googleUser.given_name || ''} ${googleUser.family_name || ''}`.trim(),
        email: googleUser.email,
        password: "",
        role: selectedRole,
      };
      await register(
        payload.email,
        payload.password,
        payload.role,
        payload.fullName
      )
      setRoleModalVisible(false);
      if (selectedRole === 'FREELANCER') {
        openNotification("success", "Register successful!", "top");
        navigate('/register-additional');
      } else {
        openNotification("success", "Register successful!", "top");
        navigate('/hirer-additional');
      }
    } catch (error) {
      openNotification('error', 'Registration Failed', 'top', error.message || 'Something went wrong');
    }
  };

  const googleButtonOnClick = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: () => openNotification('error', 'Google Login Failed', 'top', ''),
  });

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className={styles.authContainer}>
        <div className={styles.shapesContainer}>
          <div className={`${styles.shape} ${styles.shape1}`}></div>
          <div className={`${styles.shape} ${styles.shape2}`}></div>
          <div className={`${styles.shape} ${styles.shape3}`}></div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-8">
              <div className={styles.brandLogo}>
                <div className={styles.logoCircle}>
                  <span>TS</span>
                </div>
                <h3>Talent Shift</h3>
              </div>

              <div className={`card ${styles.authCard}`}>
                <div className="row g-0">
                  <div className="col-md-5 d-none d-md-block">
                    <div className={styles.authSidebar}>
                      <div className={styles.sidebarContent}>
                        <h2>Welcome Back</h2>
                        <p>
                          Log in to access your account and continue your journey
                          with us.
                        </p>
                        <div className={styles.sidebarIllustration}>
                          <i className="bi bi-person-check-fill"></i>
                        </div>
                        <div className={styles.testimonial}>
                          <p>
                            "The platform has transformed how I find work
                            opportunities."
                          </p>
                          <div className={styles.testimonialAuthor}>
                            <span>— Sarah Johnson</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-7">
                    <div className={styles.authContent}>
                      <div className={styles.authHeader}>
                        <h2>Sign In</h2>
                        <p className="text-muted">
                          Access your Talent Shift account
                        </p>
                      </div>

                      <div className="card-body p-5">
                        {error && (
                          <div
                            className={`alert alert-danger ${styles.customAlert}`}
                          >
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            {error}
                          </div>
                        )}

                        <form onSubmit={handleSubmit}>
                          <div className="mb-4">
                            <label
                              htmlFor="email"
                              className={`form-label ${styles.formLabel}`