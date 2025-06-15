/**
 * Authentication Guard Component
 * 
 * Higher-order component that protects routes requiring authentication.
 * Redirects unauthenticated users to the auth page.
 * 
 * @module components/auth/auth-guard
 */

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Spinner, Center } from '@chakra-ui/react'
import { useAuth } from '@/hooks'

/**
 * Props for the AuthGuard component
 */
interface AuthGuardProps {
  /** Child components to render when authenticated */
  children: React.ReactNode
  /** Optional redirect path when not authenticated */
  redirectTo?: string
}

/**
 * Authentication guard that protects routes
 * 
 * This component:
 * - Shows loading spinner while checking auth status
 * - Redirects to auth page if user is not authenticated
 * - Renders children if user is authenticated
 * - Prevents flash of protected content
 * 
 * @param {AuthGuardProps} props - The component props
 * @returns {JSX.Element} Protected content or loading state
 * 
 * @example
 * ```tsx
 * <AuthGuard>
 *   <ProtectedPage />
 * </AuthGuard>
 * ```
 */
export function AuthGuard({ 
  children, 
  redirectTo = '/auth' 
}: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect after loading is complete and no user found
    if (!isLoading && !user) {
      router.push(redirectTo)
    }
  }, [user, isLoading, router, redirectTo])

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner 
          size="xl" 
          color="blue.500"
        />
      </Center>
    )
  }

  // Show nothing while redirecting
  if (!user) {
    return null
  }

  // User is authenticated, render children
  return <>{children}</>
}