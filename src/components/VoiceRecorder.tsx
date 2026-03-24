'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface Props {
  onTranscription: (text: string) => void
  disabled?: boolean
}

export default function VoiceRecorder({ onTranscription, disabled }: Props) {
  const [recording, setRecording] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [supported, setSupported] = useState(true)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && !navigator.mediaDevices?.getUserMedia) {
      setSupported(false)
    }
  }, [])

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop())
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setProcessing(true)
        try {
          const formData = new FormData()
          formData.append('file', blob, 'recording.webm')
          const res = await fetch('/api/ai/transcribe', { method: 'POST', body: formData })
          if (!res.ok) {
            const err = await res.json()
            throw new Error(err.error || 'Transcription failed')
          }
          const { text } = await res.json()
          onTranscription(text)
        } catch (err) {
          console.error('Transcription error:', err)
          onTranscription(`[Transcription failed: ${err instanceof Error ? err.message : 'unknown error'}]`)
        } finally {
          setProcessing(false)
        }
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setRecording(true)
      setSeconds(0)
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
    } catch {
      setSupported(false)
    }
  }, [onTranscription])

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop()
    setRecording(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  if (!supported) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg px-4 py-3 text-sm text-yellow-700 dark:text-yellow-400">
        🎙️ Voice recording not supported in this browser. Please type your notes instead.
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {recording ? (
        <>
          <button
            type="button"
            onClick={stopRecording}
            className="flex items-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors min-h-[48px]"
          >
            <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
            Stop Recording
          </button>
          <span className="text-sm text-cabin-timber dark:text-gray-400 font-mono">{formatTime(seconds)}</span>
        </>
      ) : (
        <button
          type="button"
          onClick={startRecording}
          disabled={disabled || processing}
          className="flex items-center gap-2 px-4 py-3 bg-forest-green text-white rounded-lg font-medium hover:bg-deep-pine transition-colors disabled:opacity-40 min-h-[48px]"
        >
          🎙️ {processing ? 'Processing...' : 'Record'}
        </button>
      )}
      {processing && (
        <span className="text-sm text-cabin-timber dark:text-gray-400 animate-pulse">Transcribing...</span>
      )}
    </div>
  )
}
