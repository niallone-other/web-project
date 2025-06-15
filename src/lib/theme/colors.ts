/**
 * Theme Colors
 * 
 * Centralized color definitions for The Portal application.
 * Uses semantic naming for consistent theming across components.
 * 
 * @module lib/theme/colors
 */

/**
 * Brand colors - Portal themed
 */
export const brandColors = {
  portal: {
    light: 'green.400',
    DEFAULT: 'green.500',
    dark: 'green.600',
  },
  dimension: {
    light: 'purple.400',
    DEFAULT: 'purple.500',
    dark: 'purple.600',
  },
  science: {
    light: 'cyan.300',
    DEFAULT: 'cyan.400',
    dark: 'cyan.500',
  },
} as const

/**
 * Semantic colors - Application state colors
 */
export const semanticColors = {
  success: 'green.500',
  warning: 'yellow.500',
  danger: 'red.500',
  info: 'blue.500',
} as const

/**
 * Component-specific color schemes
 */
export const componentColors = {
  // Background colors
  background: {
    primary: 'gray.800',
    secondary: 'gray.700',
    tertiary: 'gray.600',
    dark: 'gray.900',
    // Light mode backgrounds
    lightInput: 'gray.50',
  },
  
  // Text colors
  text: {
    primary: 'white',
    secondary: 'gray.300',
    muted: 'gray.400',
    disabled: 'gray.500',
    // Light mode text
    lightPrimary: 'gray.700',
    lightSecondary: 'gray.600',
  },
  
  // Border colors
  border: {
    default: 'gray.600',
    hover: brandColors.portal.DEFAULT,
    focus: brandColors.portal.light,
    dark: 'gray.700',
  },
  
  // Interactive elements
  interactive: {
    primary: brandColors.portal.DEFAULT,
    primaryHover: brandColors.portal.dark,
    secondary: brandColors.dimension.DEFAULT,
    secondaryHover: brandColors.dimension.dark,
  },
} as const

/**
 * Color schemes for Chakra components
 */
export const colorSchemes = {
  primary: 'green',
  secondary: 'purple',
  accent: 'cyan',
} as const