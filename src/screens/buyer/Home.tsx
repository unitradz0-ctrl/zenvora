import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Bell, ShieldCheck } from 'lucide-react'
import SearchBar from '../../components/ui/SearchBar'
import SectionHeader from '../../components/ui/SectionHeader'
import ProductTile from '../../components/ui/ProductTile'
import BuyerTabBar from '../../components/layout/BuyerTabBar'
import { products, services, categories } from '../../data/seed'
import { SCHOOL } from '../../data/seed'
import { fmt } from '../../store/useStore'

const categoriesRow = categories.slice(0, 7)
const justListed = products.slice(0, 4)
const featuredServices = services

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Hero header */}
      <div
        className="bg-buyer-hero px-[18px] pt-12 pb-8"
        style={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[13px] text-white/80">Hi Tolu</p>
            <h1 className="text-[20px] font-extrabold text-white leading-tight">{SCHOOL}</h1>
            <div className="flex items-center gap-1 mt-1">
              <ShieldCheck size={13} className="text-teal" />
              <span className="text-[12px] text-white/70 font-semibold">Verified student</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              aria-label="Wishlist"
              onClick={() => navigate('/wishlist')}
              className="w-[40px] h-[40px] rounded-full bg-white/15 flex items-center justify-center"
            >
              <Heart size={20} className="text-white" />
            </button>
            <button
              aria-label="Notifications"
              onClick={() => navigate('/notifications')}
              className="w-[40px] h-[40px] rounded-full bg-white/15 flex items-center justify-center relative"
            >
              <Bell size={20} className="text-white" />
              <span className="absolute top-[8px] right-[8px] w-2 h-2 rounded-full bg-coral" />
            </button>
          </div>
        </div>
        <SearchBar
          readOnly
          onClick={() => navigate('/search')}
          className="bg-white/95"
        />
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Category row */}
        <div className="overflow-x-auto no-scrollbar mt-4">
          <div className="flex gap-3 px-[18px]">
            {categoriesRow.map(cat => (
              <button
                key={cat.id}
                onClick={() => navigate('/explore')}
                className="flex flex-col items-center gap-1 shrink-0"
              >
                <div
                  className="w-[58px] h-[58px] rounded-[16px] bg-white border border-line flex items-center justify-center text-[26px]"
                  style={{ backgroundColor: cat.tileColor }}
                >
                  {cat.emoji}
                </div>
                <span className="text-xs text-ink font-semibold">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Promoted banner */}
        <div className="mx-[18px] mt-5">
          <div
            className="bg-gold-soft rounded-[22px] p-4 flex items-center justify-between overflow-hidden relative cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #FFF3D1, #FFE9C7)' }}
            onClick={() => navigate('/product/p6')}
          >
            <div>
              <span className="text-xs font-bold text-[#8A5A00] bg-gold/30 rounded-full px-2 py-[2px]">Promoted</span>
              <h3 className="text-[19px] font-extrabold text-ink mt-1 leading-tight">Small chops platter</h3>
              <p className="text-sm text-mute">Tolu's Treats · {fmt(4000)}</p>
              <button
                onClick={e => { e.stopPropagation(); navigate('/product/p6') }}
                className="mt-3 bg-ink text-white text-[13px] font-bold rounded-full px-4 py-2"
              >
                Order now
              </button>
            </div>
            <span className="text-[72px] absolute right-4 top-2 leading-none">🥟</span>
          </div>
        </div>

        {/* Just listed */}
        <SectionHeader title="Just listed on campus" seeAllHref="/results" />
        <div className="grid grid-cols-2 gap-3 px-[18px]">
          {justListed.map(p => <ProductTile key={p.id} product={p} />)}
        </div>

        {/* Services */}
        <SectionHeader title="Services from students" seeAllHref="/explore" />
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-3 px-[18px]">
            {featuredServices.map(svc => (
              <button
                key={svc.id}
                onClick={() => navigate(`/service/${svc.id}`)}
                className="w-[200px] shrink-0 bg-white border border-line rounded-lg p-3 text-left"
              >
                <div
                  className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center text-[26px] mb-2"
                  style={{ backgroundColor: svc.tileColor }}
                >
                  {svc.emoji}
                </div>
                <p className="text-[13.5px] font-bold text-ink leading-tight">{svc.title}</p>
                <p className="text-xs text-mute mt-[2px]">{svc.seller}</p>
                <p className="text-[13px] font-bold text-violet mt-1">From {fmt(svc.fromPrice)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[11px] text-gold">★</span>
                  <span className="text-xs text-mute">{svc.rating}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BuyerTabBar />
    </div>
  )
}
