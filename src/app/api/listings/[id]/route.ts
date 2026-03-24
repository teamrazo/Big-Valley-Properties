import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

async function getAgent() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  return prisma.user.findUnique({ where: { authId: user.id } })
}

function canAccess(agent: { id: string; role: string }, listing: { agentId: string }) {
  return agent.role === 'SUPER_ADMIN' || agent.role === 'BROKER' || agent.id === listing.agentId
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const agent = await getAgent()
    if (!agent) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const listing = await prisma.listing.findUnique({
      where: { id: params.id },
      include: { features: true, agent: { select: { firstName: true, lastName: true } } },
    })
    if (!listing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (!canAccess(agent, listing)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    return NextResponse.json(listing)
  } catch (err) {
    console.error('GET /api/listings/[id] error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

const UpdateListingSchema = z.object({
  propertyType: z.string().optional(),
  propertySubType: z.string().optional(),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  county: z.string().optional(),
  postalCode: z.string().optional(),
  stateOrProvince: z.string().optional(),
  bedrooms: z.number().int().optional(),
  bathrooms: z.number().optional(),
  livingArea: z.number().int().optional(),
  lotSizeAcres: z.number().optional(),
  yearBuilt: z.number().int().optional(),
  features: z.array(z.string()).optional(),
  publicRemarks: z.string().optional(),
  listPrice: z.number().positive().optional(),
  listingContractDate: z.string().optional(),
  expirationDate: z.string().optional(),
  hasHOA: z.boolean().optional(),
  hoaFeeMonthly: z.number().optional(),
  privateRemarks: z.string().optional(),
  showingInstructions: z.string().optional(),
  directions: z.string().optional(),
  propertyDetails: z.any().optional(),
  walkthroughNotes: z.string().optional(),
  status: z.enum(['DRAFT', 'PENDING_REVIEW', 'ACTIVE', 'UNDER_CONTRACT', 'SOLD', 'WITHDRAWN', 'EXPIRED']).optional(),
})

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const agent = await getAgent()
    if (!agent) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const existing = await prisma.listing.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (!canAccess(agent, existing)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await request.json()
    const parsed = UpdateListingSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }

    const { features: featureValues, status: newStatus, listingContractDate, expirationDate, ...rest } = parsed.data

    // Build update data
    const updateData: Record<string, unknown> = { ...rest }
    if (listingContractDate) updateData.listingContractDate = new Date(listingContractDate)
    if (expirationDate) updateData.expirationDate = new Date(expirationDate)
    if (newStatus && newStatus !== existing.status) {
      updateData.status = newStatus
      // Log status change
      await prisma.listingStatusHistory.create({
        data: {
          listingId: params.id,
          fromStatus: existing.status,
          toStatus: newStatus,
          changedById: agent.id,
        },
      })
    }

    // Replace features if provided
    if (featureValues) {
      await prisma.listingFeature.deleteMany({ where: { listingId: params.id } })
      if (featureValues.length > 0) {
        await prisma.listingFeature.createMany({
          data: featureValues.map(f => ({
            listingId: params.id,
            featureCategory: 'General',
            featureValue: f,
          })),
        })
      }
    }

    const listing = await prisma.listing.update({
      where: { id: params.id },
      data: updateData,
      include: { features: true },
    })

    return NextResponse.json(listing)
  } catch (err) {
    console.error('PUT /api/listings/[id] error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const agent = await getAgent()
    if (!agent) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const existing = await prisma.listing.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (!canAccess(agent, existing)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    // Soft delete: set to WITHDRAWN
    await prisma.listing.update({
      where: { id: params.id },
      data: { status: 'WITHDRAWN' },
    })
    await prisma.listingStatusHistory.create({
      data: {
        listingId: params.id,
        fromStatus: existing.status,
        toStatus: 'WITHDRAWN',
        changedById: agent.id,
        note: 'Listing withdrawn (deleted)',
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/listings/[id] error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
