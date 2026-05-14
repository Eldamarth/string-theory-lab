import React from 'react'
import { useAppStore, TabId } from '../../state/store'

const TABS: { id: TabId; label: string }[] = [
  { id: 'fretboard', label: 'Fretboard' },
  { id: 'scale',     label: 'Scale' },
  { id: 'mode',      label: 'Mode' },
  { id: 'chord',     label: 'Chord' },
  { id: 'circle',    label: 'Circle of 5ths' },
]

export function TabNav() {
  const { activeTab, setActiveTab } = useAppStore()

  return (
    <div className="flex bg-gray-900 border-b border-gray-700">
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-5 py-2.5 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'text-amber-400 border-b-2 border-amber-400'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
