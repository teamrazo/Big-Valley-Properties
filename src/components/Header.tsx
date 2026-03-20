'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from '@/components/ThemeToggle'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Properties' },
  { href: '/locations', label: 'Communities' },
  { href: '/agents', label: 'Our Team' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-brand-md dark:shadow-none dark:border-b dark:border-gray-800'
          : 'bg-white/70 dark:bg-gray-950/70 backdrop-blur-md'
      }`}
      style={{ height: 'var(--nav-height)' }}
    >
      <nav className="container-bvp h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/logo-transparent.png"
            alt="Big Valley Properties"
            width={250}
            height={140}
            className="h-[4.75rem] w-auto dark:brightness-0 dark:invert"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium tracking-brand-wide uppercase text-charcoal-ink dark:text-gray-300 hover:text-forest-green dark:hover:text-river-stone transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-forest-green dark:bg-river-stone transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <ThemeToggle />
          <Link href="/contact" className="btn-primary text-xs py-2.5 px-6">
            Get In Touch
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-charcoal-ink dark:bg-gray-300 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-charcoal-ink dark:bg-gray-300 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-charcoal-ink dark:bg-gray-300 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-950 shadow-brand-lg dark:shadow-none dark:border-b dark:border-gray-800 transition-all duration-300 ${
          mobileOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-base font-medium text-charcoal-ink dark:text-gray-300 hover:text-forest-green dark:hover:text-river-stone py-2 border-b border-gray-100 dark:border-gray-800"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary mt-2 text-center" onClick={() => setMobileOpen(false)}>
            Get In Touch
          </Link>
        </div>
      </div>
    </header>
  )
}
