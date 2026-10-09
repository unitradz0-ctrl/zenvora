import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../components/ui/SearchBar'
import SectionHeader from '../../components/ui/SectionHeader'
import TopBar from '../../components/ui/TopBar'
import BuyerTabBar from '../../components/layout/BuyerTabBar'
import Chip from '../../components/ui/Chip'
import { categories } from '../../data/seed'

const serviceChips = [
  'Graphic design', 'Photography', 'Videography', 'Tutoring', 'Hair styling',
  'Makeup', 'Laundry', 'Tech repairs', 'Printing', 'Writing and editing',
  'Event services', 'Delivery services',
]

export default function Explore() {
  const navigate = useNavigate()
  const [activeChip, setActiveChip] = useState<string | null>('Graphic design')
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <div className="sticky top-0 z-20 bg-bg px-[18px] pt-5 pb-3">
        <h1 className="text-[19px] font-extrabold text-ink mb-3">Explore</h1>
        <SearchBar
          readOnly
          onClick={() => navigate('/search')}
          placeholder="Search products and services"
        />
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        <SectionHeader title="Products" />
        <div className="grid grid-cols-2 gap-3 px-[18px]">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate('/results', { state: { category: cat.name } })}
              className="bg-white border border-line rounded-lg p-4 flex flex-col items-start gap-2"
            >
              <div
                className="w-[48px] h-[48px] rounded-[14px] flex items-center justify-center text-[26px]"
                style={{ backgroundColor: cat.tileColor }}
              >
                {cat.emoji}
              </div>
              <div>
                <p className="text-[14px] font-bold text-ink">{cat.name}</p>
                <p className="text-xs text-mute">{cat.count} listings</p>
              </div>
            </button>
          ))}
        </div>

        <SectionHeader title="Student services" />
        <div className="flex flex-wrap gap-2 px-[18px]">
          {serviceChips.map(chip => (
            <Chip
              key={chip}
              variant={activeChip === chip ? 'v' : 'default'}
              onClick={() => {
                setActiveChip(chip === activeChip ? null : chip)
                navigate('/results', { state: { query: chip } })
              }}
            >
              {chip}
            </Chip>
          ))}
        </div>
      </div>

      <BuyerTabBar />
    </div>
  )
}
