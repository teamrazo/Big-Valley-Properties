# Big Valley Properties - Technical Documentation

**Version:** 1.0 (Phase 1 Complete)
**Last Updated:** March 23, 2026
**Prepared by:** Jesse Razo, RazorSharp Networks
**Contact:** jrazzo@razorsharpnetworks.com

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Stack](#technical-stack)
3. [Architecture](#architecture)
4. [Features Implemented](#features-implemented)
5. [Data Models](#data-models)
6. [Components](#components)
7. [Styling & Design System](#styling--design-system)
8. [Assets](#assets)
9. [Routing Structure](#routing-structure)
10. [Deployment](#deployment)
11. [API Integrations](#api-integrations)
12. [Office Locations](#office-locations)
13. [Service Areas](#service-areas)
14. [Phase 2 Planning](#phase-2-planning)
15. [Development Guidelines](#development-guidelines)
16. [Known Issues & Technical Debt](#known-issues--technical-debt)
17. [Getting Started](#getting-started)

---

## Project Overview

### Business Context

Big Valley Properties (BVP) is the leading real estate brokerage serving **Trinity and Shasta Counties** in Northern California. The website serves as the digital front door for the brokerage, showcasing property listings, agent profiles, and comprehensive community information for 20 communities across two counties.

### Target Audience

- **Buyers** seeking mountain cabins, ranches, land, and residential homes in Northern California
- **Sellers** looking for a trusted brokerage with deep local expertise
- **Relocators** exploring Trinity and Shasta County communities
- **Agents** interested in joining Big Valley Properties

### Key Stakeholders

| Name | Role | Contact |
|------|------|---------|
| Retta Treanor | Broker / Owner | retta@bvptrinity.com |
| Jesse Razo | Super Admin / Developer | jrazzo@razorsharpnetworks.com |
| Shannon Aikins | Realtor / Agent | - |
| Lydia McAllister | Realtor / Agent | - |
| Shalynn Hutchason | Realtor / Agent | - |
| Brandon Rea | Realtor / Agent | - |
| Trish Harris | Realtor / Agent | - |
| Roni Parish | Realtor / Agent | - |

### Project Status

- **Phase 1:** Complete - Static site with all pages, components, agent profiles, community pages, and mock property data
- **Phase 2:** Planning - CMS integration, IDX/MLS feeds, user management, property management system, and AI features

---

## Technical Stack

### Core Framework & Language

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 14.2.x | React framework (App Router) |
| React | 18.3.x | UI library |
| TypeScript | 5.9.x | Type-safe JavaScript |
| Tailwind CSS | 3.4.x | Utility-first CSS framework |
| Framer Motion | 12.38.x | Animation library |
| next-themes | 0.4.x | Dark mode theme management |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| autoprefixer | 10.4.x | CSS vendor prefixing |
| postcss | 8.5.x | CSS processing |
| tailwindcss | 3.4.x | CSS framework (build tool) |

### Node Requirements

- **Node.js:** 18.x or later (LTS recommended)
- **npm:** 9.x or later

---

## Architecture

### Project Structure

```
big_valley_properties/
├── public/
│   ├── images/
│   │   ├── agents/            # Agent headshots (placeholder + real photos)
│   │   ├── areas/             # Regional hero images (Trinity Alps, Mt. Shasta)
│   │   ├── locations/         # Community-specific images
│   │   ├── properties/        # Property listing photos
│   │   ├── logo.png           # Primary logo
│   │   ├── logo-small.jpg     # Small logo variant
│   │   └── logo-transparent.png # Transparent background logo
│   └── videos/
│       └── hero.mp4           # Homepage hero background video (4.9MB)
│
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout (ThemeProvider, Header, Footer, AIChatbot)
│   │   ├── page.tsx           # Homepage (server component, renders HomeClient)
│   │   ├── globals.css        # Global styles, CSS variables, component classes
│   │   ├── about/
│   │   │   └── page.tsx       # About page (service areas, mission, history)
│   │   ├── agents/
│   │   │   ├── page.tsx       # Agent directory listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Dynamic agent profile pages
│   │   ├── contact/
│   │   │   └── page.tsx       # Contact page (both offices, forms, maps)
│   │   ├── locations/
│   │   │   ├── page.tsx       # Locations overview
│   │   │   ├── LocationsOverviewClient.tsx  # Client-side location cards
│   │   │   └── [slug]/
│   │   │       ├── page.tsx   # Dynamic location pages
│   │   │       └── LocationDetailClient.tsx # Client-side location details
│   │   └── properties/
│   │       ├── page.tsx       # Property listings with filters
│   │       ├── PropertiesContent.tsx  # Client-side property filters/grid
│   │       └── [id]/
│   │           ├── page.tsx   # Individual property page
│   │           └── PropertyDetailClient.tsx # Client-side property interactions
│   │
│   ├── components/            # Reusable UI components
│   │   ├── Header.tsx         # Site header with navigation
│   │   ├── Footer.tsx         # 4-row footer with office info
│   │   ├── HomeClient.tsx     # Homepage client-side interactive sections
│   │   ├── HeroVideo.tsx      # Desktop hero video with lazy loading
│   │   ├── PropertyCard.tsx   # Property listing card component
│   │   ├── AgentCard.tsx      # Agent profile card component
│   │   ├── AIChatbot.tsx      # AI chatbot widget
│   │   ├── PropertyComparison.tsx # Property comparison tool
│   │   ├── FavoriteButton.tsx # Property favorite/save button
│   │   ├── ThemeProvider.tsx  # Dark mode theme provider wrapper
│   │   ├── ThemeToggle.tsx    # Light/dark mode toggle button
│   │   └── animations/        # Animation components
│   │       ├── MotionWrapper.tsx     # Scroll-triggered fade animations
│   │       ├── StaggerContainer.tsx  # Staggered grid animations
│   │       ├── ParallaxImage.tsx     # Parallax scrolling background images
│   │       └── CountUp.tsx           # Animated number counters
│   │
│   └── data/                  # Static data sources
│       ├── agents.ts          # Agent profiles (7 agents)
│       ├── properties.ts      # Property listings (10 mock listings)
│       └── locations.ts       # Location data (20 communities, ~1500 lines)
│
├── TECHNICAL_DOCUMENTATION.md
├── README.md
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
├── next.config.js
├── next-env.d.ts
└── .gitignore
```

### Routing Structure

The project uses the **Next.js App Router** (file-based routing under `src/app/`):

| Route | Type | Description |
|-------|------|-------------|
| `/` | Server + Client | Homepage with hero video, featured properties, agents |
| `/about` | Server | About page with mission, history, service areas |
| `/agents` | Server | Agent directory listing |
| `/agents/[slug]` | Server | Dynamic agent profile (e.g., `/agents/retta-treanor`) |
| `/properties` | Client | Property listings with filter controls |
| `/properties/[id]` | Server + Client | Individual property detail page |
| `/locations` | Server + Client | Community overview page |
| `/locations/[slug]` | Server + Client | Dynamic community detail (e.g., `/locations/weaverville`) |
| `/contact` | Client | Contact page with forms and office info |

### Data Flow

```
Static Data (src/data/*.ts)
        │
        ▼
Server Components (page.tsx)
        │
        ├── Direct rendering (About, Agents directory)
        │
        └── Pass props to Client Components (*Client.tsx)
                │
                ▼
        Interactive UI (filters, animations, forms)
```

- **Server Components** import data directly from `src/data/` and handle SEO metadata
- **Client Components** (`use client`) handle interactivity: filtering, animations, forms
- **No API routes** in Phase 1 - all data is static TypeScript files

---

## Features Implemented

### Homepage
- **Hero Section:** Background video (desktop only, lazy-loaded) with fallback image, animated text overlay, CTA buttons
- **Featured Properties:** Staggered grid animation of featured property cards
- **Area Highlights:** Trinity County and Shasta County cards with scenic images
- **Agent Team Section:** Portrait-style agent cards (3:4 ratio) with gradient overlay and hover zoom
- **Scroll Animations:** Framer Motion-powered fade, parallax, and stagger effects
- **Stats Counters:** Animated CountUp numbers for key metrics

### Property Listings
- **Filtering:** County, property type, price range, acreage range
- **View Modes:** Grid and list toggle
- **Property Cards:** Image, status badge, price, title, city/county, key stats
- **Property Detail Pages:** Image gallery with lightbox, agent info, similar properties, features list
- **Property Comparison:** Side-by-side comparison tool
- **Favorite Button:** Save/unsave properties (client-side state)

### Agent Profiles
- **Directory Page:** Grid of all agents with photos and specialties
- **Detail Pages:** Full bio, specialties, certifications, achievements, testimonial, contact info
- **Agent Cards:** Portrait-style with hover effects, link to profile

### Community/Location Pages (20 total)
Each location page includes:
- **Overview:** Population, elevation, founding date, description, history
- **Schools:** Name, grades, type, highlights, phone numbers, website links
- **Healthcare:** Hospitals, clinics, specialty providers with contact info
- **Community Resources:** Libraries, government offices, chambers of commerce, post offices, visitor centers
- **Recreation & Attractions:** Parks, trails, lakes, historic sites with clickable website links and external link indicators
- **Why Live Here:** Lifestyle highlights, family features, climate info
- **Nearby Attractions:** Links to surrounding points of interest
- **Google Maps:** Embedded interactive map for each community

### Dark Mode
- Toggle in header (ThemeToggle component)
- Uses `next-themes` with `class` strategy
- Full dark mode support across all components
- Custom dark scrollbar styling

### AI Chatbot
- Floating chat widget (bottom-right)
- Pre-configured responses for common queries (service areas, contact info, etc.)
- Expandable/collapsible interface

### Contact System
- **Contact Form:** Name, email, phone, message fields
- **Two Office Cards:** Weaverville and Hayfork with addresses, phone numbers, hours
- **Google Maps Embeds:** Interactive maps for both office locations
- **Google Maps Links:** Direct links to each office in Google Maps

### Navigation
- **Sticky Header:** Glassmorphism effect with blur backdrop
- **Logo:** Large BVP logo (250x140px)
- **Desktop Nav:** Horizontal link list
- **Mobile Nav:** Hamburger menu with slide-out panel
- **Links:** Home, Properties, Locations, Agents, About, Contact

### Footer (4-Row Structure)
1. **Row 1:** Logo, tagline, social icons (Facebook, Instagram, LinkedIn), quick links, office contact info
2. **Row 2:** Service area links - Trinity County (10) and Shasta County (10) community links
3. **Row 3:** Copyright, legal links (Privacy, Terms, Accessibility)
4. **Row 4:** Credits - "Powered by WebAssetFX" and "AutoMATE AI Technology"

---

## Data Models

### Agent Interface

```typescript
// src/data/agents.ts
export interface Agent {
  id: string;
  slug: string;
  name: string;
  title: string;
  licenseNumber: string;
  phone: string;
  email: string;
  photo: string;           // Path to image in /public
  bio: string;
  specialties: string[];
  counties: ('Trinity' | 'Shasta')[];
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  featured: boolean;
  certifications?: string[];
  achievements?: string[];
  yearsExperience?: number;
  testimonial?: {
    text: string;
    author: string;
    location: string;
  };
}
```

**Current Agents (7):**
| ID | Name | Title |
|----|------|-------|
| retta-treanor | Retta Treanor | Broker / Owner, CRS |
| shannon-aikins | Shannon Aikins | Realtor |
| lydia-mcallister | Lydia McAllister | Realtor |
| shalynn-hutchason | Shalynn Hutchason | Realtor |
| brandon-rea | Brandon Rea | Realtor |
| trish-harris | Trish Harris | Realtor |
| roni-parish | Roni Parish | Realtor |

### Property Interface

```typescript
// src/data/properties.ts
export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  county: 'Trinity' | 'Shasta';
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  acreage: number;
  propertyType: 'Single Family' | 'Cabin' | 'Ranch' | 'Land' | 'Farm';
  status: 'Active' | 'Pending' | 'Sold';
  yearBuilt: number;
  description: string;
  features: string[];
  images: string[];          // Paths to images in /public
  agentId: string;           // References Agent.id
  mlsNumber: string;
  daysOnMarket: number;
  featured: boolean;
}
```

**Utility Functions:**
- `getProperty(id: string): Property | undefined`
- `getFeaturedProperties(): Property[]`
- `getPropertiesByCounty(county: string): Property[]`

**Current Mock Properties (10):** trinity-creek-cabin, hyampom-homestead, riverside-retreat, pine-creek-cottage, weaverville-victorian, shasta-mountain-ranch, anderson-farmhouse, shasta-lake-view, cottonwood-acres, lewiston-paradise

### Location Interface

```typescript
// src/data/locations.ts
export interface Location {
  name: string;
  slug: string;
  county: 'Trinity' | 'Shasta';
  tagline: string;
  heroImage: string;
  galleryImages: string[];
  population: string;
  elevation: string;
  founded: string;
  overview: string;
  history: string;
  whyLiveHere: string[];
  schools: LocationSchool[];
  schoolsOverview: string;
  communityResources: CommunityResource[];
  communityResourcesOverview: string;
  healthcare: LocationResource[];
  healthcareOverview: string;
  recreation: LocationAttraction[];
  recreationOverview: string;
  familyFeatures: string[];
  communityHighlights: string[];
  lifestyle: string;
  climate: string;
  nearbyAttractions: string[];
  coordinates: { lat: number; lng: number };
}
```

**Supporting Interfaces:**

```typescript
interface LocationSchool {
  name: string;
  grades: string;
  type: string;
  highlight?: string;
  phone?: string;
  website?: string;
}

interface LocationAttraction {
  name: string;
  description: string;
  icon: 'hiking' | 'water' | 'park' | 'historic' | 'dining' | 'shopping' | 'nature' | 'sports';
  phone?: string;
  website?: string;
}

interface LocationResource {
  name: string;
  description: string;
  phone?: string;
  website?: string;
  category: 'hospital' | 'clinic' | 'emergency' | 'specialty' | 'government';
}

interface CommunityResource {
  name: string;
  description: string;
  phone?: string;
  website?: string;
  category: 'library' | 'government' | 'chamber' | 'post_office' | 'community_center' | 'visitor_center' | 'museum' | 'fire_department';
}
```

**Utility Functions:**
- `getLocation(slug: string): Location | undefined`
- `getLocationsByCounty(county: string): Location[]`

---

## Components

### Page-Level Components

| Component | File | Type | Description |
|-----------|------|------|-------------|
| HomeClient | `src/components/HomeClient.tsx` | Client | Homepage interactive sections: hero, properties, agents, stats |
| HeroVideo | `src/components/HeroVideo.tsx` | Client | Lazy-loaded hero video (desktop only, ≥768px) |
| PropertiesContent | `src/app/properties/PropertiesContent.tsx` | Client | Property listing filters and grid |
| PropertyDetailClient | `src/app/properties/[id]/PropertyDetailClient.tsx` | Client | Property detail page interactivity |
| LocationsOverviewClient | `src/app/locations/LocationsOverviewClient.tsx` | Client | Location overview cards with animations |
| LocationDetailClient | `src/app/locations/[slug]/LocationDetailClient.tsx` | Client | Location detail page with tabs/sections |

### Reusable Components

| Component | File | Type | Description |
|-----------|------|------|-------------|
| Header | `src/components/Header.tsx` | Client | Sticky nav with glassmorphism, mobile menu |
| Footer | `src/components/Footer.tsx` | Server | 4-row footer with offices, service areas, legal |
| PropertyCard | `src/components/PropertyCard.tsx` | Client | Property summary card with image, price, stats |
| AgentCard | `src/components/AgentCard.tsx` | Client | Agent portrait card with hover effects |
| AIChatbot | `src/components/AIChatbot.tsx` | Client | Floating AI chat widget |
| PropertyComparison | `src/components/PropertyComparison.tsx` | Client | Side-by-side property comparison |
| FavoriteButton | `src/components/FavoriteButton.tsx` | Client | Heart/save toggle button |
| ThemeProvider | `src/components/ThemeProvider.tsx` | Client | next-themes wrapper for dark mode |
| ThemeToggle | `src/components/ThemeToggle.tsx` | Client | Light/dark mode toggle button |

### Animation Components

| Component | File | Description |
|-----------|------|-------------|
| MotionWrapper | `src/components/animations/MotionWrapper.tsx` | Scroll-triggered animations (fadeUp, fadeDown, fadeLeft, fadeRight, scale, blur) |
| StaggerContainer | `src/components/animations/StaggerContainer.tsx` | Sequential fade-in for grid items |
| ParallaxImage | `src/components/animations/ParallaxImage.tsx` | Parallax scroll effect for background images |
| CountUp | `src/components/animations/CountUp.tsx` | Animated number counters on scroll |

---

## Styling & Design System

### Color Palette

#### Primary Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| BVP Forest Green | `#10401c` | `--color-forest-green` | Primary brand, buttons, headings |
| Deep Pine | `#1e4c2a` | `--color-deep-pine` | Hover states, secondary green |
| Charcoal Ink | `#212121` | `--color-charcoal-ink` | Primary body text |
| Warm Alabaster | `#fdfdfd` | `--color-warm-alabaster` | Primary background |

#### Secondary & Accent Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| River Stone Gray | `#7c9a85` | `--color-river-stone` | Borders, icons, muted sage accent |
| Cabin Timber | `#595147` | `--color-cabin-timber` | Footer background, warm brown |
| Alpine Slate | `#59687b` | `--color-alpine-slate` | Cool blue-gray accent |
| Canvas Sand | `#f1f5f0` | `--color-canvas-sand` | Alt section backgrounds |

#### Extended Tailwind Colors

| Name | Hex | Usage |
|------|-----|-------|
| warm-cream | `#f7f5f0` | Warm background variant |
| luxury-light | `#faf9f6` | Main body background |
| luxury-warm | `#f3efe8` | Warm section background |
| parchment | `#ede8df` | Decorative background |

### Typography

| Element | Font Family | Weight | Size |
|---------|------------|--------|------|
| H1-H6 | Tenor Sans, Playfair Display, Georgia, serif | 400 | Fluid clamp() values |
| Body | Montserrat, Lato, system-ui, sans-serif | 400 | 16px base |
| Accent | Playfair Display, Georgia, serif | 400 italic | Quotes, callouts |

**Font Sizes (Fluid):**

| Token | Range | Usage |
|-------|-------|-------|
| `text-hero` | 40px - 70px | Hero headings |
| `text-h1` | 32px - 48px | Page titles |
| `text-h2` | 28px - 43px | Section headings |
| `text-h3` | 20px - 30px | Sub-section headings |
| `text-h4` | 16px - 21px | Card headings |

**Google Fonts Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Tenor+Sans&display=swap" rel="stylesheet">
```

### Custom Component Classes

Defined in `src/app/globals.css` via `@layer components`:

| Class | Description |
|-------|-------------|
| `.container-bvp` | Max-width 1280px container with responsive padding |
| `.container-narrow` | Max-width 960px container with responsive padding |
| `.btn-primary` | Forest green filled button with hover effect |
| `.btn-outline` | Forest green bordered button with fill on hover |
| `.section-padding` | Vertical padding (py-16 md:py-24) |
| `.section-heading` | Standard section heading styling |
| `.section-subheading` | Standard section subheading styling |
| `.glass-card` | Glassmorphism card (transparent blur) |
| `.glass-card-light` | Light glassmorphism card |
| `.glass-nav` | Navigation glassmorphism effect |

### Animation Classes

| Class | Description |
|-------|-------------|
| `.animate-fade-in-up` | CSS fade + slide up animation |
| `.property-card` | Hover lift + shadow transition |
| `.neighborhood-card` | Image zoom + overlay color shift |
| `.team-card` | Hover lift + photo scale |
| `.card-lift` | Generic hover lift with shadow |
| `.btn-magnetic` | Button with hover lift + green shadow |
| `.pulse-ring` | Pulsing ring animation for CTAs |
| `.skeleton` | Loading skeleton animation |
| `.glassmorphism` | Blur + transparency effect |
| `.text-gradient` | Green gradient text effect |
| `.animate-float` | Gentle vertical floating animation |
| `.decorative-line` | Animated horizontal line |

### Dark Mode

- **Strategy:** Tailwind `class` mode via `next-themes`
- **Toggle:** ThemeToggle component in Header
- **Implementation:** `dark:` prefix classes throughout components
- **Body:** Light = `#faf9f6`, Dark = `#030712`
- **Scrollbar:** Custom styled for both themes

### Responsive Breakpoints

Standard Tailwind breakpoints:

| Prefix | Min Width |
|--------|-----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

---

## Assets

### Logo Files

| File | Path | Usage |
|------|------|-------|
| Primary Logo | `/public/images/logo.png` | General use |
| Transparent Logo | `/public/images/logo-transparent.png` | Header, Footer, overlays |
| Small Logo | `/public/images/logo-small.jpg` | Compact spaces |

### Agent Photos

Each agent has both a placeholder (initials on colored background) and a real photo:

| Agent | Placeholder | Real Photo |
|-------|------------|------------|
| Retta Treanor | `retta-treanor.jpg` | `retta-treanor-real.png` |
| Shannon Aikins | `shannon-aikins.jpg` | `shannon-aikins-real.png` |
| Lydia McAllister | `lydia-mcallister.jpg` | `lydia-mcallister-real.png` |
| Shalynn Hutchason | `shalynn-hutchason.jpg` | `shalynn-hutchason-real.png` |
| Brandon Rea | `brandon-rea.jpg` | `brandon-rea-real.png` |
| Roni Parish | `roni-parish.jpg` | `roni-parish-real.png` |
| Trish Harris | - | `trish-harris-real.jpg` |

All located in `/public/images/agents/`

### Area/Location Images

| File | Path | Usage |
|------|------|-------|
| Trinity Alps meadow | `/public/images/areas/trinity-alps-1.jpg` | Hero backgrounds |
| Trinity Alps lake | `/public/images/areas/trinity-alps-2.jpg` | Hero backgrounds |
| Mt. Shasta reflection | `/public/images/areas/mt-shasta-1.jpg` | Hero backgrounds |
| Mt. Shasta road | `/public/images/areas/mt-shasta-2.jpg` | Hero backgrounds |
| 9 location images | `/public/images/locations/*.jpg` | Community page heroes |

### Property Images

Located in `/public/images/properties/`:
- cabin-creek.jpg, cabin-creek-2.jpg
- hyampom-road.jpg
- mountain-farmhouse.jpg, mountain-farmhouse-aerial.jpg
- river-deck.jpg, river-deck-porch.jpg
- riverside-cabin.jpg, riverside-cabin-2.jpg

### Video

| File | Path | Size | Usage |
|------|------|------|-------|
| Hero Video | `/public/videos/hero.mp4` | ~4.9MB | Homepage hero background (desktop only) |

### Image Optimization

Configured in `next.config.js`:
```javascript
images: {
  formats: ['image/avif', 'image/webp'],
}
```

---

## Deployment

### Repository

- **GitHub:** https://github.com/teamrazo/Big-Valley-Properties.git
- **Branch:** main
- **Access:** Private repository (teamrazo organization)

### Vercel Deployment

The site is deployed on **Vercel** with automatic deployments on push to `main`.

### Build Configuration

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Environment Variables

Currently no environment variables are required for Phase 1. Phase 2 will need:
- Google Maps API key
- CRM API credentials
- IDX/MLS feed credentials
- AI service API keys

---

## API Integrations

### Google Maps (Embedded)

- **Current:** Iframe embeds on Contact page and Location detail pages
- **No API key required** for iframe embeds
- **Phase 2:** Will require Google Maps JavaScript API key for interactive map search

### External Links

- Recreation items on community pages link to official external websites (state parks, national forests, etc.)
- Office addresses link to Google Maps directions
- Social media links (Facebook, Instagram, LinkedIn) in Footer

### Phase 2 Integrations (Planned)

- **IDX/MLS:** NorCal MLS feed for live property data
- **RazorSharp CRM:** Lead routing, email/SMS automation
- **Google Analytics (GA4):** Analytics and Tag Manager
- **AI Services:** Enhanced chatbot capabilities

---

## Office Locations

### Weaverville Office (Main)

| Detail | Value |
|--------|-------|
| Address | 15 Bremer St, Weaverville, CA 96093 |
| Phone | (530) 623-4333 |
| Hours | Monday - Friday: 9:00 AM - 5:00 PM |
| | Saturday: 10:00 AM - 2:00 PM |
| | Sunday: By Appointment |

### Hayfork Office

| Detail | Value |
|--------|-------|
| Address | 5 Reservoir Rd, Hayfork, CA 96041 |
| Phone | (530) 628-4333 |
| Hours | Monday - Friday: 9:00 AM - 5:00 PM |
| | Saturday: By Appointment |
| | Sunday: Closed |

---

## Service Areas

### Trinity County Communities (10)

| Community | Slug | Key Features |
|-----------|------|-------------|
| Weaverville | `weaverville` | County seat, Trinity Lake, Trinity Alps access |
| Hayfork | `hayfork` | Second BVP office location, rural lifestyle |
| Lewiston | `lewiston` | Trinity River, historic community |
| Junction City | `junction-city` | Canyon Creek, gold mining history |
| Hyampom | `hyampom` | Remote valley, homestead living |
| Trinity Center | `trinity-center` | Trinity Lake north shore |
| Coffee Creek | `coffee-creek` | Trinity Alps trailhead access |
| Douglas City | `douglas-city` | Trinity River corridor |
| Big Flat | `big-flat` | Wilderness gateway |
| French Gulch | `french-gulch` | Historic mining town |

### Shasta County Communities (10)

| Community | Slug | Key Features |
|-----------|------|-------------|
| Redding | `redding` | Regional hub, Sundial Bridge, Turtle Bay |
| Anderson | `anderson` | Growing community south of Redding |
| Shasta Lake | `shasta-lake` | Shasta Dam, lake recreation |
| Cottonwood | `cottonwood` | Agricultural, south county |
| Palo Cedro | `palo-cedro` | Upscale rural community |
| Bella Vista | `bella-vista` | Scenic residential area |
| Burney | `burney` | Burney Falls, outdoor recreation |
| Shasta | `shasta` | Historic town, Shasta State Historic Park |
| Fall River Mills | `fall-river-mills` | Fly fishing, rural ranching |
| Mountain Gate | `mountain-gate` | Gateway to Shasta Lake |

---

## Phase 2 Planning

### CMS Integration
- Content management system for property listings, blog posts, and agent profiles
- Admin dashboard for non-technical content updates
- Dynamic page generation from CMS data

### IDX/MLS Integration
- Live property feed from NorCal MLS
- Search with filters: location, price, beds, baths, property type
- Map-based property search
- Individual listing pages from MLS data
- Featured and sold listing management

### User Management
- Agent login system
- Admin roles (Super Admin, Broker, Agent)
- Agent-specific dashboards

### Property Management
- Mobile-friendly property wizard for agents
- Photo upload and management
- Listing status management
- Manual property flagging (featured/sold)

### RazorSharp CRM Integration
- Multi-step forms (buyer intake, seller valuation, consultation)
- Lead routing by location/form type
- SMS/email alerts on form submission
- Email nurture sequences (buyer/seller journeys)
- Lead tagging and lifecycle tracking

### AI Features
- Enhanced chatbot with natural language understanding
- AI-powered property recommendations
- Market analysis tools
- Automated listing descriptions

### Additional Pages (Planned)
- `/search` - IDX-enabled property search
- `/sold` - Sold listings gallery
- `/valuation` - Home valuation tool
- `/testimonials` - Client reviews
- `/buyers-guide` - Downloadable guide + landing page
- `/sellers-guide` - Downloadable guide + landing page
- `/blog` - Content hub
- `/market/[city]` - Market-specific pages

### SEO & Analytics (Planned)
- GA4 and Google Tag Manager installation
- Schema markup (real estate agents, listings, local business, blog)
- XML sitemap generation
- Open Graph metadata for social sharing

---

## Development Guidelines

### Code Style & Conventions

- **TypeScript:** Strict mode enabled; use interfaces for data structures
- **Components:** Functional components with hooks only (no class components)
- **Naming:**
  - Components: PascalCase (`PropertyCard.tsx`)
  - Data files: camelCase (`properties.ts`)
  - CSS classes: kebab-case with BVP prefix where appropriate
  - Routes: kebab-case slugs
- **Exports:** Named exports preferred; default export for page components only
- **Server vs. Client:** Use `'use client'` directive only when needed (interactivity, hooks, browser APIs)

### Component Patterns

- **Server Components** for data fetching and SEO metadata
- **Client Components** for interactivity (filters, animations, forms, theme toggle)
- **Data files** as the single source of truth (Phase 1)
- **Props** for passing data from server to client components
- Pass `similarProperties` from server page to client detail component (see property detail)

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Pages | `page.tsx` | `src/app/agents/page.tsx` |
| Client components | `*Client.tsx` | `LocationDetailClient.tsx` |
| Shared components | PascalCase | `PropertyCard.tsx` |
| Data files | camelCase | `agents.ts` |
| Images | kebab-case | `trinity-alps-lake.jpg` |

### Git Workflow

- Main branch: `main`
- Commit messages: Descriptive, present tense (e.g., "Add comprehensive community resources")
- Push to `main` triggers Vercel auto-deploy

---

## Known Issues & Technical Debt

### Current Limitations

1. **Static Data:** All property, agent, and location data is hardcoded in TypeScript files. Phase 2 CMS will replace this.
2. **Mock Properties:** 10 placeholder listings - will be replaced with live MLS data.
3. **No Form Backend:** Contact form UI exists but does not submit to any backend/CRM.
4. **No Authentication:** No user login or agent dashboard system.
5. **Placeholder Agent Photos:** Some agents still have programmatically generated placeholder images alongside real photos.
6. **No Analytics:** GA4 and Tag Manager not yet installed.
7. **No Sitemap/Robots:** SEO files not generated.

### Areas for Improvement

- **Performance:** Large location data file (~1500 lines) could be split or lazy-loaded
- **Image Optimization:** Some uploaded images are large; could benefit from further compression
- **Accessibility:** Needs comprehensive ARIA labels and keyboard navigation audit
- **SEO Schema:** No structured data markup yet (JSON-LD for agents, listings, local business)
- **Error Boundaries:** No React error boundaries implemented
- **Loading States:** Skeleton loading states defined in CSS but not widely used

### Performance Considerations

- Hero video lazy-loaded and only rendered on desktop (≥768px)
- Next.js Image component used for automatic optimization (AVIF/WebP)
- Framer Motion animations use `whileInView` for on-demand rendering
- Static generation with `generateStaticParams` for property and location pages

---

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/teamrazo/Big-Valley-Properties.git
cd Big-Valley-Properties

# Install dependencies
npm install
```

### Running Locally

```bash
# Development server (with hot reload)
npm run dev
# Opens at http://localhost:3000

# Production build
npm run build

# Start production server
npm start
```

### Building for Production

```bash
npm run build
```

This generates a `.next/` directory with the optimized production build. The build uses static generation for all pages with dynamic routes pre-rendered via `generateStaticParams`.

### Deployment

The project is configured for **Vercel** deployment:

1. Push changes to the `main` branch on GitHub
2. Vercel automatically detects the push and triggers a build
3. The site is deployed to the configured Vercel domain

For manual deployment:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Adding a New Community Page

1. Add location data to `src/data/locations.ts` following the `Location` interface
2. The dynamic route `/locations/[slug]` will automatically pick it up
3. Add a hero image to `/public/images/locations/`
4. Update the footer service area links in `src/components/Footer.tsx` if needed

### Adding a New Agent

1. Add agent data to `src/data/agents.ts` following the `Agent` interface
2. Add photo to `/public/images/agents/`
3. The dynamic route `/agents/[slug]` will automatically generate their profile page

### Adding a New Property

1. Add property data to `src/data/properties.ts` following the `Property` interface
2. Add property images to `/public/images/properties/`
3. Reference an existing `agentId` to link the listing agent
4. Set `featured: true` to show on the homepage

---

*This documentation reflects the state of the project as of March 23, 2026. Phase 1 is complete and Phase 2 CMS development is in planning.*
