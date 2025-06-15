/**
 * Apollo Provider Component
 * 
 * Provides Apollo Client context to the application.
 * Enables GraphQL queries and mutations throughout the component tree.
 * 
 * @module providers/apollo-provider
 */

'use client'

import { ApolloProvider as ApolloClientProvider } from '@apollo/client'
import { apolloClient } from '@/lib/apollo'

/**
 * Props for the ApolloProvider component
 */
interface ApolloProviderProps {
  /** Child components to be wrapped by the provider */
  children: React.ReactNode
}

/**
 * Apollo Provider wrapper component
 * 
 * This provider:
 * - Provides Apollo Client instance to all child components
 * - Enables useQuery, useMutation, and other Apollo hooks
 * - Must be used within a client component
 * 
 * @param {ApolloProviderProps} props - The component props
 * @returns {JSX.Element} The wrapped application with Apollo Client
 * 
 * @example
 * ```tsx
 * <ApolloProvider>
 *   <App />
 * </ApolloProvider>
 * ```
 */
export function ApolloProvider({ children }: ApolloProviderProps) {
  return (
    <ApolloClientProvider client={apolloClient}>
      {children}
    </ApolloClientProvider>
  )
}