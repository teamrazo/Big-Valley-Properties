'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
  amount?: number
}

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.12,
  once = true,
  amount = 0.15,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })

  const containerVariant: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariant}
    >
      {children}
    </motion.div>
  )
}
