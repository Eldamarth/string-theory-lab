import React from 'react'
import { useAppStore } from './state/store'
import { GlobalControls } from './components/GlobalControls/GlobalControls'
import { TabNav } from './components/TabNav/TabNav'
import { FretboardView } from './components/FretboardView/FretboardView'
import { ScaleExplorer } from './components/ScaleExplorer/ScaleExplorer'
import { ModeExplorer } from './components/ModeExplorer/ModeExplorer'
import { ChordExplorer } from './components/ChordExplorer/ChordExplorer'
import { CircleOfFifths } from './components/CircleOfFifths/CircleOfFifths'

export default function App() {
  const activeTab = useAppStore(s => s.activeTab)

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <header className="bg-gray-900 border-b border-gray-700 px-4 py-2">
        <h1 className="text-amber-400 font-bold text-lg tracking-tight">String Theory Lab</h1>
      </header>
      <GlobalControls />
      <TabNav />
      <main className="flex-1 p-4 overflow-auto">
        {activeTab === 'fretboard' && <FretboardView />}
        {activeTab === 'scale'     && <ScaleExplorer />}
        {activeTab === 'mode'      && <ModeExplorer />}
        {activeTab === 'chord'     && <ChordExplorer />}
        {activeTab === 'circle'    && <CircleOfFifths />}
      </main>
    </div>
  )
}
