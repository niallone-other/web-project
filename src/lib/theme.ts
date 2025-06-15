/**
 * Custom Theme Configuration
 * 
 * Rick and Morty inspired theme for The Portal application.
 * Provides consistent colors, typography, and component styling.
 * 
 * @module lib/theme
 */

import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react'

/**
 * Custom color tokens for Rick and Morty theme
 */
const colors = {
  portal: {
    50: '#e8f5e9',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#97ce4c', // Main portal green
    600: '#7cb342',
    700: '#689f38',
    800: '#558b2f',
    900: '#33691e',
  },
  space: {
    50: '#ede7f6',
    100: '#d1c4e9',
    200: '#b39ddb',
    300: '#9575cd',
    400: '#7e57c2',
    500: '#6c68ab', // Space purple
    600: '#5e35b1',
    700: '#512da8',
    800: '#4527a0',
    900: '#311b92',
  },
  rick: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#a6d8e7', // Rick's lab coat blue
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  morty: {
    50: '#fff8e1',
    100: '#ffecb3',
    200: '#ffe082',
    300: '#ffd54f',
    400: '#ffca28',
    500: '#ffc107', // Morty yellow
    600: '#ffb300',
    700: '#ffa000',
    800: '#ff8f00',
    900: '#ff6f00',
  },
}

/**
 * Theme configuration
 */
const themeConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        ...defaultConfig.theme.tokens.colors,
        ...colors,
      },
      fonts: {
        heading: { value: 'system-ui, -apple-system, sans-serif' },
        body: { value: 'system-ui, -apple-system, sans-serif' },
      },
    },
    semanticTokens: {
      colors: {
        'chakra-body-bg': { value: { base: '{colors.gray.50}', _dark: '{colors.gray.900}' } },
        'chakra-border-color': { value: { base: '{colors.gray.200}', _dark: '{colors.gray.700}' } },
        primary: { value: { base: '{colors.portal.500}', _dark: '{colors.portal.400}' } },
        secondary: { value: { base: '{colors.space.500}', _dark: '{colors.space.400}' } },
        accent: { value: { base: '{colors.rick.500}', _dark: '{colors.rick.400}' } },
      },
    },
  },
})

/**
 * Create and export the custom theme system
 */
export const theme = createSystem(defaultConfig, themeConfig)

/**
 * Theme utility functions
 */
export const getPortalGradient = (direction: string = 'to-r') => ({
  bgGradient: `${direction}(portal.400, portal.600)`,
})

export const getSpaceGradient = (direction: string = 'to-br') => ({
  bgGradient: `${direction}(space.700, space.900)`,
})

export const getGlowEffect = (color: string = 'portal.500') => ({
  boxShadow: `0 0 20px {colors.${color}/0.5}`,
  _hover: {
    boxShadow: `0 0 30px {colors.${color}/0.7}`,
  },
})