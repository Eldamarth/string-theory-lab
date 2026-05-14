import { describe, it, expect } from 'vitest'
import { noteToPitchClass, getNoteName, autoSpelling } from '../theory/notes'

// TC-001: Note name to pitch class
describe('noteToPitchClass', () => {
  it('maps natural notes correctly', () => {
    expect(noteToPitchClass('C')).toBe(0)
    expect(noteToPitchClass('D')).toBe(2)
    expect(noteToPitchClass('E')).toBe(4)
    expect(noteToPitchClass('F')).toBe(5)
    expect(noteToPitchClass('G')).toBe(7)
    expect(noteToPitchClass('A')).toBe(9)
    expect(noteToPitchClass('B')).toBe(11)
  })

  it('maps sharps correctly', () => {
    expect(noteToPitchClass('C#')).toBe(1)
    expect(noteToPitchClass('F#')).toBe(6)
    expect(noteToPitchClass('A#')).toBe(10)
  })

  it('maps flats correctly', () => {
    expect(noteToPitchClass('Db')).toBe(1)
    expect(noteToPitchClass('Eb')).toBe(3)
    expect(noteToPitchClass('Gb')).toBe(6)
    expect(noteToPitchClass('Ab')).toBe(8)
    expect(noteToPitchClass('Bb')).toBe(10)
  })

  it('treats enharmonic equivalents as equal', () => {
    expect(noteToPitchClass('C#')).toBe(noteToPitchClass('Db'))
    expect(noteToPitchClass('F#')).toBe(noteToPitchClass('Gb'))
    expect(noteToPitchClass('A#')).toBe(noteToPitchClass('Bb'))
  })

  it('throws on unknown note name', () => {
    expect(() => noteToPitchClass('X')).toThrow('Unknown note name: "X"')
    expect(() => noteToPitchClass('H')).toThrow()
    expect(() => noteToPitchClass('')).toThrow()
  })
})

// TC-002: Pitch class to note name (sharps)
describe('getNoteName - sharps', () => {
  it('returns sharp names', () => {
    expect(getNoteName(0, 'sharp')).toBe('C')
    expect(getNoteName(1, 'sharp')).toBe('C#')
    expect(getNoteName(2, 'sharp')).toBe('D')
    expect(getNoteName(6, 'sharp')).toBe('F#')
    expect(getNoteName(10, 'sharp')).toBe('A#')
    expect(getNoteName(11, 'sharp')).toBe('B')
  })
})

// TC-003: Pitch class to note name (flats)
describe('getNoteName - flats', () => {
  it('returns flat names', () => {
    expect(getNoteName(1, 'flat')).toBe('Db')
    expect(getNoteName(6, 'flat')).toBe('Gb')
    expect(getNoteName(10, 'flat')).toBe('Bb')
    expect(getNoteName(3, 'flat')).toBe('Eb')
    expect(getNoteName(8, 'flat')).toBe('Ab')
  })
})

// TC-004: Auto spelling by key
describe('autoSpelling', () => {
  it('returns sharp for sharp keys', () => {
    expect(autoSpelling('G')).toBe('sharp')
    expect(autoSpelling('D')).toBe('sharp')
    expect(autoSpelling('A')).toBe('sharp')
    expect(autoSpelling('E')).toBe('sharp')
    expect(autoSpelling('B')).toBe('sharp')
    expect(autoSpelling('F#')).toBe('sharp')
    expect(autoSpelling('C#')).toBe('sharp')
  })

  it('returns flat for flat keys', () => {
    expect(autoSpelling('F')).toBe('flat')
    expect(autoSpelling('Bb')).toBe('flat')
    expect(autoSpelling('Eb')).toBe('flat')
    expect(autoSpelling('Ab')).toBe('flat')
    expect(autoSpelling('Db')).toBe('flat')
    expect(autoSpelling('Gb')).toBe('flat')
  })

  it('returns sharp for C (default)', () => {
    expect(autoSpelling('C')).toBe('sharp')
  })
})
