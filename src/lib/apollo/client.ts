/**
 * Apollo Client Configuration
 * 
 * Sets up Apollo Client for GraphQL queries to the Rick and Morty API.
 * Includes caching, error handling, and type policies.
 * 
 * @module lib/apollo/client
 */

import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

/**
 * Rick and Morty GraphQL API endpoint
 */
const GRAPHQL_ENDPOINT = 'https://rickandmortyapi.com/graphql'

/**
 * Error handling link
 * Logs GraphQL and network errors for debugging
 */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })
  }
  
  if (networkError) {
    console.error(`Network error: ${networkError}`)
  }
})

/**
 * HTTP link for GraphQL requests
 */
const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
})

/**
 * Apollo Client instance
 * 
 * Configuration:
 * - InMemoryCache for caching query results
 * - Error handling for debugging
 * - Type policies for pagination
 */
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            // Pagination handling
            keyArgs: false,
            merge(existing, incoming, { args }) {
              // If no pagination args, replace entirely
              if (!args || !args.page) {
                return incoming
              }
              
              // For pagination, keep track of pages
              return {
                ...incoming,
                results: [...(incoming?.results || [])],
              }
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})