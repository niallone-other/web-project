/**
 * Footer Component
 * 
 * Application footer that displays the challenge version.
 * Positioned at the bottom of the viewport.
 * 
 * @module components/common/footer
 */

'use client'

import { Box, Container, Text, HStack, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks'
import { APP_CONFIG } from '@/lib/constants'
import { componentColors, brandColors } from '@/lib/theme'

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
  };
  
  return (
    <Box
      as="footer"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg={componentColors.background.dark}
      borderTopWidth={1}
      borderColor={componentColors.border.dark}
      py={4}
      zIndex={10}
    >
      <Container size="xl" mx="auto" px={4}>
        <HStack justify="flex-end" gap={6} fontSize="sm" color="gray.400">
          <Text>Version {APP_CONFIG.version}</Text>
          {user && (
            <>
              <Link as={NextLink} href="/profile" color={brandColors.portal.DEFAULT} _hover={{ color: brandColors.portal.dark }}>
                Profile
              </Link>
              <Link 
                as="button" 
                onClick={handleLogout} 
                color={brandColors.portal.DEFAULT} 
                _hover={{ color: brandColors.portal.dark }}
              >
                Logout
              </Link>
            </>
          )}
        </HStack>
      </Container>
    </Box>
  )
}