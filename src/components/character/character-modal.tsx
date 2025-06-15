/**
 * Character Detail Modal Component
 * 
 * Displays detailed character information in a modal overlay.
 * Shows full character data including episodes and locations.
 * 
 * @module components/character/character-modal
 */

'use client'

import { useState, useEffect } from 'react'
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
 * - Full character information display
 * - Episode list with details
 * - Location information
 * - High-resolution character image
 * - Loading state for additional data
 * - Responsive layout
 * 
 * @param {CharacterModalProps} props - The component props
 * @returns {JSX.Element | null} The modal component or null
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
  const [showModal, setShowModal] = useState(false)

  // Query for full character details
  const { data, loading } = useQuery<CharacterData>(GET_CHARACTER, {
    variables: { id: character?.id },
    skip: !character?.id || !isOpen,
  })

  // Handle modal visibility
  useEffect(() => {
    if (isOpen) {
      setShowModal(true)
    } else {
      // Delay to allow animation
      const timer = setTimeout(() => setShowModal(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!showModal || !character) {
    return null
  }

  const fullCharacter = data?.character || character

  return (
    <>
      {/* Backdrop */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.600"
        zIndex={1000}
        onClick={onClose}
        opacity={isOpen ? 1 : 0}
        transition="opacity 0.3s"
      />

      {/* Modal Content */}
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform={`translate(-50%, -50%) scale(${isOpen ? 1 : 0.95})`}
        bg="white"
        borderRadius="lg"
        boxShadow="2xl"
        maxWidth="600px"
        width="90%"
        maxHeight="90vh"
        overflow="auto"
        zIndex={1001}
        opacity={isOpen ? 1 : 0}
        transition="all 0.3s"
      >
        {/* Header */}
        <Box position="sticky" top={0} bg="white" borderBottomWidth={1} p={4}>
          <HStack justify="space-between">
            <Heading size="lg">{fullCharacter.name}</Heading>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </Button>
          </HStack>
        </Box>

        {/* Content */}
        <Box p={6}>
          <Grid templateColumns={{ base: '1fr', md: '200px 1fr' }} gap={6}>
            {/* Image Column */}
            <VStack align="stretch" gap={4}>
              <Image
                src={fullCharacter.image}
                alt={fullCharacter.name}
                borderRadius="lg"
                width="100%"
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
        </Box>
      </Box>
    </>
  )
}