/**
 * Local Storage Utility Functions
 * 
 * Provides type-safe localStorage operations for user data persistence.
 * Handles JSON serialisation/deserialisation and error cases gracefully.
 * 
 * @module utils/local-storage
 */

/**
 * Storage keys used throughout the application
 */
export const STORAGE_KEYS = {
  USER_DATA: 'web_project_user_data',
} as const

/**
 * User data structure stored in localStorage
 */
export interface UserData {
  /** User's display name */
  username: string
  /** User's job title/position */
  jobTitle: string
  /** Timestamp when the data was last updated */
  updatedAt: string
}

/**
 * Retrieves user data from localStorage
 * 
 * @returns {UserData | null} The stored user data or null if not found/invalid
 * 
 * @example
 * ```ts
 * const userData = getUserData()
 * if (userData) {
 *   console.log(`Welcome back, ${userData.username}`)
 * }
 * ```
 */
export function getUserData(): UserData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_DATA)
    if (!data) return null
    
    const parsed = JSON.parse(data) as UserData
    
    // Validate the data structure
    if (!parsed.username || !parsed.jobTitle) {
      console.warn('Invalid user data structure in localStorage')
      return null
    }
    
    return parsed
  } catch (error) {
    console.error('Error reading user data from localStorage:', error)
    return null
  }
}

/**
 * Saves user data to localStorage
 * 
 * @param {UserData} userData - The user data to store
 * @returns {boolean} True if successfully saved, false otherwise
 * 
 * @example
 * ```ts
 * const success = setUserData({
 *   username: 'John Doe',
 *   jobTitle: 'Software Engineer',
 *   updatedAt: new Date().toISOString()
 * })
 * ```
 */
export function setUserData(userData: Omit<UserData, 'updatedAt'>): boolean {
  try {
    const dataToStore: UserData = {
      ...userData,
      updatedAt: new Date().toISOString(),
    }
    
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(dataToStore))
    return true
  } catch (error) {
    console.error('Error saving user data to localStorage:', error)
    return false
  }
}

/**
 * Removes user data from localStorage
 * 
 * @returns {boolean} True if successfully removed, false otherwise
 * 
 * @example
 * ```ts
 * // Log out user
 * const removed = removeUserData()
 * if (removed) {
 *   router.push('/auth')
 * }
 * ```
 */
export function removeUserData(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA)
    return true
  } catch (error) {
    console.error('Error removing user data from localStorage:', error)
    return false
  }
}

/**
 * Checks if user data exists in localStorage
 * 
 * @returns {boolean} True if valid user data exists, false otherwise
 * 
 * @example
 * ```ts
 * if (!hasUserData()) {
 *   router.push('/auth')
 * }
 * ```
 */
export function hasUserData(): boolean {
  return getUserData() !== null
}