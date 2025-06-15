/**
 * Authentication Hook
 * 
 * Re-exports the useAuth hook from the auth provider for cleaner imports.
 * This follows the pattern of keeping hooks in a dedicated directory.
 * 
 * @module hooks/use-auth
 */

export { useAuth } from '@/providers/auth-provider'