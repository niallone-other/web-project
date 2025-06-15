/**
 * Home Page Component
 * 
 * This is the landing page of the application.
 * It handles the initial authentication check and redirect logic.
 * 
 * @module app/page
 */

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Center, Spinner } from '@chakra-ui/react'
import { useAuth } from '@/hooks'

/**
 * Home page component with authentication redirect
 * 
 * Behaviour:
 * - If authenticated: redirects to /information
 * - If not authenticated: redirects to /auth
 * - Shows loading spinner during auth check
 * 
 * @returns {JSX.Element} Loading state during redirect
 */
export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push('/information')
      } else {
        router.push('/auth')
      }
    }
  }, [user, isLoading, router])

  // Show loading spinner while checking auth and redirecting
  return (
    <Center height="100vh">
      <Spinner 
        size="xl" 
        color="green.500"
      />
    </Center>
  )
}