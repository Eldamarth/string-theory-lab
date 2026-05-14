import React, { useState } from 'react'
import { useAppStore } from '../../state/store'
import { getAllInstruments } from '../../../theory/instruments'
import { getTuningsForInstrument } from '../../../theory/tunings'
import { PITCH_CLASSES } from '../../../theory/pitchClasses'
import { capoTranspose } from '../../../theory/tunings'
import { getNoteName } from '../../../theory/notes'

const ALL_NOTES = ['C','C#','Db','D','D#','Eb','E','F','F#','Gb','G','Ab','A','A#','Bb','B']
const INSTRUMENTS = getAllInstruments()

export function GlobalControls() {
  const {
    instrumentId, tuningId, customTuning, fretCount, rootNote, capoPosition,
    displayMode, noteSpelling,
    setInstrument, setTuning, setCustomTuning, clearCustomTuning,
    setFretCount, setRootNote, setCapoPosition, setDisplayMode, setNoteSpelling,
  } = useAppStore()

  const [showCustomEditor, setShowCustomEditor] = useState(false)
  const [customInputs, setCustomInputs] = useState<string[]>([])
  const [customErrors, setCustomErrors] = useState<boolean[]>([])

  const tunings = getTuningsForInstrument(instrumentId)
  const currentTuning = customTuning ? null : tunings.find(t => t.id === tuningId)

  const soundingPc = capoPosition > 0 ? capoTranspose(rootNote, capoPosition) : null
  const soundingNote = soundingPc !== null
    ? getNoteName(soundingPc, noteSpelling === 'flat' ? 'flat' : 'sharp')
    : null

  function handleInstrumentChange(id: string) {
    setInstrument(id)
    setShowCustomEditor(false)
  }

  function handleTuningChange(value: string) {
    if (value === '__custom__') {
      const tuning = tunings.find(t => t.id === tuningId)
      const strings = tuning?.stringsLowToHigh ?? []
      setCustomInputs([...strings])
      setCustomErrors(strings.map(() => false))
      setShowCustomEditor(true)
    } else {
      setShowCustomEditor(false)
      clearCustomTuning()
      setTuning(value)
    }
  }

  function handleCustomInput(i: number, val: string) {
    const next = [...customInputs]
    next[i] = val.trim()
    setCustomInputs(next)
    const errors = next.map(n => !(n in PITCH_CLASSES))
    setCustomErrors(errors)
  }

  function applyCustomTuning() {
    const errors = customInputs.map(n => !(n in PITCH_CLASSES))
    setCustomErrors(errors)
    if (errors.some(Boolean)) return
    setCustomTuning(customInputs)
    setShowCustomEditor(false)
  }

  const stringCount = customTuning?.length
    ?? tunings.find(t => t.id === tuningId)?.stringsLowToHigh.length
    ?? 6

  return (
    <div className="bg-gray-900 border-b border-gray-700 px-3 py-2">
      <div className="flex flex-wrap items-center gap-3 text-sm">

        {/* Instrument */}
        <label className="flex items-center gap-1 text-gray-400">
          <span className="text-xs uppercase tracking-wide">Instrument</span>
          <select
            className="bg-gray-800 text-gray-100 border border-gray-600 rounded px-2 py-1 text-sm"
            value={instrumentId}
            onChange={e => handleInstrumentChange(e.target.value)}
          >
            {INSTRUMENTS.map(inst => (
              <option key={inst.id} value={inst.id}>{inst.name}</option>
            ))}
          </select>
        </label>

        {/* Tuning */}
        <label className="flex items-center gap-1 text-gray-400">
          <span className="text-xs uppercase tracking-wide">Tuning</span>
          <select
            className="bg-gray-800 text-gray-100 border border-gray-600 rounded px-2 py-1 text-sm"
            value={customTuning ? '__custom__' : tuningId}
            onChange={e => handleTuningChange(e.target.value)}
          >
            {tunings.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
            <option value="__custom__">Custom…</option>
          </select>
        </label>

        {/* Root */}
        <label className="flex items-center gap-1 text-gray-400">
          <span className="text-xs uppercase tracking-wide">Root</span>
          <select
            className="bg-gray-800 text-gray-100 border border-gray-600 rounded px-2 py-1 text-sm"
            value={rootNote}
            onChange={e => setRootNote(e.target.value)}
          >
            {ALL_NOTES.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        {/* Capo */}
        <label className="flex items-center gap-1 text-gray-400">
          <span className="text-xs uppercase tracking-wide">Capo</span>
          <input
            type="number"
            min={0}
            max={12}
            value={capoPosition}
            onChange={e => setCapoPosition(Math.max(0, Math.min(12, parseInt(e.target.value) || 0)))}
            className="bg-gray-800 text-gray-100 border border-gray-600 rounded px-2 py-1 w-14 text-sm"
          />
          {soundingNote && (
            <span className="text-amber-400 text-xs">→ {soundingNote}</span>
          )}
        </label>

        {/* Frets */}
        <label className="flex items-center gap-1 text-gray-400">
          <span className="text-xs uppercase tracking-wide">Frets</span>
          <input
            type="number"
            min={5}
            max={24}
            value={fretCount}
            onChange={e => setFretCount(Math.max(5, Math.min(24, parseInt(e.target.value) || 12)))}
            className="bg-gray-800 text-gray-100 border border-gray-600 rounded px-2 py-1 w-14 text-sm"
          />
        </label>

        {/* Display mode */}
        <label className="flex items-center gap-1 text-gray-400">
          <span className="text-xs uppercase tracking-wide">Labels</span>
          <select
            className="bg-gray-800 text-gray-100 border border-gray-600 rounded px-2 py-1 text-sm"
            value={displayMode}
            onChange={e => setDisplayMode(e.target.value as any)}
          >
            <option value="notes">Notes</option>
            <option value="intervals">Intervals</option>
            <option value="degrees">Degrees</option>
          </select>
        </label>

        {/* Note spelling */}
        <label className="flex items-center gap-1 text-gray-400">
          <span className="text-xs uppercase tracking-wide">Spelling</span>
          <select
            className="bg-gray-800 text-gray-100 border border-gray-600 rounded px-2 py-1 text-sm"
            value={noteSpelling}
            onChange={e => setNoteSpelling(e.target.value as any)}
          >
            <option value="auto">Auto</option>
            <option value="sharp">Sharps</option>
            <option value="flat">Flats</option>
          </select>
        </label>
      </div>

      {/* Custom tuning editor */}
      {showCustomEditor && (
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-400 uppercase tracking-wide">Strings (low→high):</span>
          {customInputs.map((val, i) => (
            <input
              key={i}
              value={val}
              onChange={e => handleCustomInput(i, e.target.value)}
              className={`w-12 text-center bg-gray-800 text-gray-100 border rounded px-1 py-1 text-sm ${
                customErrors[i] ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="E"
            />
          ))}
          <button
            onClick={applyCustomTuning}
            disabled={customErrors.some(Boolean)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded text-sm"
          >
            Apply
          </button>
          <button
            onClick={() => setShowCustomEditor(false)}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-sm"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
