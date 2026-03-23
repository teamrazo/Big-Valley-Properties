import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const LeadSchema = z.object({
  source: z.enum(['website-contact', 'listing-inquiry', 'valuation-request', 'chatbot']),
  firstName: z.string().min(1, 'First name required'),
  lastName: z.string().min(1, 'Last name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  message: z.string().optional(),
  listingId: z.string().optional(),
  agentId: z.string().optional(),
})

const GHL_API_KEY = process.env.GOHIGHLEVEL_API_KEY
const GHL_LOCATION_ID = process.env.GOHIGHLEVEL_LOCATION_ID
const GHL_API_URL = 'https://services.leadconnectorhq.com/contacts/'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = LeadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const lead = parsed.data
    let ghlContactId: string | null = null
    let ghlStatus: string = 'skipped'

    // Push to GoHighLevel if configured
    if (GHL_API_KEY && GHL_LOCATION_ID) {
      try {
        const ghlResponse = await fetch(GHL_API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            locationId: GHL_LOCATION_ID,
            firstName: lead.firstName,
            lastName: lead.lastName,
            email: lead.email,
            phone: lead.phone || '',
            source: `BVP Website — ${lead.source}`,
            tags: [lead.source, 'bvp-website'],
            customFields: [
              ...(lead.message ? [{ key: 'message', value: lead.message }] : []),
              ...(lead.listingId ? [{ key: 'listing_id', value: lead.listingId }] : []),
              ...(lead.agentId ? [{ key: 'agent_id', value: lead.agentId }] : []),
            ],
          }),
        })

        if (ghlResponse.ok) {
          const ghlData = await ghlResponse.json()
          ghlContactId = ghlData.contact?.id || null
          ghlStatus = 'success'
        } else {
          const errorText = await ghlResponse.text()
          console.error('GHL API error:', ghlResponse.status, errorText)
          ghlStatus = `error-${ghlResponse.status}`
        }
      } catch (ghlError) {
        console.error('GHL API request failed:', ghlError)
        ghlStatus = 'network-error'
      }
    }

    // TODO: Log to LeadSubmission table when Supabase is connected
    // await prisma.leadSubmission.create({ data: { ...lead, ghlContactId, ghlStatus } })

    return NextResponse.json({
      success: true,
      ghlStatus,
      ghlContactId,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
