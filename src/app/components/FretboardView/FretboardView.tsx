import React from 'react'
import { useAppStore } from '../../state/store'
import { useFretboard } from '../../state/useFretboard'
import { Fretboard } from '../Fretboard/Fretboard'
import { getPitchClassesFromFormula } from '../../../theory/fretboard'
import { getScale } from '../../../theory/scales'
import { getChord } from '../../../theory/chords'
import { noteToPitchClass } from '../../../theory/notes'

const OVERLAY_OPTIONS = [
  { value: 'all',   label: 'All Notes' },
  { value: 'scale', label: 'Scale' },
  { value: 'mode',  label: 'Mode' },
  { value: 'chord', label: 'Chord Tones' },
  { value: 'root',  label: 'Root Only' },
] as const

export function FretboardView() {
  const {
    rootNote, overlayType, selectedScaleId, selectedChordId,
    displayMode, noteSpelling, setOverlayType,
  } = useAppStore()

  const targetPCs = React.useMemo(() => {
    if (overlayType === 'all')  return null
    if (overlayType === 'root') return [noteToPitchClass(rootNote)]
    if (overlayType === 'scale' || overlayType === 'mode') {
      const scale = getScale(selectedScaleId)
      return getPitchClassesFromFormula(rootNote, scale.semitones)
    }
    if (overlayType === 'chord') {
      const chord = getChord(selectedChordId)
      return getPitchClassesFromFormula(rootNote, chord.semitones)
    }
    return null
  }, [overlayType, rootNote, selectedScaleId, selectedChordId])

  const { marked } = useFretboard(targetPCs)

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-gray-400 text-sm">Overlay:</span>
        <div className="flex gap-1 flex-wrap">
          {OVERLAY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setOverlayType(opt.value)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                overlayType === opt.value
                  ? 'bg-amber-500 text-gray-900 font-medium'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <Fretboard
        positions={marked}
        displayMode={displayMode}
        noteSpelling={noteSpelling}
        rootNote={rootNote}
      />
    </div>
  )
}
