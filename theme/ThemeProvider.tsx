import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// FIX: Refactored to use an explicit props type instead of React.FC to resolve a potential typing issue.
type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({
  children,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>("light");

  // Load theme from localStorage or system preference on initial load
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("socialnino-theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Apply 'dark' class to the <body> element and save theme to localStorage
  useEffect(() => {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
    window.localStorage.setItem("socialnino-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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