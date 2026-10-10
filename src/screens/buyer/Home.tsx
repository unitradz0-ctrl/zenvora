import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Star } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import BottomTabBar from '../../components/layout/BottomTabBar'
import { products, services } from '../../data/seed'
import { useStore, fmt } from '../../store/useStore'

const navCategories = [
  { icon: '🎓', label: 'Communities', to: '/communities', bg: '#EFF6FF' },
  { icon: '🛍️', label: 'Products',    to: '/marketplace', bg: '#EFF6FF' },
  { icon: '🛠️', label: 'Services',    to: '/services',   bg: '#EFF6FF' },
  { icon: '🏢', label: 'Businesses',  to: '/marketplace', bg: '#EFF6FF' },
  { icon: '🌍', label: 'Global',      to: '/communities', bg: '#EFF6FF' },
]

const quickLinks = ['Graphic designer', 'Laptop', 'Study materials']

export default function Home() {
  const navigate = useNavigate()
  const { wishlist, toggleWishlist } = useStore()
  const [query, setQuery] = useState('')

  return (
    <div className="flex flex-col min-h-screen bg-bg pb-16">
      <Navbar onSearch={() => navigate('/search')} />

      {/* ── HERO ── */}
      <div className="relative bg-primary overflow-hidden">
        {/* Background overlay pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-accent translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-blue-400 -translate-x-8 translate-y-8" />
        </div>
        <div className="relative px-4 pt-6 pb-5">
          <h1 className="text-white text-[26px] font-black leading-tight mb-1">
            Your Community.
          </h1>
          <h1 className="text-accent-light text-[26px] font-black leading-tight mb-3">
            Your Marketplace.
          </h1>
          <p className="text-white/70 text-[13px] leading-relaxed mb-4 max-w-[260px]">
            Join communities, discover amazing products and services, and connect with people around the world.
          </p>

          {/* Search */}
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 h-11 mb-3">
            <span className="text-mute text-[13px] flex-1 truncate">I need someone to design a flyer...</span>
            <button
              onClick={() => navigate('/search')}
              className="w-8 h-8 bg-accent rounded-md flex items-center justify-center shrink-0"
            >
              <span className="text-white text-[11px]">⌕</span>
            </button>
          </div>

          {/* Quick chips */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {quickLinks.map(q => (
              <button
                key={q}
                onClick={() => navigate('/results', { state: { query: q } })}
                className="shrink-0 bg-white/15 border border-white/25 rounded-full px-3 py-1 text-white text-xs font-medium"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── NAV CATEGORIES ── */}
      <div className="bg-white border-b border-line px-4 py-4">
        <div className="flex justify-between">
          {navCategories.map(c => (
            <button
              key={c.label}
              onClick={() => navigate(c.to)}
              className="flex flex-col items-center gap-[6px]"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-soft flex items-center justify-center text-2xl">
                {c.icon}
              </div>
              <span className="text-[10px] font-semibold text-ink">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── TRENDING ON MARKETPLACE ── */}
      <div className="px-4 pt-5 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-extrabold text-ink">Trending on Marketplace</h2>
          <button
            onClick={() => navigate('/marketplace')}
            className="text-accent text-xs font-bold flex items-center gap-1"
          >
            View all <ChevronRight size={12} />
          </button>
        </div>

        <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
          <div className="flex gap-3">
            {products.slice(0, 5).map(p => {
              const saved = wishlist.has(p.id)
              const origPrice = Math.round(p.price * 1.3)
              return (
                <button
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="shrink-0 w-[150px] bg-white rounded-lg overflow-hidden border border-line text-left"
                >
                  {/* Image */}
                  <div className="relative h-[110px] flex items-center justify-center" style={{ backgroundColor: p.tileColor }}>
                    <span className="text-[52px] leading-none">{p.emoji}</span>
                    <span className="absolute top-2 left-2 bg-accent text-white text-[9px] font-bold px-2 py-[2px] rounded-full">
                      {p.promoted ? 'Service' : 'Product'}
                    </span>
                    <button
                      onClick={e => { e.stopPropagation(); toggleWishlist(p.id) }}
                      className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm"
                    >
                      <span className={`text-[11px] ${saved ? 'text-red-500' : 'text-mute'}`}>♥</span>
                    </button>
                  </div>
                  {/* Info */}
                  <div className="p-2">
                    <p className="text-[12px] font-bold text-ink line-clamp-2 leading-tight mb-1">{p.title}</p>
                    <p className="text-[13px] font-extrabold text-ink">{fmt(p.price)}</p>
                    <p className="text-[10px] text-mute line-through">{fmt(origPrice)}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={10} fill="#F59E0B" className="text-gold shrink-0" />
                      <span className="text-[10px] text-mute">{p.rating} ({p.reviewCount})</span>
                    </div>
                    <p className="text-[10px] text-mute mt-1 truncate">by {p.seller}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── QUICK LINKS ── */}
      <div className="px-4 py-4 grid grid-cols-2 gap-3">
        {[
          { icon: '🛒', title: 'Buy & Sell', sub: 'Products', to: '/marketplace' },
          { icon: '🛠️', title: 'Find & Offer', sub: 'Services', to: '/services' },
          { icon: '👥', title: 'Connect with', sub: 'Communities', to: '/communities' },
          { icon: '🏍️', title: 'Fast Delivery', sub: 'Dispatch Riders', to: '/delivery' },
        ].map(item => (
          <button
            key={item.title}
            onClick={() => navigate(item.to)}
            className="bg-white border border-line rounded-lg p-3 flex items-center gap-3 text-left"
          >
            <div className="w-10 h-10 bg-blue-soft rounded-lg flex items-center justify-center text-xl shrink-0">
              {item.icon}
            </div>
            <div>
              <p className="text-[12px] font-extrabold text-ink">{item.title}</p>
              <p className="text-[11px] text-accent font-semibold">{item.sub}</p>
            </div>
          </button>
        ))}
      </div>

      <BottomTabBar />
    </div>
  )
}
