import Link from 'next/link'
import Image from 'next/image'

const trinityAreas = [
  { name: 'Weaverville', slug: 'weaverville' },
  { name: 'Hayfork', slug: 'hayfork' },
  { name: 'Lewiston', slug: 'lewiston' },
  { name: 'Douglas City', slug: 'douglas-city' },
  { name: 'Junction City', slug: 'junction-city' },
  { name: 'Big Flat', slug: 'big-flat' },
  { name: 'Hyampom', slug: 'hyampom' },
  { name: 'Trinity Center', slug: 'trinity-center' },
  { name: 'Coffee Creek', slug: 'coffee-creek' },
]

const shastaAreas = [
  { name: 'Redding', slug: 'redding' },
  { name: 'Shasta Lake', slug: 'shasta-lake' },
  { name: 'Anderson', slug: 'anderson' },
  { name: 'Palo Cedro', slug: 'palo-cedro' },
  { name: 'Bella Vista', slug: 'bella-vista' },
  { name: 'Cottonwood', slug: 'cottonwood' },
  { name: 'Burney', slug: 'burney' },
  { name: 'Shasta', slug: 'shasta-historic-district' },
  { name: 'Fall River Mills', slug: 'fall-river-mills' },
  { name: 'Mountain Gate', slug: 'mountain-gate' },
  { name: 'French Gulch', slug: 'french-gulch' },
]

const quickLinks = [
  { href: '/properties', label: 'Property Search' },
  { href: '/locations', label: 'Communities' },
  { href: '/agents', label: 'Our Team' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-cabin-timber dark:bg-gray-950 text-white">
      {/* Main Footer - Compact Layout */}
      <div className="container-bvp py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-6">

          {/* Column 1: Logo + Social + Quick Links */}
          <div className="lg:col-span-2">
            <Image
              src="/images/logo-transparent.png"
              alt="Big Valley Properties"
              width={160}
              height={90}
              className="h-12 w-auto brightness-0 invert mb-3"
            />
            <p className="text-white/60 text-xs leading-relaxed mb-3">
              Serving Trinity &amp; Shasta Counties with dedication and expertise.
            </p>
            <div className="flex gap-3 mb-4">
              <a href="https://facebook.com/bigvalleyproperties" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-forest-green transition-colors" aria-label="Facebook">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com/bigvalleyproperties" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-forest-green transition-colors" aria-label="Instagram">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
            <ul className="space-y-1">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-xs">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Service Areas - Inline */}
          <div className="lg:col-span-5">
            <h4 className="font-heading text-xs mb-3 tracking-brand-wide uppercase text-white/90">Service Areas</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-0">
              {/* Trinity County */}
              <div>
                <p className="text-[10px] uppercase tracking-brand-wide text-river-stone font-semibold mb-1.5">Trinity County</p>
                <div className="flex flex-wrap gap-x-1.5 gap-y-0.5">
                  {trinityAreas.map((area, i) => (
                    <span key={area.slug} className="inline">
                      <Link href={`/locations/${area.slug}`} className="text-white/50 hover:text-white transition-colors text-[11px]">
                        {area.name}
                      </Link>
                      {i < trinityAreas.length - 1 && <span className="text-white/20 ml-1">&middot;</span>}
                    </span>
                  ))}
                </div>
              </div>
              {/* Shasta County */}
              <div>
                <p className="text-[10px] uppercase tracking-brand-wide text-river-stone font-semibold mb-1.5">Shasta County</p>
                <div className="flex flex-wrap gap-x-1.5 gap-y-0.5">
                  {shastaAreas.map((area, i) => (
                    <span key={area.slug} className="inline">
                      <Link href={`/locations/${area.slug}`} className="text-white/50 hover:text-white transition-colors text-[11px]">
                        {area.name}
                      </Link>
                      {i < shastaAreas.length - 1 && <span className="text-white/20 ml-1">&middot;</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Offices Side by Side */}
          <div className="lg:col-span-5">
            <h4 className="font-heading text-xs mb-3 tracking-brand-wide uppercase text-white/90">Our Offices</h4>
            <div className="grid grid-cols-2 gap-x-6">
              {/* Weaverville */}
              <div className="space-y-1.5 text-xs text-white/55">
                <p className="text-white/80 font-semibold text-[11px] uppercase tracking-wide">Weaverville</p>
                <a href="https://maps.app.goo.gl/UHEFNkZZn8iDZSJm6" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors text-[11px] leading-snug">
                  1313 Main St A<br />Weaverville, CA 96093
                </a>
                <a href="tel:5306235690" className="block hover:text-white transition-colors text-[11px]">(530) 623-5690</a>
                <p className="text-[10px] text-white/40">Mon-Fri: 10am - 5pm</p>
              </div>
              {/* Hayfork */}
              <div className="space-y-1.5 text-xs text-white/55">
                <p className="text-white/80 font-semibold text-[11px] uppercase tracking-wide">Hayfork</p>
                <a href="https://maps.app.goo.gl/wxvBHJSNST7N3VBd7" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors text-[11px] leading-snug">
                  7050 CA-3<br />Hayfork, CA 96041
                </a>
                <a href="tel:5306285850" className="block hover:text-white transition-colors text-[11px]">(530) 628-5850</a>
                <p className="text-[10px] text-white/40">Mon-Sun: 8am - 5pm</p>
                <a href="mailto:retta@bvptrinity.com" className="block hover:text-white transition-colors text-[10px]">retta@bvptrinity.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-bvp py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/35 text-[11px]">
            &copy; {new Date().getFullYear()} Big Valley Properties. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-white/35">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>

      {/* Powered By Credits */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="container-bvp py-2 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
          <span className="text-white/25 text-[10px]">Powered by</span>
          <div className="flex items-center gap-3">
            <a
              href="https://pillar.razorsharpnetworks.com/webassetfx-smart-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/60 transition-colors text-[10px] font-medium"
            >
              WebAssetFX
            </a>
            <span className="text-white/15">&middot;</span>
            <a
              href="https://pillar.razorsharpnetworks.com/automate-ai-agents-overview"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/60 transition-colors text-[10px] font-medium"
            >
              AutoMATE&#8482; AI Technology
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
