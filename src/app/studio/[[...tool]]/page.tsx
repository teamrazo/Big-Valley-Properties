import { redirect } from 'next/navigation'

/**
 * Sanity Studio is hosted externally at sanity.io.
 * Embedded Studio requires React 19+ which conflicts with our React 18 stack.
 * This route redirects editors to the hosted Studio.
 */
export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (projectId && projectId !== 'placeholder') {
    redirect(`https://${projectId}.sanity.studio`)
  }
  redirect('/')
}
