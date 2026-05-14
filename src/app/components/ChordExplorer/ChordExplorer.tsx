import React, { useMemo } from 'react'
import { useAppStore } from '../../state/store'
import { useFretboard } from '../../state/useFretboard'
import { Fretboard } from '../Fretboard/Fretboard'
import { ExplanationPanel } from '../ExplanationPanel/ExplanationPanel'
import { getChord, getAllChords } from '../../../theory/chords'
import { getPitchClassesFromFormula } from '../../../theory/fretboard'

export function ChordExplorer() {
  const { rootNote, selectedChordId, displayMode, noteSpelling, setSelectedChord } = useAppStore()
  const chords = getAllChords()
  const chord = getChord(selectedChordId)

  const targetPCs = useMemo(
    () => getPitchClassesFromFormula(rootNote, chord.semitones),
    [rootNote, chord]
  )

  const { marked, pitchClassToNote } = useFretboard(targetPCs)
  const noteNames = targetPCs.map(pc => pitchClassToNote(pc))

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className="text-gray-400 text-sm">Chord:</span>
        <select
          className="bg-gray-800 text-gray-100 border border-gray-600 rounded px-3 py-1.5 text-sm"
          value={selectedChordId}
          onChange={e => setSelectedChord(e.target.value)}
        >
          {chords.map(c => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.symbols[0] || c.symbols[1] || ''})
            </option>
          ))}
        </select>
      </div>
      <Fretboard
        positions={marked}
        displayMode={displayMode}
        noteSpelling={noteSpelling}
        rootNote={rootNote}
      />
      <ExplanationPanel
        title={`${rootNote} ${chord.name}`}
        formula={chord.intervals}
        notes={noteNames}
      />
    </div>
  )
}
