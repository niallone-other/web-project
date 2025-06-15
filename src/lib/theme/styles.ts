/**
 * Theme Styles
 * 
 * Reusable style patterns and component variants for The Portal application.
 * Provides consistent styling utilities across components.
 * 
 * @module lib/theme/styles
 */

import { componentColors, brandColors } from './colors'

/**
 * Layer styles for consistent elevation and depth
 */
export const layerStyles = {
  card: {
    bg: componentColors.background.secondary,
    border: '1px solid',
    borderColor: componentColors.border.default,
    borderRadius: 'lg',
    boxShadow: 'md',
    overflow: 'hidden',
  },
  
  cardHover: {
    bg: componentColors.background.secondary,
    border: '1px solid',
    borderColor: componentColors.border.default,
    borderRadius: 'lg',
    boxShadow: 'md',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    _hover: {
      transform: 'translateY(-4px) scale(1.02)',
      boxShadow: 'xl',
      borderColor: componentColors.border.hover,
    },
  },
  
  panel: {
    bg: componentColors.background.primary,
    borderRadius: 'md',
    p: 4,
  },
  
  glass: {
    bg: 'rgba(26, 32, 44, 0.95)',
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: componentColors.border.dark,
  },
} as const

/**
 * Text styles for consistent typography
 */
export const textStyles = {
  heading: {
    color: componentColors.text.primary,
    fontWeight: 'bold',
  },
  
  body: {
    color: componentColors.text.secondary,
  },
  
  muted: {
    color: componentColors.text.muted,
    fontSize: 'sm',
  },
  
  gradient: {
    bgGradient: `to-r(${brandColors.portal.light}, ${brandColors.portal.dark})`,
    bgClip: 'text',
  },
} as const

/**
 * Effect styles for visual enhancements
 */
export const effectStyles = {
  glow: (intensity: 'sm' | 'md' | 'lg' = 'md') => {
    const shadows = {
      sm: '0 0 10px rgba(34, 197, 94, 0.3)',
      md: '0 0 20px rgba(34, 197, 94, 0.4)',
      lg: '0 0 30px rgba(34, 197, 94, 0.5)',
    }
    return {
      boxShadow: shadows[intensity],
      transition: 'all 0.3s ease',
      _hover: {
        boxShadow: shadows[intensity === 'sm' ? 'md' : 'lg'],
      },
    }
  },
  
  portalBorder: {
    position: 'relative' as const,
    _before: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      bgGradient: `to-r(${brandColors.portal.DEFAULT}, ${brandColors.dimension.DEFAULT})`,
    },
  },
  
  darkOverlay: {
    position: 'relative' as const,
    _after: {
      content: '""',
      position: 'absolute',
      inset: 0,
      bg: 'blackAlpha.200',
      pointerEvents: 'none',
    },
  },
} as const

/**
 * Component-specific style mixins
 */
export const componentStyles = {
  button: {
    primary: {
      colorScheme: 'green',
      _hover: {
        transform: 'translateY(-1px)',
        boxShadow: 'md',
      },
    },
    secondary: {
      variant: 'outline',
      colorScheme: 'green',
      _hover: {
        bg: 'whiteAlpha.100',
      },
    },
  },
  
  input: {
    base: {
      bg: componentColors.background.secondary,
      borderColor: componentColors.border.default,
      color: componentColors.text.primary,
      _hover: {
        borderColor: componentColors.border.hover,
      },
      _focus: {
        borderColor: componentColors.border.focus,
        boxShadow: `0 0 0 1px ${brandColors.portal.light}`,
      },
    },
  },
} as const