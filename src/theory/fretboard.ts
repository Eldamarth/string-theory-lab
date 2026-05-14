import { Tuning } from './tunings'
import { noteToPitchClass } from './notes'
import { NOTES_SHARP, NOTES_FLAT } from './pitchClasses'
import { intervalFromRoot } from './intervals'

export interface FretPosition {
  stringIndex: number
  fret: number
  pitchClass: number
  noteSharp: string
  noteFlat: string
  isPlayable: boolean
  isMatch: boolean
  intervalLabel: string | null
}

export function generateFretboard(tuning: Tuning, fretCount: number): FretPosition[][] {
  return tuning.stringsLowToHigh.map((openNote, stringIndex) => {
    const openPitch = noteToPitchClass(openNote)
    const special = tuning.specialStrings?.find(s => s.stringIndex === stringIndex)

    return Array.from({ length: fretCount + 1 }, (_, fret) => {
      // For special strings (e.g. banjo 5th string), the open pitch sounds at startsAtFret,
      // not fret 0. Offset the pitch calculation so fret startsAtFret = openPitch.
      const fretOffset = special ? fret - special.startsAtFret : fret
      const pitchClass = ((openPitch + fretOffset) % 12 + 12) % 12
      const isPlayable = !special || fret >= special.startsAtFret

      return {
        stringIndex,
        fret,
        pitchClass,
        noteSharp: NOTES_SHARP[pitchClass],
        noteFlat: NOTES_FLAT[pitchClass],
        isPlayable,
        isMatch: false,
        intervalLabel: null,
      }
    })
  })
}

export function getPitchClassesFromFormula(root: string, semitones: number[]): number[] {
  const rootPitch = noteToPitchClass(root)
  return semitones.map(s => (rootPitch + s) % 12)
}

export function markMatchingFrets(
  fretboard: FretPosition[][],
  targetPitchClasses: number[],
  root?: string
): FretPosition[][] {
  const pcSet = new Set(targetPitchClasses)
  const rootPc = root !== undefined ? noteToPitchClass(root) : undefined

  return fretboard.map(string =>
    string.map(pos => {
      if (!pos.isPlayable) return { ...pos, isMatch: false, intervalLabel: null }
      const isMatch = pcSet.has(pos.pitchClass)
      const intervalLabel = isMatch && rootPc !== undefined
        ? intervalFromRoot(rootPc, pos.pitchClass)
        : null
      return { ...pos, isMatch, intervalLabel }
    })
  )
}
