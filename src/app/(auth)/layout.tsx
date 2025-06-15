/**
 * Auth Route Group Layout
 * 
 * This layout wraps all authenticated routes, providing centralized
 * authentication logic for the route group. This pattern demonstrates
 * scalable architecture for larger applications.
 * 
 * Benefits:
 * - Single source of truth for auth logic
 * - Easier to add new protected routes
 * - Clear separation of public/private routes
 * - Better code organization at scale
 * 
 * @module app/(auth)/layout
 */

import { AuthGuard } from '@/components/auth'

/**
 * Layout component for authenticated routes
 * 
 * All routes within the (auth) group will be protected by this layout.
 * This eliminates the need to wrap individual pages with AuthGuard.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child routes to render
 * @returns {JSX.Element} Protected layout wrapper
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  )
}