'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface Props {
  from?: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export default function CountUp({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(from)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(from, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return controls.stop
  }, [isInView, from, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}
