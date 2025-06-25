import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'boxicons/css/boxicons.min.css';
import {AuthProvider} from "./pages/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Router>
    </StrictMode>
)
