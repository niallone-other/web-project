/**
 * Chakra UI Provider Component
 * 
 * This provider wraps the entire application to provide Chakra UI's theme and styling system.
 * It configures the custom theme settings and global styles for the application.
 * 
 * @module providers/chakra-provider
 */

'use client'

import { ChakraProvider as ChakraUIProvider, defaultSystem } from '@chakra-ui/react'

/**
 * Props for the ChakraProvider component
 */
interface ChakraProviderProps {
  /** Child components to be wrapped by the provider */
  children: React.ReactNode
}

/**
 * ChakraProvider wraps the application with Chakra UI's theme context
 * 
 * This component must be marked as a client component since Chakra UI
 * uses React Context API which requires client-side rendering.
 * 
 * Note: Chakra UI v3 uses a new theming system. We're using the default system
 * for now and can customise as needed.
 * 
 * @param {ChakraProviderProps} props - The component props
 * @returns {JSX.Element} The wrapped application with Chakra UI theme
 * 
 * @example
 * ```tsx
 * <ChakraProvider>
 *   <App />
 * </ChakraProvider>
 * ```
 */
export function ChakraProvider({ children }: ChakraProviderProps) {
  return (
    <ChakraUIProvider value={defaultSystem}>
      {children}
    </ChakraUIProvider>
  )
}