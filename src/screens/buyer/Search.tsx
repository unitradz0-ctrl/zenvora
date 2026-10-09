import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, ChevronRight } from 'lucide-react'
import SearchBar from '../../components/ui/SearchBar'
import Avatar from '../../components/ui/Avatar'
import { sellers } from '../../data/seed'

const INITIAL_RECENT = ['sneakers', 'jollof rice', 'ECO 101 textbook', 'braids', 'phone case']
const trending = [
  'Small chops for hostel party',
  'Calculator for exam week',
  'Thrift jackets',
  'Laundry pickup',
]
const followSellers = sellers.slice(1, 4)

export default function Search() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('sneakers')
  const [recent, setRecent] = useState(INITIAL_RECENT)

  const goToResults = (q: string) => {
    navigate('/results', { state: { query: q } })
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Top search */}
      <div className="sticky top-0 z-20 bg-bg px-[18px] pt-5 pb-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-[40px] h-[40px] rounded-full bg-white border border-line flex items-center justify-center shrink-0"
        >
          <ChevronRight size={20} className="text-ink rotate-180" />
        </button>
        <SearchBar
          value={query}
          onChange={setQuery}
          focusStyle
          className="flex-1"
          onFocus={() => {}}
        />
        <button
          onClick={() => goToResults(query)}
          className="text-violet font-bold text-[14px] shrink-0"
        >
          Search
        </button>
      </div>

      <div className="flex-1 px-[18px] py-2 flex flex-col gap-5 pb-8">
        {/* Recent */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-extrabold text-ink">Recent</h2>
            <button
              className="text-[13px] text-violet font-bold"
              onClick={() => setRecent([])}
            >
              Clear
            </button>
          </div>
          {recent.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {recent.map(r => (
                <button
                  key={r}
                  onClick={() => { setQuery(r); goToResults(r) }}
                  className="flex items-center gap-[6px] bg-white border border-line rounded-full py-[7px] px-[14px] text-[13px] font-bold text-ink"
                >
                  <Clock size={13} className="text-mute" />
                  {r}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-mute">No recent searches</p>
          )}
        </div>

        {/* Trending */}
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-line">
            <h2 className="text-lg font-extrabold text-ink">Trending at Greenfield University</h2>
          </div>
          {trending.map((t, i) => (
            <button
              key={t}
              onClick={() => goToResults(t)}
              className="w-full flex items-center gap-3 px-4 py-3 border-b border-line last:border-0 text-left"
            >
              <span className="text-[14px] font-bold text-violet w-5 shrink-0">{i + 1}</span>
              <span className="flex-1 text-[14px] text-ink">{t}</span>
              <ChevronRight size={16} className="text-mute" />
            </button>
          ))}
        </div>

        {/* Sellers to follow */}
        <div>
          <h2 className="text-lg font-extrabold text-ink mb-3">Sellers to follow</h2>
          <div className="overflow-x-auto no-scrollbar -mx-[18px] px-[18px]">
            <div className="flex gap-3">
              {followSellers.map(s => (
                <button
                  key={s.id}
                  onClick={() => navigate(`/seller-profile/${s.id}`)}
                  className="w-[130px] shrink-0 bg-white border border-line rounded-lg p-3 flex flex-col items-center gap-2 text-center"
                >
                  <Avatar name={s.shopName} color={s.avatarColor} size={52} />
                  <p className="text-[13px] font-bold text-ink leading-tight">{s.shopName}</p>
                  <span className="text-xs text-teal font-semibold">Verified seller</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
