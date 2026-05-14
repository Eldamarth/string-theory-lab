import { describe, it, expect } from 'vitest'
import { semitoneToIntervalLabel, intervalFromRoot } from '../theory/intervals'

// TC-018: Interval label for semitone distance
describe('semitoneToIntervalLabel', () => {
  it('returns correct labels for all 12 semitones', () => {
    expect(semitoneToIntervalLabel(0)).toBe('1')
    expect(semitoneToIntervalLabel(1)).toBe('b2')
    expect(semitoneToIntervalLabel(2)).toBe('2')
    expect(semitoneToIntervalLabel(3)).toBe('b3')
    expect(semitoneToIntervalLabel(4)).toBe('3')
    expect(semitoneToIntervalLabel(5)).toBe('4')
    expect(semitoneToIntervalLabel(6)).toBe('#4/b5')
    expect(semitoneToIntervalLabel(7)).toBe('5')
    expect(semitoneToIntervalLabel(8)).toBe('b6')
    expect(semitoneToIntervalLabel(9)).toBe('6')
    expect(semitoneToIntervalLabel(10)).toBe('b7')
    expect(semitoneToIntervalLabel(11)).toBe('7')
  })

  it('wraps values >= 12 correctly', () => {
    expect(semitoneToIntervalLabel(12)).toBe('1')
    expect(semitoneToIntervalLabel(14)).toBe('2')
  })

  it('handles negative values correctly', () => {
    // -1 mod 12 = 11 → '7' (one semitone below root = major 7th above)
    expect(semitoneToIntervalLabel(-1)).toBe('7')
    // -4 mod 12 = 8 → 'b6'
    expect(semitoneToIntervalLabel(-4)).toBe('b6')
    // -5 mod 12 = 7 → '5'
    expect(semitoneToIntervalLabel(-5)).toBe('5')
  })
})

// TC-019: Interval from root pitch class
describe('intervalFromRoot', () => {
  it('computes interval from G (7) to B (11) as 3', () => {
    expect(intervalFromRoot(7, 11)).toBe('3')
  })

  it('computes interval from G (7) to F (5) as b7', () => {
    expect(intervalFromRoot(7, 5)).toBe('b7')
  })

  it('computes interval from root to itself as 1', () => {
    expect(intervalFromRoot(0, 0)).toBe('1')
    expect(intervalFromRoot(7, 7)).toBe('1')
  })

  it('wraps correctly across the octave', () => {
    // C(0) to B(11) = 7th
    expect(intervalFromRoot(0, 11)).toBe('7')
    // E(4) to D(2) = wraps: (2 - 4 + 12) = 10 = b7
    expect(intervalFromRoot(4, 2)).toBe('b7')
  })
})
