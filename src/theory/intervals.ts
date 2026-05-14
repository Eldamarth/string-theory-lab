import { INTERVAL_LABELS } from './pitchClasses'

export function semitoneToIntervalLabel(semitones: number): string {
  return INTERVAL_LABELS[((semitones % 12) + 12) % 12]
}

export function intervalFromRoot(rootPitchClass: number, targetPitchClass: number): string {
  return semitoneToIntervalLabel((targetPitchClass - rootPitchClass + 12) % 12)
}
