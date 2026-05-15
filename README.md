# String Theory Lab

A music theory workbench for fretted stringed instruments. Explore scales, modes, chords, and keys directly on an interactive fretboard — no staff notation required.

**[Live demo →](https://eldamarth.github.io/string-theory-lab/)**

---

## Features

**Fretboard** — Visualise any scale, mode, chord, or just the root note overlaid on the fretboard. Switch between note names, interval labels, or pitch classes.

**Scale Explorer** — Browse scales (major, natural minor, harmonic minor, melodic minor, pentatonic major/minor) with interval formulas and note names highlighted on the fretboard.

**Mode Explorer** — All seven diatonic modes with characteristic tones and a plain-language description of each mode's sound and typical use.

**Chord Explorer** — Triads and seventh chords (major, minor, dominant, diminished, augmented, suspended, half-diminished) mapped across the neck.

**Circle of Fifths** — Interactive SVG circle. Click any key to see its relative minor and full diatonic chord set (triads, seventh chords, primary chords, ii–V–I).

---

## Instruments & Tunings

| Instrument | Tunings |
|---|---|
| Guitar | Standard, Drop D, Open G, Open D, DADGAD, Half Step Down, Full Step Down |
| Bass (4-string) | Standard, Drop D |
| Bass (5-string) | Standard |
| Mandolin | Standard |
| Greek Bouzouki | Standard (GDA) |
| Banjo (5-string) | Open G (with 5th-string drone visual) |
| Banjo (tenor) | Standard |

Custom tunings can be entered manually. Capo position is supported and shows the sounding key.

---

## Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand) for state
- [Vitest](https://vitest.dev/) for tests (100% coverage enforced on the theory engine)
- SVG fretboard rendering — no canvas, no third-party charting library

---

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/string-theory-lab/`.

```bash
npm test              # run tests
npm run test:coverage # coverage report (must stay at 100% on src/theory/)
npm run build         # production build → dist/
```

---

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that runs tests, builds, and deploys to GitHub Pages automatically.
