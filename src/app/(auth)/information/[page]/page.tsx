/**
 * Information Page with Pagination
 * 
 * Main page displaying paginated character data from Rick and Morty API.
 * Now protected by the (auth) route group layout instead of individual AuthGuard.
 * 
 * @module app/(auth)/information/[page]/page
 */

'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Container, Heading, VStack, Box, Text } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { CharacterGrid, CharacterModal } from '@/components/character'
import { Pagination } from '@/components/common'
import { GET_CHARACTERS } from '@/lib/apollo'
import type { CharactersData, Character } from '@/types'

/**
 * Information page component with pagination
 * 
 * Features:
 * - Protected by route group layout
 * - URL-based pagination (/information/[page])
 * - Character grid display
 * - Click to open character details
 * - Loading and error states
 * - User info display in header
 * 
 * @returns {JSX.Element} The information page
 */
export default function InformationPage() {
  const params = useParams()
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  
  // Parse page number from URL
  const currentPage = parseInt(params.page as string, 10) || 1

  // Fetch characters for current page
  const { data, loading, error } = useQuery<CharactersData>(GET_CHARACTERS, {
    variables: { page: currentPage },
  })

  /**
   * Handles character card click
   */
  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character)
  }

  /**
   * Handles modal close
   */
  const handleModalClose = () => {
    setSelectedCharacter(null)
  }

  return (
    <Box minHeight="calc(100vh - 80px)">
      <Container maxW="container.xl" py={8} mx="auto" px={4}>
        <VStack gap={8} align="stretch">
          {/* Page Header */}
          <Box>
            <Heading size="xl" mb={2} color="white">Rick and Morty Characters</Heading>
            {data && (
              <Text color="gray.400">
                Showing {data.characters.results.length} of {data.characters.info.count} characters
              </Text>
            )}
          </Box>

          {/* Character Grid */}
          <CharacterGrid
            characters={data?.characters.results || []}
            isLoading={loading}
            error={error}
            onCharacterClick={handleCharacterClick}
          />

          {/* Pagination */}
          {data && (
            <Box mt={8}>
              <Pagination
                currentPage={currentPage}
                totalPages={data.characters.info.pages}
                basePath="/information"
              />
            </Box>
          )}
        </VStack>
      </Container>

      {/* Character Detail Modal */}
      <CharacterModal
        character={selectedCharacter}
        isOpen={!!selectedCharacter}
        onClose={handleModalClose}
      />
    </Box>
  )
}