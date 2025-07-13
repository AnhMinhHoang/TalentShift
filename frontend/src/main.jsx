import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'boxicons/css/boxicons.min.css';
import { AuthProvider } from "./pages/AuthContext.jsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
    <Router>
        <GoogleOAuthProvider clientId="153366497643-q63021a9hd62pecvhphkdsmptd9k9h51.apps.googleusercontent.com">
            <AuthProvider>
                <App />
            </AuthProvider>
        </GoogleOAuthProvider>
    </Router>
)
