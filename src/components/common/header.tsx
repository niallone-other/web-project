/**
 * Header Component
 * 
 * Application header with Portal branding and user information.
 * Features animated portal effects and dimension indicator.
 * 
 * @module components/common/header
 */

'use client'

import { Box, Container, HStack, Text, Badge } from '@chakra-ui/react'
import { UserInfo } from '@/components/user'
import { APP_CONFIG } from '@/lib/constants'
import { animationUtils, brandColors, componentColors } from '@/lib/theme'

/**
 * Header component with Portal branding
 * 
 * Features:
 * - Animated portal background effect
 * - App name with gradient styling
 * - Dimension indicator badge
 * - User info display
 * - Sticky positioning
 * 
 * @returns {JSX.Element} The header component
 * 
 * @example
 * ```tsx
 * <Header />
 * ```
 */
export function Header() {
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={100}
      bg={componentColors.background.dark}
      borderBottomWidth={1}
      borderColor={componentColors.border.dark}
      backdropFilter="blur(10px)"
      boxShadow="sm"
    >
      <Container size="xl" py={4} px={4} mx="auto">
        <HStack justify="space-between" wrap="wrap" gap={4}>
          {/* Left side - Branding */}
          <HStack gap={3}>
            {/* Portal Animation */}
            <Box position="relative" width="40px" height="40px">
              <Box
                position="absolute"
                inset={0}
                borderRadius="full"
                bg={brandColors.portal.DEFAULT}
                opacity={0.2}
                css={animationUtils.portalPulse('3s', '0s')}
              />
              <Box
                position="absolute"
                inset="15%"
                borderRadius="full"
                bg={brandColors.portal.DEFAULT}
                opacity={0.3}
                css={animationUtils.portalPulse('3s', '0.5s')}
              />
              <Box
                position="absolute"
                inset="30%"
                borderRadius="full"
                bg={brandColors.portal.dark}
                opacity={0.4}
              />
            </Box>
            
            {/* App Name */}
            <Box>
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="green.400"
                textShadow="0 0 20px rgba(34, 197, 94, 0.6)"
                letterSpacing="tight"
              >
                {APP_CONFIG.name}
              </Text>
            </Box>
            
            {/* Dimension Badge */}
            <Badge
              colorScheme="purple"
              variant="subtle"
              px={2}
              py={1}
              borderRadius="md"
              fontSize="xs"
            >
              {APP_CONFIG.dimension}
            </Badge>
          </HStack>
          
          {/* Right side - User Info */}
          <UserInfo compact showEditButton={false} />
        </HStack>
      </Container>
    </Box>
  )
}