export const PITCH_CLASSES: Record<string, number> = {
  C: 0,
  'C#': 1, Db: 1,
  D: 2,
  'D#': 3, Eb: 3,
  E: 4,
  F: 5,
  'F#': 6, Gb: 6,
  G: 7,
  'G#': 8, Ab: 8,
  A: 9,
  'A#': 10, Bb: 10,
  B: 11,
}

export const NOTES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const
export const NOTES_FLAT  = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'] as const

export const INTERVAL_LABELS: Record<number, string> = {
  0:  '1',
  1:  'b2',
  2:  '2',
  3:  'b3',
  4:  '3',
  5:  '4',
  6:  '#4/b5',
  7:  '5',
  8:  'b6',
  9:  '6',
  10: 'b7',
  11: '7',
}
