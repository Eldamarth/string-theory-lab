import { describe, it, expect } from 'vitest'
import { getInstrument, getAllInstruments } from '../theory/instruments'
import { getTuning, getTuningsForInstrument, capoTranspose } from '../theory/tunings'

describe('Instrument registry', () => {
  it('returns correct instrument by id', () => {
    const guitar = getInstrument('guitar')
    expect(guitar.name).toBe('Guitar')
    expect(guitar.defaultFretCount).toBe(22)
    expect(guitar.supportsCapo).toBe(true)
    expect(guitar.defaultTuningId).toBe('guitar-standard')
  })

  it('returns all 7 instruments', () => {
    expect(getAllInstruments()).toHaveLength(7)
  })

  it('includes banjo-5string with drone string note', () => {
    const banjo = getInstrument('banjo-5string')
    expect(banjo.supportsCapo).toBe(true)
  })

  it('throws on unknown instrument id', () => {
    expect(() => getInstrument('ukulele')).toThrow('Unknown instrument: "ukulele"')
  })

  it('mandolin supportsCourses is true', () => {
    expect(getInstrument('mandolin').supportsCourses).toBe(true)
  })

  it('guitar supportsCourses is false', () => {
    expect(getInstrument('guitar').supportsCourses).toBe(false)
  })
})

describe('Tuning registry', () => {
  it('throws on unknown tuning id', () => {
    expect(() => getTuning('ukulele-standard')).toThrow('Unknown tuning: "ukulele-standard"')
  })

  it('getTuningsForInstrument returns only guitar tunings', () => {
    const tunings = getTuningsForInstrument('guitar')
    expect(tunings.length).toBeGreaterThan(0)
    tunings.forEach(t => expect(t.instrumentId).toBe('guitar'))
  })

  it('getTuningsForInstrument returns 5 guitar tunings', () => {
    expect(getTuningsForInstrument('guitar')).toHaveLength(5)
  })

  it('getTuningsForInstrument returns 3 banjo-5string tunings', () => {
    expect(getTuningsForInstrument('banjo-5string')).toHaveLength(3)
  })

  it('getTuningsForInstrument returns empty array for unknown instrument', () => {
    expect(getTuningsForInstrument('ukulele')).toHaveLength(0)
  })

  it('banjo open G tuning has specialStrings', () => {
    const t = getTuning('banjo-5string-open-g')
    expect(t.specialStrings).toBeDefined()
    expect(t.specialStrings![0].startsAtFret).toBe(5)
    expect(t.specialStrings![0].isDrone).toBe(true)
  })
})

// TC-021: capoTranspose
describe('capoTranspose', () => {
  it('G + capo 2 = A (9)', () => {
    expect(capoTranspose('G', 2)).toBe(9)
  })

  it('G + capo 5 = C (0)', () => {
    expect(capoTranspose('G', 5)).toBe(0)
  })

  it('capo 0 returns the original pitch class', () => {
    expect(capoTranspose('G', 0)).toBe(7)
    expect(capoTranspose('C', 0)).toBe(0)
    expect(capoTranspose('E', 0)).toBe(4)
  })

  it('wraps correctly at the octave boundary', () => {
    // B (11) + capo 2 = C# (1)
    expect(capoTranspose('B', 2)).toBe(1)
  })
})
