/**
 * Information Page - Default
 * 
 * Redirects to the first page of information.
 * This ensures /information always shows page 1.
 * 
 * @module app/information/page
 */

import { redirect } from 'next/navigation'

export default function InformationPage() {
  redirect('/information/1')
}