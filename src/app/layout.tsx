/**
 * Root Layout Component
 * 
 * This is the main layout wrapper for the entire Next.js application.
 * It provides the HTML structure, metadata, and global providers.
 * 
 * @module app/layout
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@/providers/chakra-provider";

/**
 * Inter font configuration
 * Using Inter as the primary font for better readability and modern aesthetics
 */
const inter = Inter({ subsets: ["latin"] });

/**
 * Application metadata for SEO and browser display
 */
export const metadata: Metadata = {
  title: "Web Project",
  description: "GQL app with auth",
};

/**
 * Root layout component that wraps all pages
 * 
 * This layout:
 * - Sets up the HTML structure with proper language attribute
 * - Applies the Inter font family globally
 * - Wraps the application with necessary providers (Chakra UI)
 * - Will later include Apollo Client and Auth providers
 * 
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - Child components (pages) to render
 * @returns {JSX.Element} The complete HTML document structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
