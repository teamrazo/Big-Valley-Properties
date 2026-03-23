import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const leadSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(20).optional(),
  message: z.string().max(2000).optional(),
  source: z.string().max(100).default('website'),
  listingId: z.string().optional(),
  agentId: z.string().optional(),
})

const GHL_API_URL = 'https://services.leadconnectorhq.com/contacts/'
const GHL_API_KEY = process.env.GHL_API_KEY || 'pit-e70a7a50-6a87-44d8-a907-92aa414f0343'
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 't1kcYSbV8ewKlTzRqrYE'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = leadSchema.parse(body)

    // Send to GoHighLevel
    let ghlContactId: string | undefined
    let ghlStatus = 'pending'

    try {
      const ghlResponse = await fetch(GHL_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28',
        },
        body: JSON.stringify({
          firstName: parsed.firstName,
          lastName: parsed.lastName,
          email: parsed.email,
          phone: parsed.phone,
          locationId: GHL_LOCATION_ID,
          source: `BVP Website - ${parsed.source}`,
          tags: ['website-lead', parsed.source],
          customFields: parsed.message ? [{ key: 'message', value: parsed.message }] : [],
        }),
      })

      if (ghlResponse.ok) {
        const ghlData = await ghlResponse.json()
        ghlContactId = ghlData.contact?.id
        ghlStatus = 'synced'
      } else {
        ghlStatus = 'failed'
      }
    } catch {
      ghlStatus = 'failed'
    }

    // TODO: Also save to Supabase DB when connected

    return NextResponse.json({
      success: true,
      ghlContactId,
      ghlStatus,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
