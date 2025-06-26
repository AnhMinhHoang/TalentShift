import React from "react";
import { useNavigate } from "react-router-dom"
import styles from "./style/Plan.module.css"
import { CheckCircleFill } from "react-bootstrap-icons"
import { useAuth } from "../AuthContext"

const plans = [
  {
    id: 1,
    name: "Free",
    price: "$0.00",
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
    name: "Pro",
    price: "$20.00",
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
  const { userData, getUserById } = useAuth()
  const navigate = useNavigate()

  const handleSubscribe = (plan) => {

  }

  return (
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
                    letterSpacing: 1
                  }}
                >
                  {plan.button}
                </button>
                <div style={{ textAlign: 'center', fontSize: 13, color: '#888', marginTop: 18 }}>
                  {plan.isPro ? 'Unlock all features, cancel anytime.' : 'No credit card required.'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Plan
