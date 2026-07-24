import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/globals.css";

import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import { CompareProvider } from "./context/CompareContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <CompareProvider>

      <AuthProvider>

        <App />

        <Toaster position="top-right" />

      </AuthProvider>

    </CompareProvider>

  </React.StrictMode>
);