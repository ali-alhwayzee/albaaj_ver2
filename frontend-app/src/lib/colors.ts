// src/lib/colors.ts

export const colors = {
  primary: {
    light: '#74ebd5',
    DEFAULT: '#03e9f4',
    dark: '#00bcd4',
    glass: 'rgba(3, 233, 244, 0.2)',
    main: '#03e9f4',
  },
  secondary: {
    light: '#acb6e5',
    DEFAULT: '#1e3c72',
    dark: '#2a5298',
    glass: 'rgba(30, 60, 114, 0.2)',
    main: '#1e3c72',
  },
  background: {
    light: 'rgba(255, 255, 255, 0.1)',
    DEFAULT: 'rgba(0, 0, 0, 0.6)',
    dark: 'rgba(0, 0, 0, 0.8)',
  },
  text: {
    light: '#ffffff',
    DEFAULT: '#f9fafb',
    dark: '#1f2937',
    accent: '#03e9f4',
  },
  state: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #74ebd5, #acb6e5)',
    secondary: 'linear-gradient(135deg, #1e3c72, #2a5298)',
    button: 'linear-gradient(to right, #03e9f4, #00bcd4)',
    card: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.7))',
  },
  accent: {
    DEFAULT: '#9c27b0',
    glass: 'rgba(156, 39, 176, 0.2)',
    main: '#9c27b0',
  },
  warning: {
    DEFAULT: '#f59e0b',
    glass: 'rgba(245, 158, 11, 0.2)',
    main: '#f59e0b',
  },
  success: {
    DEFAULT: '#10b981',
    glass: 'rgba(16, 185, 129, 0.2)',
    main: '#10b981',
  },
};

export const shadows = {
  sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
  DEFAULT: '0 4px 6px rgba(0, 0, 0, 0.1)',
  md: '0 6px 10px rgba(0, 0, 0, 0.2)',
  lg: '0 15px 25px rgba(0, 0, 0, 0.6)',
  glow: `0 0 10px ${colors.primary.DEFAULT}`,
};

export const backgroundGradients = {
  primary: `linear-gradient(135deg, ${colors.primary.light}, ${colors.secondary.light})`,
  secondary: `linear-gradient(135deg, ${colors.secondary.DEFAULT}, ${colors.secondary.dark})`,
  dark: `linear-gradient(135deg, #1f2937, #111827)`,
};

// ✅ التصدير الموحد الافتراضي لتسهيل الاستخدام على شكل `theme`
export default {
  colors,
  shadows,
  backgroundGradients
};
