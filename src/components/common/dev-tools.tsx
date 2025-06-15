/**
 * Development Tools Component
 * 
 * Temporary helper tools for development and testing.
 * TO BE REMOVED before production deployment.
 * 
 * @module components/common/dev-tools
 */

'use client'

import { Button, Box } from '@chakra-ui/react'
import { removeUserData } from '@/utils'
import { useRouter } from 'next/navigation'

/**
 * Development tools component with helper buttons
 * 
 * Features:
 * - Clear localStorage button
 * - Fixed position in top right corner
 * - Only visible in development environment
 * 
 * @returns {JSX.Element} The dev tools component
 */
export function DevTools() {
  const router = useRouter()

  const handleClearStorage = () => {
    removeUserData()
    // Force reload to reset all state
    router.push('/')
    router.refresh()
  }

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <Box
      position="fixed"
      top={4}
      right={4}
      zIndex={9999}
    >
      <Button
        size="sm"
        colorScheme="red"
        onClick={handleClearStorage}
        opacity={0.8}
        _hover={{ opacity: 1 }}
        title="Clear localStorage and logout"
      >
        Clear Storage
      </Button>
    </Box>
  )
}