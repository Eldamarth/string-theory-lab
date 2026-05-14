import { describe, it, expect } from 'vitest'
import { getPitchClassesFromFormula } from '../theory/fretboard'
import { getScale, getAllScales, getModes, getScalesOnly } from '../theory/scales'

// TC-009: Major scale pitch classes
describe('Major scale', () => {
  it('root C: pitch classes are C D E F G A B', () => {
    const scale = getScale('major')
    const pcs = getPitchClassesFromFormula('C', scale.semitones)
    expect(pcs).toEqual([0, 2, 4, 5, 7, 9, 11])
  })

  it('root G: pitch classes include F# (6)', () => {
    const scale = getScale('major')
    const pcs = getPitchClassesFromFormula('G', scale.semitones)
    expect(pcs).toContain(6)  // F#
    expect(pcs).toEqual([7, 9, 11, 0, 2, 4, 6])
  })
})

// TC-010: Minor pentatonic pitch classes
describe('Minor pentatonic', () => {
  it('root A: pitch classes are A C D E G', () => {
    const scale = getScale('minor-pentatonic')
    const pcs = getPitchClassesFromFormula('A', scale.semitones)
    expect(pcs).toEqual([9, 0, 2, 4, 7])
  })

  it('has 5 semitones', () => {
    expect(getScale('minor-pentatonic').semitones).toHaveLength(5)
  })
})

// TC-011: Dorian mode pitch classes
describe('Dorian mode', () => {
  it('root D: pitch classes are D E F G A B C', () => {
    const mode = getScale('dorian')
    const pcs = getPitchClassesFromFormula('D', mode.semitones)
    expect(pcs).toEqual([2, 4, 5, 7, 9, 11, 0])
  })

  it('characteristic tone is the natural 6', () => {
    expect(getScale('dorian').characteristicTones).toContain('6')
  })
})

// TC-012: Mixolydian pitch classes
describe('Mixolydian mode', () => {
  it('root G: pitch classes are G A B C D E F', () => {
    const mode = getScale('mixolydian')
    const pcs = getPitchClassesFromFormula('G', mode.semitones)
    expect(pcs).toEqual([7, 9, 11, 0, 2, 4, 5])
  })

  it('characteristic tone is b7', () => {
    expect(getScale('mixolydian').characteristicTones).toContain('b7')
  })
})

// TC-013: Blues scale pitch classes
describe('Blues scale', () => {
  it('root E: pitch classes are E G A Bb B D', () => {
    const scale = getScale('blues')
    const pcs = getPitchClassesFromFormula('E', scale.semitones)
    // E=4, G=7, A=9, Bb=10, B=11, D=2
    expect(pcs).toEqual([4, 7, 9, 10, 11, 2])
  })

  it('has 6 notes', () => {
    expect(getScale('blues').semitones).toHaveLength(6)
  })
})

// Additional scale registry tests
describe('Scale registry', () => {
  it('contains exactly 5 scales and 7 modes (12 total)', () => {
    expect(getScalesOnly()).toHaveLength(5)
    expect(getModes()).toHaveLength(7)
    expect(getAllScales()).toHaveLength(12)
  })

  it('all 7 modes have modeNumber 1–7', () => {
    const modes = getModes()
    const numbers = modes.map(m => m.modeNumber).sort()
    expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('throws on unknown scale id', () => {
    expect(() => getScale('nonexistent')).toThrow('Unknown scale/mode: "nonexistent"')
  })

  it('Phrygian has b2 as characteristic tone', () => {
    expect(getScale('phrygian').characteristicTones).toContain('b2')
  })

  it('Lydian has #4 as characteristic tone', () => {
    expect(getScale('lydian').characteristicTones).toContain('#4')
  })

  it('Locrian has b2 and b5 as characteristic tones', () => {
    const locrian = getScale('locrian')
    expect(locrian.characteristicTones).toContain('b2')
    expect(locrian.characteristicTones).toContain('b5')
  })
})
