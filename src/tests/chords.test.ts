import { describe, it, expect } from 'vitest'
import { getPitchClassesFromFormula } from '../theory/fretboard'
import { getChord, getAllChords } from '../theory/chords'

// TC-014: Major chord pitch classes
describe('Major chord', () => {
  it('root G: pitch classes are G B D', () => {
    const chord = getChord('major')
    const pcs = getPitchClassesFromFormula('G', chord.semitones)
    expect(pcs).toEqual([7, 11, 2])
  })

  it('root C: pitch classes are C E G', () => {
    const pcs = getPitchClassesFromFormula('C', getChord('major').semitones)
    expect(pcs).toEqual([0, 4, 7])
  })
})

// TC-015: Dominant 7 chord pitch classes
describe('Dominant 7 chord', () => {
  it('root G: pitch classes are G B D F', () => {
    const chord = getChord('dominant7')
    const pcs = getPitchClassesFromFormula('G', chord.semitones)
    expect(pcs).toEqual([7, 11, 2, 5])
  })
})

// TC-016: Minor 7 chord pitch classes
describe('Minor 7 chord', () => {
  it('root D: pitch classes are D F A C', () => {
    const chord = getChord('minor7')
    const pcs = getPitchClassesFromFormula('D', chord.semitones)
    expect(pcs).toEqual([2, 5, 9, 0])
  })
})

// TC-017: Diminished 7 chord pitch classes
describe('Diminished 7 chord', () => {
  it('root B: pitch classes are B D F Ab', () => {
    const chord = getChord('diminished7')
    const pcs = getPitchClassesFromFormula('B', chord.semitones)
    // B=11, D=2, F=5, Ab=8
    expect(pcs).toEqual([11, 2, 5, 8])
  })

  it('is a stack of minor thirds (symmetric)', () => {
    expect(getChord('diminished7').semitones).toEqual([0, 3, 6, 9])
  })
})

// Additional chord registry tests
describe('Chord registry', () => {
  it('contains exactly 11 chords', () => {
    expect(getAllChords()).toHaveLength(11)
  })

  it('throws on unknown chord id', () => {
    expect(() => getChord('nonexistent')).toThrow('Unknown chord: "nonexistent"')
  })

  it('augmented chord has semitones [0,4,8]', () => {
    expect(getChord('augmented').semitones).toEqual([0, 4, 8])
  })

  it('half-diminished (m7b5) has semitones [0,3,6,10]', () => {
    expect(getChord('half-diminished').semitones).toEqual([0, 3, 6, 10])
  })

  it('sus2 has semitones [0,2,7]', () => {
    expect(getChord('sus2').semitones).toEqual([0, 2, 7])
  })

  it('sus4 has semitones [0,5,7]', () => {
    expect(getChord('sus4').semitones).toEqual([0, 5, 7])
  })

  it('major7 has semitones [0,4,7,11]', () => {
    expect(getChord('major7').semitones).toEqual([0, 4, 7, 11])
  })
})
