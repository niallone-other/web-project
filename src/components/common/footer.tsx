/**
 * Footer Component
 * 
 * Application footer that displays the challenge version.
 * Positioned at the bottom of the viewport.
 * 
 * @module components/common/footer
 */

'use client'

import { Box, Container, Text, HStack, Link, Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks'
import { APP_CONFIG } from '@/lib/constants'

/**
 * Footer component displaying app information
 * 
 * Features:
 * - Displays app version
 * - Responsive layout
 * - Subtle styling that doesn't interfere with content
 * - Fixed positioning at bottom
 * - Logout functionality for authenticated users
 * 
 * @returns {JSX.Element} The footer component
 * 
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
export function Footer() {
  const { user, logout } = useAuth()
  const router = useRouter()
  
  const handleLogout = () => {
    logout()
    router.push('/auth')
  }
  
  return (
    <Box
      as="footer"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      borderTopWidth={1}
      borderColor="gray.200"
      py={4}
      zIndex={10}
    >
      <Container size="xl" mx="auto">
        <HStack justify="space-between" wrap="wrap" gap={4}>
          <Text color="gray.600" fontSize="sm">
            {APP_CONFIG.copyright}
          </Text>
          
          <HStack gap={4} fontSize="sm" color="gray.600">
            {user && (
              <>
                <Link as={NextLink} href="/profile" color="blue.500">
                  Profile
                </Link>
                <Box width="1px" height="20px" bg="gray.300" />
                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme="red"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Box width="1px" height="20px" bg="gray.300" />
              </>
            )}
            <Text fontWeight="medium">
              Version {APP_CONFIG.version}
            </Text>
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}