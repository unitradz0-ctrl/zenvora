import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Zap, Edit2 } from 'lucide-react'
import TopBar from '../../components/ui/TopBar'
import SegmentedControl from '../../components/ui/SegmentedControl'
import Tag from '../../components/ui/Tag'
import SellerTabBar from '../../components/layout/SellerTabBar'
import { useStore } from '../../store/useStore'
import { fmt } from '../../store/useStore'

const statusColor: Record<string, string> = {
  active: 'teal', promoted: 'gold', sold_out: 'coral', draft: 'grey',
}
const statusLabel: Record<string, string> = {
  active: 'Active', promoted: 'Promoted', sold_out: 'Sold out', draft: 'Draft',
}

export default function SellerListings() {
  const navigate = useNavigate()
  const { listingsState } = useStore()
  const [tab, setTab] = useState('Active (5)')

  const filtered = tab === 'Active (5)'
    ? listingsState.filter(l => l.status === 'active' || l.status === 'promoted')
    : tab === 'Sold out (1)'
    ? listingsState.filter(l => l.status === 'sold_out')
    : listingsState.filter(l => l.status === 'draft')

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar
        title="My listings"
        showBack={false}
        right={
          <button
            aria-label="Add listing"
            onClick={() => navigate('/seller/add-listing')}
            className="w-[38px] h-[38px] rounded-full bg-violet flex items-center justify-center"
          >
            <Plus size={18} className="text-white" />
          </button>
        }
      />

      <div className="px-[18px] mb-3">
        <SegmentedControl
          options={['Active (5)', 'Sold out (1)', 'Drafts (0)']}
          value={tab}
          onChange={setTab}
        />
      </div>

      {/* Usage card */}
      <div className="mx-[18px] mb-4 bg-violet-soft rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[13px] font-bold text-violet">6 of 10 free listings used</p>
          <button onClick={() => navigate('/seller/plans')} className="text-[12px] font-bold text-violet underline">Get more</button>
        </div>
        <div className="h-[6px] rounded-full bg-violet/20">
          <div className="h-full bg-violet rounded-full" style={{ width: '60%' }} />
        </div>
      </div>

      <div className="flex-1 px-[18px] flex flex-col gap-3 pb-6">
        {filtered.map(listing => (
          <div key={listing.id} className="bg-white border border-line rounded-lg p-4 flex items-center gap-3">
            <div
              className="w-[72px] h-[72px] rounded-[12px] flex items-center justify-center text-[36px] shrink-0"
              style={{ backgroundColor: listing.tileColor }}
            >
              {listing.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[14px] font-bold text-ink leading-tight flex-1">{listing.title}</p>
                <Tag variant={statusColor[listing.status] as any}>{statusLabel[listing.status]}</Tag>
              </div>
              <p className="text-[15px] font-extrabold text-violet">{fmt(listing.price)}</p>
              <p className="text-xs text-mute mt-[2px]">{listing.views} views · {listing.stock} left</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                aria-label="Edit listing"
                onClick={() => navigate('/seller/add-listing')}
                className="w-[34px] h-[34px] rounded-full bg-violet-soft flex items-center justify-center"
              >
                <Edit2 size={14} className="text-violet" />
              </button>
              <button
                aria-label="Promote listing"
                onClick={() => navigate('/seller/promote')}
                className="w-[34px] h-[34px] rounded-full bg-gold-soft flex items-center justify-center"
              >
                <Zap size={14} className="text-[#8A5A00]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <SellerTabBar />
    </div>
  )
}
