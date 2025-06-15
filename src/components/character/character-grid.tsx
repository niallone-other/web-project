/**
 * Character Grid Component
 * 
 * Displays a responsive grid of character cards.
 * Handles loading states, empty states, and errors.
 * 
 * @module components/character/character-grid
 */

'use client'

import { Grid, Box, Text, Spinner, Center, VStack } from '@chakra-ui/react'
import { CharacterCard } from './character-card'
import type { Character } from '@/types'

/**
 * Props for the CharacterGrid component
 */
interface CharacterGridProps {
  /** Array of characters to display */
  characters: Character[]
  /** Loading state */
  isLoading?: boolean
  /** Error state */
  error?: Error | null
  /** Handler for character selection */
  onCharacterClick?: (character: Character) => void
}

/**
 * Character grid layout component
 * 
 * Features:
 * - Responsive grid layout (mobile to desktop)
 * - Loading spinner with message
 * - Empty state handling
 * - Error display
 * - Smooth animations
 * 
 * @param {CharacterGridProps} props - The component props
 * @returns {JSX.Element} The character grid
 * 
 * @example
 * ```tsx
 * <CharacterGrid
 *   characters={data.characters.results}
 *   isLoading={loading}
 *   error={error}
 *   onCharacterClick={handleCharacterClick}
 * />
 * ```
 */
export function CharacterGrid({
  characters,
  isLoading = false,
  error = null,
  onCharacterClick,
}: CharacterGridProps) {
  // Loading state
  if (isLoading) {
    return (
      <Center minHeight="400px">
        <VStack gap={4}>
          <Spinner size="xl" color="blue.500" />
          <Text color="gray.600">Loading characters...</Text>
        </VStack>
      </Center>
    )
  }

  // Error state
  if (error) {
    return (
      <Center minHeight="400px">
        <VStack gap={2}>
          <Text fontSize="lg" color="red.500" fontWeight="medium">
            Error loading characters
          </Text>
          <Text color="gray.600" textAlign="center">
            {error.message || 'Something went wrong. Please try again.'}
          </Text>
        </VStack>
      </Center>
    )
  }

  // Empty state
  if (!characters || characters.length === 0) {
    return (
      <Center minHeight="400px">
        <VStack gap={2}>
          <Text fontSize="lg" color="gray.600" fontWeight="medium">
            No characters found
          </Text>
          <Text color="gray.500" textAlign="center">
            Try adjusting your search or check back later.
          </Text>
        </VStack>
      </Center>
    )
  }

  // Character grid
  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
      gap={6}
      width="100%"
    >
      {characters.map((character) => (
        <Box key={character.id}>
          <CharacterCard
            character={character}
            onClick={onCharacterClick}
          />
        </Box>
      ))}
    </Grid>
  )
}