import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const SYSTEM_PROMPT = `You are a real estate data extraction assistant. Given raw walkthrough notes from a property showing, extract structured property details.

Return a JSON object matching this schema:
{
  "structure": { "foundation": string[], "siding": string[], "roofType": string[], "driveway": string[], "garage": { "type": string, "cars": number, "features": string[] } },
  "utilities": { "waterSource": string[], "sewer": { "type": string, "septicSize": string, "septicYear": string }, "power": string[], "heating": string[], "cooling": { "types": string[], "age": string }, "miniSplitRooms": string },
  "rooms": {
    "livingRoom": { "flooring": string[], "windows": string[], "ceilingFeatures": string[], "notes": string },
    "kitchen": { "flooring": string[], "counters": string[], "appliances": [{ "name": string, "age": string, "condition": string }], "extras": string[], "notes": string },
    "diningRoom": { "type": string, "flooring": string[], "notes": string },
    "familyRoom": { "flooring": string[], "notes": string },
    "officeDen": { "flooring": string[], "notes": string },
    "bedrooms": [{ "label": string, "flooring": string[], "closetType": string, "hasCeilingFan": boolean, "notes": string }],
    "bathrooms": [{ "label": string, "type": string, "flooring": string[], "counters": string[], "tubType": string, "sinks": number, "notes": string }],
    "laundry": { "location": string, "dryer": string, "washerDryerIncluded": boolean, "hasSink": boolean }
  },
  "outdoor": { "outbuildings": [{ "type": string, "sqft": string }], "yard": { "fenced": boolean, "sprinklers": boolean, "autoTimers": boolean, "landscaped": boolean }, "features": string[], "gatedDrive": boolean, "easement": string, "propertyFencing": string },
  "guestHouse": { "hasGuestHouse": boolean, "type": string, "sqft": string },
  "inspections": { "dryRot": boolean, "termiteDamage": boolean, "cracksInWallsFoundation": boolean, "oldRoof": boolean, "oldHVAC": boolean, "deckNeedsReplacement": boolean, "notes": string },
  "additionalLot": { "address": string, "notes": string }
}

Rules:
- Only include fields mentioned or clearly implied in the notes
- Omit entire sections if nothing relevant was mentioned
- Use standard terms (e.g., "Comp" for composition roof, "Vinyl" for vinyl flooring)
- Return ONLY valid JSON, no markdown`

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'OPENAI_API_KEY not configured' }, { status: 500 })
    }

    const { notes, existingData } = await request.json()
    if (!notes || typeof notes !== 'string') {
      return NextResponse.json({ error: 'notes field required' }, { status: 400 })
    }

    const userPrompt = existingData
      ? `Here are the walkthrough notes:\n\n${notes}\n\nExisting data to merge with:\n${JSON.stringify(existingData)}\n\nExtract and merge all property details.`
      : `Here are the walkthrough notes:\n\n${notes}\n\nExtract all property details.`

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' },
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return NextResponse.json({ error: err.error?.message || 'OpenAI API error' }, { status: res.status })
    }

    const data = await res.json()
    const content = data.choices?.[0]?.message?.content
    const extracted = JSON.parse(content)

    // Compute missing recommended fields
    const missing: string[] = []
    if (!extracted.structure?.foundation?.length) missing.push('Foundation type')
    if (!extracted.structure?.roofType?.length) missing.push('Roof type')
    if (!extracted.utilities?.waterSource?.length) missing.push('Water source')
    if (!extracted.utilities?.sewer) missing.push('Sewer type')
    if (!extracted.utilities?.heating?.length) missing.push('Heating')
    if (!extracted.rooms?.kitchen) missing.push('Kitchen details')
    if (!extracted.outdoor) missing.push('Outdoor features')

    return NextResponse.json({ extracted, missing })
  } catch (err) {
    console.error('POST /api/ai/extract-property-details error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
