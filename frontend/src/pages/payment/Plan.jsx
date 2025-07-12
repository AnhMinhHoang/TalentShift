import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import styles from "./style/Plan.module.css"
import { CheckCircleFill, StarFill } from "react-bootstrap-icons"
import { useAuth } from "../AuthContext"
import { notification } from "antd"
import axios from "axios"

const plans = [
  {
    id: 1,
    name: "Free",
    price: "0.00₫",
    period: "Forever",
    description: "Start for free, no credit card needed.",
    features: [
      "Unlimited basic searches",
      "3 Pro searches per day",
      "Upload 3 files per day"
    ],
    button: "Continue with free",
    color: "#428A9B",
    isPro: false
  },
  {
    id: 2,
    name: "Premium",
    price: "200.000₫",
    period: "/ month",
    description: "Unlock the full capabilities and enjoy new perks as they are added.",
    features: [
      "Access to all premium features",
      "Unlimited access to research",
      "10x as many citations in answers",
      "Powered by the latest AI models",
      "Upload unlimited documents and images",
      "And much more"
    ],
    button: "Get Pro",
    color: "#80d0c7",
    isPro: true
  }
]

const Plan = () => {
  const { userData, setUserData } = useAuth()
  const navigate = useNavigate()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showInsufficientModal, setShowInsufficientModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

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

  const handleSubscribe = (plan) => {
    if (plan.isPro) {
      setShowConfirmModal(true)
    } else {
      // Continue with free - redirect to homepage
      navigate('/')
    }
  }

  const handleConfirmPurchase = async () => {
    setIsProcessing(true)

    // Check if user has sufficient balance
    if (userData?.balance < 200000) {
      setShowConfirmModal(false)
      setShowInsufficientModal(true)
      setIsProcessing(false)
      openNotification('warning', 'Insufficient Balance', 'topRight', 'You need 200,000₫ to upgrade to Pro.')
      return
    }

    try {
      // Call API to purchase pro
      const response = await axios.post('/api/users/pro-purchase', null, {
        params: {
          userId: userData?.userId
        }
      })

      // Success - update user data and show success modal
      setUserData(response.data)
      setShowConfirmModal(false)
      setShowSuccessModal(true)
      openNotification('success', 'Welcome to Pro!', 'topRight', 'You have successfully upgraded to TalentShift Pro.')
    } catch (error) {
      // Handle error (user not found or other errors)
      console.error('Purchase failed:', error)
      setShowConfirmModal(false)
      openNotification('error', 'Purchase Failed', 'topRight', 'Something went wrong. Please try again later.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleTopUp = () => {
    setShowInsufficientModal(false)
    navigate('/payment')
    openNotification('info', 'Redirecting to Payment', 'topRight', 'Add funds to your account to upgrade to Pro.')
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
    navigate('/')
    openNotification('success', 'Enjoy Pro Features!', 'topRight', 'Explore all the premium features now available to you.')
  }

  return (
    <>
      <div className={styles.planPageBg} style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #428A9B 0%, #80d0c7 100%)', padding: '40px 0' }}>
        <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: 38, marginBottom: 12, letterSpacing: 1 }}>Choose Your Plan</h1>
          <p style={{ color: '#e0e0e0', fontSize: 18, marginBottom: 40, textAlign: 'center', maxWidth: 600 }}>
            Unlock the full power of TalentShift for your business or personal use.
          </p>
          <div className="row w-100 justify-content-center" style={{ maxWidth: 900 }}>
            {plans.map((plan, idx) => (
              <div key={plan.id} className="col-md-6 mb-4 d-flex align-items-stretch">
                <div style={{
                  background: '#fff',
                  borderRadius: 24,
                  boxShadow: '0 8px 32px rgba(66,138,155,0.10)',
                  padding: '38px 32px 32px 32px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  border: plan.isPro ? '2.5px solid #80d0c7' : '2px solid #f0f0f0',
                  minHeight: 480,
                  zIndex: plan.isPro ? 2 : 1
                }}>
                  {plan.isPro && (
                    <span style={{
                      position: 'absolute',
                      top: 24,
                      right: 24,
                      background: '#266987',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 13,
                      borderRadius: 12,
                      padding: '4px 18px',
                      letterSpacing: 1
                    }}>Popular</span>
                  )}
                  <div style={{ fontWeight: 800, fontSize: 32, color: plan.isPro ? '#266987' : '#222', marginBottom: 8 }}>{plan.name}</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: plan.isPro ? '#80d0c7' : '#428A9B', marginBottom: 0 }}>{plan.price}
                    <span style={{ fontSize: 16, color: '#888', fontWeight: 500, marginLeft: 4 }}>{plan.period}</span>
                  </div>
                  <div style={{ color: '#666', fontSize: 16, margin: '18px 0 24px 0', textAlign: 'center', minHeight: 44 }}>{plan.description}</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%', marginBottom: 28 }}>
                    {plan.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', fontSize: 15, color: '#333', marginBottom: 14 }}>
                        <CheckCircleFill style={{ color: '#80d0c7', marginRight: 10, fontSize: 18 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {plan.isPro && userData?.premium ? (
                    <div style={{
                      background: 'linear-gradient(135deg, #80d0c7 0%, #428A9B 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 24,
                      fontWeight: 700,
                      fontSize: 18,
                      padding: '14px 0',
                      width: '100%',
                      marginTop: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      letterSpacing: 1
                    }}>
                      <StarFill style={{ fontSize: 20 }} />
                      Current Plan
                    </div>
                  ) : (
                    !plan.isPro && userData?.premium ? null : (
                      <button
                        onClick={() => handleSubscribe(plan)}
                        style={{
                          background: plan.isPro ? '#80d0c7' : '#222',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 24,
                          fontWeight: 700,
                          fontSize: 18,
                          padding: '14px 0',
                          width: '100%',
                          marginTop: 'auto',
                          boxShadow: plan.isPro ? '0 4px 16px rgba(128,208,199,0.10)' : '0 2px 8px rgba(34,34,34,0.08)',
                          transition: 'background 0.2s',
                          letterSpacing: 1,
                          cursor: 'pointer'
                        }}
                      >
                        {plan.button}
                      </button>
                    )
                  )}
                  <div style={{ textAlign: 'center', fontSize: 13, color: '#888', marginTop: 18 }}>
                    {plan.isPro && userData?.premium
                      ? 'You are currently using this plan.'
                      : plan.isPro
                        ? 'Unlock all features, cancel anytime.'
                        : 'No credit card required.'
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirm Purchase Modal */}
      {showConfirmModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: '32px',
            maxWidth: 400,
            width: '90%',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#266987', marginBottom: 16, fontWeight: 700 }}>Confirm Purchase</h3>
            <p style={{ color: '#666', marginBottom: 24 }}>
              Are you sure you want to upgrade to Pro for 200.000₫?
              This will deduct 200,000₫ from your balance.
            </p>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>
              Current Balance: {userData?.balance?.toLocaleString() || 0}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={isProcessing}
                style={{
                  background: '#f0f0f0',
                  color: '#666',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 24px',
                  fontWeight: 600,
                  cursor: isProcessing ? 'not-allowed' : 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPurchase}
                disabled={isProcessing}
                style={{
                  background: '#80d0c7',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 24px',
                  fontWeight: 600,
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  opacity: isProcessing ? 0.7 : 1
                }}
              >
                {isProcessing ? 'Processing...' : 'Confirm Purchase'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: '32px',
            maxWidth: 400,
            width: '90%',
            textAlign: 'center'
          }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: '#80d0c7',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircleFill style={{ color: '#fff', fontSize: 32 }} />
            </div>
            <h3 style={{ color: '#266987', marginBottom: 16, fontWeight: 700 }}>Welcome to Pro!</h3>
            <p style={{ color: '#666', marginBottom: 24 }}>
              Congratulations! You have successfully upgraded to TalentShift Pro.
              Enjoy unlimited access to all premium features.
            </p>
            <button
              onClick={handleCloseSuccessModal}
              style={{
                background: '#80d0c7',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 32px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Insufficient Balance Modal */}
      {showInsufficientModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: '32px',
            maxWidth: 400,
            width: '90%',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#e74c3c', marginBottom: 16, fontWeight: 700 }}>Insufficient Balance</h3>
            <p style={{ color: '#666', marginBottom: 16 }}>
              You don't have enough balance to purchase Pro. You need 200,000₫ but your current balance is {userData?.balance?.toLocaleString() || 0}.
            </p>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>
              Would you like to top up your balance?
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                onClick={() => setShowInsufficientModal(false)}
                style={{
                  background: '#f0f0f0',
                  color: '#666',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 24px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleTopUp}
                style={{
                  background: '#428A9B',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 24px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Top Up Balance
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Plan