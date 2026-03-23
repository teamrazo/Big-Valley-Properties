/**
 * Strips private/sensitive fields from listing data before sending to public API.
 * Per TRD: privateRemarks, showingInstructions, ownerName, voiceNotes, directions
 * must NEVER be exposed in public API responses.
 */
const PRIVATE_FIELDS = [
  'privateRemarks',
  'showingInstructions',
  'ownerName',
  'voiceNotes',
] as const

export function stripPrivateFields<T extends Record<string, unknown>>(
  obj: T
): Omit<T, (typeof PRIVATE_FIELDS)[number]> {
  const result = { ...obj }
  for (const field of PRIVATE_FIELDS) {
    delete (result as Record<string, unknown>)[field]
  }
  return result as Omit<T, (typeof PRIVATE_FIELDS)[number]>
}

export function stripPrivateFieldsArray<T extends Record<string, unknown>>(
  arr: T[]
): Omit<T, (typeof PRIVATE_FIELDS)[number]>[] {
  return arr.map(stripPrivateFields)
}
