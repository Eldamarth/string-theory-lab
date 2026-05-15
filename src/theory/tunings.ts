import { SpecialString } from './instruments'
import { noteToPitchClass } from './notes'

export interface Tuning {
  id: string
  instrumentId: string
  name: string
  stringsLowToHigh: string[]
  specialStrings?: SpecialString[]
  description?: string
}

export const TUNINGS: Record<string, Tuning> = {
  // ── GUITAR ───────────────────────────────────────────────────────────────
  'guitar-standard': {
    id: 'guitar-standard',
    instrumentId: 'guitar',
    name: 'Standard (EADGBe)',
    stringsLowToHigh: ['E', 'A', 'D', 'G', 'B', 'E'],
  },
  'guitar-drop-d': {
    id: 'guitar-drop-d',
    instrumentId: 'guitar',
    name: 'Drop D',
    stringsLowToHigh: ['D', 'A', 'D', 'G', 'B', 'E'],
  },
  'guitar-dadgad': {
    id: 'guitar-dadgad',
    instrumentId: 'guitar',
    name: 'DADGAD',
    stringsLowToHigh: ['D', 'A', 'D', 'G', 'A', 'D'],
    description: 'Modal tuning with strong D drone character.',
  },
  'guitar-open-g': {
    id: 'guitar-open-g',
    instrumentId: 'guitar',
    name: 'Open G',
    stringsLowToHigh: ['D', 'G', 'D', 'G', 'B', 'D'],
    description: 'Open G chord. Popular for slide and Celtic playing.',
  },
  'guitar-open-d': {
    id: 'guitar-open-d',
    instrumentId: 'guitar',
    name: 'Open D',
    stringsLowToHigh: ['D', 'A', 'D', 'F#', 'A', 'D'],
    description: 'Open D major chord.',
  },

  'guitar-half-step-down': {
    id: 'guitar-half-step-down',
    instrumentId: 'guitar',
    name: 'Half Step Down (Eb)',
    stringsLowToHigh: ['Eb', 'Ab', 'Db', 'Gb', 'Bb', 'Eb'],
  },
  'guitar-full-step-down': {
    id: 'guitar-full-step-down',
    instrumentId: 'guitar',
    name: 'Full Step Down (D)',
    stringsLowToHigh: ['D', 'G', 'C', 'F', 'A', 'D'],
    description: 'D-standard. Used by Nightwish and many metal bands.',
  },
  'guitar-c-standard': {
    id: 'guitar-c-standard',
    instrumentId: 'guitar',
    name: 'C Standard',
    stringsLowToHigh: ['C', 'F', 'Bb', 'Eb', 'G', 'C'],
    description: 'Two whole steps down. Used by Dethklok and extreme metal.',
  },
  'guitar-drop-c': {
    id: 'guitar-drop-c',
    instrumentId: 'guitar',
    name: 'Drop C',
    stringsLowToHigh: ['C', 'G', 'C', 'F', 'A', 'D'],
    description: 'D-standard with lowest string dropped to C. Used by System of a Down.',
  },

  // ── 8-STRING GUITAR ───────────────────────────────────────────────────────
  'guitar-8string-standard': {
    id: 'guitar-8string-standard',
    instrumentId: 'guitar-8string',
    name: 'Standard (F#BEADGBe)',
    stringsLowToHigh: ['F#', 'B', 'E', 'A', 'D', 'G', 'B', 'E'],
  },
  'guitar-8string-drop-e': {
    id: 'guitar-8string-drop-e',
    instrumentId: 'guitar-8string',
    name: 'Drop E',
    stringsLowToHigh: ['E', 'B', 'E', 'A', 'D', 'G', 'B', 'E'],
    description: 'Lowest string dropped from F# to E.',
  },
  'guitar-8string-drop-eb': {
    id: 'guitar-8string-drop-eb',
    instrumentId: 'guitar-8string',
    name: 'Drop D# / Drop Eb',
    stringsLowToHigh: ['Eb', 'B', 'E', 'A', 'D', 'G', 'B', 'E'],
    description: 'Lowest string dropped to Eb/D#.',
  },

  // ── BASS 4-STRING ─────────────────────────────────────────────────────────
  'bass-4-standard': {
    id: 'bass-4-standard',
    instrumentId: 'bass-4',
    name: 'Standard (EADg)',
    stringsLowToHigh: ['E', 'A', 'D', 'G'],
  },
  'bass-4-drop-d': {
    id: 'bass-4-drop-d',
    instrumentId: 'bass-4',
    name: 'Drop D',
    stringsLowToHigh: ['D', 'A', 'D', 'G'],
  },

  // ── BASS 5-STRING ─────────────────────────────────────────────────────────
  'bass-5-standard': {
    id: 'bass-5-standard',
    instrumentId: 'bass-5',
    name: 'Standard (BEADg)',
    stringsLowToHigh: ['B', 'E', 'A', 'D', 'G'],
  },

  // ── MANDOLIN ──────────────────────────────────────────────────────────────
  'mandolin-standard': {
    id: 'mandolin-standard',
    instrumentId: 'mandolin',
    name: 'Standard (GDAe)',
    stringsLowToHigh: ['G', 'D', 'A', 'E'],
    description: 'Standard mandolin/violin tuning (5ths).',
  },
  'mandolin-irish-gdad': {
    id: 'mandolin-irish-gdad',
    instrumentId: 'mandolin',
    name: 'Irish GDAD',
    stringsLowToHigh: ['G', 'D', 'A', 'D'],
    description: 'High string dropped from E to D. Common in Irish/Celtic playing.',
  },

  // ── BOUZOUKI ──────────────────────────────────────────────────────────────
  'bouzouki-irish-gdad': {
    id: 'bouzouki-irish-gdad',
    instrumentId: 'bouzouki',
    name: 'Irish GDAD',
    stringsLowToHigh: ['G', 'D', 'A', 'D'],
    description: 'Most common Irish bouzouki tuning. Strong D drone.',
  },
  'bouzouki-irish-gdae': {
    id: 'bouzouki-irish-gdae',
    instrumentId: 'bouzouki',
    name: 'Irish GDAE',
    stringsLowToHigh: ['G', 'D', 'A', 'E'],
    description: 'Alternative Irish tuning matching mandolin/violin.',
  },
  'bouzouki-greek-cfad': {
    id: 'bouzouki-greek-cfad',
    instrumentId: 'bouzouki',
    name: 'Greek-style CFAD',
    stringsLowToHigh: ['C', 'F', 'A', 'D'],
    description: 'Greek-influenced tuning.',
  },

  // ── BANJO 5-STRING ────────────────────────────────────────────────────────
  'banjo-5string-open-g': {
    id: 'banjo-5string-open-g',
    instrumentId: 'banjo-5string',
    name: '5-string Open G',
    stringsLowToHigh: ['D', 'G', 'B', 'D', 'G'],
    specialStrings: [{
      stringIndex: 4,
      startsAtFret: 5,
      isDrone: true,
      visualLength: 'short',
    }],
    description: 'Standard bluegrass tuning. 5th string is a short G drone.',
  },
  'banjo-5string-double-c': {
    id: 'banjo-5string-double-c',
    instrumentId: 'banjo-5string',
    name: 'Double C',
    stringsLowToHigh: ['C', 'G', 'C', 'D', 'G'],
    specialStrings: [{
      stringIndex: 4,
      startsAtFret: 5,
      isDrone: true,
      visualLength: 'short',
    }],
  },
  'banjo-5string-sawmill': {
    id: 'banjo-5string-sawmill',
    instrumentId: 'banjo-5string',
    name: 'Sawmill / Modal',
    stringsLowToHigh: ['D', 'G', 'C', 'D', 'G'],
    specialStrings: [{
      stringIndex: 4,
      startsAtFret: 5,
      isDrone: true,
      visualLength: 'short',
    }],
    description: 'Modal tuning.',
  },

  'banjo-5string-irish-gdae': {
    id: 'banjo-5string-irish-gdae',
    instrumentId: 'banjo-5string',
    name: 'Irish GDAE',
    stringsLowToHigh: ['G', 'D', 'A', 'E', 'G'],
    specialStrings: [{
      stringIndex: 4,
      startsAtFret: 5,
      isDrone: true,
      visualLength: 'short',
    }],
    description: 'Irish tenor tuning on a 5-string banjo. G drone on 5th string.',
  },

  // ── BANJO TENOR / IRISH ───────────────────────────────────────────────────
  'banjo-tenor-gdae': {
    id: 'banjo-tenor-gdae',
    instrumentId: 'banjo-tenor',
    name: 'Irish Tenor GDAE',
    stringsLowToHigh: ['G', 'D', 'A', 'E'],
    description: 'Standard Irish tenor banjo tuning (5ths, same as mandolin/violin).',
  },
}

export function getTuning(id: string): Tuning {
  const t = TUNINGS[id]
  if (!t) throw new Error(`Unknown tuning: "${id}"`)
  return t
}

export function getTuningsForInstrument(instrumentId: string): Tuning[] {
  return Object.values(TUNINGS).filter(t => t.instrumentId === instrumentId)
}

export function capoTranspose(rootNote: string, capoPosition: number): number {
  return (noteToPitchClass(rootNote) + capoPosition) % 12
}
