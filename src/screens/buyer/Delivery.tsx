import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Search, Bike, Car, Package } from 'lucide-react'
import BottomTabBar from '../../components/layout/BottomTabBar'
import Button from '../../components/ui/Button'

const riderOptions = [
  { icon: <Bike size={22} className="text-accent" />, label: 'Bike', sub: 'Fast & affordable' },
  { icon: <Car size={22} className="text-accent" />, label: 'Car', sub: 'For bigger items' },
  { icon: <Package size={22} className="text-accent" />, label: 'Multiple Stops', sub: 'Up to 3 stops' },
]

export default function Delivery() {
  const navigate = useNavigate()
  const [trackingNo, setTrackingNo] = useState('')

  return (
    <div className="flex flex-col min-h-screen bg-bg pb-16">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-primary flex items-center gap-3 px-4 h-14">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft size={22} className="text-white" />
        </button>
        <div className="flex items-center gap-[6px]">
          <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
            <span className="text-primary font-black text-[11px]">Z</span>
          </div>
          <span className="text-white font-extrabold text-[16px]">UNITRADZ</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-5">
        <h1 className="text-[22px] font-extrabold text-ink mb-1">Dispatch Riders</h1>
        <p className="text-sm text-mute mb-5">Fast, safe and reliable delivery within and outside your campus.</p>

        {/* Hero image placeholder */}
        <div className="bg-primary rounded-xl h-[160px] flex items-center justify-center mb-5 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-80" />
          <div className="relative text-center">
            <span className="text-[60px]">🏍️</span>
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="bg-white/20 rounded-full px-4 py-1">
              <span className="text-white text-xs font-bold">Verified Campus Riders</span>
            </div>
          </div>
        </div>

        {/* Request button */}
        <Button onClick={() => {}}>
          Request a Rider →
        </Button>

        {/* Track delivery */}
        <div className="mt-5 mb-5">
          <h2 className="text-[15px] font-extrabold text-ink mb-3">Track Your Delivery</h2>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-white border border-line rounded-lg px-3 h-11">
              <input
                value={trackingNo}
                onChange={e => setTrackingNo(e.target.value)}
                placeholder="Enter tracking number"
                className="flex-1 text-sm text-ink placeholder:text-mute outline-none bg-transparent"
              />
            </div>
            <button className="w-11 h-11 bg-accent rounded-lg flex items-center justify-center shrink-0">
              <Search size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Rider options */}
        <h2 className="text-[15px] font-extrabold text-ink mb-3">Rider Options</h2>
        <div className="grid grid-cols-3 gap-3">
          {riderOptions.map(o => (
            <button
              key={o.label}
              className="bg-white border border-line rounded-lg p-3 flex flex-col items-center gap-2 text-center"
            >
              <div className="w-11 h-11 bg-blue-soft rounded-full flex items-center justify-center">
                {o.icon}
              </div>
              <p className="text-[12px] font-bold text-ink">{o.label}</p>
              <p className="text-[10px] text-mute leading-tight">{o.sub}</p>
            </button>
          ))}
        </div>
      </div>

      <BottomTabBar />
    </div>
  )
}
