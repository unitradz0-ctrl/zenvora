import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, ChevronRight, Star, MapPin, Truck, Shield, Zap, Globe, ShieldCheck } from 'lucide-react'
import { products, services, communities, brands, categories } from '../../data/seed'
import { useStore, fmt } from '../../store/useStore'
import BottomTabBar from '../../components/layout/BottomTabBar'
import Avatar from '../../components/ui/Avatar'

const quickLinks = [
  { label: 'Graphic designer', to: '/results', state: { query: 'Graphic designer' } },
  { label: 'Laptop', to: '/results', state: { query: 'Laptop' } },
  { label: 'Study materials', to: '/results', state: { query: 'Study materials' } },
  { label: 'Hair stylist', to: '/results', state: { query: 'Hair stylist' } },
  { label: 'Event planner', to: '/results', state: { query: 'Event planner' } },
  { label: 'Makeup artist', to: '/results', state: { query: 'Makeup artist' } },
]

const navCategories = [
  { icon: '🎓', label: 'Communities', to: '/communities' },
  { icon: '🛍️', label: 'Products', to: '/explore' },
  { icon: '🛠️', label: 'Services', to: '/explore' },
  { icon: '🏢', label: 'Businesses', to: '/explore' },
  { icon: '🌍', label: 'Global', to: '/explore' },
  { icon: '⋯', label: 'More', to: '/explore' },
]

const whyChoose = [
  { icon: <ShieldCheck size={22} className="text-accent" />, title: 'Safe & Verified', desc: 'Trusted users and verified businesses' },
  { icon: <Zap size={22} className="text-accent" />, title: 'Fast & Easy', desc: 'Simple and smooth experience' },
  { icon: <Globe size={22} className="text-accent" />, title: 'Global Access', desc: 'Connect with communities worldwide' },
  { icon: <Shield size={22} className="text-accent" />, title: 'Secure Payments', desc: 'Multiple payment options (Stripe, Paystack, Flutterwave)' },
]

export default function Home() {
  const navigate = useNavigate()
  const { wishlist, toggleWishlist } = useStore()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    if (searchQuery.trim()) navigate('/results', { state: { query: searchQuery } })
    else navigate('/search')
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-40 bg-nav-gradient shadow-nav">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Logo */}
          <button onClick={() => navigate('/home')} className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
              <span className="text-primary font-black text-[13px]">U</span>
            </div>
            <span className="text-white font-extrabold text-lg tracking-wide">UNITRADZ</span>
          </button>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/notifications')} className="relative">
              <Bell size={20} className="text-white/90" />
              <span className="absolute -top-1 -right-1 w-[8px] h-[8px] bg-red-400 rounded-full" />
            </button>
            <button onClick={() => navigate('/profile')} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-sm font-bold">T</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="bg-hero px-4 pt-7 pb-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-2">
          Connect · Buy · Sell · Grow
        </p>
        <h1 className="text-white text-[28px] font-black leading-tight mb-1">
          Your Community.
        </h1>
        <h1 className="text-accent-light text-[28px] font-black leading-tight mb-3">
          Your Marketplace.
        </h1>
        <p className="text-white/75 text-sm leading-relaxed mb-5 max-w-[280px]">
          Join communities, discover amazing products and services, and connect with people around the world.
        </p>

        {/* Search bar */}
        <div className="bg-white rounded-lg flex items-center gap-2 px-3 py-[10px] mb-4 shadow-md">
          <Search size={16} className="text-mute shrink-0" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="I need someone to design a birthday flyer..."
            className="flex-1 text-sm text-ink placeholder:text-mute outline-none bg-transparent"
          />
          <button
            onClick={handleSearch}
            className="bg-accent text-white text-xs font-bold px-3 py-[6px] rounded-md shrink-0"
          >
            Search
          </button>
        </div>

        {/* Quick links */}
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
          <div className="flex gap-2">
            {quickLinks.map(q => (
              <button
                key={q.label}
                onClick={() => navigate(q.to, { state: q.state })}
                className="shrink-0 bg-white/15 border border-white/25 rounded-full px-3 py-[5px] text-white text-xs font-medium whitespace-nowrap"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── NAV CATEGORIES ── */}
      <section className="bg-white border-b border-line px-2 py-4">
        <div className="grid grid-cols-6 gap-1">
          {navCategories.map(c => (
            <button
              key={c.label}
              onClick={() => navigate(c.to)}
              className="flex flex-col items-center gap-1 p-2"
            >
              <div className="w-11 h-11 rounded-full bg-blue-soft flex items-center justify-center text-[22px]">
                {c.icon}
              </div>
              <span className="text-[10px] font-semibold text-ink text-center leading-tight">{c.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── BUILD YOUR FUTURE + COMMUNITIES ── */}
      <section className="px-4 pt-5">
        {/* Banner */}
        <div className="bg-primary rounded-lg p-4 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-1">Students · Creators · Entrepreneurs</p>
          <h2 className="text-white text-[18px] font-extrabold leading-snug mb-2">
            Build your future<br />with your community.
          </h2>
          <p className="text-white/70 text-xs leading-relaxed mb-3">
            Get access to opportunities, learn, sell, and grow with people who share your goals.
          </p>
          <button
            onClick={() => navigate('/communities')}
            className="bg-white text-primary text-xs font-bold px-4 py-2 rounded-full inline-flex items-center gap-1"
          >
            Join Now <ChevronRight size={12} />
          </button>
        </div>

        {/* Popular Communities */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-extrabold text-ink">Popular Communities</h3>
          <button onClick={() => navigate('/communities')} className="text-accent text-xs font-bold flex items-center gap-1">
            View all <ChevronRight size={12} />
          </button>
        </div>

        <div className="bg-white border border-line rounded-lg overflow-hidden divide-y divide-line mb-5">
          {communities.slice(0, 4).map(c => (
            <button
              key={c.id}
              onClick={() => navigate('/communities')}
              className="w-full flex items-center gap-3 px-4 py-3"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-extrabold text-sm shrink-0"
                style={{ backgroundColor: c.color }}
              >
                {c.name.charAt(0)}
              </div>
              <div className="flex-1 text-left">
                <p className="text-[13px] font-bold text-ink line-clamp-1">{c.name}</p>
                <p className="text-xs text-mute">{c.type} · {c.members} members</p>
              </div>
              <ChevronRight size={14} className="text-mute shrink-0" />
            </button>
          ))}
        </div>
      </section>

      {/* ── TRENDING MARKETPLACE ── */}
      <section className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-extrabold text-ink">Trending on Marketplace</h3>
          <button onClick={() => navigate('/explore')} className="text-accent text-xs font-bold flex items-center gap-1">
            View all <ChevronRight size={12} />
          </button>
        </div>

        <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
          <div className="flex gap-3">
            {products.slice(0, 5).map(p => {
              const saved = wishlist.has(p.id)
              const originalPrice = Math.round(p.price * 1.2)
              return (
                <button
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="shrink-0 w-[155px] bg-white border border-line rounded-lg overflow-hidden text-left"
                >
                  {/* Image area */}
                  <div
                    className="w-full h-[110px] flex items-center justify-center relative"
                    style={{ backgroundColor: p.tileColor }}
                  >
                    <span className="text-[52px] leading-none">{p.emoji}</span>
                    {/* Badge */}
                    <div className="absolute top-2 left-2">
                      <span className="bg-accent text-white text-[9px] font-bold px-2 py-[2px] rounded-full">
                        {p.category}
                      </span>
                    </div>
                    {/* Wishlist */}
                    <button
                      onClick={e => { e.stopPropagation(); toggleWishlist(p.id) }}
                      className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center"
                    >
                      <span className={`text-[12px] ${saved ? 'text-red-500' : 'text-mute'}`}>♥</span>
                    </button>
                  </div>

                  <div className="p-2">
                    <p className="text-[12px] font-bold text-ink line-clamp-2 leading-tight mb-1">{p.title}</p>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-[13px] font-extrabold text-ink">{fmt(p.price)}</span>
                      <span className="text-[10px] text-mute line-through">{fmt(originalPrice)}</span>
                    </div>
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-1">
                      <Star size={10} fill="#F59E0B" className="text-gold" />
                      <span className="text-[10px] text-mute">{p.rating} ({p.reviewCount})</span>
                    </div>
                    {/* Seller */}
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-accent flex items-center justify-center">
                        <span className="text-[7px] text-white font-bold">{p.seller.charAt(0)}</span>
                      </div>
                      <span className="text-[10px] text-mute">by {p.seller}</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── DISPATCH RIDERS ── */}
      <section className="mx-4 mb-5 bg-primary rounded-lg p-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-white/5" />
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center text-xl shrink-0">🏍️</div>
          <div>
            <h3 className="text-white font-extrabold text-[15px]">Dispatch Riders</h3>
            <p className="text-white/70 text-xs leading-snug">Need something delivered? Our verified dispatch riders will get it to you safely and on time.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { icon: <Truck size={14} className="text-accent-light" />, title: 'Fast Delivery', desc: 'Quick & reliable' },
            { icon: <MapPin size={14} className="text-accent-light" />, title: 'Real-Time Tracking', desc: 'Track your order' },
            { icon: <Shield size={14} className="text-accent-light" />, title: 'Verified Riders', desc: 'Safe and trusted' },
          ].map(item => (
            <div key={item.title} className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center shrink-0">{item.icon}</div>
              <div>
                <p className="text-white text-[11px] font-bold">{item.title}</p>
                <p className="text-white/60 text-[10px]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/dispatch')}
          className="bg-white text-primary text-xs font-bold px-4 py-2 rounded-full inline-flex items-center gap-1"
        >
          Request a Rider <ChevronRight size={12} />
        </button>
      </section>

      {/* ── TOP BRANDS ── */}
      <section className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-extrabold text-ink">Top Brands</h3>
          <button className="text-accent text-xs font-bold flex items-center gap-1">
            View all brands <ChevronRight size={12} />
          </button>
        </div>
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
          <div className="flex gap-3">
            {brands.map(b => (
              <button
                key={b.id}
                className="shrink-0 w-[90px] bg-white border border-line rounded-lg p-3 flex flex-col items-center gap-2"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg"
                  style={{ backgroundColor: b.color || '#0A2463' }}
                >
                  {b.logo}
                </div>
                <p className="text-[11px] font-extrabold text-ink text-center">{b.name}</p>
                <p className="text-[9px] text-mute text-center leading-tight">{b.category}</p>
                <span className="text-accent text-[10px] font-bold">View store →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE UNITRADZ ── */}
      <section className="px-4 mb-5">
        <h3 className="text-[15px] font-extrabold text-ink text-center mb-4">Why Choose UNITRADZ?</h3>
        <div className="grid grid-cols-2 gap-3">
          {whyChoose.map(w => (
            <div key={w.title} className="bg-white border border-line rounded-lg p-3 flex flex-col gap-2">
              <div className="w-9 h-9 bg-blue-soft rounded-lg flex items-center justify-center">
                {w.icon}
              </div>
              <p className="text-[12px] font-extrabold text-ink">{w.title}</p>
              <p className="text-[11px] text-mute leading-snug">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="mx-4 mb-5 bg-primary rounded-lg p-5 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center text-xl shrink-0">👥</div>
        <div className="flex-1">
          <p className="text-white font-extrabold text-[13px]">Ready to be part of something bigger?</p>
          <p className="text-white/65 text-[11px]">Join thousands of students, creators and businesses today.</p>
        </div>
        <button
          onClick={() => navigate('/signup')}
          className="bg-accent text-white text-xs font-bold px-3 py-2 rounded-lg shrink-0 whitespace-nowrap"
        >
          Get Started →
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-primary px-4 pt-6 pb-20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
            <span className="text-primary font-black text-[11px]">U</span>
          </div>
          <span className="text-white font-extrabold text-base">UNITRADZ</span>
        </div>
        <p className="text-white/50 text-[11px] mb-4">Communities · Marketplace · Global</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-white/70 text-[11px] font-bold mb-2">Quick Links</p>
            {['Home', 'Communities', 'Marketplace', 'Services', 'Businesses', 'Brands'].map(l => (
              <p key={l} className="text-white/50 text-[11px] py-[2px]">{l}</p>
            ))}
          </div>
          <div>
            <p className="text-white/70 text-[11px] font-bold mb-2">Support</p>
            {['Help Center', 'Terms of Service', 'Privacy Policy', 'Contact Us'].map(l => (
              <p key={l} className="text-white/50 text-[11px] py-[2px]">{l}</p>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <p className="text-white/35 text-[10px] text-center">© 2025 UNITRADZ. All rights reserved.</p>
        </div>
      </footer>

      <BottomTabBar />
    </div>
  )
}
