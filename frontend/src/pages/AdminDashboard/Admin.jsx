import { useState, useEffect } from "react"
import { notification } from "antd"
import Sidebar from "./components/Sidebar"
import AdminOverview from "./components/AdminOverview.jsx"
import UsersTab from "./components/UsersTab"
import HirersTab from "./components/HirersTab"
import styles from "./styles/Dashboard.module.css"
import api from '../../services/api'
import { useAuth } from "../AuthContext"

const Admin = () => {
    const [activeTab, setActiveTab] = useState("dashboard")
    const [userStats, setUserStats] = useState({ freelancers: 0, hirers: 0, total: 0 })
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [transactions, setTransactions] = useState([])
    const [users, setUsers] = useState([])
    const [hirers, setHirers] = useState([])
    const { logout } = useAuth()

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

    useEffect(() => {
        // Fetch all users and hirers (DTOs)
        const fetchAll = async () => {
            try {
                const usersRes = await api.get('/users/all')
                setUsers(usersRes.data)
                const hirersRes = await api.get('/hirers/all')
                setHirers(hirersRes.data)
                // User stats
                const freelancersCount = usersRes.data.filter(u => u.role === "FREELANCER").length
                const hirersCount = hirersRes.data.length
                setUserStats({ freelancers: freelancersCount, hirers: hirersCount, total: freelancersCount + hirersCount })
            } catch (e) { console.error(e) }
        }
        // Fetch transactions
        const fetchTransactions = async () => {
            try {
                const res = await api.get('/transactions')
                setTransactions(res.data)
                // Aggregate chart data by month
                const txs = res.data.filter(tx => tx.status === 'SUCCESS')
                const monthly = {}
                txs.forEach(tx => {
                    const date = new Date(tx.createdTime)
                    const ym = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
                    if (!monthly[ym]) monthly[ym] = 0
                    monthly[ym] += Number(tx.amount)
                })
                const sortedMonths = Object.keys(monthly).sort()
                setChartData({
                    labels: sortedMonths,
                    datasets: [
                        {
                            label: 'Total Transaction Amount',
                            data: sortedMonths.map(m => monthly[m]),
                            borderColor: '#13547a',
                            backgroundColor: 'rgba(19, 84, 122, 0.1)',
                            pointBackgroundColor: '#13547a',
                            pointBorderColor: '#ffffff',
                            pointHoverBackgroundColor: '#13547a',
                            pointHoverBorderColor: '#ffffff',
                            fill: false,
                            tension: 0.4,
                        },
                    ],
                })
            } catch (e) { console.error(e) }
        }
        fetchAll()
        fetchTransactions()
    }, [])

    const renderActiveTab = () => {
        switch (activeTab) {
            case "dashboard":
                return <AdminOverview userStats={userStats} chartData={chartData} transactions={transactions} />
            case "users":
                return <UsersTab users={users} />
            case "hirers":
                return <HirersTab openNotification={openNotification} hirers={hirers} />
            default:
                return <AdminOverview userStats={userStats} chartData={chartData} transactions={transactions} />
        }
    }

    return (
        <div className={`container-fluid ${styles.dashboard}`}>
            <div className="row">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} logout={logout} />
                <div className={`col-md-9 col-lg-10 ${styles.mainContent}`}>{renderActiveTab()}</div>
            </div>
        </div>
    )
}

export default Admin
