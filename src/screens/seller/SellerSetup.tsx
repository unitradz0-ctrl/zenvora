import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, ShieldCheck, ChevronRight } from 'lucide-react'
import TopBar from '../../components/ui/TopBar'
import { Input, Textarea } from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Chip from '../../components/ui/Chip'
import { useStore } from '../../store/useStore'

const shopCategories = ['Food', 'Drinks', 'Pastries', 'Fashion', 'Beauty', 'Electronics', 'Services', 'Books']

// Multi-step seller onboarding:
// Step 1 — Verify identity (required)
// Step 2 — Set up shop details

export default function SellerSetup() {
  const navigate = useNavigate()
  const { isSellerVerified } = useStore()
  const [step, setStep] = useState(isSellerVerified ? 2 : 1)
  const [shopName, setShopName] = useState('')
  const [about, setAbout] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const toggle = (c: string) => {
    const next = new Set(selected)
    if (next.has(c)) next.delete(c)
    else next.add(c)
    setSelected(next)
  }

  // ── STEP 1: Verification gate ──────────────────────────────────
  if (step === 1) {
    return (
      <div className="flex flex-col min-h-screen bg-bg">
        <TopBar title="Become a seller" />
        <div className="flex-1 px-4 py-5 flex flex-col gap-4">

          {/* Hero */}
          <div className="bg-primary rounded-xl p-5 text-center">
            <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">🏪</div>
            <h2 className="text-white text-[18px] font-extrabold mb-1">Start selling on UNITRADZ</h2>
            <p className="text-white/70 text-sm">Reach thousands of buyers on and off campus.</p>
          </div>

          {/* Why verify */}
          <div className="bg-white border border-line rounded-xl p-4">
            <p className="text-[14px] font-extrabold text-ink mb-3">Why verification is required</p>
            {[
              { icon: '🛡️', text: 'Builds trust — buyers see your Verified Seller badge' },
              { icon: '🚀', text: 'Unlocks all selling features and promotions' },
              { icon: '💰', text: 'Faster payouts to your wallet' },
              { icon: '✅', text: 'Protects buyers from fake sellers' },
            ].map(item => (
              <div key={item.text} className="flex items-start gap-3 mb-3 last:mb-0">
                <span className="text-xl shrink-0">{item.icon}</span>
                <p className="text-[13px] text-mute">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Verification options */}
          <div className="bg-white border border-line rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-line">
              <p className="text-[13px] font-bold text-ink">Choose how to verify</p>
            </div>
            {[
              { icon: '🎓', title: 'Student verification', sub: 'School email, student ID, or reg number', to: '/verify/method' },
              { icon: '🏢', title: 'Business verification', sub: 'CAC registration or business documents', to: '/verify/method' },
              { icon: '🪪', title: 'Government ID', sub: 'NIN, passport, or driver\'s license', to: '/verify/method' },
            ].map(opt => (
              <button
                key={opt.title}
                onClick={() => navigate(opt.to)}
                className="w-full flex items-center gap-3 px-4 py-4 border-b border-line last:border-0 text-left"
              >
                <span className="text-2xl shrink-0">{opt.icon}</span>
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-ink">{opt.title}</p>
                  <p className="text-[11px] text-mute">{opt.sub}</p>
                </div>
                <ChevronRight size={16} className="text-mute shrink-0" />
              </button>
            ))}
          </div>

          {/* Already verified? */}
          <button
            onClick={() => setStep(2)}
            className="text-accent text-sm font-semibold text-center py-2"
          >
            Already verified? Continue to shop setup →
          </button>
        </div>
      </div>
    )
  }

  // ── STEP 2: Shop setup ─────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="Set up your shop" />
      <div className="flex-1 px-4 flex flex-col gap-5 pb-[100px]">

        {/* Verified badge */}
        <div className="bg-blue-soft border border-accent/20 rounded-lg p-3 flex items-center gap-3">
          <ShieldCheck size={20} className="text-accent shrink-0" />
          <p className="text-[13px] text-accent font-semibold">
            Verified Seller badge will appear on your listings
          </p>
        </div>

        {/* Photo */}
        <div className="flex flex-col items-center gap-2">
          <button
            aria-label="Add shop photo"
            className="w-[88px] h-[88px] rounded-full border-2 border-dashed border-accent/40 flex flex-col items-center justify-center gap-1 bg-blue-soft"
          >
            <Camera size={24} className="text-accent" />
            <span className="text-[10px] font-semibold text-accent">Add photo</span>
          </button>
        </div>

        <Input
          label="Shop name"
          value={shopName}
          onChange={e => setShopName(e.target.value)}
          placeholder="Your shop name"
        />

        <div>
          <p className="text-sm font-bold text-ink mb-2">What do you sell?</p>
          <div className="flex flex-wrap gap-2">
            {shopCategories.map(c => (
              <Chip
                key={c}
                variant={selected.has(c) ? 'on' : 'default'}
                onClick={() => toggle(c)}
              >
                {c}
              </Chip>
            ))}
          </div>
        </div>

        <Textarea
          label="About your shop"
          value={about}
          onChange={e => setAbout(e.target.value)}
          placeholder="Tell buyers what makes your shop special..."
        />
      </div>

      <div className="sticky bottom-0 bg-white border-t border-line px-4 pt-3 pb-6">
        <Button onClick={() => navigate('/seller/dashboard')}>Start selling</Button>
      </div>
    </div>
  )
}
