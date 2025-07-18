import { motion } from "framer-motion"
import { HiChartBar, HiUsers, HiOfficeBuilding, HiLogout } from "react-icons/hi"
import styles from "../styles/Dashboard.module.css"
import { useState } from "react"

const Sidebar = ({ activeTab, setActiveTab }) => {
    const [showLogoutModal, setShowLogoutModal] = useState(false)

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: HiChartBar },
        { id: "users", label: "All Users", icon: HiUsers },
        { id: "hirers", label: "Hirers", icon: HiOfficeBuilding },
    ]

    const handleLogout = () => {
        // Add your logout logic here
        console.log("User logged out")
        // Example: Clear localStorage, redirect to login page, etc.
        // localStorage.removeItem('authToken')
        // window.location.href = '/login'
        setShowLogoutModal(false)
    }

    return (
        <motion.div
            className={`col-md-3 col-lg-2 ${styles.sidebar}`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.sidebarHeader}>
                <motion.h4
                    className={styles.sidebarTitle}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    AdminHub
                </motion.h4>
                <p className={styles.sidebarSubtitle}>Management Portal</p>
            </div>
            <nav className={styles.sidebarNav}>
                {navItems.map((item, index) => {
                    const IconComponent = item.icon
                    return (
                        <motion.div
                            key={item.id}
                            className={styles.navItem}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <motion.button
                                className={`${styles.navLink} ${activeTab === item.id ? styles.active : ""}`}
                                onClick={() => setActiveTab(item.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <IconComponent className={styles.navIcon} />
                                {item.label}
                            </motion.button>
                        </motion.div>
                    )
                })}
            </nav>

            {/* Logout Section */}
            <div className={styles.sidebarFooter}>
                <motion.button
                    className={styles.logoutButton}
                    onClick={() => setShowLogoutModal(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <HiLogout className={styles.navIcon} />
                    Logout
                </motion.button>
            </div>
            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            background: "var(--white-color)",
                            borderRadius: "20px",
                            padding: "2rem",
                            maxWidth: "400px",
                            width: "90%",
                            boxShadow: "var(--shadow-xl)",
                            border: "1px solid var(--border-color)",
                        }}
                    >
                        <h3
                            style={{
                                color: "var(--primary-color)",
                                fontSize: "1.5rem",
                                fontWeight: "700",
                                marginBottom: "1rem",
                                textAlign: "center",
                            }}
                        >
                            Confirm Logout
                        </h3>
                        <p
                            style={{
                                color: "var(--p-color)",
                                fontSize: "1rem",
                                marginBottom: "2rem",
                                textAlign: "center",
                            }}
                        >
                            Are you sure you want to logout from the admin dashboard?
                        </p>
                        <div
                            style={{
                                display: "flex",
                                gap: "1rem",
                                justifyContent: "center",
                            }}
                        >
                            <motion.button
                                onClick={() => setShowLogoutModal(false)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: "var(--section-bg-color)",
                                    color: "var(--p-color)",
                                    border: "2px solid var(--border-color)",
                                    padding: "0.75rem 1.5rem",
                                    borderRadius: "12px",
                                    fontSize: "0.875rem",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                Cancel
                            </motion.button>
                            <motion.button
                                onClick={handleLogout}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: "#dc3545",
                                    color: "var(--white-color)",
                                    border: "none",
                                    padding: "0.75rem 1.5rem",
                                    borderRadius: "12px",
                                    fontSize: "0.875rem",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                }}
                            >
                                <HiLogout />
                                Logout
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    )
}

export default Sidebar
