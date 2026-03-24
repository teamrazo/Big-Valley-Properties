export interface RoomDetails {
  flooring?: string[]
  windows?: string[]
  ceilingFeatures?: string[]
  notes?: string
}

export interface KitchenDetails extends RoomDetails {
  appliances?: {
    name: string
    age?: string
    condition?: string
  }[]
  counters?: string[]
  extras?: string[]
}

export interface BedroomDetails extends RoomDetails {
  label?: string
  closetType?: string
  hasCeilingFan?: boolean
  hasSkylight?: boolean
  dimensions?: string
  isMaster?: boolean
}

export interface BathroomDetails {
  label?: string
  type?: 'Full' | 'Half'
  flooring?: string[]
  counters?: string[]
  tubType?: string
  sinks?: number
  vanity?: string
  fixtures?: string
  notes?: string
}

export interface PropertyDetails {
  structure?: {
    foundation?: string[]
    siding?: string[]
    roofType?: string[]
    driveway?: string[]
    garage?: {
      type?: string
      cars?: number
      features?: string[]
    }
  }
  utilities?: {
    waterSource?: string[]
    sewer?: { type: string; septicSize?: string; septicYear?: string }
    power?: string[]
    heating?: string[]
    cooling?: { types: string[]; age?: string }
    miniSplitRooms?: string
  }
  rooms?: {
    livingRoom?: RoomDetails
    kitchen?: KitchenDetails
    diningRoom?: RoomDetails & { type?: string }
    familyRoom?: RoomDetails
    officeDen?: RoomDetails
    entertainmentRoom?: RoomDetails
    bedrooms?: BedroomDetails[]
    bathrooms?: BathroomDetails[]
    laundry?: {
      location?: string
      dryer?: string
      washerDryerIncluded?: boolean
      hasSink?: boolean
      cabinets?: string
    }
  }
  outdoor?: {
    outbuildings?: { type: string; sqft?: string }[]
    yard?: {
      fenced?: boolean
      sprinklers?: boolean
      autoTimers?: boolean
      landscaped?: boolean
    }
    features?: string[]
    gatedDrive?: boolean
    easement?: string
    propertyFencing?: string
  }
  guestHouse?: {
    hasGuestHouse: boolean
    type?: string
    sqft?: string
    details?: Record<string, unknown>
  }
  inspections?: {
    dryRot?: boolean
    termiteDamage?: boolean
    cracksInWallsFoundation?: boolean
    oldRoof?: boolean
    oldHVAC?: boolean
    deckNeedsReplacement?: boolean
    notes?: string
  }
  additionalLot?: {
    address?: string
    notes?: string
  }
}
