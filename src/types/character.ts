/**
 * Character Type Definitions
 * 
 * TypeScript types for Rick and Morty API character data.
 * These types match the GraphQL schema structure.
 * 
 * @module types/character
 */

/**
 * Character status enum
 */
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'

/**
 * Character gender enum
 */
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown'

/**
 * Location information
 */
export interface Location {
  /** Location ID */
  id: string
  /** Location name */
  name: string
  /** Location type */
  type?: string
  /** Dimension */
  dimension?: string
}

/**
 * Episode information
 */
export interface Episode {
  /** Episode ID */
  id: string
  /** Episode name */
  name: string
  /** Episode code (e.g., "S01E01") */
  episode: string
  /** Air date */
  air_date?: string
}

/**
 * Character data structure
 */
export interface Character {
  /** Character ID */
  id: string
  /** Character name */
  name: string
  /** Character status */
  status: CharacterStatus
  /** Character species */
  species: string
  /** Character type/subspecies */
  type: string
  /** Character gender */
  gender: CharacterGender
  /** Character image URL */
  image: string
  /** Origin location */
  origin: Location
  /** Current location */
  location: Location
  /** Episodes the character appears in */
  episode: Episode[]
  /** Creation timestamp */
  created?: string
}

/**
 * Pagination info
 */
export interface PageInfo {
  /** Total number of items */
  count: number
  /** Total number of pages */
  pages: number
  /** Next page number (null if last page) */
  next: number | null
  /** Previous page number (null if first page) */
  prev: number | null
}

/**
 * Characters query response
 */
export interface CharactersResponse {
  /** Pagination information */
  info: PageInfo
  /** Array of characters */
  results: Character[]
}

/**
 * Full characters query data
 */
export interface CharactersData {
  /** Characters query result */
  characters: CharactersResponse
}

/**
 * Single character query data
 */
export interface CharacterData {
  /** Single character result */
  character: Character
}