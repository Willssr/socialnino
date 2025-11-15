// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ThemeProvider } from "./theme/ThemeProvider";
import { NinoPointsProvider } from "./context/NinoPointsContext";
import { AuthProvider } from "./AuthContext";
import "./styles.css"; // Importa os estilos globais

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Não foi encontrado um elemento com id='root' no HTML.");
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