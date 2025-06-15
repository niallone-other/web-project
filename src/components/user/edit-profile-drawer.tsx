/**
 * Edit Profile Drawer Component
 * 
 * A drawer component for editing user profile information.
 * Provides a form interface for updating username and job title.
 * 
 * @module components/user/edit-profile-drawer
 */

'use client'

import { useState } from 'react'
import {
  Button,
  Drawer,
} from '@chakra-ui/react'
import { UserForm } from '@/components/auth'
import { useAuth } from '@/hooks'
import type { LoginFormData } from '@/types'

/**
 * Props for the EditProfileDrawer component
 */
interface EditProfileDrawerProps {
  /** The trigger element that opens the drawer */
  children: React.ReactNode
}

/**
 * Edit profile drawer component
 * 
 * Features:
 * - Slides in from the right
 * - Contains user form for editing profile
 * - Handles form submission and loading states
 * - Auto-closes on successful update
 * 
 * @param {EditProfileDrawerProps} props - The component props
 * @returns {JSX.Element} The drawer component
 * 
 * @example
 * ```tsx
 * <EditProfileDrawer>
 *   <Button>Edit Profile</Button>
 * </EditProfileDrawer>
 * ```
 */
export function EditProfileDrawer({ children }: EditProfileDrawerProps) {
  const { user, updateUser } = useAuth()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

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
      // Close drawer on successful update
      setIsOpen(false)
    }
  }

  return (
    <Drawer.Root size="md" open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Drawer.Trigger asChild>
        {children}
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header px={6} py={4}>
            <Drawer.Title>Edit Profile</Drawer.Title>
            <Drawer.CloseTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                position="absolute"
                right={2}
                top={2}
                aria-label="Close drawer"
              >
                ✕
              </Button>
            </Drawer.CloseTrigger>
          </Drawer.Header>
          
          <Drawer.Body px={6} py={4}>
            <UserForm
              onSubmit={handleUpdate}
              initialValues={{
                username: user.username,
                jobTitle: user.jobTitle,
              }}
              title=""
              submitText="Save Changes"
              isLoading={isUpdating}
            />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  )
}