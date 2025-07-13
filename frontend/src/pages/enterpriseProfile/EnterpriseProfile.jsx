import { useState } from "react"
import { Tabs } from "antd"
import { FaEnvelope, FaInfoCircle, FaEdit, FaBuilding } from "react-icons/fa"
import { Link as LinkIcon } from "@mui/icons-material"
import JobPostHistoryTable from "../../components/Enterprise/JobPostHistoryTable.jsx"
import styles from "./style/EnterpriseProfile.module.css"
import { useAuth } from "../AuthContext.jsx"
import { getImageUrl } from "../../utils/imageUtils";

const EnterpriseProfile = () => {
    const [activeTab, setActiveTab] = useState("1")
    const { userData } = useAuth()

    const handleTabChange = (key) => {
        setActiveTab(key)
    }

    const items = [
        {
            key: "1",
            label: (
                <span className={styles.tabLabel}>
                    <FaBuilding className="me-2" />
                    Job Post History
                </span>
            ),
            children: <JobPostHistoryTable />,
        },
    ]

    return (
        <div className={styles.pageWrapper}>
            <div className="container-fluid">
                <div className={styles.profileCard}>
                    <div className="row g-0">
                        {/* Enhanced Sidebar */}
                        <div className={`col-lg-4 col-xl-3 ${styles.sidebar}`}>
                            <div className={styles.sidebarContent}>
                                {/* Profile Header */}
                                <div className={styles.profileHeader}>
                                    <div className={styles.logoWrapper}>
                                        <div
                                            className={styles.logoContainer}
                                            style={{
                                                ...(userData.logoPath
                                                    ? {
                                                        backgroundImage: `url(${getImageUrl(userData.logoPath)})`,
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                    }
                                                    : {}),
                                            }}
                                        >
                                            {!userData.logoPath && (
                                                <span className={styles.logoInitial}>
                                                    {userData.companyName ? userData.companyName.charAt(0).toUpperCase() : "C"}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.companyInfo}>
                                        <h2 className={styles.companyName}>{userData?.companyName || "Company Name"}</h2>
                                        <span className={styles.companyBadge}>Enterprise Account</span>
                                    </div>
                                </div>

                                {/* Company Details */}
                                <div className={styles.companyDetails}>
                                    {userData?.email?.trim() && (
                                        <div className={styles.detailItem}>
                                            <div className={styles.detailIcon}>
                                                <FaEnvelope />
                                            </div>
                                            <div className={styles.detailContent}>
                                                <span className={styles.detailLabel}>Email</span>
                                                <span className={styles.detailValue}>{userData.email}</span>
                                            </div>
                                        </div>
                                    )}

                                    {userData?.contactLink?.trim() && (
                                        <div className={styles.detailItem}>
                                            <div className={styles.detailIcon}>
                                                <LinkIcon />
                                            </div>
                                            <div className={styles.detailContent}>
                                                <span className={styles.detailLabel}>Website</span>
                                                <span className={styles.detailValue}>{userData.contactLink}</span>
                                            </div>
                                        </div>
                                    )}

                                    {userData?.description?.trim() && (
                                        <div className={styles.detailItem}>
                                            <div className={styles.detailIcon}>
                                                <FaInfoCircle />
                                            </div>
                                            <div className={styles.detailContent}>
                                                <span className={styles.detailLabel}>About</span>
                                                <p className={styles.detailDescription}>{userData.description}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="col-lg-8 col-xl-9">
                            <div className={styles.mainContent}>
                                <div className={styles.contentHeader}>
                                    <h3 className={styles.contentTitle}>Dashboard</h3>
                                    <p className={styles.contentSubtitle}>Manage your job posts and track applications</p>
                                </div>

                                <Tabs
                                    activeKey={activeTab}
                                    onChange={handleTabChange}
                                    items={items}
                                    className={styles.customTabs}
                                    size="large"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnterpriseProfile