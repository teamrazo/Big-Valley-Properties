-- Add property details and walkthrough notes to listings table
ALTER TABLE listings ADD COLUMN IF NOT EXISTS "propertyDetails" jsonb;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS "walkthroughNotes" text;
