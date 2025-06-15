/**
 * Character Detail Modal Component
 * 
 * Displays detailed character information in a modal overlay.
 * Shows full character data including episodes and locations.
 * 
 * @module components/character/character-modal
 */

'use client'

import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  Badge,
  Button,
  Grid,
  Heading,
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogCloseTrigger,
  DialogBackdrop,
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { GET_CHARACTER } from '@/lib/apollo'
import type { Character, CharacterData } from '@/types'

/**
 * Props for the CharacterModal component
 */
interface CharacterModalProps {
  /** Character to display (basic info) */
  character: Character | null
  /** Whether modal is open */
  isOpen: boolean
  /** Close handler */
  onClose: () => void
}

/**
 * Status color mapping
 */
const statusColors = {
  Alive: 'green',
  Dead: 'red',
  unknown: 'gray',
} as const

/**
 * Character detail modal component
 * 
 * Features:
 * - Uses Chakra UI Dialog for accessibility
 * - Full character information display
 * - Episode list with details
 * - Location information
 * - High-resolution character image
 * - Loading state for additional data
 * - Responsive layout
 * 
 * @param {CharacterModalProps} props - The component props
 * @returns {JSX.Element} The dialog component
 * 
 * @example
 * ```tsx
 * <CharacterModal
 *   character={selectedCharacter}
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 * />
 * ```
 */
export function CharacterModal({ character, isOpen, onClose }: CharacterModalProps) {
  // Query for full character details
  const { data, loading } = useQuery<CharacterData>(GET_CHARACTER, {
    variables: { id: character?.id },
    skip: !character?.id || !isOpen,
  })

  if (!character) {
    return null
  }

  const fullCharacter = data?.character || character

  return (
    <DialogRoot 
      open={isOpen} 
      onOpenChange={(e) => !e.open && onClose()}
      size="lg"
    >
      <DialogBackdrop />
      <DialogContent 
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        maxWidth="600px"
        maxHeight="90vh"
        overflow="auto"
      >
        <DialogHeader px={6} py={4}>
          <DialogTitle>{fullCharacter.name}</DialogTitle>
          <DialogCloseTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              position="absolute"
              right={2}
              top={2}
              aria-label="Close modal"
            >
              ✕
            </Button>
          </DialogCloseTrigger>
        </DialogHeader>

        <DialogBody px={6} pb={6}>
          <Grid templateColumns={{ base: '1fr', md: '200px 1fr' }} gap={6}>
            {/* Image Column */}
            <VStack align="stretch" gap={4}>
              <Image
                src={fullCharacter.image}
                alt={fullCharacter.name}
                borderRadius="lg"
                width="100%"
                objectFit="cover"
              />
              <Badge
                colorScheme={statusColors[fullCharacter.status]}
                fontSize="sm"
                textAlign="center"
                p={2}
              >
                {fullCharacter.status}
              </Badge>
            </VStack>

            {/* Info Column */}
            <VStack align="stretch" gap={4}>
              {/* Basic Info */}
              <Box>
                <Text fontWeight="bold" mb={2}>Basic Information</Text>
                <VStack align="start" gap={1}>
                  <Text><strong>Species:</strong> {fullCharacter.species}</Text>
                  {fullCharacter.type && (
                    <Text><strong>Type:</strong> {fullCharacter.type}</Text>
                  )}
                  <Text><strong>Gender:</strong> {fullCharacter.gender}</Text>
                </VStack>
              </Box>

              {/* Location Info */}
              <Box>
                <Text fontWeight="bold" mb={2}>Location</Text>
                <VStack align="start" gap={1}>
                  <Text><strong>Origin:</strong> {fullCharacter.origin.name}</Text>
                  <Text><strong>Last Seen:</strong> {fullCharacter.location.name}</Text>
                </VStack>
              </Box>

              {/* Episodes */}
              {data?.character.episode && data.character.episode.length > 0 && (
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Episodes ({data.character.episode.length})
                  </Text>
                  <Box maxHeight="200px" overflowY="auto">
                    <VStack align="start" gap={1}>
                      {data.character.episode.slice(0, 10).map((ep) => (
                        <Text key={ep.id} fontSize="sm">
                          {ep.episode} - {ep.name}
                        </Text>
                      ))}
                      {data.character.episode.length > 10 && (
                        <Text fontSize="sm" color="gray.600">
                          ...and {data.character.episode.length - 10} more episodes
                        </Text>
                      )}
                    </VStack>
                  </Box>
                </Box>
              )}

              {loading && !data && (
                <Text color="gray.600" fontSize="sm">
                  Loading additional details...
                </Text>
              )}
            </VStack>
          </Grid>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}