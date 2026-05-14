import React, { useMemo } from 'react'
import { useAppStore } from '../../state/store'
import { useFretboard } from '../../state/useFretboard'
import { Fretboard } from '../Fretboard/Fretboard'
import { ExplanationPanel } from '../ExplanationPanel/ExplanationPanel'
import { getScale, getScalesOnly } from '../../../theory/scales'
import { getPitchClassesFromFormula } from '../../../theory/fretboard'
import { getNoteName, autoSpelling } from '../../../theory/notes'

export function ScaleExplorer() {
  const { rootNote, selectedScaleId, displayMode, noteSpelling, setSelectedScale } = useAppStore()
  const scales = getScalesOnly()
  const scale = getScale(selectedScaleId.startsWith('ionian') || !scales.find(s => s.id === selectedScaleId) ? 'major' : selectedScaleId)

  const targetPCs = useMemo(
    () => getPitchClassesFromFormula(rootNote, scale.semitones),
    [rootNote, scale]
  )

  const { marked, pitchClassToNote } = useFretboard(targetPCs)

  const noteNames = targetPCs.map(pc => pitchClassToNote(pc))

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className="text-gray-400 text-sm">Scale:</span>
        <select
          className="bg-gray-800 text-gray-100 border border-gray-600 rounded px-3 py-1.5 text-sm"
          value={scales.find(s => s.id === selectedScaleId) ? selectedScaleId : 'major'}
          onChange={e => setSelectedScale(e.target.value)}
        >
          {scales.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
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
        title={`${rootNote} ${scale.name}`}
        formula={scale.intervals}
        notes={noteNames}
      />
    </div>
  )
}
