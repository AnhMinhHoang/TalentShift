import React, { useState } from "react";
import { Tabs } from "antd";
import { FaEnvelope, FaInfoCircle } from "react-icons/fa";
import { Link as LinkIcon } from "@mui/icons-material";
import JobPostHistoryTable from "../../components/Enterprise/JobPostHistoryTable";
import styles from "./style/EnterpriseProfile.module.css";
import { useAuth } from "../AuthContext.jsx";

const EnterpriseProfile = () => {
    const [activeTab, setActiveTab] = useState("1");
    const { userData } = useAuth();

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const items = [
        {
            key: "1",
            label: "Job Post History",
            children: <JobPostHistoryTable />,
        },
    ];

    return (
        <div className="bg-light py-4 mt-5">
            <div className="container">
                <div className="card shadow-sm">
                    <div className="row g-0">
                        {/* Sidebar */}
                        <div className={`col-md-3 ${styles.sidebar}`}>
                            <div className={`${styles.profileContainer} p-4 text-center`}>
                                <div
                                    className="mx-auto rounded-circle position-relative overflow-hidden"
                                    style={{
                                        width: "128px",
                                        height: "128px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        ...(userData.logoPath
                                            ? {
                                                backgroundImage: `url(/Uploads/${userData.logoPath})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }
                                            : {
                                                background: "linear-gradient(to bottom right, #428A9B, #266987)",
                                            }),
                                    }}
                                >
                                    {!userData.logoPath && (
                                        <span
                                            style={{
                                                fontSize: "48px",
                                                fontWeight: "bold",
                                                color: "#fff",
                                                lineHeight: "128px",
                                            }}
                                        >
                                            {userData.companyName ? userData.companyName.charAt(0).toUpperCase() : "C"}
                                        </span>
                                    )}
                                </div>
                                <h5 className="mt-3 mb-0" style={{ fontSize: "1.25rem" }}>
                                    {userData?.companyName}
                                </h5>
                                <div className="text-start mt-3">
                                    {userData?.email?.trim() && (
                                        <div className="d-flex align-items-center mb-2">
                                            <FaEnvelope
                                                className="me-2"
                                                style={{ color: "#428A9B", fontSize: "1.25rem" }}
                                            />
                                            <span style={{ fontSize: "1.1rem" }}>{userData.email}</span>
                                        </div>
                                    )}
                                    {userData?.description?.trim() && (
                                        <div className="d-flex align-items-center mb-2">
                                            <FaInfoCircle
                                                className="me-2"
                                                style={{ color: "#428A9B", fontSize: "1.25rem" }}
                                            />
                                            <span className={styles.companyDescription} style={{ fontSize: "1.1rem" }}>
                                                {userData.description}
                                            </span>
                                        </div>
                                    )}
                                    {userData?.contactLink?.trim() && (
                                        <div className="d-flex align-items-center mb-2">
                                            <LinkIcon
                                                fontSize="small"
                                                className="me-2"
                                                style={{ color: "#428A9B", fontSize: "1.25rem" }}
                                            />
                                            <span style={{ fontSize: "1.1rem" }}>{userData.contactLink}</span>
                                        </div>
                                    )}
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
        </div>
    );
};

export default EnterpriseProfile;
