import React from 'react'
import { FretPosition } from '../../../theory/fretboard'
import { DisplayMode, NoteSpelling } from '../../state/store'
import { tokens } from '../../styles/tokens'
import { getNoteName, autoSpelling } from '../../../theory/notes'

interface FretboardProps {
  positions: FretPosition[][]
  displayMode: DisplayMode
  noteSpelling: NoteSpelling
  rootNote: string
}

const FRET_WIDTH = 52
const STRING_SPACING = 34
const FRET_LABEL_HEIGHT = 22
const DOT_RADIUS = 12
const STRING_PADDING_LEFT = 36

function fretX(fret: number): number {
  if (fret === 0) return STRING_PADDING_LEFT / 2
  return STRING_PADDING_LEFT + (fret - 0.5) * FRET_WIDTH
}

function stringY(stringIndex: number, stringCount: number): number {
  return FRET_LABEL_HEIGHT + (stringCount - 1 - stringIndex) * STRING_SPACING + STRING_SPACING / 2
}

function getDotFill(pos: FretPosition, rootNote: string): string {
  if (!pos.isPlayable) return tokens.note.unplayable
  if (!pos.isMatch) return tokens.note.inactive
  const rootPc = pos.pitchClass
  // Check if this position is the root
  const isRoot = pos.intervalLabel === '1'
  return isRoot ? tokens.note.root : tokens.note.match
}

function getLabel(pos: FretPosition, displayMode: DisplayMode, noteSpelling: NoteSpelling, rootNote: string): string | null {
  if (!pos.isMatch || !pos.isPlayable) return null
  if (displayMode === 'notes') {
    const spelling = noteSpelling === 'auto' ? autoSpelling(rootNote) : noteSpelling
    return getNoteName(pos.pitchClass, spelling)
  }
  return pos.intervalLabel
}

export function Fretboard({ positions, displayMode, noteSpelling, rootNote }: FretboardProps) {
  if (positions.length === 0) return null

  const stringCount = positions.length
  const fretCount = positions[0].length - 1

  const svgWidth = STRING_PADDING_LEFT + (fretCount + 1) * FRET_WIDTH
  const svgHeight = FRET_LABEL_HEIGHT + stringCount * STRING_SPACING + 8

  return (
    <div className="overflow-x-auto">
      <svg
        width={svgWidth}
        height={svgHeight}
        style={{ background: tokens.fretboard.bg, borderRadius: 8 }}
        aria-label="Fretboard diagram"
      >
        {/* Fret number labels */}
        {Array.from({ length: fretCount + 1 }, (_, fret) => (
          <text
            key={`flabel-${fret}`}
            x={fretX(fret)}
            y={FRET_LABEL_HEIGHT - 4}
            textAnchor="middle"
            fontSize={10}
            fill="#6b7280"
          >
            {fret === 0 ? '○' : fret}
          </text>
        ))}

        {/* String lines */}
        {positions.map((_, si) => (
          <line
            key={`string-${si}`}
            x1={0}
            y1={stringY(si, stringCount)}
            x2={svgWidth}
            y2={stringY(si, stringCount)}
            stroke={tokens.fretboard.string}
            strokeWidth={si === stringCount - 1 ? 2.5 : 1.5}
          />
        ))}

        {/* Fret bars */}
        {Array.from({ length: fretCount + 1 }, (_, fret) => {
          const x = fret === 0
            ? STRING_PADDING_LEFT
            : STRING_PADDING_LEFT + fret * FRET_WIDTH
          return (
            <line
              key={`fret-${fret}`}
              x1={x}
              y1={FRET_LABEL_HEIGHT}
              x2={x}
              y2={svgHeight - 4}
              stroke={fret === 0 ? tokens.fretboard.nut : tokens.fretboard.fret}
              strokeWidth={fret === 0 ? 4 : 1.5}
            />
          )
        })}

        {/* Standard fret marker dots (3, 5, 7, 9, 12, 15, 17, 19, 21) */}
        {[3, 5, 7, 9, 12, 15, 17, 19, 21].filter(f => f <= fretCount).map(fret => {
          const x = STRING_PADDING_LEFT + (fret - 0.5) * FRET_WIDTH
          const midY = FRET_LABEL_HEIGHT + ((stringCount - 1) * STRING_SPACING) / 2 + STRING_SPACING / 2
          return fret === 12 ? (
            <g key={`marker-${fret}`}>
              <circle cx={x} cy={midY - 8} r={4} fill="#374151" />
              <circle cx={x} cy={midY + 8} r={4} fill="#374151" />
            </g>
          ) : (
            <circle key={`marker-${fret}`} cx={x} cy={midY} r={4} fill="#374151" />
          )
        })}

        {/* Note dots */}
        {positions.map((string, si) =>
          string.map((pos) => {
            const cx = fretX(pos.fret)
            const cy = stringY(si, stringCount)
            const fill = getDotFill(pos, rootNote)
            const label = getLabel(pos, displayMode, noteSpelling, rootNote)
            const showDot = pos.isMatch || (pos.isPlayable && !pos.isMatch)

            if (!showDot) return null

            const dotRadius = pos.isMatch ? DOT_RADIUS : DOT_RADIUS * 0.55

            return (
              <g key={`${si}-${pos.fret}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={dotRadius}
                  fill={fill}
                  stroke={pos.isMatch ? (pos.intervalLabel === '1' ? '#fbbf24' : '#2563eb') : 'none'}
                  strokeWidth={pos.isMatch ? 1.5 : 0}
                  aria-label={label ?? undefined}
                />
                {label && (
                  <text
                    x={cx}
                    y={cy + 4}
                    textAnchor="middle"
                    fontSize={label.length > 2 ? 8 : 10}
                    fontWeight="600"
                    fill={tokens.note.text}
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {label}
                  </text>
                )}
              </g>
            )
          })
        )}
      </svg>
    </div>
  )
}
