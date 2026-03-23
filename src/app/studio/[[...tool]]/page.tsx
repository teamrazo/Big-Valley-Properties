import { redirect } from 'next/navigation'

/**
 * Sanity Studio redirect — editors use hosted Studio at sanity.io.
 * Embedded Studio requires React 19+ (incompatible with our React 18 stack).
 */
export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (projectId && projectId !== 'placeholder') {
    redirect(`https://${projectId}.sanity.studio`)
  }
  redirect('/')
}
