import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ThemeProvider } from "./theme/ThemeProvider";
import { NinoPointsProvider } from "./context/NinoPointsContext";
import { AuthProvider } from "./AuthContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  // Isso evita aqueles erros malucos de "Cannot read properties of null"
  throw new Error("Não foi encontrado um elemento com id='root' no HTML.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  // Se o StrictMode estiver causando comportamento estranho no AI Studio,
  // pode comentar essa linha e a de baixo.
  // <React.StrictMode>
  <AuthProvider>
    <ThemeProvider>
      <NinoPointsProvider>
        <App />
      </NinoPointsProvider>
    </ThemeProvider>
  </AuthProvider>
  // </React.StrictMode>
);
