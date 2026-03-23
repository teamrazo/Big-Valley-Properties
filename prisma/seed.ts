/**
 * Prisma seed file — populates lookup values from RESO Data Dictionary.
 * Run: npx prisma db seed
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const lookupData = [
  // Property Types
  { lookupName: 'PropertyType', value: 'Single Family', displayOrder: 1 },
  { lookupName: 'PropertyType', value: 'Cabin', displayOrder: 2 },
  { lookupName: 'PropertyType', value: 'Ranch', displayOrder: 3 },
  { lookupName: 'PropertyType', value: 'Land', displayOrder: 4 },
  { lookupName: 'PropertyType', value: 'Farm', displayOrder: 5 },
  { lookupName: 'PropertyType', value: 'Multi-Family', displayOrder: 6 },
  { lookupName: 'PropertyType', value: 'Commercial', displayOrder: 7 },
  { lookupName: 'PropertyType', value: 'Manufactured', displayOrder: 8 },

  // Property Sub Types
  { lookupName: 'PropertySubType', value: 'Detached', displayOrder: 1 },
  { lookupName: 'PropertySubType', value: 'Log Home', displayOrder: 2 },
  { lookupName: 'PropertySubType', value: 'A-Frame', displayOrder: 3 },
  { lookupName: 'PropertySubType', value: 'Modular', displayOrder: 4 },
  { lookupName: 'PropertySubType', value: 'Vacant Land', displayOrder: 5 },
  { lookupName: 'PropertySubType', value: 'Working Ranch', displayOrder: 6 },
  { lookupName: 'PropertySubType', value: 'Hobby Farm', displayOrder: 7 },

  // Feature Categories
  { lookupName: 'FeatureCategory', value: 'Interior', displayOrder: 1 },
  { lookupName: 'FeatureCategory', value: 'Exterior', displayOrder: 2 },
  { lookupName: 'FeatureCategory', value: 'Utilities', displayOrder: 3 },
  { lookupName: 'FeatureCategory', value: 'Land', displayOrder: 4 },
  { lookupName: 'FeatureCategory', value: 'Views', displayOrder: 5 },
  { lookupName: 'FeatureCategory', value: 'Recreation', displayOrder: 6 },

  // Common Interior Features
  { lookupName: 'InteriorFeature', value: 'Wood Stove', displayOrder: 1 },
  { lookupName: 'InteriorFeature', value: 'Fireplace', displayOrder: 2 },
  { lookupName: 'InteriorFeature', value: 'Vaulted Ceilings', displayOrder: 3 },
  { lookupName: 'InteriorFeature', value: 'Exposed Beams', displayOrder: 4 },
  { lookupName: 'InteriorFeature', value: 'Open Floor Plan', displayOrder: 5 },
  { lookupName: 'InteriorFeature', value: 'Hardwood Floors', displayOrder: 6 },
  { lookupName: 'InteriorFeature', value: 'Granite Counters', displayOrder: 7 },
  { lookupName: 'InteriorFeature', value: 'Updated Kitchen', displayOrder: 8 },

  // Common Exterior Features
  { lookupName: 'ExteriorFeature', value: 'Wraparound Deck', displayOrder: 1 },
  { lookupName: 'ExteriorFeature', value: 'Covered Porch', displayOrder: 2 },
  { lookupName: 'ExteriorFeature', value: 'Detached Workshop', displayOrder: 3 },
  { lookupName: 'ExteriorFeature', value: 'Barn', displayOrder: 4 },
  { lookupName: 'ExteriorFeature', value: 'Garden Space', displayOrder: 5 },
  { lookupName: 'ExteriorFeature', value: 'Fruit Trees', displayOrder: 6 },
  { lookupName: 'ExteriorFeature', value: 'Fenced', displayOrder: 7 },
  { lookupName: 'ExteriorFeature', value: 'Metal Roof', displayOrder: 8 },

  // Utilities
  { lookupName: 'Utility', value: 'Well Water', displayOrder: 1 },
  { lookupName: 'Utility', value: 'City Water', displayOrder: 2 },
  { lookupName: 'Utility', value: 'Septic', displayOrder: 3 },
  { lookupName: 'Utility', value: 'City Sewer', displayOrder: 4 },
  { lookupName: 'Utility', value: 'Propane Heat', displayOrder: 5 },
  { lookupName: 'Utility', value: 'Electric Heat', displayOrder: 6 },
  { lookupName: 'Utility', value: 'Central HVAC', displayOrder: 7 },
  { lookupName: 'Utility', value: 'Solar Panels', displayOrder: 8 },
  { lookupName: 'Utility', value: 'Generator', displayOrder: 9 },
  { lookupName: 'Utility', value: 'Off-Grid Ready', displayOrder: 10 },
  { lookupName: 'Utility', value: 'Satellite Internet', displayOrder: 11 },
  { lookupName: 'Utility', value: 'Fiber Internet', displayOrder: 12 },

  // Counties
  { lookupName: 'County', value: 'Trinity', displayOrder: 1 },
  { lookupName: 'County', value: 'Shasta', displayOrder: 2 },
]

async function main() {
  console.log('Seeding lookup values...')

  for (const item of lookupData) {
    await prisma.lookupValue.upsert({
      where: {
        lookupName_value: {
          lookupName: item.lookupName,
          value: item.value,
        },
      },
      update: { displayOrder: item.displayOrder },
      create: item,
    })
  }

  console.log(`Seeded ${lookupData.length} lookup values.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
