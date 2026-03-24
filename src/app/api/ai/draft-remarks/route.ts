import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'OPENAI_API_KEY not configured' }, { status: 500 })
    }

    const { propertyDetails, notes, address, propertyType, bedrooms, bathrooms, livingArea, lotSizeAcres } = await request.json()

    const prompt = `Write an engaging MLS listing description for this property.

Address: ${address || 'Not provided'}
Type: ${propertyType || 'Residential'}
Beds: ${bedrooms || '?'} | Baths: ${bathrooms || '?'} | Sqft: ${livingArea || '?'} | Acres: ${lotSizeAcres || '?'}

${propertyDetails ? `Property Details:\n${JSON.stringify(propertyDetails, null, 2)}` : ''}
${notes ? `Agent Notes:\n${notes}` : ''}

Guidelines:
- Professional, warm tone suited to rural Northern California
- Highlight key features, views, and lifestyle
- 150-300 words
- No ALL CAPS or excessive exclamation marks
- Include a compelling opening line
- Return ONLY the description text`

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a skilled real estate copywriter specializing in rural and mountain properties in Northern California.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return NextResponse.json({ error: err.error?.message || 'OpenAI API error' }, { status: res.status })
    }

    const data = await res.json()
    const remarks = data.choices?.[0]?.message?.content?.trim() || ''

    return NextResponse.json({ remarks })
  } catch (err) {
    console.error('POST /api/ai/draft-remarks error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
