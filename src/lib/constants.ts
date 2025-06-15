/**
 * Application Constants
 * 
 * Central location for all app-wide constants including branding,
 * configuration values, and static data.
 * 
 * @module lib/constants
 */

/**
 * Application branding and metadata
 */
export const APP_CONFIG = {
  name: 'The Portal',
  tagline: 'Authorized access to interdimensional data',
  version: '1.0.0',
  copyright: '© 2025 The Portal',
  dimension: 'C-137',
} as const

/**
 * Authentication constants
 */
export const AUTH_CONFIG = {
  storageKey: 'portal-user-data',
  sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
  minUsernameLength: 2,
  minJobTitleLength: 2,
} as const

/**
 * API configuration
 */
export const API_CONFIG = {
  graphqlEndpoint: 'https://rickandmortyapi.com/graphql',
  itemsPerPage: 20,
  maxRetries: 3,
} as const

/**
 * Route paths
 */
export const ROUTES = {
  home: '/',
  auth: '/auth',
  information: '/information',
  profile: '/profile',
} as const

/**
 * UI constants
 */
export const UI_CONFIG = {
  footerHeight: 80,
  modalAnimationDuration: 300,
  toastDuration: 3000,
} as const