import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap } from 'lucide-react'
import TopBar from '../../components/ui/TopBar'
import Button from '../../components/ui/Button'
import BottomActionBar from '../../components/ui/BottomActionBar'
import RadioOptionCard from '../../components/ui/RadioOptionCard'
import Chip from '../../components/ui/Chip'
import { useStore, fmt } from '../../store/useStore'

const placements = [
  { id: 'search', label: 'Top of search results', price: 500 },
  { id: 'homepage', label: 'Homepage', price: 700 },
  { id: 'featured', label: 'Featured products section', price: 200 },
  { id: 'banner', label: 'Promotional banner', price: 1000 },
]

const durations = ['1 day', '3 days', '7 days']

export default function Promote() {
  const navigate = useNavigate()
  const { showToast } = useStore()
  const [placement, setPlacement] = useState('search')
  const [duration, setDuration] = useState('1 day')

  const activePlacement = placements.find(p => p.id === placement) || placements[0]
  const days = parseInt(duration)
  const total = activePlacement.price * days
  const reach = days * 180

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="Promote a listing" />
      <div className="flex-1 px-[18px] flex flex-col gap-5 pb-[100px]">
        {/* Listing preview */}
        <div className="bg-white border border-line rounded-lg p-4 flex items-center gap-3">
          <div className="w-[48px] h-[48px] rounded-[10px] bg-[#FFF0C9] flex items-center justify-center text-[26px] shrink-0">🥟</div>
          <div className="flex-1">
            <p className="text-[14px] font-bold text-ink">Small chops platter</p>
            <p className="text-xs text-mute">142 views this week</p>
          </div>
          <button className="text-[13px] font-bold text-violet">Change</button>
        </div>

        {/* Placement */}
        <div>
          <h2 className="text-lg font-extrabold text-ink mb-3">Where should it show?</h2>
          <div className="flex flex-col gap-3">
            {placements.map(p => (
              <RadioOptionCard
                key={p.id}
                selected={placement === p.id}
                onSelect={() => setPlacement(p.id)}
                icon={<Zap size={18} className="text-[#8A5A00]" />}
                title={p.label}
                price={fmt(p.price) + '/day'}
                priceColor="text-ink"
              />
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <h2 className="text-lg font-extrabold text-ink mb-3">How long?</h2>
          <div className="flex gap-2">
            {durations.map(d => (
              <Chip key={d} variant={duration === d ? 'on' : 'default'} onClick={() => setDuration(d)}>{d}</Chip>
            ))}
          </div>
        </div>

        {/* Reach card */}
        <div className="bg-violet-soft rounded-lg p-4">
          <p className="text-[13.5px] font-bold text-violet">
            Estimated reach — <span className="text-[17px] font-extrabold">{reach.toLocaleString()} students</span>
          </p>
        </div>
      </div>

      <BottomActionBar>
        <Button variant="gold" onClick={() => { showToast('Promotion is live'); navigate('/seller/listings') }}>
          Pay {fmt(total)} and promote
        </Button>
      </BottomActionBar>
    </div>
  )
}
