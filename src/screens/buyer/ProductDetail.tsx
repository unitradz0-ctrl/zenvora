import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Heart, Share2, ChevronRight, ShieldCheck, MessageCircle, Flag } from 'lucide-react'
import Button from '../../components/ui/Button'
import BottomActionBar from '../../components/ui/BottomActionBar'
import Tag from '../../components/ui/Tag'
import Avatar from '../../components/ui/Avatar'
import StarRating from '../../components/ui/StarRating'
import ProductTile from '../../components/ui/ProductTile'
import { products, sellers, productReviews } from '../../data/seed'
import { useStore, fmt } from '../../store/useStore'

export default function ProductDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { wishlist, toggleWishlist, addToCart, showToast } = useStore()
  const product = products.find(p => p.id === id) || products[0]
  const seller = sellers.find(s => s.id === product.sellerId) || sellers[1]
  const saved = wishlist.has(product.id)
  const similar = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 2)

  const handleOrder = () => {
    addToCart(product.id)
    navigate('/cart')
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Image hero */}
      <div
        className="relative h-[330px] flex items-center justify-center"
        style={{ backgroundColor: product.tileColor, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
      >
        <span className="text-[150px] leading-none">{product.emoji}</span>
        {/* Floating buttons */}
        <button
          aria-label="Go back"
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-[40px] h-[40px] rounded-full bg-white/90 border border-line flex items-center justify-center"
        >
          <span className="text-ink text-lg">←</span>
        </button>
        <button
          aria-label="Share listing"
          onClick={() => showToast('Link copied')}
          className="absolute top-12 right-14 w-[40px] h-[40px] rounded-full bg-white/90 border border-line flex items-center justify-center"
        >
          <Share2 size={18} className="text-ink" />
        </button>
        <button
          aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-12 right-4 w-[40px] h-[40px] rounded-full bg-white/90 border border-line flex items-center justify-center"
        >
          <Heart size={18} fill={saved ? '#FF5E57' : 'none'} className={saved ? 'text-coral' : 'text-ink'} />
        </button>
        {/* Pagination dots */}
        <div className="absolute bottom-4 flex gap-1">
          <div className="w-5 h-[5px] rounded-full bg-white" />
          <div className="w-[5px] h-[5px] rounded-full bg-white/50" />
          <div className="w-[5px] h-[5px] rounded-full bg-white/50" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-[18px] pb-[100px] overflow-y-auto">
        {/* Tags */}
        <div className="flex gap-2 mt-4">
          <Tag variant="violet">{product.category}</Tag>
          <Tag variant="grey">{product.condition}</Tag>
        </div>

        {/* Title + price */}
        <h1 className="text-[25px] font-extrabold text-ink leading-[1.08] tracking-[-0.025em] mt-2">{product.title}</h1>
        <div className="flex items-center gap-3 mt-1">
          <p className="text-[28px] font-black text-violet">{fmt(product.price)}</p>
          <div className="flex items-center gap-1">
            <StarRating value={product.rating} />
            <span className="text-sm text-mute">{product.rating} ({product.reviewCount})</span>
          </div>
        </div>

        {/* Seller card */}
        <button
          onClick={() => navigate(`/seller-profile/${seller.id}`)}
          className="w-full flex items-center gap-3 bg-white border border-line rounded-lg p-3 mt-4"
        >
          <Avatar name={seller.shopName} color={seller.avatarColor} size={42} />
          <div className="flex-1 text-left">
            <p className="text-[14px] font-bold text-ink">{seller.shopName}</p>
            <div className="flex items-center gap-1">
              <ShieldCheck size={12} className="text-teal" />
              <span className="text-xs text-mute">Verified seller · {seller.school} student</span>
            </div>
          </div>
          <ChevronRight size={18} className="text-mute" />
        </button>

        {/* Description */}
        <div className="mt-4">
          <h2 className="text-lg font-extrabold text-ink mb-2">Details</h2>
          <p className="text-base text-[#3D3862] leading-[1.5]">{product.description}</p>
        </div>

        {/* Info rows */}
        <div className="bg-white border border-line rounded-lg mt-4 overflow-hidden">
          {[
            { label: 'Pickup spot', value: product.pickupSpot || 'Hall B gate' },
            { label: 'Campus delivery', value: product.offerDelivery ? '₦500' : 'Not available' },
            { label: 'In stock', value: `${product.stock || 1} item${product.stock !== 1 ? 's' : ''}` },
          ].map((row, i) => (
            <div key={i} className="flex justify-between px-4 py-3 border-b border-line last:border-0">
              <span className="text-sm text-mute">{row.label}</span>
              <span className="text-sm font-semibold text-ink">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Reviews preview */}
        <div className="mt-5">
          <h2 className="text-lg font-extrabold text-ink mb-3">Reviews</h2>
          {productReviews.slice(0, 1).map(r => (
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

        {/* Similar items */}
        {similar.length > 0 && (
          <>
            <h2 className="text-lg font-extrabold text-ink mt-6 mb-3">Similar items</h2>
            <div className="grid grid-cols-2 gap-3">
              {similar.map(p => <ProductTile key={p.id} product={p} />)}
            </div>
          </>
        )}

        {/* Report link */}
        <button
          onClick={() => navigate('/report', { state: { productTitle: product.title } })}
          className="flex items-center gap-2 mt-6 text-sm text-mute"
        >
          <Flag size={14} />
          Report this listing
        </button>
      </div>

      <BottomActionBar>
        <button
          onClick={() => navigate(`/chat/${seller.id}`)}
          aria-label="Chat with seller"
          className="w-[50px] h-[50px] rounded-full border border-[1.5px] border-violet flex items-center justify-center shrink-0"
        >
          <MessageCircle size={22} className="text-violet" />
        </button>
        <Button variant="ghost" className="flex-1" onClick={() => { addToCart(product.id); navigate('/cart') }}>
          Add to cart
        </Button>
        <Button className="flex-1" onClick={handleOrder}>
          Order now
        </Button>
      </BottomActionBar>
    </div>
  )
}
