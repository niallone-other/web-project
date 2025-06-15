/**
 * GraphQL Queries
 * 
 * Query definitions for the Rick and Morty GraphQL API.
 * These queries fetch character data with pagination support.
 * 
 * @module lib/apollo/queries
 */

import { gql } from '@apollo/client'

/**
 * Query to fetch paginated list of characters
 * 
 * Variables:
 * - page: Page number to fetch (optional, defaults to 1)
 * 
 * Returns:
 * - Pagination info (count, pages, next, prev)
 * - Array of character results with basic info and images
 */
export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        origin {
          id
          name
        }
        location {
          id
          name
        }
      }
    }
  }
`

/**
 * Query to fetch a single character by ID
 * 
 * Variables:
 * - id: Character ID to fetch
 * 
 * Returns:
 * - Complete character information including episodes
 */
export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      origin {
        id
        name
        type
        dimension
      }
      location {
        id
        name
        type
        dimension
      }
      episode {
        id
        name
        episode
        air_date
      }
      created
    }
  }
`

/**
 * Query to search characters by name
 * 
 * Variables:
 * - name: Name filter (partial match)
 * - page: Page number (optional)
 * 
 * Returns:
 * - Filtered character results
 */
export const SEARCH_CHARACTERS = gql`
  query SearchCharacters($name: String!, $page: Int) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        origin {
          id
          name
        }
        location {
          id
          name
        }
      }
    }
  }
`