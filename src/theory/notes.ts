import { PITCH_CLASSES, NOTES_SHARP, NOTES_FLAT } from './pitchClasses'

// Flat key names — keyed off the note name (not pitch class) to handle enharmonics correctly.
// Db major is a flat key; C# major is a sharp key. They share a pitch class but different spellings.
const FLAT_KEY_NAMES = new Set(['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'])

export function noteToPitchClass(note: string): number {
  const pc = PITCH_CLASSES[note]
  if (pc === undefined) throw new Error(`Unknown note name: "${note}"`)
  return pc
}

export function getNoteName(pitchClass: number, spelling: 'sharp' | 'flat'): string {
  return spelling === 'sharp' ? NOTES_SHARP[pitchClass] : NOTES_FLAT[pitchClass]
}

export function autoSpelling(rootNote: string): 'sharp' | 'flat' {
  return FLAT_KEY_NAMES.has(rootNote) ? 'flat' : 'sharp'
}
