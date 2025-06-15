/**
 * User Authentication Form Component
 * 
 * Form for collecting username and job title during authentication.
 * Used in both the auth page and profile editing.
 * 
 * @module components/auth/user-form
 */

'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Heading,
} from '@chakra-ui/react'
import type { LoginFormData } from '@/types'

/**
 * Props for the UserForm component
 */
interface UserFormProps {
  /** Form submission handler */
  onSubmit: (data: LoginFormData) => Promise<void>
  /** Initial values for the form fields */
  initialValues?: LoginFormData
  /** Submit button text */
  submitText?: string
  /** Form title */
  title?: string
  /** Whether the form is in a loading state */
  isLoading?: boolean
}

/**
 * User form component for authentication and profile updates
 * 
 * Features:
 * - Controlled inputs for username and job title
 * - Form validation (both fields required)
 * - Loading state during submission
 * - Customisable title and button text
 * 
 * @param {UserFormProps} props - The component props
 * @returns {JSX.Element} The user form component
 * 
 * @example
 * ```tsx
 * <UserForm
 *   onSubmit={handleLogin}
 *   title="Welcome"
 *   submitText="Get Started"
 * />
 * ```
 */
export function UserForm({
  onSubmit,
  initialValues = { username: '', jobTitle: '' },
  submitText = 'Submit',
  title = 'Enter Your Details',
  isLoading = false,
}: UserFormProps) {
  const [formData, setFormData] = useState<LoginFormData>(initialValues)
  const [errors, setErrors] = useState<Partial<LoginFormData>>({})

  /**
   * Validates form data
   * @returns {boolean} Whether the form is valid
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {}
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }
    
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    await onSubmit(formData)
  }

  /**
   * Updates form field value
   */
  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for the field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%">
      <VStack gap={6} align="stretch">
        <Heading size="lg" textAlign="center">
          {title}
        </Heading>
        
        <VStack gap={4}>
          <Box width="100%">
            <Text mb={2} fontWeight="medium">
              Username
            </Text>
            <Input
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              placeholder="Enter your username"
              size="lg"
              disabled={isLoading}
              autoComplete="username"
              px={4}
            />
            {errors.username && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {errors.username}
              </Text>
            )}
          </Box>
          
          <Box width="100%">
            <Text mb={2} fontWeight="medium">
              Job Title
            </Text>
            <Input
              value={formData.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              placeholder="Enter your job title"
              size="lg"
              disabled={isLoading}
              autoComplete="organization-title"
              px={4}
            />
            {errors.jobTitle && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {errors.jobTitle}
              </Text>
            )}
          </Box>
        </VStack>
        
        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          width="100%"
          disabled={isLoading}
        >
          {submitText}
        </Button>
      </VStack>
    </Box>
  )
}