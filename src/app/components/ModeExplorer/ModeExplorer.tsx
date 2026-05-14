import React, { useMemo } from 'react'
import { useAppStore } from '../../state/store'
import { useFretboard } from '../../state/useFretboard'
import { Fretboard } from '../Fretboard/Fretboard'
import { ExplanationPanel } from '../ExplanationPanel/ExplanationPanel'
import { getScale, getModes } from '../../../theory/scales'
import { getPitchClassesFromFormula } from '../../../theory/fretboard'

export function ModeExplorer() {
  const { rootNote, selectedScaleId, displayMode, noteSpelling, setSelectedScale } = useAppStore()
  const modes = getModes()

  const modeId = modes.find(m => m.id === selectedScaleId) ? selectedScaleId : 'dorian'
  const mode = getScale(modeId)

  const targetPCs = useMemo(
    () => getPitchClassesFromFormula(rootNote, mode.semitones),
    [rootNote, mode]
  )

  const { marked, pitchClassToNote } = useFretboard(targetPCs)
  const noteNames = targetPCs.map(pc => pitchClassToNote(pc))

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className="text-gray-400 text-sm">Mode:</span>
        <select
          className="bg-gray-800 text-gray-100 border border-gray-600 rounded px-3 py-1.5 text-sm"
          value={modeId}
          onChange={e => setSelectedScale(e.target.value)}
        >
          {modes.map(m => (
            <option key={m.id} value={m.id}>
              {m.name}{m.modeNumber ? ` (mode ${m.modeNumber})` : ''}
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
        title={`${rootNote} ${mode.name}`}
        formula={mode.intervals}
        notes={noteNames}
        characteristicTones={mode.characteristicTones}
        summary={mode.summary}
      />
    </div>
  )
}
