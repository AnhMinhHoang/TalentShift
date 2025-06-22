import React from "react"
import { useState } from "react"
import { Tabs, notification } from "antd"
import { FaBuilding, FaHistory, FaFileAlt, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from "react-icons/fa"
import GeneralInfoForm from "../../components/Enterprise/GeneralInfoForm"
import JobPostHistoryTable from "../../components/Enterprise/JobPostHistoryTable"
import DraftJobPostList from "../../components/Enterprise/DraftJobPostList"
import styles from "./style/EnterpriseProfile.module.css"

const { TabPane } = Tabs

const EnterpriseProfile = () => {
    const [activeTab, setActiveTab] = useState("1")

    // Sample company data based on the image
    const [companyData, setCompanyData] = useState({
        name: "TechCorp Solutions",
        logo: "/placeholder.svg?height=150&width=150",
        email: "contact@techcorp.com",
        phone: "123-456-7890",
        location: "San Francisco, CA",
        description:
            "TechCorp Solutions is a leading technology company specializing in enterprise software solutions. We provide innovative products and services to help businesses streamline their operations and achieve their goals.",
        website: "www.techcorp.com",
    })

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setCompanyData({ ...companyData, logo: reader.result })
                notification.success({
                    message: "Logo Updated",
                    description: "Your company logo has been successfully updated.",
                })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleUpdateCompany = (updatedData) => {
        setCompanyData({ ...companyData, ...updatedData })
        notification.success({
            message: "Profile Updated",
            description: "Your company profile has been successfully updated.",
        })
    }

    const handleTabChange = (key) => {
        setActiveTab(key)
    }

    return (
        <div className="bg-light py-4 mt-5">
            <div className="container">
                <div className="card shadow-sm">
                    <div className="row g-0">
                        {/* Sidebar */}
                        <div className={`col-md-3 ${styles.sidebar}`}>
                            <div className={styles.profileContainer}>
                                <div className={styles.logoContainer}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className={styles.logoInput}
                                        id="logoUpload"
                                    />
                                    <label htmlFor="logoUpload" className={styles.logoLabel}>
                                        <div className={styles.editIcon}>
                                            <FaEdit size={16} />
                                        </div>
                                        <img
                                            src={companyData.logo || "/placeholder.svg"}
                                            alt="Company Logo"
                                            className={styles.companyLogo}
                                        />
                                    </label>
                                </div>
                                <h3 className={styles.companyName}>{companyData.name}</h3>
                                <div className={styles.companyInfo}>
                                    <div className={styles.infoItem}>
                                        <FaEnvelope className={styles.infoIcon} />
                                        <span>{companyData.email}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <FaPhone className={styles.infoIcon} />
                                        <span>{companyData.phone}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <FaMapMarkerAlt className={styles.infoIcon} />
                                        <span>{companyData.location}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <FaUser className={styles.infoIcon} />
                                        <span>{companyData.website}</span>
                                    </div>
                                </div>

                                <button className={`btn ${styles.editProfileBtn}`}>Edit Profile</button>
                            </div>

                            <div className={styles.sidebarNav}>
                                <div
                                    className={`${styles.navItem} ${activeTab === "1" ? styles.active : ""}`}
                                    onClick={() => handleTabChange("1")}
                                >
                                    <FaBuilding className={styles.navIcon} />
                                    <span>General Information</span>
                                </div>
                                <div
                                    className={`${styles.navItem} ${activeTab === "2" ? styles.active : ""}`}
                                    onClick={() => handleTabChange("2")}
                                >
                                    <FaHistory className={styles.navIcon} />
                                    <span>Job Post History</span>
                                </div>
                                <div
                                    className={`${styles.navItem} ${activeTab === "3" ? styles.active : ""}`}
                                    onClick={() => handleTabChange("3")}
                                >
                                    <FaFileAlt className={styles.navIcon} />
                                    <span>Draft Job Posts</span>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="col-md-9">
                            <div className={styles.mainContent}>
                                <Tabs activeKey={activeTab} onChange={handleTabChange} className={styles.tabs}>
                                    <TabPane
                                        key="1"
                                    >
                                        <GeneralInfoForm companyData={companyData} onUpdate={handleUpdateCompany} />
                                    </TabPane>

                                    <TabPane
                                        key="2"
                                    >
                                        <JobPostHistoryTable />
                                    </TabPane>

                                    <TabPane
                                        key="3"
                                    >
                                        <DraftJobPostList />
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>)
}

export default EnterpriseProfile
