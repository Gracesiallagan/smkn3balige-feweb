// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "./features/profil/resources/custom.css";
import "./features/admin/resources/admin.css"; 
import { AuthProvider } from './features/auth/context/AuthContext'; // ← Import sudah benar

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 1. Bungkus dengan Redux untuk State Management Global */}
    <Provider store={store}>
      {/* 2. WAJIB: Bungkus dengan AuthProvider agar Keycloak berjalan! */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);