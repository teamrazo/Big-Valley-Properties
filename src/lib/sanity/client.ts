import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

/**
 * GROQ query helpers for fetching Sanity content.
 * These activate once NEXT_PUBLIC_SANITY_PROJECT_ID is set.
 */

export async function getPosts() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'placeholder') return []
  return sanityClient.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, mainImage, author, publishedAt, categories
  }`)
}

export async function getPostBySlug(slug: string) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'placeholder') return null
  return sanityClient.fetch(`*[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, excerpt, seoTitle, seoDescription, mainImage, body, author, publishedAt, categories
  }`, { slug })
}

export async function getTestimonials() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'placeholder') return []
  return sanityClient.fetch(`*[_type == "testimonial"] | order(_createdAt desc) {
    _id, author, location, text, agentName, rating
  }`)
}
