import { create } from 'zustand'
import { getInstrument } from '../../theory/instruments'

export type TabId = 'fretboard' | 'scale' | 'mode' | 'chord' | 'circle'
export type DisplayMode = 'notes' | 'intervals' | 'degrees'
export type NoteSpelling = 'sharp' | 'flat' | 'auto'
export type OverlayType = 'all' | 'scale' | 'mode' | 'chord' | 'root'

interface AppState {
  instrumentId: string
  tuningId: string
  customTuning: string[] | null
  fretCount: number
  rootNote: string
  capoPosition: number
  activeTab: TabId
  displayMode: DisplayMode
  noteSpelling: NoteSpelling
  overlayType: OverlayType
  selectedScaleId: string
  selectedChordId: string

  setInstrument: (id: string) => void
  setTuning: (id: string) => void
  setCustomTuning: (notes: string[]) => void
  clearCustomTuning: () => void
  setFretCount: (n: number) => void
  setRootNote: (note: string) => void
  setCapoPosition: (n: number) => void
  setActiveTab: (tab: TabId) => void
  setDisplayMode: (mode: DisplayMode) => void
  setNoteSpelling: (spelling: NoteSpelling) => void
  setOverlayType: (type: OverlayType) => void
  setSelectedScale: (id: string) => void
  setSelectedChord: (id: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  instrumentId: 'guitar',
  tuningId: 'guitar-standard',
  customTuning: null,
  fretCount: 22,
  rootNote: 'C',
  capoPosition: 0,
  activeTab: 'fretboard',
  displayMode: 'notes',
  noteSpelling: 'auto',
  overlayType: 'all',
  selectedScaleId: 'major',
  selectedChordId: 'major',

  setInstrument: (id) => set(() => {
    const inst = getInstrument(id)
    return {
      instrumentId: id,
      tuningId: inst.defaultTuningId,
      customTuning: null,
      fretCount: inst.defaultFretCount,
    }
  }),
  setTuning: (id) => set({ tuningId: id, customTuning: null }),
  setCustomTuning: (notes) => set({ customTuning: notes }),
  clearCustomTuning: () => set({ customTuning: null }),
  setFretCount: (n) => set({ fretCount: n }),
  setRootNote: (note) => set({ rootNote: note }),
  setCapoPosition: (n) => set({ capoPosition: n }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setDisplayMode: (mode) => set({ displayMode: mode }),
  setNoteSpelling: (spelling) => set({ noteSpelling: spelling }),
  setOverlayType: (type) => set({ overlayType: type }),
  setSelectedScale: (id) => set({ selectedScaleId: id }),
  setSelectedChord: (id) => set({ selectedChordId: id }),
}))
