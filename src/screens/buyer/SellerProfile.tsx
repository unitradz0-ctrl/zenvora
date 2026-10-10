import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import Button from '../../components/ui/Button'
import SegmentedControl from '../../components/ui/SegmentedControl'
import ProductTile from '../../components/ui/ProductTile'
import StarRating from '../../components/ui/StarRating'
import Avatar from '../../components/ui/Avatar'
import Tag from '../../components/ui/Tag'
import { sellers, products, publicSellerReviews } from '../../data/seed'
import { useStore, fmt } from '../../store/useStore'

export default function SellerProfile() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { showToast } = useStore()
  const seller = sellers.find(s => s.id === id) || sellers[2]
  const [tab, setTab] = useState('Listings')
  const sellerProducts = products.filter(p => p.sellerId === seller.id).slice(0, 4)

  const stats = [
    { label: 'Rating', value: seller.rating },
    { label: 'Reviews', value: seller.reviewCount },
    { label: 'Sales', value: seller.salesCount },
    { label: 'Reply time', value: seller.replyTime },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Banner */}
      <div className="relative h-[160px] bg-seller-banner flex-shrink-0">
        <button
          aria-label="Go back"
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-[40px] h-[40px] rounded-full bg-white/20 border border-white/20 flex items-center justify-center"
        >
          <span className="text-white text-lg">←</span>
        </button>
        {/* Action buttons */}
        <div className="absolute top-12 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="s"
            onClick={() => showToast(`Following ${seller.shopName}`)}
            className="text-white border-white/60 bg-white/10 hover:bg-white/20"
            fullWidth={false}
          >
            Follow
          </Button>
        </div>
      </div>

      {/* Avatar overlap */}
      <div className="px-[18px] -mt-[38px] mb-2">
        <Avatar name={seller.shopName} color={seller.avatarColor} size={76} className="border-4 border-bg" />
      </div>

      <div className="px-[18px] pb-4">
        <h1 className="text-[24px] font-extrabold text-ink leading-tight">{seller.shopName}</h1>
        <div className="flex gap-2 mt-1 flex-wrap">
          <Tag variant="teal"><ShieldCheck size={11} /> Verified seller</Tag>
          <Tag variant="teal"><ShieldCheck size={11} /> Verified student</Tag>
        </div>
        <p className="text-[14px] text-[#3D3862] mt-2 leading-[1.5]">{seller.bio}</p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {stats.map(s => (
            <div key={s.label} className="bg-white border border-line rounded-lg p-3 text-center">
              <p className="text-[15px] font-extrabold text-ink">{s.value}</p>
              <p className="text-xs text-mute mt-[2px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Segmented control */}
      <div className="px-[18px] mb-4">
        <SegmentedControl options={['Listings', 'Reviews']} value={tab} onChange={setTab} />
      </div>

      {/* Content */}
      {tab === 'Listings' ? (
        <div className="grid grid-cols-2 gap-3 px-[18px] pb-8">
          {sellerProducts.length > 0
            ? sellerProducts.map(p => <ProductTile key={p.id} product={p} />)
            : <p className="col-span-2 text-sm text-mute text-center py-8">No listings yet</p>
          }
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-[18px] pb-8">
          {publicSellerReviews.map(r => (
            <div key={r.id} className="bg-white border border-line rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Avatar name={r.authorName} color={r.authorColor} size={34} />
                <div>
                  <p className="text-[13.5px] font-bold text-ink">{r.authorName}</p>
                  <StarRating value={r.rating} />
                </div>
              </div>
              <p className="text-sm text-[#3D3862]">"{r.text}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
