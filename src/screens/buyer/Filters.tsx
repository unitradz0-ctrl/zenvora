import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import Chip from '../../components/ui/Chip'
import Toggle from '../../components/ui/Toggle'
import Button from '../../components/ui/Button'

type Condition = 'New' | 'Fairly used' | 'Any'
type SortBy = 'Best match' | 'Lowest price' | 'Newest' | 'Top rated'

export default function Filters() {
  const navigate = useNavigate()
  const [condition, setCondition] = useState<Condition>('Any')
  const [sort, setSort] = useState<SortBy>('Best match')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [campusDelivery, setCampusDelivery] = useState(false)
  const [highRated, setHighRated] = useState(false)
  const [minPrice] = useState(2000)
  const [maxPrice] = useState(20000)

  const conditions: Condition[] = ['New', 'Fairly used', 'Any']
  const sortOptions: SortBy[] = ['Best match', 'Lowest price', 'Newest', 'Top rated']

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-bg flex items-center justify-between px-[18px] py-4">
        <h1 className="text-[19px] font-extrabold text-ink">Filters</h1>
        <button
          aria-label="Close"
          onClick={() => navigate(-1)}
          className="w-[40px] h-[40px] rounded-full bg-white border border-line flex items-center justify-center"
        >
          <X size={20} className="text-ink" />
        </button>
      </div>

      <div className="flex-1 px-[18px] flex flex-col gap-6 pb-[100px]">
        {/* Price range */}
        <div>
          <h2 className="text-lg font-extrabold text-ink mb-3">Price range</h2>
          <div className="flex gap-3 mb-3">
            <div className="flex-1 bg-white border border-line rounded-full px-4 py-2 text-[14px] font-bold text-ink">
              ₦{minPrice.toLocaleString()}
            </div>
            <div className="flex-1 bg-white border border-line rounded-full px-4 py-2 text-[14px] font-bold text-ink">
              ₦{maxPrice.toLocaleString()}
            </div>
          </div>
          {/* Slider visual */}
          <div className="h-[6px] rounded-full bg-[#E6E1F7] relative">
            <div className="absolute left-[5%] right-[30%] h-full bg-violet rounded-full" />
            <div className="absolute left-[5%] -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-violet border-2 border-white shadow" />
            <div className="absolute right-[30%] translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-violet border-2 border-white shadow" />
          </div>
        </div>

        {/* Condition */}
        <div>
          <h2 className="text-lg font-extrabold text-ink mb-3">Condition</h2>
          <div className="flex gap-2">
            {conditions.map(c => (
              <Chip key={c} variant={condition === c ? 'on' : 'default'} onClick={() => setCondition(c)}>{c}</Chip>
            ))}
          </div>
        </div>

        {/* Sort by */}
        <div>
          <h2 className="text-lg font-extrabold text-ink mb-3">Sort by</h2>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map(s => (
              <Chip key={s} variant={sort === s ? 'on' : 'default'} onClick={() => setSort(s)}>{s}</Chip>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          {[
            { label: 'Verified sellers only', sub: 'Show sellers with the verified badge', val: verifiedOnly, set: setVerifiedOnly },
            { label: 'Campus delivery available', sub: 'Can be brought to your hostel', val: campusDelivery, set: setCampusDelivery },
            { label: 'Rated 4 stars and above', sub: '', val: highRated, set: setHighRated },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-4 border-b border-line last:border-0">
              <div>
                <p className="text-[14px] font-bold text-ink">{item.label}</p>
                {item.sub && <p className="text-xs text-mute mt-[2px]">{item.sub}</p>}
              </div>
              <Toggle checked={item.val} onChange={item.set} ariaLabel={item.label} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="sticky bottom-0 bg-white border-t border-line px-[18px] pt-3 pb-[26px] flex gap-3">
        <Button variant="ghost" fullWidth={false} className="flex-1" onClick={() => {
          setCondition('Any'); setSort('Best match')
          setVerifiedOnly(false); setCampusDelivery(false); setHighRated(false)
          navigate(-1)
        }}>Reset</Button>
        <Button className="flex-1" onClick={() => navigate('/results', {
          state: { condition, sort, verifiedOnly, campusDelivery, highRated, minPrice, maxPrice }
        })}>Show results</Button>
      </div>
    </div>
  )
}
