import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import BottomTabBar from '../../components/layout/BottomTabBar'
import { brands } from '../../data/seed'

const allBrands = [
  { name: 'Nike', category: 'Fashion & Sports', logo: '✔', color: '#111111' },
  { name: 'Apple', category: 'Electronics & Tech', logo: '', color: '#555555' },
  { name: 'Samsung', category: 'Electronics & Tech', logo: 'S', color: '#1428A0' },
  { name: 'Adidas', category: 'Fashion & Sports', logo: '⋀', color: '#111111' },
  { name: 'HP', category: 'Computers & Office', logo: 'hp', color: '#0096D6' },
  { name: 'SHEIN', category: 'Fashion', logo: 'S', color: '#111111' },
  { name: 'Huawei', category: 'Electronics & Tech', logo: 'H', color: '#CF0A2C' },
  { name: 'Infinix', category: 'Phones & Gadgets', logo: 'i', color: '#E4002B' },
  { name: 'SONY', category: 'Electronics', logo: 'S', color: '#111111' },
]

export default function Brands() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-bg pb-16">
      <Navbar />

      <div className="flex-1 overflow-y-auto px-4 pt-5">
        <h1 className="text-[22px] font-extrabold text-ink mb-1">Top Brands</h1>
        <p className="text-sm text-mute mb-5">Shop from your favourite global and local brands.</p>

        {/* Brand grid */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {allBrands.map(b => (
            <button
              key={b.name}
              className="bg-white border border-line rounded-lg p-3 flex flex-col items-center gap-2 text-center"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg"
                style={{ backgroundColor: b.color }}
              >
                {b.logo}
              </div>
              <p className="text-[12px] font-extrabold text-ink">{b.name}</p>
              <p className="text-[9px] text-mute leading-tight">{b.category}</p>
              <span className="text-accent text-[10px] font-bold">View store →</span>
            </button>
          ))}
        </div>

        {/* More brands CTA */}
        <button className="w-full bg-blue-soft border border-accent/20 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white text-lg">🏪</span>
          </div>
          <div className="flex-1 text-left">
            <p className="text-[13px] font-extrabold text-ink">More Brands. More Choices.</p>
            <p className="text-[11px] text-mute">Discover new brands and exclusive deals on UNITRADZ.</p>
          </div>
          <ChevronRight size={16} className="text-accent shrink-0" />
        </button>
      </div>

      <BottomTabBar />
    </div>
  )
}
