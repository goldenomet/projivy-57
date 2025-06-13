
import { AppTheme } from '@/types/theme';

export const availableThemes: AppTheme[] = [
  {
    id: 'default-light',
    name: 'Default Light',
    description: 'Clean and modern light theme',
    preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop',
    colors: {
      primary: '248 74% 74%', // Purple
      secondary: '210 40% 96.1%',
      accent: '210 40% 96.1%',
      background: '240 6% 98%',
      card: '0 0% 100%',
      border: '214.3 31.8% 91.4%',
    },
    isDark: false,
  },
  {
    id: 'default-dark',
    name: 'Default Dark',
    description: 'Sleek dark theme for night work',
    preview: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop',
    colors: {
      primary: '248 74% 74%', // Purple
      secondary: '217.2 32.6% 17.5%',
      accent: '217.2 32.6% 17.5%',
      background: '222.2 84% 4.9%',
      card: '222.2 84% 4.9%',
      border: '217.2 32.6% 17.5%',
    },
    isDark: true,
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    description: 'Calming blue tones inspired by the ocean',
    preview: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=200&fit=crop',
    colors: {
      primary: '207 90% 54%', // Ocean Blue
      secondary: '213 27% 84%',
      accent: '213 27% 84%',
      background: '210 20% 98%',
      card: '0 0% 100%',
      border: '213 27% 84%',
    },
    isDark: false,
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    description: 'Natural green theme for productivity',
    preview: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop',
    colors: {
      primary: '142 71% 45%', // Forest Green
      secondary: '138 76% 97%',
      accent: '138 76% 97%',
      background: '0 0% 100%',
      card: '0 0% 100%',
      border: '138 76% 90%',
    },
    isDark: false,
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    description: 'Warm and energetic orange theme',
    preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    colors: {
      primary: '25 95% 53%', // Sunset Orange
      secondary: '25 100% 97%',
      accent: '25 100% 97%',
      background: '0 0% 100%',
      card: '0 0% 100%',
      border: '25 100% 94%',
    },
    isDark: false,
  },
  {
    id: 'midnight-purple',
    name: 'Midnight Purple',
    description: 'Deep purple theme for creative work',
    preview: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=200&fit=crop',
    colors: {
      primary: '271 91% 65%', // Midnight Purple
      secondary: '270 8% 15%',
      accent: '270 8% 15%',
      background: '266 14% 8%',
      card: '270 8% 11%',
      border: '270 8% 20%',
    },
    isDark: true,
  },
  {
    id: 'rose-pink',
    name: 'Rose Pink',
    description: 'Elegant pink theme with sophistication',
    preview: 'https://images.unsplash.com/photo-1518621012420-8ab10c7cb729?w=300&h=200&fit=crop',
    colors: {
      primary: '330 81% 60%', // Rose Pink
      secondary: '327 73% 97%',
      accent: '327 73% 97%',
      background: '0 0% 100%',
      card: '0 0% 100%',
      border: '327 73% 94%',
    },
    isDark: false,
  },
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    description: 'Futuristic neon theme for tech enthusiasts',
    preview: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
    colors: {
      primary: '176 100% 44%', // Cyber Neon
      secondary: '180 8% 15%',
      accent: '180 8% 15%',
      background: '180 14% 8%',
      card: '180 8% 11%',
      border: '180 8% 20%',
    },
    isDark: true,
  },
];
