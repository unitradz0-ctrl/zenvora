import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal, Star, ChevronDown } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import BottomTabBar from '../../components/layout/BottomTabBar'
import { products, services } from '../../data/seed'
import { fetchListings, fetchServices } from '../../lib/api'
import { useStore, fmt } from '../../store/useStore'

const tabs = ['All', 'Products', 'Services', 'Businesses']

export default function Marketplace() {
  const navigate = useNavigate()
  const { wishlist, toggleWishlist } = useStore()
  const [tab, setTab] = useState('All')
  const [query, setQuery] = useState('')
  const [dbProducts, setDbProducts] = useState<any[]>([])
  const [dbServices, setDbServices] = useState<any[]>([])

  // Load from DB, fall back to seed data
  useEffect(() => {
    fetchListings({ limit: 50 }).then(({ data }) => {
      if (data && data.length > 0) setDbProducts(data)
      else setDbProducts(products)
    }).catch(() => setDbProducts(products))

    fetchServices().then(({ data }) => {
      if (data && data.length > 0) setDbServices(data)
      else setDbServices(services)
    }).catch(() => setDbServices(services))
  }, [])

  const displayProducts = (dbProducts.length > 0 ? dbProducts : products).filter(p =>
    query ? p.title.toLowerCase().includes(query.toLowerCase()) : true
  )
  const displayServices = dbServices.length > 0 ? dbServices : services

  return (
    <div className="flex flex-col min-h-screen bg-bg pb-16">
      <Navbar />

      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-4 pt-5 pb-3">
          <h1 className="text-[22px] font-extrabold text-ink mb-1">Marketplace</h1>
          <p className="text-sm text-mute">Buy and sell products, find services, and discover businesses.</p>
        </div>

        {/* Tabs */}
        <div className="px-4 mb-3 flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 px-4 py-[7px] rounded-full text-sm font-semibold border transition-all ${
                tab === t ? 'bg-accent text-white border-accent' : 'bg-white text-ink border-line'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="px-4 mb-4 flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-white border border-line rounded-lg px-3 h-11">
            <Search size={15} className="text-mute shrink-0" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search marketplace..."
              className="flex-1 text-sm text-ink placeholder:text-mute outline-none bg-transparent"
            />
          </div>
          <button
            onClick={() => navigate('/filters')}
            className="w-11 h-11 bg-white border border-line rounded-lg flex items-center justify-center shrink-0"
          >
            <SlidersHorizontal size={16} className="text-mute" />
          </button>
        </div>

        {/* Popular header */}
        <div className="px-4 mb-3 flex items-center gap-2">
          <button className="flex items-center gap-1 font-bold text-ink text-sm">
            Popular <ChevronDown size={14} />
          </button>
        </div>

        {/* Product grid */}
        {(tab === 'All' || tab === 'Products') && (
          <div className="px-4 mb-4">
            <div className="grid grid-cols-2 gap-3">
              {displayProducts.map((p: any) => {
                const saved = wishlist.has(p.id)
                const origPrice = Math.round(p.price * 1.25)
                return (
                  <button
                    key={p.id}
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="bg-white rounded-lg overflow-hidden border border-line text-left"
                  >
                    {/* Image */}
                    <div className="relative h-[130px] flex items-center justify-center" style={{ backgroundColor: p.tileColor }}>
                      <span className="text-[60px] leading-none">{p.emoji}</span>
                      <span className="absolute top-2 left-2 bg-accent text-white text-[9px] font-bold px-2 py-[2px] rounded-full">
                        {p.condition === 'New' ? 'Product' : 'Used'}
                      </span>
                      <button
                        onClick={e => { e.stopPropagation(); toggleWishlist(p.id) }}
                        className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm"
                      >
                        <span className={`text-[11px] ${saved ? 'text-red-500' : 'text-mute'}`}>♥</span>
                      </button>
                    </div>
                    <div className="p-2">
                      <p className="text-[12px] font-bold text-ink line-clamp-2 leading-tight mb-1">{p.title}</p>
                      <p className="text-[14px] font-extrabold text-ink">{fmt(p.price)}</p>
                      <p className="text-[10px] text-mute line-through">{fmt(origPrice)}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={10} fill="#F59E0B" className="text-gold shrink-0" />
                        <span className="text-[10px] text-mute">{p.rating} ({p.reviewCount})</span>
                      </div>
                      <p className="text-[10px] text-mute mt-[2px] truncate">by {p.seller}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Services section */}
        {showServices && (
          <div className="px-4 mb-4">
            {tab === 'All' && <h2 className="text-[14px] font-extrabold text-ink mb-3">Services</h2>}
            <div className="flex flex-col gap-3">
              {services.map(s => (
                <button
                  key={s.id}
                  onClick={() => navigate(`/service/${s.id}`)}
                  className="bg-white border border-line rounded-lg flex items-center gap-3 p-3 text-left"
                >
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center text-[36px] shrink-0" style={{ backgroundColor: s.tileColor }}>
                    {s.emoji}
                  </div>
                  <div className="flex-1">
                    <span className="text-[9px] font-bold text-accent bg-blue-soft px-2 py-[2px] rounded-full">Service</span>
                    <p className="text-[13px] font-bold text-ink mt-1 leading-tight">{s.title}</p>
                    <p className="text-[12px] font-extrabold text-ink">{fmt(s.fromPrice)}+</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={10} fill="#F59E0B" className="text-gold shrink-0" />
                      <span className="text-[10px] text-mute">{s.rating} ({s.reviewCount}) · by {s.seller}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomTabBar />
    </div>
  )
}
