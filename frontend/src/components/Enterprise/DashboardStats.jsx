import React from "react"

import { useState } from "react"
import { Card, Row, Col, Statistic, Progress, Tabs, DatePicker, Button, Select, Tooltip } from "antd"
import {
    FaChartLine,
    FaUserCheck,
    FaEye,
    FaFileAlt,
    FaCheckCircle,
    FaArrowUp,
    FaArrowDown,
    FaDownload,
} from "react-icons/fa"

const { TabPane } = Tabs
const { RangePicker } = DatePicker
const { Option } = Select

const DashboardStats = () => {
    const [activeTab, setActiveTab] = useState("overview")
    const [dateRange, setDateRange] = useState(null)
    const [jobFilter, setJobFilter] = useState("all")

    // Sample data for dashboard stats
    const stats = {
        totalJobPosts: 12,
        activeJobPosts: 5,
        totalViews: 2450,
        totalApplicants: 187,
        conversionRate: 7.6,
        applicantsThisWeek: 32,
        applicantsLastWeek: 28,
        viewsThisWeek: 420,
        viewsLastWeek: 380,
        topPerformingJobs: [
            { title: "Senior Frontend Developer", views: 642, applicants: 48, conversionRate: 7.5 },
            { title: "UX/UI Designer", views: 410, applicants: 32, conversionRate: 7.8 },
            { title: "Product Manager", views: 325, applicants: 21, conversionRate: 6.5 },
        ],
        applicantsByDepartment: [
            { department: "Engineering", count: 92, percentage: 49 },
            { department: "Design", count: 35, percentage: 19 },
            { department: "Product", count: 28, percentage: 15 },
            { department: "Marketing", count: 18, percentage: 10 },
            { department: "Operations", count: 14, percentage: 7 },
        ],
    }

    const handleTabChange = (key) => {
        setActiveTab(key)
    }

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h5 className="mb-0 fw-bold">Analytics Dashboard</h5>

                    <div className="d-flex gap-2 mt-2 mt-md-0">
                        <RangePicker
                            onChange={(dates) => {
                                if (dates) {
                                    setDateRange(dates)
                                }
                            }}
                            placeholder={["Start Date", "End Date"]}
                        />

                        <Select defaultValue="all" style={{ width: 150 }} onChange={(value) => setJobFilter(value)}>
                            <Option value="all">All Job Posts</Option>
                            <Option value="active">Active Only</Option>
                            <Option value="expired">Expired Only</Option>
                        </Select>

                        <Button icon={<FaDownload />}>Export</Button>
                    </div>
                </div>
            </div>

            <div className="card-body">
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                    <TabPane
                        tab={
                            <span>
                                <FaChartLine className="me-2" />
                                Overview
                            </span>
                        }
                        key="overview"
                    >
                        <Row gutter={[16, 16]} className="mb-4">
                            <Col xs={24} sm={12} md={6}>
                                <Card className="h-100 text-center">
                                    <Statistic
                                        title="Total Job Posts"
                                        value={stats.totalJobPosts}
                                        prefix={<FaFileAlt style={{ color: "#428A9B" }} />}
                                        valueStyle={{ color: "#428A9B" }}
                                    />
                                    <div className="mt-2 text-muted small">
                                        <span className="text-success">
                                            <FaArrowUp /> 2
                                        </span>{" "}
                                        from last month
                                    </div>
                                </Card>
                            </Col>

                            <Col xs={24} sm={12} md={6}>
                                <Card className="h-100 text-center">
                                    <Statistic
                                        title="Active Job Posts"
                                        value={stats.activeJobPosts}
                                        prefix={<FaCheckCircle style={{ color: "#28a745" }} />}
                                        valueStyle={{ color: "#28a745" }}
                                    />
                                    <div className="mt-2 text-muted small">
                                        {stats.activeJobPosts} of {stats.totalJobPosts} jobs active
                                    </div>
                                </Card>
                            </Col>

                            <Col xs={24} sm={12} md={6}>
                                <Card className="h-100 text-center">
                                    <Statistic
                                        title="Total Views"
                                        value={stats.totalViews}
                                        prefix={<FaEye style={{ color: "#17a2b8" }} />}
                                        valueStyle={{ color: "#17a2b8" }}
                                    />
                                    <div className="mt-2 text-muted small">
                                        <span className="text-success">
                                            <FaArrowUp /> 10.5%
                                        </span>{" "}
                                        from last month
                                    </div>
                                </Card>
                            </Col>

                            <Col xs={24} sm={12} md={6}>
                                <Card className="h-100 text-center">
                                    <Statistic
                                        title="Total Applicants"
                                        value={stats.totalApplicants}
                                        prefix={<FaUserCheck style={{ color: "#fd7e14" }} />}
                                        valueStyle={{ color: "#fd7e14" }}
                                    />
                                    <div className="mt-2 text-muted small">
                                        <span className="text-success">
                                            <FaArrowUp /> 14.3%
                                        </span>{" "}
                                        from last month
                                    </div>
                                </Card>
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <Card title="Weekly Performance" className="h-100">
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div>
                                                <h6 className="mb-0">Applicants</h6>
                                                <div className="text-muted small">This Week vs Last Week</div>
                                            </div>
                                            <div className="text-end">
                                                <h5 className="mb-0">{stats.applicantsThisWeek}</h5>
                                                <div
                                                    className={`small ${stats.applicantsThisWeek > stats.applicantsLastWeek ? "text-success" : "text-danger"}`}
                                                >
                                                    {stats.applicantsThisWeek > stats.applicantsLastWeek ? (
                                                        <>
                                                            <FaArrowUp />{" "}
                                                            {(
                                                                ((stats.applicantsThisWeek - stats.applicantsLastWeek) / stats.applicantsLastWeek) *
                                                                100
                                                            ).toFixed(1)}
                                                            %
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaArrowDown />{" "}
                                                            {(
                                                                ((stats.applicantsLastWeek - stats.applicantsThisWeek) / stats.applicantsLastWeek) *
                                                                100
                                                            ).toFixed(1)}
                                                            %
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <Progress
                                            percent={Math.min(100, (stats.applicantsThisWeek / (stats.applicantsThisWeek + 20)) * 100)}
                                            showInfo={false}
                                            strokeColor="#fd7e14"
                                        />
                                    </div>

                                    <div>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div>
                                                <h6 className="mb-0">Views</h6>
                                                <div className="text-muted small">This Week vs Last Week</div>
                                            </div>
                                            <div className="text-end">
                                                <h5 className="mb-0">{stats.viewsThisWeek}</h5>
                                                <div
                                                    className={`small ${stats.viewsThisWeek > stats.viewsLastWeek ? "text-success" : "text-danger"}`}
                                                >
                                                    {stats.viewsThisWeek > stats.viewsLastWeek ? (
                                                        <>
                                                            <FaArrowUp />{" "}
                                                            {(((stats.viewsThisWeek - stats.viewsLastWeek) / stats.viewsLastWeek) * 100).toFixed(1)}%
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaArrowDown />{" "}
                                                            {(((stats.viewsLastWeek - stats.viewsThisWeek) / stats.viewsLastWeek) * 100).toFixed(1)}%
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <Progress
                                            percent={Math.min(100, (stats.viewsThisWeek / (stats.viewsThisWeek + 100)) * 100)}
                                            showInfo={false}
                                            strokeColor="#17a2b8"
                                        />
                                    </div>
                                </Card>
                            </Col>

                            <Col xs={24} md={12}>
                                <Card title="Applicants by Department" className="h-100">
                                    {stats.applicantsByDepartment.map((item, index) => (
                                        <div key={index} className="mb-3">
                                            <div className="d-flex justify-content-between mb-1">
                                                <span>{item.department}</span>
                                                <span>
                                                    {item.count} ({item.percentage}%)
                                                </span>
                                            </div>
                                            <Progress percent={item.percentage} showInfo={false} strokeColor="#428A9B" />
                                        </div>
                                    ))}
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane
                        tab={
                            <span>
                                <FaFileAlt className="me-2" />
                                Job Performance
                            </span>
                        }
                        key="jobs"
                    >
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Job Title</th>
                                        <th className="text-center">Views</th>
                                        <th className="text-center">Applicants</th>
                                        <th className="text-center">Conversion Rate</th>
                                        <th className="text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.topPerformingJobs.map((job, index) => (
                                        <tr key={index}>
                                            <td>{job.title}</td>
                                            <td className="text-center">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <FaEye className="me-2 text-info" />
                                                    {job.views}
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <FaUserCheck className="me-2 text-warning" />
                                                    {job.applicants}
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <Tooltip title="Applicants / Views">
                                                    <div>{job.conversionRate}%</div>
                                                </Tooltip>
                                                <Progress
                                                    percent={job.conversionRate * 10}
                                                    showInfo={false}
                                                    size="small"
                                                    strokeColor="#428A9B"
                                                />
                                            </td>
                                            <td className="text-center">
                                                <span className="badge bg-success">Active</span>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td>Backend Engineer</td>
                                        <td className="text-center">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <FaEye className="me-2 text-info" />
                                                256
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <FaUserCheck className="me-2 text-warning" />
                                                18
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <Tooltip title="Applicants / Views">
                                                <div>7.0%</div>
                                            </Tooltip>
                                            <Progress percent={7.0 * 10} showInfo={false} size="small" strokeColor="#428A9B" />
                                        </td>
                                        <td className="text-center">
                                            <span className="badge bg-secondary">Expired</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>DevOps Engineer</td>
                                        <td className="text-center">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <FaEye className="me-2 text-info" />
                                                198
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <FaUserCheck className="me-2 text-warning" />
                                                15
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <Tooltip title="Applicants / Views">
                                                <div>7.6%</div>
                                            </Tooltip>
                                            <Progress percent={7.6 * 10} showInfo={false} size="small" strokeColor="#428A9B" />
                                        </td>
                                        <td className="text-center">
                                            <span className="badge bg-danger">Rejected</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="text-center mt-4">
                            <Button type="primary" style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}>
                                View All Job Performance
                            </Button>
                        </div>
                    </TabPane>

                    <TabPane
                        tab={
                            <span>
                                <FaUserCheck className="me-2" />
                                Applicant Analytics
                            </span>
                        }
                        key="applicants"
                    >
                        <Row gutter={[16, 16]} className="mb-4">
                            <Col xs={24} sm={12} md={6}>
                                <Card className="text-center">
                                    <Statistic title="Total Applicants" value={stats.totalApplicants} valueStyle={{ color: "#428A9B" }} />
                                </Card>
                            </Col>

                            <Col xs={24} sm={12} md={6}>
                                <Card className="text-center">
                                    <Statistic title="Shortlisted" value={42} valueStyle={{ color: "#28a745" }} />
                                    <div className="mt-2">
                                        <Progress
                                            percent={((42 / stats.totalApplicants) * 100).toFixed(1)}
                                            size="small"
                                            strokeColor="#28a745"
                                        />
                                    </div>
                                </Card>
                            </Col>

                            <Col xs={24} sm={12} md={6}>
                                <Card className="text-center">
                                    <Statistic title="In Review" value={65} valueStyle={{ color: "#fd7e14" }} />
                                    <div className="mt-2">
                                        <Progress
                                            percent={((65 / stats.totalApplicants) * 100).toFixed(1)}
                                            size="small"
                                            strokeColor="#fd7e14"
                                        />
                                    </div>
                                </Card>
                            </Col>

                            <Col xs={24} sm={12} md={6}>
                                <Card className="text-center">
                                    <Statistic title="Rejected" value={80} valueStyle={{ color: "#dc3545" }} />
                                    <div className="mt-2">
                                        <Progress
                                            percent={((80 / stats.totalApplicants) * 100).toFixed(1)}
                                            size="small"
                                            strokeColor="#dc3545"
                                        />
                                    </div>
                                </Card>
                            </Col>
                        </Row>

                        <Card title="Applicant Sources" className="mb-4">
                            <Row gutter={[16, 16]}>
                                <Col xs={24} md={8}>
                                    <div className="text-center p-3 border rounded">
                                        <h3 className="text-primary" style={{ color: "#428A9B" }}>
                                            42%
                                        </h3>
                                        <div>LinkedIn</div>
                                        <Progress percent={42} showInfo={false} strokeColor="#428A9B" />
                                        <div className="text-muted small mt-2">78 applicants</div>
                                    </div>
                                </Col>

                                <Col xs={24} md={8}>
                                    <div className="text-center p-3 border rounded">
                                        <h3 className="text-primary" style={{ color: "#428A9B" }}>
                                            31%
                                        </h3>
                                        <div>Company Website</div>
                                        <Progress percent={31} showInfo={false} strokeColor="#428A9B" />
                                        <div className="text-muted small mt-2">58 applicants</div>
                                    </div>
                                </Col>

                                <Col xs={24} md={8}>
                                    <div className="text-center p-3 border rounded">
                                        <h3 className="text-primary" style={{ color: "#428A9B" }}>
                                            27%
                                        </h3>
                                        <div>Job Boards</div>
                                        <Progress percent={27} showInfo={false} strokeColor="#428A9B" />
                                        <div className="text-muted small mt-2">51 applicants</div>
                                    </div>
                                </Col>
                            </Row>
                        </Card>

                        <div className="text-center mt-4">
                            <Button type="primary" style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}>
                                View Detailed Applicant Reports
                            </Button>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default DashboardStats
