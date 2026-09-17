import { createContext, useContext, useState } from "react";

interface ContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ContextType | null>(null);

// Create central storage
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Create custom hook useTheme()
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Context must be inside ThemeProvider");
  return context;
}
