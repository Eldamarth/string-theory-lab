export interface Scale {
  id: string
  name: string
  aliases?: string[]
  category: 'scale' | 'mode'
  semitones: number[]
  intervals: string[]
  parentScale?: string
  modeNumber?: number
  characteristicTones?: string[]
  chordCompatibility?: string[]
  summary?: string
}

export const SCALES: Record<string, Scale> = {
  // ── SCALES ────────────────────────────────────────────────────────────────
  major: {
    id: 'major',
    name: 'Major',
    aliases: ['Ionian'],
    category: 'scale',
    semitones: [0, 2, 4, 5, 7, 9, 11],
    intervals: ['1', '2', '3', '4', '5', '6', '7'],
  },
  'natural-minor': {
    id: 'natural-minor',
    name: 'Natural Minor',
    aliases: ['Aeolian'],
    category: 'scale',
    semitones: [0, 2, 3, 5, 7, 8, 10],
    intervals: ['1', '2', 'b3', '4', '5', 'b6', 'b7'],
  },
  'major-pentatonic': {
    id: 'major-pentatonic',
    name: 'Major Pentatonic',
    category: 'scale',
    semitones: [0, 2, 4, 7, 9],
    intervals: ['1', '2', '3', '5', '6'],
  },
  'minor-pentatonic': {
    id: 'minor-pentatonic',
    name: 'Minor Pentatonic',
    category: 'scale',
    semitones: [0, 3, 5, 7, 10],
    intervals: ['1', 'b3', '4', '5', 'b7'],
  },
  blues: {
    id: 'blues',
    name: 'Blues',
    category: 'scale',
    semitones: [0, 3, 5, 6, 7, 10],
    intervals: ['1', 'b3', '4', '#4/b5', '5', 'b7'],
  },

  // ── MODES ─────────────────────────────────────────────────────────────────
  ionian: {
    id: 'ionian',
    name: 'Ionian',
    aliases: ['Major'],
    category: 'mode',
    semitones: [0, 2, 4, 5, 7, 9, 11],
    intervals: ['1', '2', '3', '4', '5', '6', '7'],
    parentScale: 'major',
    modeNumber: 1,
    characteristicTones: [],
    chordCompatibility: ['major', 'major7'],
    summary: 'The major scale itself. Bright and resolved.',
  },
  dorian: {
    id: 'dorian',
    name: 'Dorian',
    category: 'mode',
    semitones: [0, 2, 3, 5, 7, 9, 10],
    intervals: ['1', '2', 'b3', '4', '5', '6', 'b7'],
    parentScale: 'major',
    modeNumber: 2,
    characteristicTones: ['6'],
    chordCompatibility: ['minor7'],
    summary: 'Minor with a natural 6. Brighter than natural minor. Common in rock, jazz, Celtic.',
  },
  phrygian: {
    id: 'phrygian',
    name: 'Phrygian',
    category: 'mode',
    semitones: [0, 1, 3, 5, 7, 8, 10],
    intervals: ['1', 'b2', 'b3', '4', '5', 'b6', 'b7'],
    parentScale: 'major',
    modeNumber: 3,
    characteristicTones: ['b2'],
    chordCompatibility: ['minor'],
    summary: 'Dark minor with a flat 2. Spanish/flamenco and metal flavor.',
  },
  lydian: {
    id: 'lydian',
    name: 'Lydian',
    category: 'mode',
    semitones: [0, 2, 4, 6, 7, 9, 11],
    intervals: ['1', '2', '3', '#4', '5', '6', '7'],
    parentScale: 'major',
    modeNumber: 4,
    characteristicTones: ['#4'],
    chordCompatibility: ['major7'],
    summary: 'Bright major with a raised 4th. Dreamy, floating quality.',
  },
  mixolydian: {
    id: 'mixolydian',
    name: 'Mixolydian',
    category: 'mode',
    semitones: [0, 2, 4, 5, 7, 9, 10],
    intervals: ['1', '2', '3', '4', '5', '6', 'b7'],
    parentScale: 'major',
    modeNumber: 5,
    characteristicTones: ['b7'],
    chordCompatibility: ['dominant7'],
    summary: 'Major with a flat 7. Bluesy, rock, and Celtic dominant sound.',
  },
  aeolian: {
    id: 'aeolian',
    name: 'Aeolian',
    aliases: ['Natural Minor'],
    category: 'mode',
    semitones: [0, 2, 3, 5, 7, 8, 10],
    intervals: ['1', '2', 'b3', '4', '5', 'b6', 'b7'],
    parentScale: 'major',
    modeNumber: 6,
    characteristicTones: ['b6'],
    chordCompatibility: ['minor', 'minor7'],
    summary: 'The natural minor scale. Dark and resolved minor sound.',
  },
  locrian: {
    id: 'locrian',
    name: 'Locrian',
    category: 'mode',
    semitones: [0, 1, 3, 5, 6, 8, 10],
    intervals: ['1', 'b2', 'b3', '4', 'b5', 'b6', 'b7'],
    parentScale: 'major',
    modeNumber: 7,
    characteristicTones: ['b2', 'b5'],
    chordCompatibility: ['half-diminished'],
    summary: 'Darkest mode. Flat 2 and flat 5 create extreme instability.',
  },
}

export function getScale(id: string): Scale {
  const s = SCALES[id]
  if (!s) throw new Error(`Unknown scale/mode: "${id}"`)
  return s
}

export function getAllScales(): Scale[] {
  return Object.values(SCALES)
}

export function getModes(): Scale[] {
  return getAllScales().filter(s => s.category === 'mode')
}

export function getScalesOnly(): Scale[] {
  return getAllScales().filter(s => s.category === 'scale')
}
