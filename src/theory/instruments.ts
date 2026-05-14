export interface SpecialString {
  stringIndex: number
  startsAtFret: number
  isDrone: boolean
  visualLength: 'short' | 'full'
}

export interface Instrument {
  id: string
  name: string
  defaultFretCount: number
  defaultTuningId: string
  supportsCapo: boolean
  supportsCourses: boolean
  notes?: string
}

export const INSTRUMENTS: Record<string, Instrument> = {
  guitar: {
    id: 'guitar',
    name: 'Guitar',
    defaultFretCount: 22,
    defaultTuningId: 'guitar-standard',
    supportsCapo: true,
    supportsCourses: false,
  },
  'bass-4': {
    id: 'bass-4',
    name: 'Bass (4-string)',
    defaultFretCount: 24,
    defaultTuningId: 'bass-4-standard',
    supportsCapo: false,
    supportsCourses: false,
  },
  'bass-5': {
    id: 'bass-5',
    name: 'Bass (5-string)',
    defaultFretCount: 24,
    defaultTuningId: 'bass-5-standard',
    supportsCapo: false,
    supportsCourses: false,
  },
  mandolin: {
    id: 'mandolin',
    name: 'Mandolin',
    defaultFretCount: 22,
    defaultTuningId: 'mandolin-standard',
    supportsCapo: true,
    supportsCourses: true,
    notes: '4 courses of paired strings. Pitch classes computed per course.',
  },
  bouzouki: {
    id: 'bouzouki',
    name: 'Bouzouki',
    defaultFretCount: 19,
    defaultTuningId: 'bouzouki-irish-gdad',
    supportsCapo: true,
    supportsCourses: true,
    notes: 'Irish-style 4-course bouzouki.',
  },
  'banjo-5string': {
    id: 'banjo-5string',
    name: 'Banjo (5-string)',
    defaultFretCount: 22,
    defaultTuningId: 'banjo-5string-open-g',
    supportsCapo: true,
    supportsCourses: false,
    notes: 'Short 5th drone string starts at fret 5.',
  },
  'banjo-tenor': {
    id: 'banjo-tenor',
    name: 'Banjo (Tenor/Irish)',
    defaultFretCount: 19,
    defaultTuningId: 'banjo-tenor-gdae',
    supportsCapo: false,
    supportsCourses: false,
  },
}

export function getInstrument(id: string): Instrument {
  const inst = INSTRUMENTS[id]
  if (!inst) throw new Error(`Unknown instrument: "${id}"`)
  return inst
}

export function getAllInstruments(): Instrument[] {
  return Object.values(INSTRUMENTS)
}
