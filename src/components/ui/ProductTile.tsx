import React from 'react'
import { Heart, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import Tag from './Tag'
import type { Product } from '../../types'
import { fmt } from '../../store/useStore'

interface ProductTileProps {
  product: Product
  className?: string
}

export default function ProductTile({ product, className = '' }: ProductTileProps) {
  const navigate = useNavigate()
  const { wishlist, toggleWishlist } = useStore()
  const saved = wishlist.has(product.id)

  return (
    <div
      className={`bg-white border border-line rounded-lg overflow-hidden cursor-pointer ${className}`}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image area */}
      <div
        className="relative h-[118px] rounded-[12px] m-2 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: product.tileColor }}
      >
        <span className="text-[52px]" role="img" aria-label={product.title}>{product.emoji}</span>
        {product.promoted && (
          <div className="absolute top-2 left-2">
            <Tag variant="gold">Promoted</Tag>
          </div>
        )}
        <button
          aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id) }}
          className="absolute top-2 right-2 w-[32px] h-[32px] rounded-full bg-white/92 flex items-center justify-center"
        >
          <Heart size={16} fill={saved ? '#FF5E57' : 'none'} className={saved ? 'text-coral' : 'text-mute'} />
        </button>
      </div>
      {/* Content */}
      <div className="px-2 pb-3 pt-1">
        <p className="text-[13.5px] font-bold text-ink leading-tight line-clamp-2">{product.title}</p>
        <p className="text-[15px] font-extrabold text-violet mt-1">{fmt(product.price)}</p>
        <div className="flex items-center gap-1 mt-[3px]">
          <span className="text-xs text-mute truncate">{product.seller}</span>
          {product.sellerVerified && <ShieldCheck size={12} className="text-teal shrink-0" />}
        </div>
      </div>
    </div>
  )
}
