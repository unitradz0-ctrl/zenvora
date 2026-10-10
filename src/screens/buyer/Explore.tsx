import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import { categories } from '../../data/seed'
import BottomTabBar from '../../components/layout/BottomTabBar'

const serviceChips = [
  'Graphic design', 'Photography', 'Videography', 'Tutoring', 'Hair styling',
  'Makeup', 'Laundry', 'Tech repairs', 'Printing', 'Writing and editing',
  'Event services', 'Delivery services',
]

export default function Explore() {
  const navigate = useNavigate()
  const [activeChip, setActiveChip] = useState<string | null>('Graphic design')
  const [query, setQuery] = useState('')

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-nav-gradient px-4 pt-12 pb-4">
        <h1 className="text-white text-[20px] font-extrabold mb-3">Explore</h1>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-white/15 border border-white/20 rounded-lg px-3 h-10">
            <Search size={15} className="text-white/60 shrink-0" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && navigate('/results', { state: { query } })}
              placeholder="Search products and services"
              className="flex-1 text-sm text-white placeholder:text-white/50 outline-none bg-transparent"
            />
          </div>
          <button
            onClick={() => navigate('/filters')}
            className="w-10 h-10 bg-white/15 border border-white/20 rounded-lg flex items-center justify-center shrink-0"
          >
            <SlidersHorizontal size={16} className="text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        {/* Products section */}
        <div className="px-4 pt-5 mb-5">
          <h2 className="text-[15px] font-extrabold text-ink mb-3">Products</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => navigate('/results', { state: { category: cat.name } })}
                className="bg-white border border-line rounded-lg p-4 flex flex-col items-start gap-2 text-left"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-[26px]"
                  style={{ backgroundColor: cat.tileColor }}
                >
                  {cat.emoji}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-ink">{cat.name}</p>
                  <p className="text-xs text-mute">{cat.count.toLocaleString()} listings</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Services section */}
        <div className="px-4 mb-5">
          <h2 className="text-[15px] font-extrabold text-ink mb-3">Student services</h2>
          <div className="flex flex-wrap gap-2">
            {serviceChips.map(chip => (
              <button
                key={chip}
                onClick={() => {
                  setActiveChip(chip === activeChip ? null : chip)
                  navigate('/results', { state: { query: chip } })
                }}
                className={`px-3 py-[6px] rounded-full text-sm font-semibold border transition-all ${
                  activeChip === chip
                    ? 'bg-accent text-white border-accent'
                    : 'bg-white text-ink border-line'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomTabBar />
    </div>
  )
}
