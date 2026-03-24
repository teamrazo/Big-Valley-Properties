import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'OPENAI_API_KEY not configured. Please add it to .env.local.' }, { status: 500 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No audio file provided' }, { status: 400 })

    const openaiForm = new FormData()
    openaiForm.append('file', file, file.name || 'recording.webm')
    openaiForm.append('model', 'whisper-1')

    const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: openaiForm,
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: { message: 'Whisper API error' } }))
      return NextResponse.json({ error: err.error?.message || 'Transcription failed' }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json({ text: data.text })
  } catch (err) {
    console.error('POST /api/ai/transcribe error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
