/**
 * User Profile Page
 * 
 * Displays the current user's profile information with edit capability.
 * Protected by authentication - redirects to /auth if not logged in.
 * 
 * @module app/(auth)/profile/page
 */

'use client'

import { Container, Box, Heading } from '@chakra-ui/react'
import { UserInfo } from '@/components/user'

/**
 * Profile page component
 * 
 * Features:
 * - Protected by route group layout
 * - Displays user information with edit capability
 * - Logout functionality
 * - Navigation back to information page
 * 
 * @returns {JSX.Element} The profile page
 */
export default function ProfilePage() {
  return (
    <Box minHeight="calc(100vh - 80px)">
      <Container maxW="container.sm" py={10} mx="auto" px={4}>
        <Box>
          <Heading size="lg" mb={8} color="white">
            My Profile
          </Heading>
          
          <Box
            bg="gray.700"
            p={6}
            borderRadius="lg"
            boxShadow="sm"
            mb={6}
          >
            <UserInfo showEditButton />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}