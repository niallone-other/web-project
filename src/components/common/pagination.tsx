/**
 * Pagination Component
 * 
 * Provides navigation controls for paginated data.
 * Supports URL-based pagination for direct linking.
 * 
 * @module components/common/pagination
 */

'use client'

import { HStack, Button, Text, Box } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { colorSchemes, componentColors } from '@/lib/theme'

/**
 * Props for the Pagination component
 */
interface PaginationProps {
  /** Current page number */
  currentPage: number
  /** Total number of pages */
  totalPages: number
  /** Base URL path for pagination */
  basePath: string
  /** Whether to show page info text */
  showPageInfo?: boolean
}

/**
 * Pagination component for navigating between pages
 * 
 * Features:
 * - Previous/Next navigation buttons
 * - First/Last page shortcuts
 * - Current page display
 * - URL-based routing for direct links
 * - Disabled states for boundaries
 * - Responsive layout
 * 
 * @param {PaginationProps} props - The component props
 * @returns {JSX.Element} The pagination controls
 * 
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={3}
 *   totalPages={10}
 *   basePath="/information"
 * />
 * ```
 */
export function Pagination({
  currentPage,
  totalPages,
  basePath,
  showPageInfo = true,
}: PaginationProps) {
  const router = useRouter()

  /**
   * Navigates to a specific page
   */
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`${basePath}/${page}`)
    }
  }

  // Don't render if only one page
  if (totalPages <= 1) {
    return null
  }

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages
  
  // Button style for dark theme
  const buttonStyle = {
    color: componentColors.text.primary,
    _hover: { 
      bg: 'whiteAlpha.100',
      borderColor: 'green.400'
    },
    _disabled: {
      color: componentColors.text.disabled,
      borderColor: componentColors.border.default,
      cursor: 'not-allowed',
      opacity: 0.6
    }
  }

  return (
    <Box width="100%">
      <HStack justify="center" gap={2} wrap="wrap">
        {/* First Page */}
        <Button
          size="sm"
          variant="outline"
          colorScheme={colorSchemes.primary}
          onClick={() => goToPage(1)}
          disabled={isFirstPage}
          aria-label="Go to first page"
          px={4}
          {...buttonStyle}
        >
          First
        </Button>

        {/* Previous Page */}
        <Button
          size="sm"
          variant="outline"
          colorScheme={colorSchemes.primary}
          onClick={() => goToPage(currentPage - 1)}
          disabled={isFirstPage}
          aria-label="Go to previous page"
          px={4}
          {...buttonStyle}
        >
          Previous
        </Button>

        {/* Page Info */}
        {showPageInfo && (
          <Box px={4}>
            <Text fontSize="sm" fontWeight="medium" color={componentColors.text.primary}>
              Page {currentPage} of {totalPages}
            </Text>
          </Box>
        )}

        {/* Next Page */}
        <Button
          size="sm"
          variant="outline"
          colorScheme={colorSchemes.primary}
          onClick={() => goToPage(currentPage + 1)}
          disabled={isLastPage}
          aria-label="Go to next page"
          px={4}
          {...buttonStyle}
        >
          Next
        </Button>

        {/* Last Page */}
        <Button
          size="sm"
          variant="outline"
          colorScheme={colorSchemes.primary}
          onClick={() => goToPage(totalPages)}
          disabled={isLastPage}
          aria-label="Go to last page"
          px={4}
          {...buttonStyle}
        >
          Last
        </Button>
      </HStack>
    </Box>
  )
}