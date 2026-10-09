import React from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/ui/TopBar'
import StarRating from '../../components/ui/StarRating'
import Avatar from '../../components/ui/Avatar'
import SellerTabBar from '../../components/layout/SellerTabBar'
import { sellerReviews } from '../../data/seed'
import { useStore } from '../../store/useStore'

const distribution = [
  { stars: 5, pct: 88 },
  { stars: 4, pct: 9 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
]

export default function SellerReviews() {
  const navigate = useNavigate()
  const { showToast } = useStore()

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="Ratings and reviews" />
      <div className="flex-1 px-[18px] flex flex-col gap-4 pb-6">
        {/* Summary */}
        <div className="bg-white border border-line rounded-lg p-4">
          <div className="flex items-center gap-4">
            <p className="text-[42px] font-black text-ink">4.9</p>
            <div>
              <StarRating value={4.9} size="md" />
              <p className="text-sm text-mute mt-1">76 reviews</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {distribution.map(d => (
              <div key={d.stars} className="flex items-center gap-2">
                <span className="text-xs text-mute w-5 text-right">{d.stars}</span>
                <span className="text-xs text-gold">★</span>
                <div className="flex-1 h-[6px] rounded-full bg-[#EAE6FA]">
                  <div className="h-full bg-gold rounded-full" style={{ width: `${d.pct}%` }} />
                </div>
                <span className="text-xs text-mute w-8 text-right">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        {sellerReviews.map(r => (
          <div key={r.id} className="bg-white border border-line rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Avatar name={r.authorName} color={r.authorColor} size={34} />
              <div className="flex-1">
                <p className="text-[13.5px] font-bold text-ink">{r.authorName}</p>
                <StarRating value={r.rating} />
              </div>
              <span className="text-xs text-mute">{r.date}</span>
            </div>
            <p className="text-sm text-[#3D3862]">"{r.text}"</p>
            <button
              className="text-[13px] font-bold text-violet mt-2"
              onClick={() => showToast('Reply sent')}
            >
              Reply
            </button>
          </div>
        ))}
      </div>
      <SellerTabBar />
    </div>
  )
}
