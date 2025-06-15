/**
 * App Layout Component
 * 
 * Provides the main layout structure for the application.
 * Centers content and manages spacing for footer.
 * 
 * @module components/common/app-layout
 */

'use client'

import { Box } from '@chakra-ui/react'

/**
 * Props for the AppLayout component
 */
interface AppLayoutProps {
  children: React.ReactNode
}

/**
 * Application layout wrapper
 * 
 * Features:
 * - Centers all content horizontally
 * - Manages footer spacing
 * - Ensures proper full-height layout
 * 
 * @param {AppLayoutProps} props - Component props
 * @returns {JSX.Element} The layout wrapper
 */
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      width="100%"
      margin="0 auto"
      position="relative"
    >
      <Box flex="1" width="100%" pb="80px">
        {children}
      </Box>
    </Box>
  )
}