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
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        background: "#fafafa",
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 350,
          background: "#fff",
          border: '1px solid #dbdbdb',
          borderRadius: 3,
          padding: "10px 40px",
          marginBottom: 10,
        }}
      >
        <h1 style={{ fontFamily: "'Grand Hotel', cursive", fontSize: '50px', textAlign: 'center', margin: '36px 0 12px 0' }}>
            SocialNino
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              borderRadius: 3,
              border: "1px solid #dbdbdb",
              padding: "9px 8px 7px",
              fontSize: 12,
              background: '#fafafa',
            }}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
             style={{
              borderRadius: 3,
              border: "1px solid #dbdbdb",
              padding: "9px 8px 7px",
              fontSize: 12,
              background: '#fafafa',
            }}
          />

          {error && (
            <p style={{ color: "#ed4956", fontSize: 13, textAlign: 'center', margin: '10px 0' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={!email || password.length < 6}
            style={{
              marginTop: 12,
              borderRadius: 8,
              border: "none",
              padding: "7px 12px",
              background: "#0095f6",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14,
              opacity: (!email || password.length < 6) ? 0.7 : 1,
            }}
          >
            {mode === "login" ? "Entrar" : "Cadastrar"}
          </button>
        </form>
      </div>
      
      <div style={{
          width: "100%",
          maxWidth: 350,
          background: "#fff",
          border: "1px solid #dbdbdb",
          borderRadius: 3,
          padding: 20,
      }}>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            textAlign: "center",
          }}
        >
          {mode === "login" ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
          <button
            type="button"
            onClick={() =>
              setMode(mode === "login" ? "register" : "login")
            }
            style={{
              border: "none",
              background: "none",
              color: "#0095f6",
              fontWeight: 600,
              cursor: "pointer",
              padding: 0
            }}
          >
            {mode === "login" ? "Cadastre-se" : "Entrar"}
          </button>
        </p>
      </div>
    </div>
  );
}