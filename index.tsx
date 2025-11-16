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

// FIX: Explicitly pass children to providers to resolve type errors.
// In some environments, the type checker may fail to infer children from standard JSX nesting.
// This explicit approach ensures the `children` prop is correctly recognized.
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