import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

const CreateListingSchema = z.object({
  propertyType: z.string().min(1),
  propertySubType: z.string().optional(),
  streetAddress: z.string().min(1),
  city: z.string().min(1),
  county: z.string().min(1),
  postalCode: z.string().min(1),
  stateOrProvince: z.string().default('CA'),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().min(0),
  livingArea: z.number().int().optional(),
  lotSizeAcres: z.number().optional(),
  yearBuilt: z.number().int().optional(),
  features: z.array(z.string()).optional(),
  publicRemarks: z.string().optional(),
  listPrice: z.number().positive(),
  listingContractDate: z.string().optional(),
  expirationDate: z.string().optional(),
  hasHOA: z.boolean().default(false),
  hoaFeeMonthly: z.number().optional(),
  privateRemarks: z.string().optional(),
  showingInstructions: z.string().optional(),
  directions: z.string().optional(),
})

async function getAuthUser() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
}

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = CreateListingSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }

    // Find the agent's User record by their Supabase auth ID
    const agent = await prisma.user.findUnique({ where: { authId: authUser.id } })
    if (!agent) {
      return NextResponse.json({ error: 'Agent profile not found. Please contact your broker.' }, { status: 403 })
    }

    const d = parsed.data
    const listing = await prisma.listing.create({
      data: {
        agentId: agent.id,
        propertyType: d.propertyType,
        propertySubType: d.propertySubType,
        streetAddress: d.streetAddress,
        city: d.city,
        county: d.county,
        postalCode: d.postalCode,
        stateOrProvince: d.stateOrProvince,
        bedrooms: d.bedrooms,
        bathrooms: d.bathrooms,
        livingArea: d.livingArea,
        lotSizeAcres: d.lotSizeAcres,
        yearBuilt: d.yearBuilt,
        publicRemarks: d.publicRemarks,
        listPrice: d.listPrice,
        listingContractDate: d.listingContractDate ? new Date(d.listingContractDate) : undefined,
        expirationDate: d.expirationDate ? new Date(d.expirationDate) : undefined,
        hasHOA: d.hasHOA,
        hoaFeeMonthly: d.hoaFeeMonthly,
        privateRemarks: d.privateRemarks,
        showingInstructions: d.showingInstructions,
        directions: d.directions,
        status: 'DRAFT',
        // Create features as related records
        features: d.features?.length ? {
          create: d.features.map(f => ({
            featureCategory: 'General',
            featureValue: f,
          })),
        } : undefined,
        // Create initial status history entry
        statusHistory: {
          create: {
            toStatus: 'DRAFT',
            changedById: agent.id,
            note: 'Listing created',
          },
        },
      },
      include: { features: true },
    })

    return NextResponse.json(listing, { status: 201 })
  } catch (err) {
    console.error('POST /api/listings error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const agent = await prisma.user.findUnique({ where: { authId: authUser.id } })
    if (!agent) {
      return NextResponse.json({ error: 'Agent profile not found' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const county = searchParams.get('county')

    // Agents see their own; brokers/admins see all
    const where: Record<string, unknown> = {}
    if (agent.role === 'AGENT') {
      where.agentId = agent.id
    }
    if (status) where.status = status
    if (county) where.county = county

    const listings = await prisma.listing.findMany({
      where,
      include: { agent: { select: { firstName: true, lastName: true } }, features: true },
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json(listings)
  } catch (err) {
    console.error('GET /api/listings error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
