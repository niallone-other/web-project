/**
 * Theme Entry Point
 * 
 * Central export for all theme-related configurations and utilities.
 * Provides a unified interface for theme consumption across the application.
 * 
 * @module lib/theme
 */

import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react'

// Export all theme modules
export * from './colors'
export * from './animations'
export * from './styles'

/**
 * Theme configuration for Chakra UI
 * Uses semantic tokens for consistent theming
 */
const themeConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: 'system-ui, -apple-system, sans-serif' },
        body: { value: 'system-ui, -apple-system, sans-serif' },
      },
    },
    semanticTokens: {
      colors: {
        // Override default backgrounds
        'chakra-body-bg': { 
          value: { base: 'gray.800', _dark: 'gray.900' } 
        },
        'chakra-body-text': {
          value: { base: 'white', _dark: 'gray.100' }
        },
        
        // Portal-specific semantic tokens
        'portal-primary': {
          value: { base: 'green.500', _dark: 'green.400' }
        },
        'portal-secondary': {
          value: { base: 'purple.500', _dark: 'purple.400' }
        },
        'portal-accent': {
          value: { base: 'cyan.400', _dark: 'cyan.300' }
        },
      },
    },
  },
})

/**
 * Create and export the custom theme system
 */
export const theme = createSystem(defaultConfig, themeConfig)