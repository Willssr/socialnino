import React, { FormEvent, useState } from "react";
import { useAuth } from "./AuthContext";

export default function AuthScreen() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao autenticar. Verifique e-mail e senha.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ff4f8b, #ff914d)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 360,
          background: "#fff",
          borderRadius: 18,
          padding: 20,
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 8,
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          {mode === "login" ? "Entrar no SocialNino" : "Criar conta no SocialNino"}
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              borderRadius: 999,
              border: "1px solid #ddd",
              padding: "8px 12px",
              fontSize: 14,
            }}
          />

          <input
            type="password"
            placeholder="Senha (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
            style={{
              borderRadius: 999,
              border: "1px solid #ddd",
              padding: "8px 12px",
              fontSize: 14,
            }}
          />

          {error && (
            <p style={{ color: "#e53935", fontSize: 12 }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              marginTop: 6,
              borderRadius: 999,
              border: "none",
              padding: "8px 12px",
              background: "linear-gradient(45deg, #ff4f8b, #ff914d)",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            {mode === "login" ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        <p
          style={{
            marginTop: 10,
            fontSize: 13,
            textAlign: "center",
          }}
        >
          {mode === "login" ? "Não tem conta?" : "Já tem conta?"}{" "}
          <button
            type="button"
            onClick={() =>
              setMode(mode === "login" ? "register" : "login")
            }
            style={{
              border: "none",
              background: "none",
              color: "#ff4f8b",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {mode === "login" ? "Criar conta" : "Entrar"}
          </button>
        </p>
      </div>
    </div>
  );
}
