import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal, ChevronRight, Users } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import BottomTabBar from '../../components/layout/BottomTabBar'
import { communities } from '../../data/seed'

const filters = ['All', 'Universities', 'Cities', 'Global']

export default function Communities() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = communities.filter(c =>
    query ? c.name.toLowerCase().includes(query.toLowerCase()) : true
  )

  return (
    <div className="flex flex-col min-h-screen bg-bg pb-16">
      <Navbar />

      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-4 pt-5 pb-3">
          <h1 className="text-[22px] font-extrabold text-ink mb-1">Communities</h1>
          <p className="text-sm text-mute">Join your school or university community</p>
        </div>

        {/* Search */}
        <div className="px-4 mb-3 flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-white border border-line rounded-lg px-3 h-11">
            <Search size={15} className="text-mute shrink-0" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search communities..."
              className="flex-1 text-sm text-ink placeholder:text-mute outline-none bg-transparent"
            />
          </div>
          <button className="w-11 h-11 bg-white border border-line rounded-lg flex items-center justify-center shrink-0">
            <SlidersHorizontal size={16} className="text-mute" />
          </button>
        </div>

        {/* Filter chips */}
        <div className="px-4 mb-4 flex gap-2 overflow-x-auto no-scrollbar">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                filter === f
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-ink border-line'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Community list */}
        <div className="px-4 flex flex-col gap-3 pb-4">
          {filtered.map(c => (
            <button
              key={c.id}
              className="bg-white border border-line rounded-lg flex items-center gap-3 p-3 text-left"
              onClick={() => {}}
            >
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center text-white font-extrabold text-xl shrink-0"
                style={{ backgroundColor: c.color }}
              >
                {c.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-bold text-ink leading-tight">{c.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Users size={11} className="text-mute" />
                  <span className="text-xs text-mute">{c.type} · {c.members} members</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-mute shrink-0" />
            </button>
          ))}
        </div>
      </div>

      <BottomTabBar />
    </div>
  )
}
