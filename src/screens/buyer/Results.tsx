import React, { useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import SearchBar from '../../components/ui/SearchBar'
import Chip from '../../components/ui/Chip'
import HorizontalProductRow from '../../components/ui/HorizontalProductRow'
import { products } from '../../data/seed'
import { SCHOOL } from '../../data/seed'

interface ResultsState {
  query?: string
  category?: string
  // filter fields from Filters screen
  condition?: string
  sort?: string
  verifiedOnly?: boolean
  campusDelivery?: boolean
  highRated?: boolean
  minPrice?: number
  maxPrice?: number
}

export default function Results() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state as ResultsState) || {}

  const [localQuery, setLocalQuery] = useState(state.query || '')
  const [verifiedOnly, setVerifiedOnly] = useState(state.verifiedOnly ?? false)

  const filtered = useMemo(() => {
    let list = [...products]

    // Text search — match title, category, seller name
    const q = localQuery.trim().toLowerCase()
    if (q) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.seller.toLowerCase().includes(q)
      )
    }

    // Category filter (from Explore)
    if (state.category) {
      list = list.filter(p => p.category === state.category)
    }

    // Condition filter
    if (state.condition && state.condition !== 'Any') {
      list = list.filter(p => p.condition === state.condition)
    }

    // Price range
    if (state.minPrice !== undefined) {
      list = list.filter(p => p.price >= state.minPrice!)
    }
    if (state.maxPrice !== undefined) {
      list = list.filter(p => p.price <= state.maxPrice!)
    }

    // Toggles
    if (verifiedOnly || state.verifiedOnly) {
      list = list.filter(p => p.sellerVerified)
    }
    if (state.campusDelivery) {
      list = list.filter(p => p.offerDelivery)
    }
    if (state.highRated) {
      list = list.filter(p => p.rating >= 4)
    }

    // Sort
    if (state.sort === 'Lowest price') {
      list.sort((a, b) => a.price - b.price)
    } else if (state.sort === 'Newest') {
      list.reverse()
    } else if (state.sort === 'Top rated') {
      list.sort((a, b) => b.rating - a.rating)
    }
    // 'Best match' = default order (promoted first)
    else {
      list.sort((a, b) => (b.promoted ? 1 : 0) - (a.promoted ? 1 : 0))
    }

    return list
  }, [localQuery, verifiedOnly, state])

  const displayQuery = localQuery || state.category || 'results'

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Top */}
      <div className="sticky top-0 z-20 bg-bg px-[18px] pt-4 pb-3 flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="w-[40px] h-[40px] rounded-full bg-white border border-line flex items-center justify-center shrink-0"
        >
          <span className="text-ink text-xl">←</span>
        </button>
        <SearchBar
          value={localQuery}
          onChange={setLocalQuery}
          onClick={() => navigate('/search')}
          className="flex-1"
        />
        <button
          aria-label="Filters"
          onClick={() => navigate('/filters', { state })}
          className="w-[40px] h-[40px] rounded-full bg-white border border-line flex items-center justify-center shrink-0"
        >
          <SlidersHorizontal size={18} className="text-ink" />
        </button>
      </div>

      {/* Filter chips */}
      <div className="overflow-x-auto no-scrollbar px-[18px]">
        <div className="flex gap-2 pb-2">
          <Chip variant="on" onClick={() => navigate('/filters', { state })}>
            <SlidersHorizontal size={12} /> Filters
          </Chip>
          <Chip
            variant={verifiedOnly ? 'v' : 'default'}
            onClick={() => setVerifiedOnly(v => !v)}
          >
            Verified sellers
          </Chip>
          {state.category && <Chip variant="on">{state.category}</Chip>}
          {state.condition && state.condition !== 'Any' && <Chip variant="on">{state.condition}</Chip>}
          {state.campusDelivery && <Chip variant="on">Campus delivery</Chip>}
          {state.highRated && <Chip variant="on">4★ and above</Chip>}
        </div>
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between px-[18px] pb-2">
        <p className="text-[13.5px] text-mute">
          <strong className="text-ink">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</strong> at {SCHOOL}
        </p>
        <span className="text-[13px] text-mute">{state.sort || 'Best match'} ▾</span>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="flex-1 bg-white border border-line rounded-lg mx-[18px] overflow-hidden divide-y divide-line">
          {filtered.map(p => (
            <HorizontalProductRow key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center pb-16 gap-2">
          <p className="text-[38px]">🔍</p>
          <p className="text-[17px] font-extrabold text-ink">No results for "{displayQuery}"</p>
          <p className="text-sm text-mute">Try a different search or remove filters</p>
        </div>
      )}

      <div className="h-6" />
      <BottomTabBar />
    </div>
  )
}
