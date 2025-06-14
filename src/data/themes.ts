
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
      background: '0 0% 100%',
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
      secondary: '207 80% 85%',
      accent: '207 60% 90%',
      background: '206 100% 95%', // More pronounced light blue background
      card: '207 100% 98%',
      border: '207 50% 80%',
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
      secondary: '142 60% 85%',
      accent: '142 40% 90%',
      background: '120 80% 94%', // More pronounced light green background
      card: '120 60% 97%',
      border: '120 40% 85%',
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
      secondary: '25 80% 85%',
      accent: '25 60% 90%',
      background: '30 100% 94%', // More pronounced light orange background
      card: '30 80% 97%',
      border: '30 60% 85%',
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
      secondary: '270 20% 25%',
      accent: '270 15% 30%',
      background: '266 30% 6%', // Deeper purple background
      card: '270 25% 10%',
      border: '270 15% 25%',
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
      secondary: '330 60% 85%',
      accent: '330 40% 90%',
      background: '330 100% 95%', // More pronounced light pink background
      card: '330 80% 98%',
      border: '330 50% 85%',
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
      secondary: '180 20% 25%',
      accent: '180 15% 30%',
      background: '180 30% 6%', // Deeper cyan background
      card: '180 25% 10%',
      border: '180 15% 25%',
    },
    isDark: true,
  },
  {
    id: 'golden-yellow',
    name: 'Golden Yellow',
    description: 'Bright and energizing golden theme',
    preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    colors: {
      primary: '45 100% 51%', // Golden Yellow
      secondary: '45 80% 85%',
      accent: '45 60% 90%',
      background: '50 100% 94%', // Light golden background
      card: '50 80% 97%',
      border: '50 60% 85%',
    },
    isDark: false,
  },
  {
    id: 'deep-red',
    name: 'Deep Red',
    description: 'Bold red theme for passionate creators',
    preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    colors: {
      primary: '0 84% 60%', // Deep Red
      secondary: '0 60% 85%',
      accent: '0 40% 90%',
      background: '0 100% 95%', // Light red background
      card: '0 80% 98%',
      border: '0 50% 85%',
    },
    isDark: false,
  },
];
