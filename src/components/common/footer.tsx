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
import { useAuth } from '@/hooks'

/**
 * Challenge version constant
 */
const CHALLENGE_VERSION = '1.0.0'

/**
 * Footer component displaying app information
 * 
 * Features:
 * - Displays challenge version
 * - Responsive layout
 * - Subtle styling that doesn't interfere with content
 * - Fixed positioning at bottom
 * 
 * @returns {JSX.Element} The footer component
 * 
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
export function Footer() {
  const { user } = useAuth()
  
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
      <Container maxW="container.xl">
        <HStack justify="space-between" wrap="wrap" gap={4}>
          <Text color="gray.600" fontSize="sm">
            © 2025 Web Project
          </Text>
          
          <HStack gap={4} fontSize="sm" color="gray.600">
            {user && (
              <>
                <Link as={NextLink} href="/profile" color="blue.500">
                  Profile
                </Link>
                <Box width="1px" height="20px" bg="gray.300" />
              </>
            )}
            <Text fontWeight="medium">
              Version {CHALLENGE_VERSION}
            </Text>
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}