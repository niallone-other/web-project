/**
 * User Info Display Component
 * 
 * Displays the current user's information with edit capability.
 * Can be used in headers, sidebars, or profile pages.
 * 
 * @module components/user/user-info
 */

'use client'

import { useState } from 'react'
import {
  Box,
  Text,
  Button,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { useAuth } from '@/hooks'
import { UserForm } from '@/components/auth'
import type { LoginFormData } from '@/types'

/**
 * Props for the UserInfo component
 */
interface UserInfoProps {
  /** Whether to show the component in compact mode */
  compact?: boolean
  /** Whether to show the edit button */
  showEditButton?: boolean
  /** Whether to show in edit mode */
  editMode?: boolean
  /** Callback when edit mode changes */
  onEditModeChange?: (editMode: boolean) => void
}

/**
 * User info display component
 * 
 * Features:
 * - Displays username and job title
 * - Inline edit mode with UserForm
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
  editMode: controlledEditMode,
  onEditModeChange,
}: UserInfoProps) {
  const { user, updateUser } = useAuth()
  const [localEditMode, setLocalEditMode] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // Use controlled or local edit mode
  const editMode = controlledEditMode ?? localEditMode
  const setEditMode = onEditModeChange ?? setLocalEditMode

  if (!user) {
    return null
  }

  /**
   * Handles user info update
   */
  const handleUpdate = async (data: LoginFormData) => {
    setIsUpdating(true)
    const success = await updateUser(data.username, data.jobTitle)
    setIsUpdating(false)
    
    if (success) {
      setEditMode(false)
    }
  }

  /**
   * Handles cancel edit
   */
  const handleCancel = () => {
    setEditMode(false)
  }

  // Edit mode view
  if (editMode) {
    return (
      <Box>
        <UserForm
          onSubmit={handleUpdate}
          initialValues={{
            username: user.username,
            jobTitle: user.jobTitle,
          }}
          title="Update Your Information"
          submitText="Save Changes"
          isLoading={isUpdating}
        />
        <Button
          mt={2}
          width="100%"
          variant="ghost"
          onClick={handleCancel}
          disabled={isUpdating}
        >
          Cancel
        </Button>
      </Box>
    )
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
          <Button size="xs" variant="outline" onClick={() => setEditMode(true)}>
            Edit
          </Button>
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
          <Button
            onClick={() => setEditMode(true)}
            colorScheme="blue"
            variant="outline"
            size="md"
          >
            Edit Profile
          </Button>
        )}
      </VStack>
    </Box>
  )
}