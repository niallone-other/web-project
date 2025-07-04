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
import { componentColors, colorSchemes } from '@/lib/theme'

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
        {showEditButton && (
          <EditProfileDrawer>
            <Button 
              size="xs" 
              variant="outline"
              colorScheme={colorSchemes.primary}
              color={componentColors.text.primary}
              borderColor={componentColors.border.default}
              px={4}
              _hover={{
                bg: 'whiteAlpha.100',
                borderColor: componentColors.border.hover
              }}
            >
              Edit
            </Button>
          </EditProfileDrawer>
        )}
        <VStack align="flex-end" gap={0}>
          <Text fontWeight="bold" fontSize="sm" color="white">
            {user.username}
          </Text>
          <Text fontSize="xs" color="gray.400">
            {user.jobTitle}
          </Text>
        </VStack>
      </HStack>
    )
  }

  // Full view
  return (
    <Box>
      <VStack align="stretch" gap={4}>
        <Box>
          <Text fontSize="sm" color="gray.400" mb={1}>
            Username
          </Text>
          <Text fontSize="lg" fontWeight="medium" color="white">
            {user.username}
          </Text>
        </Box>
        
        <Box>
          <Text fontSize="sm" color="gray.400" mb={1}>
            Job Title
          </Text>
          <Text fontSize="lg" fontWeight="medium" color="white">
            {user.jobTitle}
          </Text>
        </Box>
        
        {showEditButton && (
          <EditProfileDrawer>
            <Button
              colorScheme={colorSchemes.primary}
              variant="outline"
              size="md"
              color={componentColors.text.primary}
              borderColor={componentColors.border.default}
              px={6}
              _hover={{
                bg: 'whiteAlpha.100',
                borderColor: componentColors.border.hover
              }}
            >
              Edit Profile
            </Button>
          </EditProfileDrawer>
        )}
      </VStack>
    </Box>
  )
}