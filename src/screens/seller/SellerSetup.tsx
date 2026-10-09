import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera } from 'lucide-react'
import TopBar from '../../components/ui/TopBar'
import { Input, Textarea } from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Chip from '../../components/ui/Chip'

const categories = ['Food', 'Drinks', 'Pastries', 'Fashion', 'Beauty', 'Services']

export default function SellerSetup() {
  const navigate = useNavigate()
  const [shopName, setShopName] = useState("Tolu's Treats")
  const [about, setAbout] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set(['Food', 'Pastries']))

  const toggle = (c: string) => {
    const next = new Set(selected)
    if (next.has(c)) next.delete(c)
    else next.add(c)
    setSelected(next)
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="Set up your shop" />
      <div className="flex-1 px-[18px] flex flex-col gap-5 pb-[100px]">
        {/* Photo */}
        <div className="flex flex-col items-center gap-2">
          <button
            aria-label="Add shop photo"
            className="w-[92px] h-[92px] rounded-full border-2 border-dashed border-[#7A55F5] flex flex-col items-center justify-center gap-1 text-violet bg-violet-soft"
          >
            <Camera size={26} className="text-violet" />
            <span className="text-[10px] font-semibold text-violet">Add photo</span>
          </button>
        </div>

        <Input label="Shop name" value={shopName} onChange={e => setShopName(e.target.value)} placeholder="Your shop name" />

        <div>
          <p className="text-sm font-bold text-ink mb-2">What do you sell?</p>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
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

        {/* Verification note */}
        <div className="bg-teal-soft rounded-lg p-4">
          <p className="text-[13px] text-[#007A71] leading-snug">
            🛡️ <strong>Student verified</strong> — Seller badge unlocks after your first 5 sales.
          </p>
        </div>
      </div>
      <div className="sticky bottom-0 bg-white border-t border-line px-[18px] pt-3 pb-[26px]">
        <Button onClick={() => navigate('/seller/dashboard')}>Start selling</Button>
      </div>
    </div>
  )
}
