/**
 * Combined Providers Component
 * 
 * Wraps the application with all necessary providers in the correct order.
 * This pattern simplifies the root layout and ensures proper provider nesting.
 * 
 * @module providers
 */

'use client'

import { ChakraProvider } from './chakra-provider'
import { AuthProvider } from './auth-provider'

/**
 * Props for the Providers component
 */
interface ProvidersProps {
  /** Child components to be wrapped by all providers */
  children: React.ReactNode
}

/**
 * Combined providers wrapper
 * 
 * Provider order:
 * 1. ChakraProvider - UI theme and component system
 * 2. AuthProvider - Authentication state management
 * 3. (Future) ApolloProvider - GraphQL client
 * 
 * @param {ProvidersProps} props - The component props
 * @returns {JSX.Element} The application wrapped with all providers
 * 
 * @example
 * ```tsx
 * <Providers>
 *   <App />
 * </Providers>
 * ```
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ChakraProvider>
  )
}