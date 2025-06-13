
import { createContext, useContext, useEffect, useState } from "react";
import { AppTheme, ThemeMode } from "@/types/theme";
import { availableThemes } from "@/data/themes";

type ThemeManagerContextType = {
  currentTheme: AppTheme;
  themeMode: ThemeMode;
  setTheme: (theme: AppTheme) => void;
  setThemeMode: (mode: ThemeMode) => void;
  availableThemes: AppTheme[];
};

const ThemeManagerContext = createContext<ThemeManagerContextType | undefined>(undefined);

export function ThemeManagerProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<AppTheme>(availableThemes[0]);
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");

  useEffect(() => {
    // Load saved theme from localStorage
    const savedThemeId = localStorage.getItem("app-theme-id");
    const savedThemeMode = localStorage.getItem("app-theme-mode") as ThemeMode;
    
    if (savedThemeId) {
      const theme = availableThemes.find(t => t.id === savedThemeId);
      if (theme) {
        setCurrentTheme(theme);
      }
    }
    
    if (savedThemeMode) {
      setThemeMode(savedThemeMode);
    }
  }, []);

  useEffect(() => {
    // Apply theme to CSS variables
    const root = document.documentElement;
    
    // Apply all color variables from the theme
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Apply theme colors to semantic design tokens
    root.style.setProperty('--primary', currentTheme.colors.primary);
    root.style.setProperty('--background', currentTheme.colors.background);
    root.style.setProperty('--card', currentTheme.colors.card);
    root.style.setProperty('--border', currentTheme.colors.border);
    root.style.setProperty('--secondary', currentTheme.colors.secondary);
    root.style.setProperty('--accent', currentTheme.colors.accent);

    // Update sidebar colors to match theme
    root.style.setProperty('--sidebar-background', currentTheme.colors.card);
    root.style.setProperty('--sidebar-border', currentTheme.colors.border);
    root.style.setProperty('--sidebar-accent', currentTheme.colors.secondary);
    root.style.setProperty('--sidebar-primary', currentTheme.colors.primary);

    // Handle dark/light mode
    root.classList.remove("light", "dark");
    
    if (themeMode === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(themeMode);
    }

    // Save to localStorage
    localStorage.setItem("app-theme-id", currentTheme.id);
    localStorage.setItem("app-theme-mode", themeMode);
  }, [currentTheme, themeMode]);

  const setTheme = (theme: AppTheme) => {
    setCurrentTheme(theme);
    // Auto-adjust theme mode based on theme
    if (theme.isDark) {
      setThemeMode("dark");
    } else {
      setThemeMode("light");
    }
  };

  return (
    <ThemeManagerContext.Provider value={{
      currentTheme,
      themeMode,
      setTheme,
      setThemeMode,
      availableThemes,
    }}>
      {children}
    </ThemeManagerContext.Provider>
  );
}

export const useThemeManager = () => {
  const context = useContext(ThemeManagerContext);
  if (context === undefined) {
    throw new Error("useThemeManager must be used within a ThemeManagerProvider");
  }
  return context;
};
