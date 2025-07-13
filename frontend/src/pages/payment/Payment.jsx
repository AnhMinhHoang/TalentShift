import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import styles from "./style/Payment.module.css";
import { notification } from "antd";

export default function Payment() {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("momo");
    const [amount, setAmount] = useState("");
    const [orderInfo, setOrderInfo] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const openNotification = (type, message, placement, description) => {
        notification[type]({
            message,
            description,
            placement,
            duration: 3,
            showProgress: true,
            pauseOnHover: true,
        });
    };

    const formatCurrency = (value) => {
        const numericValue = value.replace(/\D/g, "");
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleAmountChange = (e) => {
        const formatted = formatCurrency(e.target.value);
        setAmount(formatted);
    };

    const isValidAmount = () => {
        const numericAmount = parseInt(amount.replace(/,/g, ""), 10);
        return !isNaN(numericAmount) && numericAmount >= 10000;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidAmount()) {
            openNotification(
                "error",
                "Invalid Amount",
                "bottomRight",
                "Please enter a valid amount (minimum 10,000 VND)."
            );
            return;
        }

        setIsLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;

        try {
            const apiUrl = paymentMethod === "momo"
                ? "/momo/create"
                : "/vnpay/create";

            const response = await api.post(
                apiUrl,
                {
                    amount: parseFloat(amount.replace(/,/g, "")),
                    userId: userId,
                    orderInfo: orderInfo
                }
            );

            const result = response.data;

            if (result.success && result.payUrl) {
                window.location.href = result.payUrl;
            } else {
                setError(result.message || "Failed to create payment");
                openNotification(
                    "error",
                    "Payment Error",
                    "bottomRight",
                    result.message || "Failed to create payment"
                );
            }
        } catch (error) {
            console.error("Payment creation error:", error);
            setError("Network error. Please try again.");
            openNotification(
                "error",
                "Network Error",
                "bottomRight",
                "Please check your internet connection and try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="row w-100 justify-content-center">
                <div className={`col-12 col-md-8 col-lg-6 col-xl-5 ${styles.topMargin}`}>
                    <div className={`card shadow-lg border-0 ${styles.paymentCard}`}>
                        <div className={`card-header text-center ${styles.cardHeader}`}>
                            <h2 className="mb-0 text-white">
                                <i className="fas fa-credit-card me-2"></i>
                                Payment
                            </h2>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                {/* Payment Method Selection */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold text-dark">
                                        <i className="fas fa-wallet me-2"></i>
                                        Choose Payment Method
                                    </label>
                                    <div className="row g-3">
                                        <div className="col-6">
                                            <div className={`${styles.paymentOption} ${paymentMethod === "momo" ? styles.selected : ""}`}>
                                                <input
                                                    type="radio"
                                                    className="form-check-input d-none"
                                                    id="momo"
                                                    name="paymentMethod"
                                                    value="momo"
                                                    checked={paymentMethod === "momo"}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                />
                                                <label htmlFor="momo" className="w-100 text-center p-3 cursor-pointer">
                                                    <div className={styles.paymentLogo}>
                                                        <div className={`${styles.momoLogo} mb-2`}>
                                                            <span className="fw-bold">MoMo</span>
                                                        </div>
                                                        <small className="text-muted">MoMo e-wallet</small>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className={`${styles.paymentOption} ${paymentMethod === "vnpay" ? styles.selected : ""}`}>
                                                <input
                                                    type="radio"
                                                    className="form-check-input d-none"
                                                    id="vnpay"
                                                    name="paymentMethod"
                                                    value="vnpay"
                                                    checked={paymentMethod === "vnpay"}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                />
                                                <label htmlFor="vnpay" className="w-100 text-center p-3 cursor-pointer">
                                                    <div className={styles.paymentLogo}>
                                                        <div className={`${styles.vnpayLogo} mb-2`}>
                                                            <span className="fw-bold">VNPAY</span>
                                                        </div>
                                                        <small className="text-muted">VNPay</small>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Amount Input */}
                                <div className="mb-4">
                                    <label htmlFor="amount" className="form-label fw-bold text-dark">
                                        <i className="fas fa-money-bill-wave me-2"></i>
                                        Amount
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className={`form-control form-control-lg ${styles.amountInput} ${amount && !isValidAmount() ? "is-invalid" : ""}`}
                                            id="amount"
                                            placeholder="Enter amount"
                                            value={amount}
                                            onChange={handleAmountChange}
                                            required
                                        />
                                        <span className={`input-group-text ${styles.currencyLabel}`}>VND</span>
                                    </div>
                                    {amount && (
                                        <>
                                            <small className="text-muted mt-1 d-block">Amount: {amount} VND</small>
                                            {!isValidAmount() && (
                                                <small className="text-danger d-block">Minimum amount is 10,000 VND</small>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Order Info */}
                                <div className="mb-4">
                                    <label htmlFor="orderInfo" className="form-label fw-bold text-dark">
                                        <i className="fas fa-info-circle me-2"></i>
                                        Order Information
                                    </label>
                                    <textarea
                                        className={`form-control ${styles.orderInfoInput}`}
                                        id="orderInfo"
                                        rows={3}
                                        placeholder="Enter order information..."
                                        value={orderInfo}
                                        onChange={(e) => setOrderInfo(e.target.value)}
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className={`btn btn-lg ${styles.submitBtn}`}
                                        disabled={!isValidAmount() || isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-lock me-2"></i>
                                                Pay {amount && `${amount} VND`}
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Error Display */}
                                {error && (
                                    <div className="alert alert-danger mt-3" role="alert">
                                        {error}
                                    </div>
                                )}
                            </form>

                            {/* Security Notice */}
                            <div className={`text-center mt-4 ${styles.securityNotice}`}>
                                <small className="text-muted">
                                    <i className="fas fa-shield-alt me-1"></i>
                                    Transactions are secured with SHA256 encryption technology
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}