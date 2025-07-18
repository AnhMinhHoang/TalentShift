import { useState } from "react"
import { notification } from "antd"
import Sidebar from "./components/Sidebar"
import AdminOverview from "./components/AdminOverview.jsx"
import UsersTab from "./components/UsersTab"
import HirersTab from "./components/HirersTab"
import styles from "./styles/Dashboard.module.css"

const Admin = () => {
    const [activeTab, setActiveTab] = useState("dashboard")

    // Notification utility function
    const openNotification = (type, message, placement, description) => {
        notification[type]({
            message,
            description,
            placement,
            duration: 3,
            showProgress: true,
            pauseOnHover: true,
        })
    }

    const renderActiveTab = () => {
        switch (activeTab) {
            case "dashboard":
                return <AdminOverview />
            case "users":
                return <UsersTab />
            case "hirers":
                return <HirersTab openNotification={openNotification} />
            default:
                return <AdminOverview />
        }
    }

    return (
        <div className={`container-fluid ${styles.dashboard}`}>
            <div className="row">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className={`col-md-9 col-lg-10 ${styles.mainContent}`}>{renderActiveTab()}</div>
            </div>
        </div>
    )
}

export default Admin
