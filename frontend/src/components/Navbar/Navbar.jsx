import { Link } from "react-router-dom"
import { useAuth } from "../../pages/AuthContext"
import styles from "./Navbar.module.css"

export default function Navbar() {
  const { userData, logout, loading } = useAuth()

  if (loading) return null

  // Format balance to VND
  const formatVND = (amount) => {
    return amount !== undefined
        ? amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
        : (1000000).toLocaleString("vi-VN", { style: "currency", currency: "VND" })
  }

  // Get first letter for avatar
  const getAvatarLetter = () => {
    if (userData?.role === "HIRER") {
      return userData.companyName ? userData.companyName.charAt(0).toUpperCase() : "C"
    } else if (userData?.role === "FREELANCER") {
      return userData.fullName ? userData.fullName.charAt(0).toUpperCase() : "U"
    }
    return "U"
  }

  // Check if user has custom avatar
  const hasCustomAvatar = () => {
    if (userData?.role === "HIRER") {
      return userData.logoPath && userData.logoPath !== "/asset/images/default-company-logo.png"
    } else if (userData?.role === "FREELANCER") {
      return userData.avatar && userData.avatar !== "/asset/images/default-profile.jpg"
    }
    return false
  }

  return (
      <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
        <div className="container">
          <Link to="/" className={`navbar-brand ${styles.navbarBrand}`}>
            <div className={styles.logoContainer}>
              <img src="/asset/images/icons/favicon-32x32.png" alt="TalentShift" className={styles.logo} />
            </div>
            <span className={styles.brandText}>TalentShift</span>
          </Link>
          <div className="d-lg-none ms-auto me-4">
            <Link
                to={userData ? (userData.role === "HIRER" ? "/enterprise-profile-page" : "/profile-page") : "/login"}
                className={styles.mobileProfileIcon}
            >
              <i className="bi bi-person"></i>
            </Link>
          </div>
          <button
              className={`navbar-toggler ${styles.navbarToggler}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
            <span className={styles.navbarTogglerIcon}></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-lg-5 me-lg-auto">
              <li className="nav-item">
                <Link to="/#section_1" className={`nav-link ${styles.navLink}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/jobs" className={`nav-link ${styles.navLink}`}>
                  Jobs
                </Link>
              </li>
              {userData && userData.role === "HIRER" && (
                  <li className="nav-item">
                    <Link to="/job-posting" className={`nav-link ${styles.navLink}`}>
                      Post Job
                    </Link>
                  </li>
              )}
              {userData && userData.role === "FREELANCER" && (
                  <li className="nav-item">
                    <Link to="/profile-page?tab=applied" className={`nav-link ${styles.navLink}`}>
                      Applied Jobs
                    </Link>
                  </li>
              )}
              {userData && (
                  <li className="nav-item">
                    <Link to="/payment/plan" className={`nav-link ${styles.navLink}`}>
                      Pricing
                    </Link>
                  </li>
              )}
            </ul>
            <div className="d-none d-lg-block">
              {userData ? (
                  <div className={`nav-item dropdown ${styles.userDropdown}`}>
                    <a
                        className={`nav-link dropdown-toggle ${styles.dropdownToggle}`}
                        href="#"
                        id="userDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                      <div className={styles.userInfo}>
                        <div className={styles.userDetails}>
                          <div className={styles.userName}>
                            {userData.role === "HIRER"
                                ? userData.companyName
                                : userData.role === "FREELANCER"
                                    ? userData.fullName
                                    : "User"}
                            {userData.premium ? (
                                <span className={styles.premiumBadge}>PRO</span>
                            ) : (
                                <span className={styles.freeBadge}>FREE</span>
                            )}
                          </div>
                          <div className={styles.userBalance}>
                            Balance: <span className={styles.balanceAmount}>{formatVND(userData.balance)}</span>
                          </div>
                        </div>
                        {hasCustomAvatar() ? (
                            <img
                                src={
                                  userData.role === "HIRER"
                                      ? userData.logoPath || "/asset/images/default-company-logo.png"
                                      : userData.avatar || "/asset/images/default-profile.jpg"
                                }
                                alt="avatar"
                                className={styles.userAvatar}
                            />
                        ) : (
                            <div className={styles.defaultAvatar}>{getAvatarLetter()}</div>
                        )}
                      </div>
                    </a>
                    <ul className={`dropdown-menu dropdown-menu-end ${styles.dropdownMenu}`} aria-labelledby="userDropdown">
                      <li>
                        <Link
                            to={userData.role === "HIRER" ? "/enterprise-profile-page" : "/profile-page"}
                            className={`dropdown-item ${styles.dropdownItem}`}
                        >
                          <i className="bi bi-person me-2"></i>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/payment" className={`dropdown-item ${styles.dropdownItem}`}>
                          <i className="bi bi-wallet2 me-2"></i>
                          Balance: <span className={styles.balanceAmount}>{formatVND(userData.balance)}</span>
                        </Link>
                      </li>
                      {!userData.premium && (
                          <li>
                            <Link to="/payment/plan" className={`dropdown-item ${styles.dropdownItem} ${styles.upgradeItem}`}>
                              <i className="bi bi-star me-2"></i>
                              Upgrade Account
                            </Link>
                          </li>
                      )}
                      <li>
                        <button className={`dropdown-item ${styles.dropdownItem} ${styles.logoutItem}`} onClick={logout}>
                          <i className="bi bi-box-arrow-right me-2"></i>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
              ) : (
                  <Link to="/login" className={styles.loginIcon}>
                    <i className="bi bi-person"></i>
                  </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
  )
}
