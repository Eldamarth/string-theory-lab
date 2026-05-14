import { describe, it, expect } from 'vitest'
import { generateFretboard, getPitchClassesFromFormula, markMatchingFrets } from '../theory/fretboard'
import { getTuning } from '../theory/tunings'
import { noteToPitchClass } from '../theory/notes'

// TC-005: Guitar standard tuning fretboard generation
describe('generateFretboard - guitar standard', () => {
  const tuning = getTuning('guitar-standard')
  const fretboard = generateFretboard(tuning, 12)

  it('generates correct string count', () => {
    expect(fretboard).toHaveLength(6)
  })

  it('generates fret 0 through 12 (13 positions)', () => {
    expect(fretboard[0]).toHaveLength(13)
  })

  it('string 0 (low E): fret 0 = E (4)', () => {
    expect(fretboard[0][0].pitchClass).toBe(4)
    expect(fretboard[0][0].noteSharp).toBe('E')
  })

  it('string 0 (low E): fret 1 = F (5)', () => {
    expect(fretboard[0][1].pitchClass).toBe(5)
    expect(fretboard[0][1].noteSharp).toBe('F')
  })

  it('string 0 (low E): fret 5 = A (9)', () => {
    expect(fretboard[0][5].pitchClass).toBe(9)
  })

  it('string 0 (low E): fret 12 = E (4, octave)', () => {
    expect(fretboard[0][12].pitchClass).toBe(4)
  })

  it('string 1 (A): fret 0 = A (9)', () => {
    expect(fretboard[1][0].pitchClass).toBe(9)
  })

  it('string 1 (A): fret 2 = B (11)', () => {
    expect(fretboard[1][2].pitchClass).toBe(11)
  })

  it('string 1 (A): fret 12 = A (9, octave)', () => {
    expect(fretboard[1][12].pitchClass).toBe(9)
  })

  it('string 4 (B): fret 0 = B (11)', () => {
    expect(fretboard[4][0].pitchClass).toBe(11)
  })

  it('string 4 (B): fret 1 = C (0)', () => {
    expect(fretboard[4][1].pitchClass).toBe(0)
  })

  it('string 4 (B): fret 12 = B (11, octave)', () => {
    expect(fretboard[4][12].pitchClass).toBe(11)
  })

  it('all positions are playable on standard guitar', () => {
    fretboard.forEach(string => string.forEach(pos => {
      expect(pos.isPlayable).toBe(true)
    }))
  })
})

// TC-006: DADGAD tuning fretboard generation
describe('generateFretboard - DADGAD', () => {
  const tuning = getTuning('guitar-dadgad')
  const fretboard = generateFretboard(tuning, 12)

  it('string 0 (low D): fret 0 = D (2)', () => {
    expect(fretboard[0][0].pitchClass).toBe(2)
  })

  it('string 0 (low D): fret 2 = E (4)', () => {
    expect(fretboard[0][2].pitchClass).toBe(4)
  })

  it('string 0 (low D): fret 7 = A (9)', () => {
    expect(fretboard[0][7].pitchClass).toBe(9)
  })

  it('string 5 (high D): fret 0 = D (2)', () => {
    expect(fretboard[5][0].pitchClass).toBe(2)
  })

  it('string 5 (high D): fret 12 = D (2, octave)', () => {
    expect(fretboard[5][12].pitchClass).toBe(2)
  })
})

// TC-007: Mandolin GDAE tuning fretboard generation
describe('generateFretboard - mandolin standard', () => {
  const tuning = getTuning('mandolin-standard')
  const fretboard = generateFretboard(tuning, 12)

  it('generates 4 strings', () => {
    expect(fretboard).toHaveLength(4)
  })

  it('string 0 (G): fret 0 = G (7)', () => {
    expect(fretboard[0][0].pitchClass).toBe(7)
  })

  it('string 0 (G): fret 2 = A (9)', () => {
    expect(fretboard[0][2].pitchClass).toBe(9)
  })

  it('string 3 (high E): fret 0 = E (4)', () => {
    expect(fretboard[3][0].pitchClass).toBe(4)
  })

  it('string 3 (high E): fret 12 = E (4, octave)', () => {
    expect(fretboard[3][12].pitchClass).toBe(4)
  })
})

// TC-008: Banjo 5-string open G fretboard generation (isPlayable)
describe('generateFretboard - banjo 5-string open G', () => {
  const tuning = getTuning('banjo-5string-open-g')
  const fretboard = generateFretboard(tuning, 22)

  it('generates 5 strings', () => {
    expect(fretboard).toHaveLength(5)
  })

  it('string 0 (low D): fret 0 is playable', () => {
    expect(fretboard[0][0].isPlayable).toBe(true)
    expect(fretboard[0][0].pitchClass).toBe(2)
  })

  it('string 0 (low D): fret 12 = D (octave)', () => {
    expect(fretboard[0][12].pitchClass).toBe(2)
  })

  it('string 4 (5th/drone): frets 0–4 are NOT playable', () => {
    expect(fretboard[4][0].isPlayable).toBe(false)
    expect(fretboard[4][1].isPlayable).toBe(false)
    expect(fretboard[4][2].isPlayable).toBe(false)
    expect(fretboard[4][3].isPlayable).toBe(false)
    expect(fretboard[4][4].isPlayable).toBe(false)
  })

  it('string 4 (5th/drone): fret 5 is playable and = G (7)', () => {
    expect(fretboard[4][5].isPlayable).toBe(true)
    expect(fretboard[4][5].pitchClass).toBe(7)
  })

  it('string 4 (5th/drone): fret 7 = A (9)', () => {
    expect(fretboard[4][7].isPlayable).toBe(true)
    expect(fretboard[4][7].pitchClass).toBe(9)
  })

  it('string 4 (5th/drone): fret 17 = G (7, octave+)', () => {
    expect(fretboard[4][17].pitchClass).toBe(7)
  })
})

// TC-020: markMatchingFrets correctness
describe('markMatchingFrets', () => {
  const tuning = getTuning('guitar-standard')
  const fretboard = generateFretboard(tuning, 12)
  // G major chord: G(7) B(11) D(2)
  const gMajorPCs = [7, 11, 2]

  it('marks G on string 0 fret 3 as a match', () => {
    const marked = markMatchingFrets(fretboard, gMajorPCs)
    expect(marked[0][3].isMatch).toBe(true)   // G on low E string
  })

  it('marks B on string 0 fret 7 as a match', () => {
    const marked = markMatchingFrets(fretboard, gMajorPCs)
    expect(marked[0][7].isMatch).toBe(true)
  })

  it('marks D on string 0 fret 10 as a match', () => {
    const marked = markMatchingFrets(fretboard, gMajorPCs)
    expect(marked[0][10].isMatch).toBe(true)
  })

  it('does not mark E (open) on string 0 as a match', () => {
    const marked = markMatchingFrets(fretboard, gMajorPCs)
    expect(marked[0][0].isMatch).toBe(false)
  })

  it('marks B (open) on string 4 as a match', () => {
    const marked = markMatchingFrets(fretboard, gMajorPCs)
    expect(marked[4][0].isMatch).toBe(true)
  })

  it('sets intervalLabel when root is provided', () => {
    const marked = markMatchingFrets(fretboard, gMajorPCs, 'G')
    const gPos = marked[0][3]   // G on low E string
    expect(gPos.intervalLabel).toBe('1')
    const bPos = marked[4][0]   // B on B string
    expect(bPos.intervalLabel).toBe('3')
  })

  it('intervalLabel is null when root is not provided', () => {
    const marked = markMatchingFrets(fretboard, gMajorPCs)
    expect(marked[0][3].intervalLabel).toBeNull()
  })

  it('never marks non-playable banjo positions as a match', () => {
    const banjoTuning = getTuning('banjo-5string-open-g')
    const banjoFretboard = generateFretboard(banjoTuning, 22)
    const allPCs = [0,1,2,3,4,5,6,7,8,9,10,11]
    const marked = markMatchingFrets(banjoFretboard, allPCs, 'G')
    // Frets 0-4 on string 4 must never be isMatch = true
    for (let fret = 0; fret <= 4; fret++) {
      expect(marked[4][fret].isMatch).toBe(false)
    }
  })
})

// TC-021: Capo key calculation (via getPitchClassesFromFormula + capoTranspose)
describe('capoTranspose', () => {
  it('is implicitly covered by getPitchClassesFromFormula with offset', () => {
    // capoTranspose logic: (noteToPitchClass(root) + capo) % 12
    const rootG = noteToPitchClass('G')  // 7
    expect((rootG + 2) % 12).toBe(9)  // capo 2, G shape -> A (9)
    expect((rootG + 5) % 12).toBe(0)  // capo 5, G shape -> C (0)
    expect((rootG + 0) % 12).toBe(7)  // capo 0 -> same key
  })
})

describe('capoTranspose function', () => {
  it('correctly transposes G with capo 2 to A', async () => {
    const { capoTranspose } = await import('../theory/tunings')
    expect(capoTranspose('G', 2)).toBe(9)
  })

  it('correctly transposes G with capo 5 to C', async () => {
    const { capoTranspose } = await import('../theory/tunings')
    expect(capoTranspose('G', 5)).toBe(0)
  })

  it('capo 0 returns the same pitch class', async () => {
    const { capoTranspose } = await import('../theory/tunings')
    expect(capoTranspose('G', 0)).toBe(7)
    expect(capoTranspose('C', 0)).toBe(0)
    expect(capoTranspose('E', 0)).toBe(4)
  })
})
