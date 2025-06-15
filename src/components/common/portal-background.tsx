/**
 * Portal Background Component
 * 
 * Provides a subtle animated background pattern inspired by interdimensional portals.
 * Used to add visual interest to pages while maintaining readability.
 * 
 * @module components/common/portal-background
 */

'use client'

import { Box } from '@chakra-ui/react'

/**
 * Portal background with animated gradient
 * 
 * Features:
 * - Subtle animated gradient
 * - Maintains readability
 * - Performance optimized
 * 
 * @returns {JSX.Element} The background component
 */
export function PortalBackground() {
  return (
    <>
      {/* Base gradient */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={-1}
        bgGradient="radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
                   radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
                   radial-gradient(circle at 40% 40%, rgba(14, 165, 233, 0.05) 0%, transparent 50%)"
        pointerEvents="none"
      />
      
      {/* Grid pattern overlay */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={-1}
        opacity={0.03}
        pointerEvents="none"
        css={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
    </>
  )
}