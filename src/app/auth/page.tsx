/**
 * Authentication Page
 * 
 * The landing page for unauthenticated users.
 * Collects username and job title to grant access to the application.
 * 
 * @module app/auth/page
 */

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Container, VStack, Text } from '@chakra-ui/react'
import { UserForm } from '@/components/auth'
import { useAuth } from '@/hooks'
import type { LoginFormData } from '@/types'

/**
 * Authentication page component
 * 
 * Features:
 * - Full-screen authentication form
 * - Redirects to information page after successful login
 * - Auto-redirects if user is already authenticated
 * 
 * @returns {JSX.Element} The authentication page
 */
export default function AuthPage() {
  const { user, login } = useAuth()
  const router = useRouter()

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      router.push('/information')
    }
  }, [user, router])

  /**
   * Handles form submission
   */
  const handleSubmit = async (data: LoginFormData) => {
    const success = await login(data.username, data.jobTitle)
    if (success) {
      router.push('/information')
    }
  }

  // Don't show form if already authenticated (prevents flash)
  if (user) {
    return null
  }

  return (
    <Box minHeight="100vh" bg="gray.50">
      <Container maxW="container.sm" py={20}>
        <VStack gap={8}>
          <VStack gap={2} textAlign="center">
            <Text fontSize="3xl" fontWeight="bold">
              Welcome to Web Project
            </Text>
            <Text color="gray.600">
              Please enter your details to continue
            </Text>
          </VStack>
          
          <Box
            width="100%"
            bg="white"
            p={8}
            borderRadius="lg"
            boxShadow="sm"
          >
            <UserForm
              onSubmit={handleSubmit}
              title="Get Started"
              submitText="Continue"
            />
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}