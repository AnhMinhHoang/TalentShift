import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/Auth.module.css";
import { useAuth } from "../AuthContext";
import { notification } from "antd";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(formData.email);
      setIsLoading(false);
      openNotification(
        "success",
        "Login succesfully!",
        "top",
        "Redirect to Homepage!"
      );
      navigate("/");
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login(formData.email);
      setIsLoading(false);
      openNotification(
        "success",
        "Login succesfully!",
        "top",
        "Redirect to Homepage!"
      );
      navigate("/");
    }, 1500);
  };

  return (
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
                            className={`form-label ${styles.formLabel}`}
                          >
                            Email Address
                          </label>
                          <div className={styles.inputWrapper}>
                            <i className="bi bi-envelope"></i>
                            <input
                              type="email"
                              className={`form-control ${styles.formInput}`}
                              id="email"
                              name="email"
                              placeholder="your@email.com"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                            <span className={styles.inputFocus}></span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <label
                              htmlFor="password"
                              className={`form-label ${styles.formLabel}`}
                            >
                              Password
                            </label>
                            <Link
                              to="/forgot-password"
                              className={styles.forgotPassword}
                            >
                              Forgot Password?
                            </Link>
                          </div>
                          <div className={styles.inputWrapper}>
                            <i className="bi bi-lock"></i>
                            <input
                              type="password"
                              className={`form-control ${styles.formInput}`}
                              id="password"
                              name="password"
                              placeholder="••••••••"
                              value={formData.password}
                              onChange={handleChange}
                              required
                            />
                            <span className={styles.inputFocus}></span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className={styles.customCheckbox}>
                            <input
                              type="checkbox"
                              id="rememberMe"
                              checked={rememberMe}
                              onChange={() => setRememberMe(!rememberMe)}
                            />
                            <label htmlFor="rememberMe">
                              <span className={styles.checkmark}>
                                <i className="bi bi-check"></i>
                              </span>
                              Remember me
                            </label>
                          </div>
                        </div>

                        <div className="d-grid gap-3 mt-4">
                          <button
                            type="submit"
                            className={`btn ${styles.primaryBtn}`}
                            disabled={isLoading}
                          >
                            {isLoading ? "Signing in..." : "Sign In"}
                          </button>
                          <button
                            type="button"
                            className={`btn ${styles.googleBtn}`}
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                          >
                            <i className="bi bi-google me-2"></i>
                            Sign in with Google
                          </button>
                        </div>
                      </form>

                      <div className={styles.divider}>
                        <span>OR</span>
                      </div>

                      <div className={styles.authFooter}>
                        <p className="text-center mb-0">
                          Don't have an account?{" "}
                          <Link to="/register" className={styles.authLink}>
                            Create Account
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.securityNote}>
              <i className="bi bi-shield-lock me-2"></i>
              <span>Secure login with 256-bit encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
