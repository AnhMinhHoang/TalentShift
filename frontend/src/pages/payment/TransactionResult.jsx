import { useState, useEffect } from "react"
import styles from "./style/TransactionResult.module.css"
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function TransactionResult() {
    const [transaction, setTransaction] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const orderId = urlParams.get("orderId");
            const paymentMethod = urlParams.get("paymentMethod");

            if (orderId && paymentMethod) {
                setLoading(true);
                await fetchTransactionData(orderId, paymentMethod);
            } else {
                setError("Missing transaction information");
                setLoading(false);
            }
        };

        fetchData().catch((err) => {
            console.error("Unexpected error in fetchData:", err);
            setError("Unexpected error occurred");
            setLoading(false);
        });
    }, []);

    const fetchTransactionData = async (orderId, paymentMethod) => {
        try {
            const apiUrl = paymentMethod === "momo"
                ? `/momo/transaction/${orderId}`
                : `/vnpay/transaction/${orderId}`;

            const response = await api.get(apiUrl);

            setTransaction(response.data);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError("Transaction not found");
            } else {
                setError("An error occurred while fetching transaction data");
            }
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'SUCCESS':
                return `${styles.statusSuccess}`;
            case 'FAILED':
                return `${styles.statusFailed}`;
            case 'PENDING':
                return `${styles.statusPending}`;
            default:
                return `${styles.statusDefault}`;
        }
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const getPaymentMethodInfo = (method) => {
        switch (method) {
            case "MOMO":
                return {
                    name: "MoMo Wallet",
                    icon: "fas fa-mobile-alt",
                    color: "#a50064",
                }
            case "VNPAY":
                return {
                    name: "VNPAY",
                    icon: "fas fa-credit-card",
                    color: "#1e3a8a",
                }
            default:
                return {
                    name: "Unknown",
                    icon: "fas fa-question",
                    color: "#6c757d",
                }
        }
    }

    const handleViewHistory = () => {
        navigate("/transaction-history");
    };

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="text-center">
                    <div className="spinner-border text-primary mb-4" style={{ width: '3rem', height: '3rem' }}
                         role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted">Loading transaction details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
                <div className="bg-white rounded shadow p-5 w-100" style={{ maxWidth: "400px" }}>
                    {/* Use an icon here if available, e.g. Bootstrap Icons */}
                    <div className="text-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="red"
                             className="bi bi-x-circle mb-3" viewBox="0 0 16 16">
                            <path
                                d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm0 1a6 6 0 1 0 0 12A6 6 0 0 0 8 2zm3.354 3.646a.5.5 0 0 1 0 .708L8.707 9l2.647 2.646a.5.5 0 0 1-.708.708L8 9.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 9 4.646 6.354a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708 0z" />
                        </svg>
                    </div>
                    <h1 className="h4 text-dark text-center mb-3">Error</h1>
                    <p className="text-muted text-center mb-4">{error}</p>
                    <div className="text-center">
                        <button
                            onClick={() => navigate("/payment")}
                            className="btn btn-primary px-4 py-2"
                        >
                            Back to Payment
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="row w-100 justify-content-center">
                <div className={`col-12 col-md-8 col-lg-6 col-xl-5 ${styles.topMargin}`}>
                    <div className={`card shadow-lg border-0 ${styles.successCard}`}>
                        {/* TransactionResult Header */}
                        <div className={`card-header text-center ${styles.successHeader}`}>
                            <div className={styles.successIcon}>
                                <i className="fas fa-check-circle"></i>
                            </div>
                            <h3 className="mb-0 text-white mt-3">Transaction Information</h3>
                        </div>

                        <div className="card-body p-4">
                            {/* Transaction Details */}
                            <div className={`${styles.transactionDetails} mb-4`}>
                                <div className="row g-3">
                                    {/* Transaction ID */}
                                    <div className="col-12">
                                        <div className={`${styles.detailItem} p-3`}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="text-muted">
                                                    <i className="fas fa-hashtag me-2"></i>
                                                    Transaction ID
                                                </span>
                                                <span className={`fw-bold ${styles.transactionId}`} title={transaction.transactionId}>
                                                    {transaction.transactionId}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order ID */}
                                    <div className="col-12">
                                        <div className={`${styles.detailItem} p-3`}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="text-muted">
                                                    <i className="fas fa-shopping-bag me-2"></i>
                                                    Order ID
                                                </span>
                                                <span className="fw-bold">{transaction.orderId}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Method */}
                                    <div className="col-12">
                                        <div className={`${styles.detailItem} p-3`}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="text-muted">
                                                    <i className="fas fa-wallet me-2"></i>
                                                    Payment Method
                                                </span>
                                                <span className="fw-bold d-flex align-items-center">
                                                    <i
                                                        className={`${getPaymentMethodInfo(transaction.paymentMethod).icon} me-2`}
                                                        style={{ color: getPaymentMethodInfo(transaction.paymentMethod).color }}
                                                    ></i>
                                                    {getPaymentMethodInfo(transaction.paymentMethod).name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bank */}
                                    <div className="col-12">
                                        <div className={`${styles.detailItem} p-3`}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="text-muted">
                                                    <i className="fas fa-university me-2"></i>
                                                    Bank
                                                </span>
                                                <span className="fw-bold">{transaction.bankCode}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="col-12">
                                        <div className={`${styles.detailItem} p-3`}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="text-muted">
                                                    <i className="fas fa-info-circle me-2"></i>
                                                    Status
                                                </span>
                                                <span className={`badge ${styles.statusBadge} ${getStatusColor(transaction.status)}`}>
                                                    <i className="fas fa-check me-1"></i>
                                                    Transaction {transaction.status === 'SUCCESS' ? 'Successful' :
                                                    transaction.status === 'FAILED' ? 'Failed' : 'Pending'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Amount */}
                                    <div className="col-12">
                                        <div className={`${styles.detailItem} ${styles.amountItem} p-3`}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="text-muted">
                                                    <i className="fas fa-money-bill-wave me-2"></i>
                                                    Amount
                                                </span>
                                                <span
                                                    className={`fw-bold ${styles.amount}`}>{formatAmount(transaction.amount)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Information */}
                                    <div className="col-12">
                                        <div className={`${styles.detailItem} p-3`}>
                                            <div className="mb-2">
                                                <span className="text-muted">
                                                    <i className="fas fa-clipboard-list me-2"></i>
                                                    Order information
                                                </span>
                                            </div>
                                            <div className={styles.orderInfo}>{transaction.orderInfo}</div>
                                        </div>
                                    </div>

                                    {/* Timestamp */}
                                    <div className="col-12">
                                        <div className={`${styles.detailItem} p-3`}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="text-muted">
                                                    <i className="fas fa-clock me-2"></i>
                                                    Created Time
                                                </span>
                                                <span className="fw-bold">{formatDateTime(transaction.createdTime)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="row g-3">
                                <div className="col-6">
                                    <button
                                        className={`btn btn-outline-primary w-100 ${styles.actionBtn}`}
                                        onClick={handleViewHistory}
                                    >
                                        <i className="fas fa-history me-2"></i>
                                        View History
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button
                                        className={`btn btn-primary w-100 ${styles.actionBtn}`}
                                        onClick={() => navigate("/payment")}
                                    >
                                        <i className="fas fa-plus me-2"></i>
                                        New Payment
                                    </button>
                                </div>
                            </div>

                            {/* Support Notice */}
                            <div className={`text-center mt-4 ${styles.supportNotice}`}>
                                <small className="text-muted">
                                    <i className="fas fa-headset me-1"></i>
                                    Cần hỗ trợ? Liên hệ: 1900-1234 hoặc support@company.com
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}