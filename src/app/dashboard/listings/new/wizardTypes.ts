import type { PropertyDetails } from '@/types/propertyDetails'

export type WizardData = {
  // Step 1 - Basics
  propertyType: string
  propertySubType: string
  streetAddress: string
  city: string
  county: string
  postalCode: string
  stateOrProvince: string
  // Step 2 - Key Details
  bedrooms: string
  bathrooms: string
  livingArea: string
  lotSizeAcres: string
  yearBuilt: string
  // Step 3-8 - Property details (structured)
  propertyDetails: PropertyDetails
  // Walkthrough notes (smart capture)
  walkthroughNotes: string
  // Features (legacy, kept for compatibility)
  features: string[]
  // Description & Pricing
  publicRemarks: string
  photos: File[]
  photoUrls: string[]
  listPrice: string
  listingContractDate: string
  expirationDate: string
  hasHOA: boolean
  hoaFeeMonthly: string
  // Private
  privateRemarks: string
  showingInstructions: string
  directions: string
}

export const defaultWizardData: WizardData = {
  propertyType: '',
  propertySubType: '',
  streetAddress: '',
  city: '',
  county: 'Trinity',
  postalCode: '',
  stateOrProvince: 'CA',
  bedrooms: '',
  bathrooms: '',
  livingArea: '',
  lotSizeAcres: '',
  yearBuilt: '',
  propertyDetails: {},
  walkthroughNotes: '',
  features: [],
  publicRemarks: '',
  photos: [],
  photoUrls: [],
  listPrice: '',
  listingContractDate: '',
  expirationDate: '',
  hasHOA: false,
  hoaFeeMonthly: '',
  privateRemarks: '',
  showingInstructions: '',
  directions: '',
}

export interface StepProps {
  data: WizardData
  update: (d: Partial<WizardData>) => void
  onNext: () => void
  onBack: () => void
}
