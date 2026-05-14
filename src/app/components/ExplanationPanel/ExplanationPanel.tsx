import React from 'react'

interface ExplanationPanelProps {
  title: string
  formula: string[]
  notes: string[]
  characteristicTones?: string[]
  summary?: string
}

export function ExplanationPanel({ title, formula, notes, characteristicTones, summary }: ExplanationPanelProps) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4 text-sm">
      <h3 className="text-amber-400 font-semibold text-base mb-3">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <span className="text-gray-500 text-xs uppercase tracking-wide">Formula</span>
          <div className="flex gap-2 flex-wrap mt-1">
            {formula.map((interval, i) => (
              <span key={i} className="bg-gray-800 text-blue-300 px-2 py-0.5 rounded text-xs font-mono">
                {interval}
              </span>
            ))}
          </div>
        </div>
        <div>
          <span className="text-gray-500 text-xs uppercase tracking-wide">Notes</span>
          <div className="flex gap-2 flex-wrap mt-1">
            {notes.map((note, i) => (
              <span key={i} className={`px-2 py-0.5 rounded text-xs font-mono ${
                i === 0 ? 'bg-amber-500/20 text-amber-300' : 'bg-gray-800 text-gray-300'
              }`}>
                {note}
              </span>
            ))}
          </div>
        </div>
        {characteristicTones && characteristicTones.length > 0 && (
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-wide">Characteristic tone{characteristicTones.length > 1 ? 's' : ''}</span>
            <div className="flex gap-2 flex-wrap mt-1">
              {characteristicTones.map((tone, i) => (
                <span key={i} className="bg-purple-900/40 text-purple-300 px-2 py-0.5 rounded text-xs font-mono">
                  {tone}
                </span>
              ))}
            </div>
          </div>
        )}
        {summary && (
          <div className={characteristicTones && characteristicTones.length > 0 ? '' : 'sm:col-span-2'}>
            <span className="text-gray-500 text-xs uppercase tracking-wide">Sound / Use</span>
            <p className="text-gray-300 mt-1 leading-relaxed">{summary}</p>
          </div>
        )}
      </div>
    </div>
  )
}
