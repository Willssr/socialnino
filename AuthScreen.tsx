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
      setError("Credenciais inválidas. Verifique e-mail e senha.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center futuristic-bg p-4">
      <div className="w-full max-w-sm">
        <div className="rgb-border rounded-xl p-8 mb-4">
          <h1 className="font-orbitron text-5xl text-center mb-8 text-gradient-neon">
            SocialNino
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-borderNeon rounded-md bg-backgroundLight text-textLight placeholder-textDark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              className="w-full px-4 py-3 border-2 border-borderNeon rounded-md bg-backgroundLight text-textLight placeholder-textDark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {error && (
              <p className="text-accent text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={!email || password.length < 6}
              className="mt-4 w-full py-3 rounded-lg font-bold bg-primary text-white shadow-glow-primary hover:animate-neon-pulse disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {mode === "login" ? "Conectar" : "Registrar"}
            </button>
          </form>
        </div>

        <div className="rgb-border rounded-xl p-4 text-center">
          <p className="text-sm text-textDark">
            {mode === "login" ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="font-bold text-secondary hover:text-white transition-colors"
            >
              {mode === "login" ? "Cadastre-se" : "Entrar"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}