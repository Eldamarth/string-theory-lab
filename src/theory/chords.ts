export interface Chord {
  id: string
  name: string
  symbols: string[]
  semitones: number[]
  intervals: string[]
}

export const CHORDS: Record<string, Chord> = {
  major: {
    id: 'major',
    name: 'Major',
    symbols: ['', 'maj', 'M'],
    semitones: [0, 4, 7],
    intervals: ['1', '3', '5'],
  },
  minor: {
    id: 'minor',
    name: 'Minor',
    symbols: ['m', 'min', '-'],
    semitones: [0, 3, 7],
    intervals: ['1', 'b3', '5'],
  },
  diminished: {
    id: 'diminished',
    name: 'Diminished',
    symbols: ['dim', '°'],
    semitones: [0, 3, 6],
    intervals: ['1', 'b3', 'b5'],
  },
  augmented: {
    id: 'augmented',
    name: 'Augmented',
    symbols: ['aug', '+'],
    semitones: [0, 4, 8],
    intervals: ['1', '3', '#5'],
  },
  sus2: {
    id: 'sus2',
    name: 'Suspended 2',
    symbols: ['sus2'],
    semitones: [0, 2, 7],
    intervals: ['1', '2', '5'],
  },
  sus4: {
    id: 'sus4',
    name: 'Suspended 4',
    symbols: ['sus4', 'sus'],
    semitones: [0, 5, 7],
    intervals: ['1', '4', '5'],
  },
  major7: {
    id: 'major7',
    name: 'Major 7',
    symbols: ['maj7', 'M7', 'Δ7'],
    semitones: [0, 4, 7, 11],
    intervals: ['1', '3', '5', '7'],
  },
  minor7: {
    id: 'minor7',
    name: 'Minor 7',
    symbols: ['m7', 'min7', '-7'],
    semitones: [0, 3, 7, 10],
    intervals: ['1', 'b3', '5', 'b7'],
  },
  dominant7: {
    id: 'dominant7',
    name: 'Dominant 7',
    symbols: ['7'],
    semitones: [0, 4, 7, 10],
    intervals: ['1', '3', '5', 'b7'],
  },
  'half-diminished': {
    id: 'half-diminished',
    name: 'Half-Diminished (m7b5)',
    symbols: ['m7b5', 'ø7', 'ø'],
    semitones: [0, 3, 6, 10],
    intervals: ['1', 'b3', 'b5', 'b7'],
  },
  diminished7: {
    id: 'diminished7',
    name: 'Diminished 7',
    symbols: ['dim7', '°7'],
    semitones: [0, 3, 6, 9],
    intervals: ['1', 'b3', 'b5', 'bb7'],
  },
}

export function getChord(id: string): Chord {
  const c = CHORDS[id]
  if (!c) throw new Error(`Unknown chord: "${id}"`)
  return c
}

export function getAllChords(): Chord[] {
  return Object.values(CHORDS)
}
