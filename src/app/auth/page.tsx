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
import { animationUtils, effectStyles, textStyles } from '@/lib/theme'
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
    <Box 
      minHeight="calc(100vh - 80px)" 
      display="flex" 
      alignItems="center"
      position="relative"
      overflow="hidden"
    >
      {/* Animated background gradient */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
                   radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)"
        css={animationUtils.floatGradient('20s')}
      />
      
      <Container size="sm" py={8} mx="auto" px={4} position="relative" zIndex={1}>
        <VStack gap={8}>
          <VStack gap={2} textAlign="center">
            <Text {...textStyles.headingLarge}>
              Welcome to The Portal
            </Text>
          </VStack>
          
          <Box
            width="100%"
            maxW="md"
            mx="auto"
            bg="white"
            p={{ base: 6, md: 8 }}
            borderRadius="xl"
            boxShadow="xl"
            border="1px solid"
            borderColor="gray.100"
            position="relative"
            overflow="hidden"
            {...effectStyles.portalBorder}
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