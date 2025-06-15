/**
 * User Info Display Component
 * 
 * Displays the current user's information with edit capability.
 * Can be used in headers, sidebars, or profile pages.
 * 
 * @module components/user/user-info
 */

'use client'

import {
  Box,
  Text,
  Button,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { useAuth } from '@/hooks'
import { EditProfileDrawer } from './edit-profile-drawer'

/**
 * Props for the UserInfo component
 */
interface UserInfoProps {
  /** Whether to show the component in compact mode */
  compact?: boolean
  /** Whether to show the edit button */
  showEditButton?: boolean
}

/**
 * User info display component
 * 
 * Features:
 * - Displays username and job title
 * - Edit capability via drawer
 * - Compact mode for header/navigation use
 * - Full mode for profile pages
 * 
 * @param {UserInfoProps} props - The component props
 * @returns {JSX.Element} The user info component
 * 
 * @example
 * ```tsx
 * // In header
 * <UserInfo compact />
 * 
 * // In profile page
 * <UserInfo showEditButton />
 * ```
 */
export function UserInfo({ 
  compact = false, 
  showEditButton = true,
}: UserInfoProps) {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  // Compact view
  if (compact) {
    return (
      <HStack gap={4}>
        <VStack align="flex-start" gap={0}>
          <Text fontWeight="bold" fontSize="sm">
            {user.username}
          </Text>
          <Text fontSize="xs" color="gray.600">
            {user.jobTitle}
          </Text>
        </VStack>
        {showEditButton && (
          <EditProfileDrawer>
            <Button size="xs" variant="outline">
              Edit
            </Button>
          </EditProfileDrawer>
        )}
      </HStack>
    )
  }

  // Full view
  return (
    <Box>
      <VStack align="stretch" gap={4}>
        <Box>
          <Text fontSize="sm" color="gray.600" mb={1}>
            Username
          </Text>
          <Text fontSize="lg" fontWeight="medium">
            {user.username}
          </Text>
        </Box>
        
        <Box>
          <Text fontSize="sm" color="gray.600" mb={1}>
            Job Title
          </Text>
          <Text fontSize="lg" fontWeight="medium">
            {user.jobTitle}
          </Text>
        </Box>
        
        {showEditButton && (
          <EditProfileDrawer>
            <Button
              colorScheme="blue"
              variant="outline"
              size="md"
            >
              Edit Profile
            </Button>
          </EditProfileDrawer>
        )}
      </VStack>
    </Box>
  )
}