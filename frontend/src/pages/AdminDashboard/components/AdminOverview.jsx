import { motion } from "framer-motion"
import { HiUsers, HiOfficeBuilding, HiUserGroup, HiChartBar } from "react-icons/hi"
import { useState } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js"
import { Line } from "react-chartjs-2"
import styles from "../styles/Dashboard.module.css"
import Pagination from "./Pagination"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const AdminOverview = ({ userStats, chartData, transactions }) => {
    // Helper function to format VND currency
    const formatVND = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    // Helper function to format date string
    const formatDateTime = (isoString) => {
        if (!isoString) return '';
        // Handles both '2025-07-14T01:03:01' and already formatted
        return isoString.replace('T', ' ').slice(0, 19);
    };

    // Chart.js configuration
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    padding: 20,
                    font: {
                        size: 14,
                        weight: "600",
                    },
                    color: "#717275",
                },
            },
            tooltip: {
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                titleColor: "#13547a",
                bodyColor: "#717275",
                borderColor: "#7fffd4",
                borderWidth: 1,
                cornerRadius: 12,
                padding: 16,
                displayColors: true,
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || ""
                        const value = formatVND(context.parsed.y)
                        return `${label}: ${value}`
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: "rgba(127, 255, 212, 0.3)",
                    drawBorder: false,
                },
                ticks: {
                    color: "#717275",
                    font: {
                        size: 12,
                        weight: "500",
                    },
                },
            },
            y: {
                grid: {
                    color: "rgba(127, 255, 212, 0.3)",
                    drawBorder: false,
                },
                ticks: {
                    color: "#717275",
                    font: {
                        size: 12,
                        weight: "500",
                    },
                    callback: (value) => formatVND(value),
                },
            },
        },
        elements: {
            line: {
                tension: 0.4,
            },
            point: {
                radius: 6,
                hoverRadius: 8,
                borderWidth: 2,
                hoverBorderWidth: 3,
            },
        },
        interaction: {
            intersect: false,
            mode: "index",
        },
    }

    // Chart data config
    const chartDataConfig = chartData;

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    // Calculate pagination
    const totalPages = Math.ceil(transactions.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedTransactions = transactions.slice(startIndex, startIndex + itemsPerPage)

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "SUCCESS":
                return styles.statusSuccess
            case "PENDING":
                return styles.statusPending
            case "FAILED":
                return styles.statusFailed
            case "CANCELLED":
                return styles.statusCancelled
            default:
                return ""
        }
    }

    const statsCards = [
        {
            title: "Freelancers",
            value: userStats.freelancers,
            icon: HiUsers,
        },
        {
            title: "Hirers",
            value: userStats.hirers,
            icon: HiOfficeBuilding,
        },
        {
            title: "Total Users",
            value: userStats.total,
            icon: HiUserGroup,
        },
    ]

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className={styles.pageTitle}>
                <HiChartBar />
                Dashboard Overview
            </div>

            {/* Stats Cards */}
            <div className={styles.statsGrid}>
                {statsCards.map((stat, index) => {
                    const IconComponent = stat.icon
                    return (
                        <motion.div
                            key={stat.title}
                            className={styles.statsCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                        >
                            <div className={styles.statsCardHeader}>
                                <div className={styles.statsIcon}>
                                    <IconComponent />
                                </div>
                            </div>
                            <div className={styles.statsNumber}>{stat.value.toLocaleString()}</div>
                            <div className={styles.statsLabel}>{stat.title}</div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Transaction Chart */}
            <motion.div
                className={styles.chartContainer}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className={styles.chartHeader}>
                    <h3 className={styles.chartTitle}>Transaction Amount Trends (VND)</h3>
                </div>
                <div className={styles.chartWrapper}>
                    <Line data={chartDataConfig} options={chartOptions} />
                </div>
            </motion.div>

            {/* Transaction History */}
            <motion.div
                className={styles.tableContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <table className={styles.modernTable}>
                    <thead>
                        <tr>
                            <th className={styles.tableHeader}>Transaction ID</th>
                            <th className={styles.tableHeader}>Message</th>
                            <th className={styles.tableHeader}>Status</th>
                            <th className={styles.tableHeader}>Amount</th>
                            <th className={styles.tableHeader}>Created Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedTransactions.map((transaction, index) => (
                            <motion.tr
                                key={transaction.id}
                                className={styles.tableRow}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <td className={styles.tableCell}>
                                    <strong>{transaction.id}</strong>
                                </td>
                                <td className={styles.tableCell}>{transaction.message}</td>
                                <td className={styles.tableCell}>
                                    <span className={`${styles.statusBadge} ${getStatusBadgeClass(transaction.status)}`}>
                                        {transaction.status}
                                    </span>
                                </td>
                                <td className={`${styles.tableCell} ${styles.amountText}`}>{formatVND(transaction.amount)}</td>
                                <td className={styles.tableCell}>{formatDateTime(transaction.createdTime)}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={transactions.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />
        </motion.div>
    )
}

export default AdminOverview
