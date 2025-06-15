/**
 * Authentication Provider Component
 * 
 * Manages user authentication state throughout the application.
 * Provides context for user data and authentication methods.
 * 
 * @module providers/auth-provider
 */

'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getUserData, setUserData, removeUserData, type UserData } from '@/utils'

/**
 * Authentication context value structure
 */
interface AuthContextValue {
  /** Current user data, null if not authenticated */
  user: UserData | null
  /** Loading state while checking authentication */
  isLoading: boolean
  /** Function to log in a user */
  login: (username: string, jobTitle: string) => Promise<boolean>
  /** Function to log out the current user */
  logout: () => void
  /** Function to update user information */
  updateUser: (username: string, jobTitle: string) => Promise<boolean>
}

/**
 * Authentication context
 */
const AuthContext = createContext<AuthContextValue | undefined>(undefined)

/**
 * Props for the AuthProvider component
 */
interface AuthProviderProps {
  /** Child components to be wrapped by the provider */
  children: React.ReactNode
}

/**
 * AuthProvider component that manages authentication state
 * 
 * This provider:
 * - Loads user data from localStorage on mount
 * - Provides login/logout functionality
 * - Manages loading states during authentication checks
 * - Enables user data updates
 * 
 * @param {AuthProviderProps} props - The component props
 * @returns {JSX.Element} The wrapped application with auth context
 * 
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  /**
   * Load user data from localStorage on component mount
   */
  useEffect(() => {
    try {
      const userData = getUserData()
      setUser(userData)
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Log in a user with username and job title
   * 
   * @param {string} username - The user's name
   * @param {string} jobTitle - The user's job title
   * @returns {Promise<boolean>} Success status
   */
  const login = useCallback(async (username: string, jobTitle: string): Promise<boolean> => {
    try {
      const success = setUserData({ username, jobTitle })
      if (success) {
        const userData = getUserData()
        setUser(userData)
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }, [])

  /**
   * Log out the current user
   */
  const logout = useCallback(() => {
    removeUserData()
    setUser(null)
  }, [])

  /**
   * Update current user's information
   * 
   * @param {string} username - The new username
   * @param {string} jobTitle - The new job title
   * @returns {Promise<boolean>} Success status
   */
  const updateUser = useCallback(async (username: string, jobTitle: string): Promise<boolean> => {
    try {
      const success = setUserData({ username, jobTitle })
      if (success) {
        const userData = getUserData()
        setUser(userData)
        return true
      }
      return false
    } catch (error) {
      console.error('Update user error:', error)
      return false
    }
  }, [])

  const value: AuthContextValue = {
    user,
    isLoading,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Hook to access authentication context
 * 
 * Must be used within an AuthProvider
 * 
 * @returns {AuthContextValue} The authentication context value
 * @throws {Error} If used outside of AuthProvider
 * 
 * @example
 * ```tsx
 * const { user, login, logout } = useAuth()
 * ```
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}