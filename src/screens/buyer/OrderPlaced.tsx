import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Check } from 'lucide-react'
import Button from '../../components/ui/Button'
import BottomActionBar from '../../components/ui/BottomActionBar'
import { products } from '../../data/seed'
import { fmt } from '../../store/useStore'

interface OrderState {
  orderNumber?: string
  productId?: string
  total?: number
  deliveryOption?: string
}

export default function OrderPlaced() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state as OrderState) || {}

  const orderNumber = state.orderNumber || 'ZV-20483'
  const product = products.find(p => p.id === state.productId) || products[0]
  const total = state.total ?? 19000
  const deliveryLabel = state.deliveryOption === 'pickup' ? 'Pickup' : 'Campus delivery'
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Success icon */}
      <div className="flex flex-col items-center px-[18px] pt-16 pb-8">
        <div className="w-[100px] h-[100px] rounded-full bg-teal-soft flex items-center justify-center mb-6">
          <div className="w-[72px] h-[72px] rounded-full bg-teal-soft border-[6px] border-teal/20 flex items-center justify-center">
            <Check size={36} className="text-teal" strokeWidth={2.5} />
          </div>
        </div>
        <h1 className="text-[28px] font-extrabold text-ink text-center leading-[1.08]">Order placed</h1>
        <p className="text-[15px] text-mute text-center mt-2 leading-[1.5] max-w-[300px]">
          {product.seller} has been notified and will confirm shortly. We'll message you when it's on the way.
        </p>
      </div>

      {/* Order card */}
      <div className="mx-[18px]">
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-line">
            <p className="text-xs text-mute">Order number</p>
            <p className="text-[15px] font-extrabold text-ink">#{orderNumber}</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
            <div className="w-[48px] h-[48px] rounded-[10px] flex items-center justify-center text-[26px] shrink-0" style={{ backgroundColor: product.tileColor }}>
              {product.emoji}
            </div>
            <div>
              <p className="text-[13.5px] font-bold text-ink">{product.title}</p>
              <p className="text-xs text-mute">Qty 1</p>
            </div>
          </div>
          <div className="flex justify-between px-4 py-3 border-b border-line">
            <span className="text-sm text-mute">{deliveryLabel}</span>
            <span className="text-sm font-semibold text-ink">Today by 7pm</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-[15px] font-bold text-ink">Total</span>
            <span className="text-[15px] font-extrabold text-violet">{fmt(total)}</span>
          </div>
        </div>
      </div>

      <BottomActionBar>
        <Button variant="ghost" className="flex-1" onClick={() => navigate('/home')}>Keep browsing</Button>
        <Button className="flex-1" onClick={() => navigate('/track/o1')}>Track order</Button>
      </BottomActionBar>
    </div>
  )
}
