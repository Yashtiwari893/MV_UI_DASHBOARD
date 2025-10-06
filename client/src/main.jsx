import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'; // Isko import karein

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider> {/* Provider se App ko wrap karein */}
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
)