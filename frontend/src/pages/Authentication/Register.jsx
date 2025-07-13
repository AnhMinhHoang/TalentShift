import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/Auth.module.css";
import { useAuth } from "../AuthContext";
import { notification } from "antd";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const { register, userData } = useAuth();
  const emailRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "FREELANCER",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [agreeTerms, setAgreeTerms] = useState(false);

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

  const validatePassword = (password) => {
    const validation = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    };

    const errors = [];
    if (!validation.minLength) errors.push("At least 8 characters");
    if (!validation.hasUppercase) errors.push("One uppercase letter");
    if (!validation.hasLowercase) errors.push("One lowercase letter");
    if (!validation.hasNumber) errors.push("One number");
    if (!validation.hasSpecialChar) errors.push("One special character");

    setPasswordValidation(validation);
    setPasswordErrors(errors);

    return Object.values(validation).every(Boolean);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      // Calculate strength
      let strength = 0;
      if (value.length >= 8) strength += 1;
      if (value.match(/[A-Z]/)) strength += 1;
      if (value.match(/[a-z]/)) strength += 1;
      if (value.match(/[0-9]/)) strength += 1;
      if (value.match(/[^A-Za-z0-9]/)) strength += 1;
      setPasswordStrength(strength);

      // Validate password
      validatePassword(value);
    }
  };

  const handleUserTypeSelect = (type) => {
    setFormData({
      ...formData,
      userType: type,
    });
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.userType) {
        setError("Please select a role");
        return;
      }
      setError("");
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setError("Please fill in all fields");
      return;
    }

    if (!emailRef.current.checkValidity()) {
      emailRef.current.reportValidity();
      return;
    }

    // Validate password
    if (!validatePassword(formData.password)) {
      setError("Password does not meet requirements");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Confirm Password must be the same as Password");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms and Conditions");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await register(
          formData.email,
          formData.password,
          formData.userType,
          ""
      );
      setIsLoading(false);
      openNotification("success", "Register successful!", "top");

      if (formData.userType === "FREELANCER") {
        navigate("/register-additional");
      } else if (formData.userType === "HIRER") {
        navigate("/hirer-additional");
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Something went wrong");
    }
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
            <div className="col-md-10 col-lg-8">
              <div className={styles.brandLogo}>
                <div className={styles.logoCircle}>
                  <span>WF</span>
                </div>
                <h3>Talent Shift</h3>
              </div>

              <div className={`card ${styles.authCard}`}>
                <div className="row g-0">
                  <div className="col-lg-4 d-none d-lg-block">
                    <div className={styles.authSidebar}>
                      <div className={styles.sidebarContent}>
                        <h2>Join Talent Shift</h2>
                        <p>
                          Create an account to connect with clients and
                          freelancers worldwide.
                        </p>
                        <div className={styles.registerSteps}>
                          <div
                              className={`${styles.stepItem} ${step >= 1 ? styles.stepActive : ""
                              }`}
                          >
                            <div className={styles.stepNumber}>1</div>
                            <div className={styles.stepText}>
                              <h6>Account Type</h6>
                              <p>Choose your role</p>
                            </div>
                          </div>
                          <div
                              className={`${styles.stepItem} ${step >= 2 ? styles.stepActive : ""
                              }`}
                          >
                            <div className={styles.stepNumber}>2</div>
                            <div className={styles.stepText}>
                              <h6>Account Info</h6>
                              <p>Basic information</p>
                            </div>
                          </div>
                        </div>
                        <div className={styles.sidebarIllustration}>
                          <i className="bi bi-people-fill"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-8">
                    <div className={styles.authContent}>
                      <div className={styles.authHeader}>
                        <h2>Create Account</h2>
                        <p className="text-muted">Join our community today</p>

                        <div className={styles.progressContainer}>
                          <div
                              className={styles.progressBar}
                              style={{ width: step === 1 ? "50%" : "100%" }}
                          ></div>
                        </div>
                      </div>

                      <div className="card-body p-4">
                        {error && (
                            <div
                                className={`alert alert-danger ${styles.customAlert}`}
                            >
                              <i className="bi bi-exclamation-triangle-fill me-2"></i>
                              {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                          {step === 1 && (
                              <>
                                <div className="mb-4">
                                  <label
                                      className={`form-label ${styles.formLabel}`}
                                  >
                                    I am a:
                                  </label>
                                  <div className="row mt-3">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                      <div
                                          className={`${styles.userTypeCard} ${formData.userType === "FREELANCER"
                                              ? styles.userTypeCardActive
                                              : ""
                                          }`}
                                          onClick={() => handleUserTypeSelect("FREELANCER")}
                                      >
                                        <div className={styles.userTypeIcon}>
                                          <i className="bi bi-person-workspace"></i>
                                        </div>
                                        <div className={styles.userTypeContent}>
                                          <h5>Freelancer</h5>
                                          <p>
                                            I want to work on projects and offer my
                                            services
                                          </p>
                                          <ul className={styles.userTypeFeatures}>
                                            <li>
                                              <i className="bi bi-check-circle-fill"></i>{" "}
                                              Find projects
                                            </li>
                                            <li>
                                              <i className="bi bi-check-circle-fill"></i>{" "}
                                              Showcase skills
                                            </li>
                                            <li>
                                              <i className="bi bi-check-circle-fill"></i>{" "}
                                              Get paid
                                            </li>
                                          </ul>
                                        </div>
                                        <div className={styles.userTypeRadio}>
                                          <input
                                              type="radio"
                                              name="userType"
                                              id="freelancer"
                                              value="FREELANCER"
                                              checked={formData.userType === "FREELANCER"}
                                              onChange={handleChange}
                                              className="form-check-input"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div
                                          className={`${styles.userTypeCard} ${formData.userType === "HIRER"
                                              ? styles.userTypeCardActive
                                              : ""
                                          }`}
                                          onClick={() => handleUserTypeSelect("HIRER")}
                                      >
                                        <div className={styles.userTypeIcon}>
                                          <i className="bi bi-briefcase"></i>
                                        </div>
                                        <div className={styles.userTypeContent}>
                                          <h5>Hirer</h5>
                                          <p>
                                            I want to hire talent and post projects
                                          </p>
                                          <ul className={styles.userTypeFeatures}>
                                            <li>
                                              <i className="bi bi-check-circle-fill"></i>{" "}
                                              Post jobs
                                            </li>
                                            <li>
                                              <i className="bi bi-check-circle-fill"></i>{" "}
                                              Find talent
                                            </li>
                                            <li>
                                              <i className="bi bi-check-circle-fill"></i>{" "}
                                              Manage projects
                                            </li>
                                          </ul>
                                        </div>
                                        <div className={styles.userTypeRadio}>
                                          <input
                                              type="radio"
                                              name="userType"
                                              id="hirer"
                                              value="HIRER"
                                              checked={formData.userType === "HIRER"}
                                              onChange={handleChange}
                                              className="form-check-input"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-grid mt-4">
                                  <button
                                      type="button"
                                      className={`btn ${styles.primaryBtn}`}
                                      onClick={nextStep}
                                  >
                                    Continue
                                    <i className="bi bi-arrow-right ms-2"></i>
                                  </button>
                                </div>
                              </>
                          )}

                          {step === 2 && (
                              <>
                                <div className="row mb-3">
                                  <div className="col-12">
                                    <label
                                        htmlFor="email"
                                        className={`form-label ${styles.formLabel}`}
                                    >
                                      Email
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
                                          ref={emailRef}
                                          required
                                      />
                                      <span className={styles.inputFocus}></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <label
                                      htmlFor="password"
                                      className={`form-label ${styles.formLabel}`}
                                  >
                                    Password
                                  </label>
                                  <div className={styles.inputWrapper}>
                                    <i className="bi bi-lock"></i>
                                    <input
                                        type="password"
                                        className={`form-control ${styles.formInput} ${
                                            formData.password && passwordErrors.length > 0 ? 'is-invalid' : ''
                                        }`}
                                        id="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className={styles.inputFocus}></span>
                                  </div>

                                  {/* Password Validation Message */}
                                  {formData.password && passwordErrors.length > 0 && (
                                      <div className="invalid-feedback d-block">
                                        <small>Password must include: {passwordErrors.join(', ')}</small>
                                      </div>
                                  )}

                                  <div className={styles.passwordStrength}>
                                    <div className={styles.strengthText}>
                                      Password Strength:
                                      <span
                                          className={
                                            passwordStrength < 2
                                                ? styles.strengthWeak
                                                : passwordStrength < 4
                                                    ? styles.strengthMedium
                                                    : styles.strengthStrong
                                          }
                                      >
                                    {passwordStrength < 2
                                        ? " Weak"
                                        : passwordStrength < 4
                                            ? " Medium"
                                            : " Strong"}
                                  </span>
                                    </div>
                                    <div className={styles.strengthBars}>
                                  <span
                                      className={
                                        passwordStrength >= 1
                                            ? styles.strengthActive
                                            : ""
                                      }
                                  ></span>
                                      <span
                                          className={
                                            passwordStrength >= 2
                                                ? styles.strengthActive
                                                : ""
                                          }
                                      ></span>
                                      <span
                                          className={
                                            passwordStrength >= 3
                                                ? styles.strengthActive
                                                : ""
                                          }
                                      ></span>
                                      <span
                                          className={
                                            passwordStrength >= 4
                                                ? styles.strengthActive
                                                : ""
                                          }
                                      ></span>
                                      <span
                                          className={
                                            passwordStrength >= 5
                                                ? styles.strengthActive
                                                : ""
                                          }
                                      ></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="mb-4">
                                  <label
                                      htmlFor="confirmPassword"
                                      className={`form-label ${styles.formLabel}`}
                                  >
                                    Confirm Password
                                  </label>
                                  <div className={styles.inputWrapper}>
                                    <i className="bi bi-lock"></i>
                                    <input
                                        type="password"
                                        className={`form-control ${styles.formInput} ${
                                            formData.confirmPassword && formData.password !== formData.confirmPassword ? 'is-invalid' : ''
                                        }`}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className={styles.inputFocus}></span>
                                  </div>
                                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                      <div className="invalid-feedback d-block">
                                        <small>Passwords do not match</small>
                                      </div>
                                  )}
                                </div>
                                <div className="mb-4">
                                  <label className={styles.customCheckbox}>
                                    <input
                                        type="checkbox"
                                        checked={agreeTerms}
                                        onChange={() => setAgreeTerms(!agreeTerms)}
                                    />
                                    <span className={styles.checkmark}>
                                  <i className="bi bi-check"></i>
                                </span>
                                    I agree to the{" "}
                                    <a href="#" className={styles.termsLink}>
                                      Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className={styles.termsLink}>
                                      Privacy Policy
                                    </a>
                                  </label>
                                </div>
                                <div className="d-flex gap-3 mt-4">
                                  <button
                                      type="button"
                                      className={`btn ${styles.secondaryBtn}`}
                                      onClick={prevStep}
                                  >
                                    <i className="bi bi-arrow-left me-2"></i>
                                    Back
                                  </button>
                                  <button
                                      type="submit"
                                      className={`btn ${styles.primaryBtn} flex-grow-1`}
                                      disabled={isLoading || !agreeTerms || passwordErrors.length > 0}
                                  >
                                    {isLoading ? (
                                        <>
                                    <span
                                        className={styles.spinnerBorder}
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                          <span className="ms-2">
                                      Creating account...
                                    </span>
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}
                                  </button>
                                </div>
                              </>
                          )}
                        </form>

                        <div className={`${styles.authFooter} mt-4`}>
                          <p className="text-center mb-0">
                            Already have an account?{" "}
                            <Link to="/login" className={styles.authLink}>
                              Sign In
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
                <span>Your data is protected with enterprise-grade security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}