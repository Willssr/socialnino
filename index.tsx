import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./theme/ThemeProvider";
import { NinoPointsProvider } from "./context/NinoPointsContext";
import { AuthProvider } from "./AuthContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <NinoPointsProvider>
          <App />
        </NinoPointsProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
