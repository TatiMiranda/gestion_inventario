// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google"

// IMPORTANTE: Reemplaza esto con tu Client ID real de Google Cloud Console
// Si no tienes uno, la app funcionará sin Google Login
const GOOGLE_CLIENT_ID = "TU_CLIENT_ID_AQUI.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)