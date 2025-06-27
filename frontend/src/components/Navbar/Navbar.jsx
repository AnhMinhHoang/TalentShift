import { Link } from "react-router-dom";
import { useAuth } from "../../pages/AuthContext";

export default function Navbar() {
  const { userData, logout, loading } = useAuth();

  if (loading) return null;

  // Format balance to VND
  const formatVND = (amount) => {
    return amount !== undefined
        ? amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        : (1000000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  return (
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="/"
             style={{ textDecoration: 'none', color: 'white', pointerEvents: 'auto' }}>
            <img src="/asset/images/icons/favicon-32x32.png" alt="logo" className="me-2" />
            <span>TalentShift</span>
          </a>

          <div className="d-lg-none ms-auto me-4">
            <a href="#" className="navbar-icon bi-person smoothscroll"></a>
          </div>

          <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-lg-5 me-lg-auto">
              <li className="nav-item">
                <Link to="/#section_1" className="nav-link click-scroll">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <div>
                  <Link to="/jobs" className="nav-link">
                    Jobs
                  </Link>
                </div>
              </li>

              <li className="nav-item">
                <div>
                  <Link to="/job-posting" className="nav-link">
                    Post Job
                  </Link>
                </div>
              </li>
            </ul>

            <div className="d-none d-lg-block">
              {userData ? (
                  <div className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle text-white"
                        href="#"
                        id="userDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <div style={{ fontWeightEAD6Weight: 600, fontSize: 16, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
                        {
                          userData.role === 'HIRER'
                              ? userData.companyName
                              : userData.role === 'FREELANCER'
                                  ? userData.fullName
                                  : 'User'
                        }
                        {/* Premium Badge */}
                        {userData.premium ? (
                            <span style={{
                              background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                              color: '#000',
                              fontSize: 9,
                              fontWeight: 700,
                              padding: '2px 4px',
                              borderRadius: 8,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              boxShadow: '0 1px 3px rgba(255, 215, 0, 0.3)'
                            }}>
                            PRO
                          </span>
                        ) : (
                            <span style={{
                              background: '#6c757d',
                              color: '#fff',
                              fontSize: 9,
                              fontWeight: 600,
                              padding: '2px 4px',
                              borderRadius: 8,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                            FREE
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 13, color: '#e0e0e0', fontWeight: 400 }}>
                        Balance: <span style={{ color: '#ffd700', fontWeight: 600 }}>{formatVND(userData.balance)}</span>
                      </div>
                    </span>
                    <img
                        src={userData.avatar || '/asset/images/default-profile.jpg'}
                        alt="avatar"
                        style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', background: '#eee' }}
                    />
                  </span>
                    </a>
                    <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="userDropdown"
                    >
                      <li>
                        <Link to="/profile-page" className="dropdown-item">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/payment" className="dropdown-item">
                          Balance: <span style={{ color: '#ffd700', fontWeight: 600 }}>{formatVND(userData.balance)}</span>
                        </Link>
                      </li>
                      {/* Only show Upgrade Account if user is not premium */}
                      {!userData.premium && (
                          <li>
                            <Link to="/payment/plan" className="dropdown-item">
                              Upgrade Account
                            </Link>
                          </li>
                      )}
                      <li>
                        <button className="dropdown-item" onClick={logout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
              ) : (
                  <Link
                      to="/login"
                      className="navbar-icon bi-person smoothscroll"
                  ></Link>
              )}
            </div>
          </div>
        </div>
      </nav>
  );
}