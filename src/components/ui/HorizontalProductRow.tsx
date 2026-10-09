import React from 'react'
import { Heart, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import Tag from './Tag'
import type { Product } from '../../types'
import { fmt } from '../../store/useStore'

interface HorizontalProductRowProps {
  product: Product
}

export default function HorizontalProductRow({ product }: HorizontalProductRowProps) {
  const navigate = useNavigate()
  const { wishlist, toggleWishlist } = useStore()
  const saved = wishlist.has(product.id)

  return (
    <div
      className="flex items-center gap-3 py-3 px-[18px] cursor-pointer active:bg-[#F7F5FF]"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Thumbnail */}
      <div
        className="w-[96px] h-[96px] rounded-[12px] flex items-center justify-center shrink-0 relative"
        style={{ backgroundColor: product.tileColor }}
      >
        <span className="text-[40px]">{product.emoji}</span>
        {product.promoted && (
          <div className="absolute top-1 left-1">
            <Tag variant="gold">Promo</Tag>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-bold text-ink leading-tight line-clamp-2">{product.title}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-mute truncate">{product.seller}</span>
          {product.sellerVerified && <ShieldCheck size={11} className="text-teal shrink-0" />}
          <span className="text-xs text-mute mx-1">·</span>
          <span className="text-xs text-[#FFB300]">★</span>
          <span className="text-xs text-mute">{product.rating} ({product.reviewCount})</span>
        </div>
        <p className="text-[15px] font-extrabold text-violet mt-1">{fmt(product.price)}</p>
        {product.id === 'p2' && <Tag variant="teal" className="mt-1">Lowest price</Tag>}
      </div>
      {/* Heart */}
      <button
        aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
        onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id) }}
        className="shrink-0 w-[34px] h-[34px] flex items-center justify-center"
      >
        <Heart size={20} fill={saved ? '#FF5E57' : 'none'} className={saved ? 'text-coral' : 'text-mute'} />
      </button>
    </div>
  )
}
