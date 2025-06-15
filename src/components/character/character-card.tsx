/**
 * Character Card Component
 * 
 * Displays individual character information in a card format.
 * Includes image, name, status, and basic details.
 * 
 * @module components/character/character-card
 */

'use client'

import { Box, Image, Text, VStack, HStack, Badge } from '@chakra-ui/react'
import { componentColors, layerStyles } from '@/lib/theme'
import type { Character } from '@/types'

/**
 * Props for the CharacterCard component
 */
interface CharacterCardProps {
  /** Character data to display */
  character: Character
  /** Click handler for when card is selected */
  onClick?: (character: Character) => void
}

/**
 * Status color mapping for character status badge
 */
const statusColors = {
  Alive: 'green',
  Dead: 'red',
  unknown: 'gray',
} as const

/**
 * Character card component
 * 
 * Features:
 * - Responsive card layout
 * - Character image with lazy loading
 * - Status indicator with color coding
 * - Hover effects for interactivity
 * - Click handler for modal opening
 * 
 * @param {CharacterCardProps} props - The component props
 * @returns {JSX.Element} The character card
 * 
 * @example
 * ```tsx
 * <CharacterCard 
 *   character={characterData}
 *   onClick={(char) => openModal(char)}
 * />
 * ```
 */
export function CharacterCard({ character, onClick }: CharacterCardProps) {
  /**
   * Handles card click
   */
  const handleClick = () => {
    if (onClick) {
      onClick(character)
    }
  }

  return (
    <Box
      {...(onClick ? layerStyles.cardHover : layerStyles.card)}
      cursor={onClick ? 'pointer' : 'default'}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          handleClick()
        }
      }}
    >
      {/* Character Image */}
      <Box position="relative" paddingBottom="100%" bg="gray.100">
        <Image
          src={character.image}
          alt={character.name}
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          objectFit="cover"
          loading="lazy"
        />
      </Box>
      
      {/* Character Info */}
      <VStack align="stretch" p={4} gap={2}>
        <Text fontWeight="bold" fontSize="lg" noOfLines={1} color={componentColors.text.primary}>
          {character.name}
        </Text>
        
        <HStack justify="space-between" align="flex-start">
          <VStack align="start" gap={1} flex={1}>
            <Text fontSize="sm" color={componentColors.text.secondary} noOfLines={1}>
              {character.species}
              {character.type && ` - ${character.type}`}
            </Text>
            <Text fontSize="xs" color={componentColors.text.muted} noOfLines={1}>
              {character.location.name}
            </Text>
          </VStack>
          
          <Badge
            colorScheme={statusColors[character.status]}
            fontSize="xs"
            px={2}
            py={1}
            borderRadius="full"
          >
            {character.status}
          </Badge>
        </HStack>
      </VStack>
    </Box>
  )
}