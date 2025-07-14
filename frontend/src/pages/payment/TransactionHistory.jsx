import styles from "./style/TransactionHistory.module.css"
import api from "../../services/api"
import { useEffect, useState } from "react"
import { useAuth } from "../AuthContext"

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalElements, setTotalElements] = useState(0)
    const [loading, setLoading] = useState(false)
    const { userData } = useAuth()
    const pageSize = 10 // Items per page

    useEffect(() => {
        fetchTransactions(currentPage)
    }, [userData.userId, currentPage])

    const fetchTransactions = async (page) => {
        setLoading(true)
        try {
            const response = await api.get(`/transactions/${userData.userId}?page=${page - 1}&size=${pageSize}`)

            // Handle both paginated and non-paginated responses
            if (response.data.content) {
                // Paginated response
                const fetchedTransactions = response.data.content.map((tx) => ({
                    transactionId: tx.transactionId,
                    message: tx.message,
                    status: tx.status,
                    amount: Number.parseFloat(tx.amount),
                    createdTime: tx.createdTime,
                }))
                    .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime))

                setTransactions(fetchedTransactions)
                setTotalPages(response.data.totalPages)
                setTotalElements(response.data.totalElements)
            } else {
                // Non-paginated response - handle client-side pagination
                const allTransactions = response.data.map((tx) => ({
                    transactionId: tx.transactionId,
                    message: tx.message,
                    status: tx.status,
                    amount: Number.parseFloat(tx.amount),
                    createdTime: tx.createdTime,
                }))
                    .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime))

                const startIndex = (page - 1) * pageSize
                const endIndex = startIndex + pageSize
                const paginatedTransactions = allTransactions.slice(startIndex, endIndex)

                setTransactions(paginatedTransactions)
                setTotalPages(Math.ceil(allTransactions.length / pageSize))
                setTotalElements(allTransactions.length)
            }
        } catch (error) {
            console.error("Error fetching transactions:", error)
            setTransactions([])
            setTotalPages(1)
            setTotalElements(0)
        } finally {
            setLoading(false)
        }
    }

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page)
        }
    }

    const formatAmount = (amount) => {
        const prefix = amount >= 0 ? "+" : ""
        const formattedAmount = `${prefix}${amount.toLocaleString("vi-VN")} VND`
        return formattedAmount
    }

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString)
        const day = date.getDate().toString().padStart(2, "0")
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear()
        const hours = date.getHours().toString().padStart(2, "0")
        const minutes = date.getMinutes().toString().padStart(2, "0")
        const seconds = date.getSeconds().toString().padStart(2, "0")
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
    }

    const getAmountClass = (amount) => {
        return amount >= 0 ? styles.positiveAmount : styles.negativeAmount
    }

    const getStatusBadgeClass = (status) => {
        switch (status.toLowerCase()) {
            case "success":
                return `${styles.statusBadge} ${styles.statusCompleted}`
            case "pending":
                return `${styles.statusBadge} ${styles.statusPending}`
            case "failed":
                return `${styles.statusBadge} ${styles.statusFailed}`
            default:
                return `${styles.statusBadge} ${styles.statusDefault}`
        }
    }

    const formatStatus = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
    }

    const renderPaginationItems = () => {
        const items = []
        const maxVisiblePages = 5
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <li key={i} className={`page-item ${i === currentPage ? "active" : ""}`}>
                    <button
                        className={`page-link ${styles.pageLink} ${i === currentPage ? styles.pageActive : ""}`}
                        onClick={() => handlePageChange(i)}
                        disabled={loading}
                    >
                        {i}
                    </button>
                </li>,
            )
        }

        return items
    }

    return (
        <div className={`container-fluid py-4 ${styles.container}`}>
            <div className="row">
                <div className="col-12">
                    <div className={`card shadow-sm ${styles.card}`}>
                        <div className={`card-header ${styles.cardHeader}`}>
                            <h4 className="card-title mb-0 text-white">
                                <i className="bi bi-clock-history me-2"></i>
                                Transaction History
                            </h4>
                        </div>
                        <div className="card-body p-0">
                            {loading && (
                                <div className={styles.loadingOverlay}>
                                    <div className={styles.spinner}></div>
                                </div>
                            )}
                            <div className="table-responsive">
                                <table className={`table table-hover mb-0 ${styles.table}`}>
                                    <thead className={styles.tableHeader}>
                                    <tr>
                                        <th scope="col" className="px-4 py-3">
                                            Id
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Content
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Amount
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Created Time
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.transactionId} className={styles.transactionRow}>
                                            <td className="px-4 py-3">
                                                <span className={styles.transactionId}>{transaction.transactionId}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className={styles.messageCell}>{transaction.message}</div>
                                            </td>
                                            <td className="px-4 py-3">
                                              <span className={getStatusBadgeClass(transaction.status)}>
                                                {formatStatus(transaction.status)}
                                              </span>
                                            </td>
                                            <td className="px-4 py-3">
                                              <span className={`${styles.amount} ${getAmountClass(transaction.amount)}`}>
                                                {formatAmount(transaction.amount)}
                                              </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={styles.dateTime}>{formatDateTime(transaction.createdTime)}</span>
                                            </td>
                                        </tr>
                                    ))}
                                    {transactions.length === 0 && !loading && (
                                        <tr>
                                            <td colSpan="5" className={`text-center py-4 ${styles.noData}`}>
                                                No transactions found
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className={`card-footer ${styles.cardFooter}`}>
                            <div className="d-flex justify-content-between align-items-center">
                                <small className={styles.footerText}>
                                    Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalElements)} of{" "}
                                    {totalElements} transactions
                                </small>
                                <nav aria-label="Transaction pagination">
                                    <ul className={`pagination pagination-sm mb-0 ${styles.pagination}`}>
                                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                            <button
                                                className={`page-link ${styles.pageLink}`}
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1 || loading}
                                            >
                                                Previous
                                            </button>
                                        </li>
                                        {renderPaginationItems()}
                                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                            <button
                                                className={`page-link ${styles.pageLink}`}
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages || loading}
                                            >
                                                Next
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionHistory