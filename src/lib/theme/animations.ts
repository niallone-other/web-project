/**
 * Theme Animations
 * 
 * Reusable animation definitions for The Portal application.
 * Provides consistent motion design across components.
 * 
 * @module lib/theme/animations
 */

/**
 * CSS keyframe animations
 */
export const keyframes = {
  portalPulse: {
    '@keyframes portal-pulse': {
      '0%': { opacity: 0.4, transform: 'scale(1)' },
      '50%': { opacity: 0.7, transform: 'scale(1.1)' },
      '100%': { opacity: 0.4, transform: 'scale(1)' },
    },
  },
  
  floatGradient: {
    '@keyframes float': {
      '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
      '50%': { transform: 'translate(-20px, -30px) scale(1.1)' },
    },
  },
  
  shimmer: {
    '@keyframes shimmer': {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(100%)' },
    },
  },
} as const

/**
 * Transition configurations
 */
export const transitions = {
  fast: 'all 0.15s ease',
  base: 'all 0.3s ease',
  slow: 'all 0.5s ease',
  
  // Specific transitions
  transform: 'transform 0.3s ease',
  opacity: 'opacity 0.3s ease',
  colors: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease',
} as const

/**
 * Animation utilities
 */
export const animationUtils = {
  // Portal pulse animation
  portalPulse: (duration = '3s', delay = '0s') => ({
    ...keyframes.portalPulse,
    animation: `portal-pulse ${duration} ease-in-out infinite ${delay}`,
  }),
  
  // Floating gradient animation
  floatGradient: (duration = '20s') => ({
    ...keyframes.floatGradient,
    animation: `float ${duration} ease-in-out infinite`,
  }),
  
  // Shimmer effect
  shimmer: (duration = '2s') => ({
    ...keyframes.shimmer,
    animation: `shimmer ${duration} ease-in-out infinite`,
  }),
} as const