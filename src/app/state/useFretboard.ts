import { useMemo } from 'react'
import { useAppStore } from './store'
import { getTuning } from '../../theory/tunings'
import { generateFretboard, markMatchingFrets, getPitchClassesFromFormula } from '../../theory/fretboard'
import { getNoteName, autoSpelling, noteToPitchClass } from '../../theory/notes'

export function useFretboard(targetPitchClasses: number[] | null) {
  const { tuningId, customTuning, fretCount, rootNote, noteSpelling } = useAppStore()

  const tuning = useMemo(() => {
    const preset = getTuning(tuningId)
    if (customTuning) {
      return { ...preset, stringsLowToHigh: customTuning, specialStrings: undefined }
    }
    return preset
  }, [tuningId, customTuning])

  const fretboard = useMemo(() => generateFretboard(tuning, fretCount), [tuning, fretCount])

  const marked = useMemo(() => {
    const pcs = targetPitchClasses ?? Array.from({ length: 12 }, (_, i) => i)
    return markMatchingFrets(fretboard, pcs, rootNote)
  }, [fretboard, targetPitchClasses, rootNote])

  const resolvedSpelling = noteSpelling === 'auto' ? autoSpelling(rootNote) : noteSpelling

  function pitchClassToNote(pc: number): string {
    return getNoteName(pc, resolvedSpelling)
  }

  return { marked, pitchClassToNote }
}
