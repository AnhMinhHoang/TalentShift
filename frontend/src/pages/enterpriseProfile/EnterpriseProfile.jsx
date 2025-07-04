import React from "react"
import { useState, useEffect } from "react"
import { Tabs, notification } from "antd"
import { FaBuilding, FaHistory, FaFileAlt, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from "react-icons/fa"
import GeneralInfoForm from "../../components/Enterprise/GeneralInfoForm"
import JobPostHistoryTable from "../../components/Enterprise/JobPostHistoryTable"
import DraftJobPostList from "../../components/Enterprise/DraftJobPostList"
import styles from "./style/EnterpriseProfile.module.css"
import api, { userAPI } from "../../services/api"

const EnterpriseProfile = () => {
    const [activeTab, setActiveTab] = useState("1")
    const [companyData, setCompanyData] = useState({});
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem("userId");

    const fetchProfile = async () => {
        try {
            const res = await userAPI.getProfile(userId);
            const user = res.data;
            console.log("Fetched user data:", user);

            setCompanyData({
                name: user.companyName || "",
                logo: user.logoPath ? `http://localhost:8080/uploads/${user.logoPath}` : "/placeholder.svg",
                email: user.email,
                phone: user.phone,
                location: user.location || "",
                description: user.description || "",
                website: user.contactLink || "",
            });
            setLoading(false);
        } catch (err) {
            console.error("Error fetching profile:", err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [userId]);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            await userAPI.uploadCompanyLogo(userId, file);

            notification.success({
                message: "Logo Updated",
                description: "Company logo uploaded successfully",
            });

            fetchProfile();
        } catch (error) {
            console.error("Logo upload failed:", error);
            notification.error({
                message: "Upload Failed",
                description: error.message || "Could not upload logo.",
            });
        }
    };

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
    const items = [
        {
            key: "1",
            label: "General Information",
            children: <GeneralInfoForm companyData={companyData} onUpdate={handleUpdateCompany} fetchProfile={fetchProfile} />,
        },
        {
            key: "2",
            label: "Job Post History",
            children: <JobPostHistoryTable />,
        },
        {
            key: "3",
            label: "Draft Job Posts",
            children: <DraftJobPostList />,
        },
    ];

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
                                            src={companyData?.logo || "/placeholder.svg"}
                                            alt="Company Logo"
                                            className={styles.companyLogo}
                                        />
                                    </label>
                                </div>
                                <h3 className={styles.companyName}>{companyData?.name}</h3>
                                <div className={styles.companyInfo}>
                                    <div className={styles.infoItem}>
                                        <FaEnvelope className={styles.infoIcon} />
                                        <span>{companyData?.email}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <FaPhone className={styles.infoIcon} />
                                        <span>{companyData?.phone}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <FaMapMarkerAlt className={styles.infoIcon} />
                                        <span>{companyData?.location}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <FaUser className={styles.infoIcon} />
                                        <span>{companyData?.website}</span>
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
                                <Tabs
                                    activeKey={activeTab}
                                    onChange={handleTabChange}
                                    items={items}
                                    className={styles.tabs}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>)
}

export default EnterpriseProfile
