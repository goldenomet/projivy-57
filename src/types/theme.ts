
export interface AppTheme {
  id: string;
  name: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    card: string;
    border: string;
  };
  isDark: boolean;
}

export type ThemeMode = 'light' | 'dark' | 'system';
