/**
 * Home Page Component
 * 
 * This is the landing page of the application.
 * It will handle the initial authentication check and redirect logic.
 * 
 * Current implementation is a placeholder that verifies Chakra UI integration.
 * Will be updated to include auth checking and proper routing.
 * 
 * @module app/page
 */

import { Box, Heading, Text, Container } from '@chakra-ui/react'

/**
 * Home page component
 * 
 * @returns {JSX.Element} The home page content
 */
export default function HomePage() {
  return (
    <Container maxW="container.md" py={10}>
      <Box textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>
          Web Project
        </Heading>
        <Text fontSize="lg" color="gray.600">
          GQL app with auth
        </Text>
      </Box>
    </Container>
  )
}