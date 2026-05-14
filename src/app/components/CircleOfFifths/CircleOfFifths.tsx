import React from 'react'
import { useAppStore } from '../../state/store'
import { noteToPitchClass, getNoteName } from '../../../theory/notes'
import { getPitchClassesFromFormula } from '../../../theory/fretboard'
import { CHORDS, getChord } from '../../../theory/chords'

// Keys in circle-of-fifths order (starting at top = C, going clockwise)
const MAJOR_KEYS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F']
const RELATIVE_MINORS = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm']

// Diatonic chord qualities for major scale (I ii iii IV V vi vii°)
const MAJOR_TRIADS = ['major', 'minor', 'minor', 'major', 'major', 'minor', 'diminished']
const MAJOR_SEVENTHS = ['major7', 'minor7', 'minor7', 'major7', 'dominant7', 'minor7', 'half-diminished']
const ROMAN_MAJOR = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°']
const MAJOR_SCALE_STEPS = [0, 2, 4, 5, 7, 9, 11]

const CX = 160
const CY = 160
const R_OUTER = 130
const R_INNER = 88

function keyAngle(i: number): number {
  return (i * 30 - 90) * (Math.PI / 180)
}

interface DiatonicRow {
  roman: string
  root: string
  triad: string
  seventh: string
}

function getDiatonicChords(key: string): DiatonicRow[] {
  const rootPc = noteToPitchClass(key)
  return MAJOR_SCALE_STEPS.map((step, i) => {
    const degreePc = (rootPc + step) % 12
    // Pick spelling based on the key signature
    const root = getNoteName(degreePc, ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb'].includes(key) ? 'flat' : 'sharp')
    const triadChord = getChord(MAJOR_TRIADS[i])
    const seventhChord = getChord(MAJOR_SEVENTHS[i])
    return {
      roman: ROMAN_MAJOR[i],
      root,
      triad: `${root}${triadChord.symbols[0] || ''}`,
      seventh: `${root}${seventhChord.symbols[0] ?? seventhChord.symbols[1] ?? ''}`,
    }
  })
}

export function CircleOfFifths() {
  const { rootNote, setRootNote, noteSpelling } = useAppStore()

  const selectedIndex = MAJOR_KEYS.findIndex(k => {
    try { return noteToPitchClass(k) === noteToPitchClass(rootNote) } catch { return false }
  })

  const relativeMinor = selectedIndex >= 0 ? RELATIVE_MINORS[selectedIndex] : null
  const diatonicChords = getDiatonicChords(selectedIndex >= 0 ? MAJOR_KEYS[selectedIndex] : rootNote)

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* SVG Circle */}
      <div className="flex-shrink-0">
        <svg width={320} height={320} aria-label="Circle of fifths">
          {/* Background */}
          <circle cx={CX} cy={CY} r={R_OUTER + 10} fill="#111827" />

          {MAJOR_KEYS.map((key, i) => {
            const angle = keyAngle(i)
            const nextAngle = keyAngle(i + 1)
            const isSelected = i === selectedIndex

            // Outer arc (major key sector)
            const x1o = CX + R_OUTER * Math.cos(angle - 0.02)
            const y1o = CY + R_OUTER * Math.sin(angle - 0.02)
            const x2o = CX + R_OUTER * Math.cos(nextAngle + 0.02)
            const y2o = CY + R_OUTER * Math.sin(nextAngle + 0.02)
            const x1i = CX + (R_INNER + 2) * Math.cos(angle - 0.02)
            const y1i = CY + (R_INNER + 2) * Math.sin(angle - 0.02)
            const x2i = CX + (R_INNER + 2) * Math.cos(nextAngle + 0.02)
            const y2i = CY + (R_INNER + 2) * Math.sin(nextAngle + 0.02)

            const midAngle = keyAngle(i) + (Math.PI / 12)
            const textR = (R_OUTER + R_INNER + 2) / 2
            const tx = CX + textR * Math.cos(midAngle)
            const ty = CY + textR * Math.sin(midAngle)

            // Inner arc (relative minor sector)
            const riOuter = R_INNER - 2
            const riInner = 48
            const x1ro = CX + riOuter * Math.cos(angle - 0.02)
            const y1ro = CY + riOuter * Math.sin(angle - 0.02)
            const x2ro = CX + riOuter * Math.cos(nextAngle + 0.02)
            const y2ro = CY + riOuter * Math.sin(nextAngle + 0.02)
            const x1ri = CX + riInner * Math.cos(angle - 0.02)
            const y1ri = CY + riInner * Math.sin(angle - 0.02)
            const x2ri = CX + riInner * Math.cos(nextAngle + 0.02)
            const y2ri = CY + riInner * Math.sin(nextAngle + 0.02)

            const minorMidAngle = midAngle
            const minorTextR = (riOuter + riInner) / 2
            const mtx = CX + minorTextR * Math.cos(minorMidAngle)
            const mty = CY + minorTextR * Math.sin(minorMidAngle)

            return (
              <g key={key} onClick={() => setRootNote(key)} style={{ cursor: 'pointer' }}>
                {/* Major sector */}
                <path
                  d={`M ${x1i} ${y1i} L ${x1o} ${y1o} A ${R_OUTER} ${R_OUTER} 0 0 1 ${x2o} ${y2o} L ${x2i} ${y2i} A ${R_INNER + 2} ${R_INNER + 2} 0 0 0 ${x1i} ${y1i} Z`}
                  fill={isSelected ? '#f59e0b' : '#1f2937'}
                  stroke="#374151"
                  strokeWidth={1}
                />
                <text
                  x={tx} y={ty + 5}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight={isSelected ? '700' : '500'}
                  fill={isSelected ? '#111827' : '#e5e7eb'}
                >
                  {key}
                </text>

                {/* Relative minor sector */}
                <path
                  d={`M ${x1ri} ${y1ri} L ${x1ro} ${y1ro} A ${riOuter} ${riOuter} 0 0 1 ${x2ro} ${y2ro} L ${x2ri} ${y2ri} A ${riInner} ${riInner} 0 0 0 ${x1ri} ${y1ri} Z`}
                  fill={isSelected ? '#92400e' : '#111827'}
                  stroke="#374151"
                  strokeWidth={1}
                />
                <text
                  x={mtx} y={mty + 4}
                  textAnchor="middle"
                  fontSize={9}
                  fill={isSelected ? '#fef3c7' : '#9ca3af'}
                >
                  {RELATIVE_MINORS[i]}
                </text>
              </g>
            )
          })}

          {/* Center label */}
          <text x={CX} y={CY + 5} textAnchor="middle" fontSize={11} fill="#6b7280">
            Click key
          </text>
        </svg>
      </div>

      {/* Diatonic chord table */}
      {selectedIndex >= 0 && (
        <div className="flex-1">
          <h2 className="text-amber-400 font-semibold text-lg mb-1">
            {MAJOR_KEYS[selectedIndex]} Major
          </h2>
          {relativeMinor && (
            <p className="text-gray-400 text-sm mb-4">Relative minor: <span className="text-gray-200">{relativeMinor}</span></p>
          )}

          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-gray-500 text-xs uppercase border-b border-gray-700">
                <th className="text-left py-2 pr-4 font-medium">Degree</th>
                <th className="text-left py-2 pr-4 font-medium">Triad</th>
                <th className="text-left py-2 font-medium">7th Chord</th>
              </tr>
            </thead>
            <tbody>
              {diatonicChords.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-gray-800 ${
                    [0, 3, 4].includes(i) ? 'text-gray-100' : 'text-gray-400'
                  }`}
                >
                  <td className="py-1.5 pr-4 font-mono text-amber-400/80">{row.roman}</td>
                  <td className="py-1.5 pr-4 font-medium">{row.triad}</td>
                  <td className="py-1.5 text-gray-300">{row.seventh}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-xs text-gray-500 space-y-1">
            <p>Primary chords: <span className="text-gray-300">{diatonicChords[0].triad} — {diatonicChords[3].triad} — {diatonicChords[4].triad}</span></p>
            <p>ii–V–I: <span className="text-gray-300">{diatonicChords[1].seventh} → {diatonicChords[4].seventh} → {diatonicChords[0].seventh}</span></p>
          </div>
        </div>
      )}
    </div>
  )
}
