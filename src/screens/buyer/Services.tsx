import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal, Star, ChevronRight } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import BottomTabBar from '../../components/layout/BottomTabBar'
import { services } from '../../data/seed'
import { fmt } from '../../store/useStore'

const categoryChips = ['All', 'Design', 'Beauty', 'Education', 'Tech', 'Food', 'Laundry']

export default function Services() {
  const navigate = useNavigate()
  const [chip, setChip] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = services.filter(s =>
    query ? s.title.toLowerCase().includes(query.toLowerCase()) : true
  )

  return (
    <div className="flex flex-col min-h-screen bg-bg pb-16">
      <Navbar />

      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-4 pt-5 pb-3">
          <h1 className="text-[22px] font-extrabold text-ink mb-1">Services</h1>
          <p className="text-sm text-mute">Find or offer professional services on campus and beyond.</p>
        </div>

        {/* Search */}
        <div className="px-4 mb-3 flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-white border border-line rounded-lg px-3 h-11">
            <Search size={15} className="text-mute shrink-0" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search services..."
              className="flex-1 text-sm text-ink placeholder:text-mute outline-none bg-transparent"
            />
          </div>
          <button className="w-11 h-11 bg-white border border-line rounded-lg flex items-center justify-center shrink-0">
            <SlidersHorizontal size={16} className="text-mute" />
          </button>
        </div>

        {/* Category chips */}
        <div className="px-4 mb-4 flex gap-2 overflow-x-auto no-scrollbar">
          {categoryChips.map(c => (
            <button
              key={c}
              onClick={() => setChip(c)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                chip === c ? 'bg-accent text-white border-accent' : 'bg-white text-ink border-line'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Service list */}
        <div className="px-4 flex flex-col gap-3">
          {filtered.map(s => (
            <button
              key={s.id}
              onClick={() => navigate(`/service/${s.id}`)}
              className="bg-white border border-line rounded-lg flex items-center gap-3 p-3 text-left"
            >
              {/* Image */}
              <div className="w-16 h-16 rounded-lg flex items-center justify-center text-[36px] shrink-0" style={{ backgroundColor: s.tileColor }}>
                {s.emoji}
              </div>
              <div className="flex-1">
                <span className="text-[9px] font-bold text-accent bg-blue-soft px-2 py-[2px] rounded-full">
                  {s.title.includes('hair') || s.title.includes('Braid') ? 'Beauty' : s.title.includes('design') ? 'Design' : 'Service'}
                </span>
                <p className="text-[13px] font-bold text-ink mt-[3px] leading-tight">{s.title}</p>
                <p className="text-[11px] text-mute leading-snug line-clamp-1">{s.packages[0]?.description}</p>
                <p className="text-[13px] font-extrabold text-ink mt-1">{fmt(s.fromPrice)}+</p>
                <div className="flex items-center gap-1 mt-[2px]">
                  <Star size={10} fill="#F59E0B" className="text-gold shrink-0" />
                  <span className="text-[10px] text-mute">{s.rating} ({s.reviewCount}) · by {s.seller}</span>
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
