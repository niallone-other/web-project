/**
 * Authentication Type Definitions
 * 
 * Type definitions for authentication-related data structures
 * used throughout the application.
 * 
 * @module types/auth
 */

/**
 * Re-export UserData from utils for centralised type access
 */
export type { UserData } from '@/utils/local-storage'

/**
 * Login form data structure
 */
export interface LoginFormData {
  /** User's display name */
  username: string
  /** User's job title/position */
  jobTitle: string
}

/**
 * Authentication state
 */
export interface AuthState {
  /** Whether the user is authenticated */
  isAuthenticated: boolean
  /** Whether authentication check is in progress */
  isLoading: boolean
}