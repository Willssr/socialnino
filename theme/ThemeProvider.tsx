import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  // A função toggleTheme pode ser removida se não for mais necessária
  // toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// FIX: Changed props to use PropsWithChildren to fix type error.
type ThemeProviderProps = PropsWithChildren<{}>;

export const ThemeProvider = ({
  children,
}: ThemeProviderProps) => {
  // Define o tema como 'dark' por padrão e o trava
  const [theme] = useState<Theme>("dark");

  // Aplica a classe 'dark' ao body e a mantém
  useEffect(() => {
    const body = document.body;
    body.classList.add('dark');
    // Salva 'dark' no localStorage para consistência
    window.localStorage.setItem("socialnino-theme", "dark");
    
    // Opcional: remover a classe 'dark' não é mais necessário,
    // mas deixamos aqui caso a lógica de toggle seja reintroduzida.
    return () => {
        body.classList.remove('dark');
    }
  }, []);

  // A função de toggle pode ser omitida do provedor se não for usada.
  // const toggleTheme = () => {};

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};