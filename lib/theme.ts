/**
 * Islamic Sources - Design Theme System
 * A unique green-based theme that's distinct from IslamQA
 */

export const theme = {
  // Primary Colors - Unique green palette
  primary: {
    50: '#f0fdf4',   // Very light green
    100: '#dcfce7',  // Light green
    200: '#bbf7d0',  // Lighter green
    300: '#86efac',  // Light green
    400: '#4ade80',  // Medium light green
    500: '#22c55e',  // Primary green
    600: '#16a34a',  // Main green (our primary)
    700: '#15803d',  // Dark green
    800: '#166534',  // Darker green
    900: '#14532d',  // Very dark green
    950: '#052e16',  // Darkest green
  },

  // Secondary Colors - Complementary blues
  secondary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',  // Main secondary
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Accent Colors - Warm tones
  accent: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',  // Main accent
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },

  // Neutral Colors
  neutral: {
    50: '#f8fafc',   // Background
    100: '#f1f5f9',  // Light background
    200: '#e2e8f0',  // Border light
    300: '#cbd5e1',  // Border
    400: '#94a3b8',  // Text muted
    500: '#64748b',  // Text secondary
    600: '#475569',  // Text primary
    700: '#334155',  // Text dark
    800: '#1e293b',  // Text darker
    900: '#0f172a',  // Text darkest
  },

  // Semantic Colors
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },

  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },

  error: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },

  info: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },

  // Layout Colors
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
    dark: '#0f172a',
    darkSecondary: '#1e293b',
  },

  // Border Colors
  border: {
    light: '#e2e8f0',
    medium: '#cbd5e1',
    dark: '#94a3b8',
  },

  // Text Colors
  text: {
    primary: '#0f172a',
    secondary: '#475569',
    muted: '#64748b',
    light: '#94a3b8',
    inverse: '#ffffff',
  },

  // Shadow Colors
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },

  // Border Radius
  radius: {
    none: '0px',
    sm: '0.25rem',
    md: '0.5rem',    // Our preferred radius
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },

  // Transitions
  transition: {
    fast: 'all 0.15s ease-in-out',
    normal: 'all 0.2s ease-in-out',
    slow: 'all 0.3s ease-in-out',
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
} as const;

// CSS Custom Properties for easy theming
export const cssVariables = {
  '--color-primary': theme.primary[600],
  '--color-primary-light': theme.primary[50],
  '--color-primary-dark': theme.primary[700],
  '--color-secondary': theme.secondary[600],
  '--color-accent': theme.accent[500],
  '--color-background': theme.background.primary,
  '--color-background-secondary': theme.background.secondary,
  '--color-text-primary': theme.text.primary,
  '--color-text-secondary': theme.text.secondary,
  '--color-border': theme.border.light,
  '--color-success': theme.success[500],
  '--color-warning': theme.warning[500],
  '--color-error': theme.error[500],
  '--color-info': theme.info[500],
  '--radius-default': theme.radius.md,
  '--transition-default': theme.transition.normal,
} as const;

// Tailwind CSS classes for common patterns
export const themeClasses = {
  // Button variants
  button: {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white border-primary-600 hover:border-primary-700',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white border-secondary-600 hover:border-secondary-700',
    outline: 'border-primary-600 text-primary-600 hover:bg-primary-50',
    ghost: 'text-primary-600 hover:bg-primary-50',
  },

  // Card styles
  card: 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md shadow-sm',

  // Input styles
  input: 'border border-neutral-300 dark:border-neutral-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500',

  // Badge styles
  badge: {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
    secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200',
    success: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200',
    warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200',
    error: 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200',
  },
} as const;

export default theme;
