import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MessageCircle, MapPin } from 'lucide-react'
import TopBar from '../../components/ui/TopBar'
import Button from '../../components/ui/Button'
import BottomActionBar from '../../components/ui/BottomActionBar'
import VerticalStepper from '../../components/ui/VerticalStepper'
import Avatar from '../../components/ui/Avatar'
import Tag from '../../components/ui/Tag'
import { sellerOrders, sellerListings, products } from '../../data/seed'
import { useStore, fmt } from '../../store/useStore'

const steps = [
  { label: 'Order accepted', time: '2:20 pm', status: 'done' as const },
  { label: 'Preparing', time: 'Now', status: 'current' as const },
  { label: 'Ready for pickup / delivery', time: '', status: 'pending' as const },
  { label: 'Delivered', time: '', status: 'pending' as const },
]

export default function OrderDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { showToast } = useStore()
  const order = sellerOrders.find(o => o.id === id) || sellerOrders[2]
  const listing = sellerListings.find(l => l.id === order.productId)
    || products.find(p => p.id === order.productId)
  const fee = Math.round(order.amount * 0.03)
  const net = order.amount - fee

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title={`Order #${order.orderNumber}`} />
      <div className="flex-1 px-[18px] flex flex-col gap-4 pb-[100px]">

        {/* Buyer card */}
        <div className="bg-white border border-line rounded-lg p-4 flex items-center gap-3">
          <Avatar name={order.buyerName} color="#5B2EE5" size={42} />
          <div className="flex-1">
            <p className="text-[14px] font-bold text-ink">{order.buyerName}</p>
            <div className="flex items-center gap-1 mt-[2px]">
              <Tag variant="teal" className="text-xs">Verified student</Tag>
            </div>
          </div>
          <button
            aria-label="Chat with buyer"
            onClick={() => navigate(`/chat/${order.buyerId}`)}
            className="w-[38px] h-[38px] rounded-full border border-line flex items-center justify-center"
          >
            <MessageCircle size={16} className="text-ink" />
          </button>
        </div>

        {/* Item + fee */}
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-4 border-b border-line">
            <div
              className="w-[48px] h-[48px] rounded-[10px] flex items-center justify-center text-[26px] shrink-0"
              style={{ backgroundColor: listing ? (listing as any).tileColor : '#FFF0C9' }}
            >
              {listing ? listing.emoji : '📦'}
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-bold text-ink">
                {listing ? listing.title : order.productId}
              </p>
              <p className="text-xs text-mute">Qty 1</p>
            </div>
            <p className="text-[15px] font-extrabold text-violet">{fmt(order.amount)}</p>
          </div>
          <div className="flex justify-between px-4 py-3 border-b border-line">
            <span className="text-sm text-mute">Platform fee (3%)</span>
            <span className="text-sm text-coral">−{fmt(fee)}</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-[15px] font-bold text-ink">You receive</span>
            <span className="text-[15px] font-extrabold text-teal">{fmt(net)}</span>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white border border-line rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-violet-soft flex items-center justify-center shrink-0">
            <MapPin size={18} className="text-violet" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-ink">{order.deliverySpot}</p>
            <p className="text-xs text-mute">
              {order.deliveryOption === 'campus' ? 'Campus delivery' : 'Pickup'} · {order.estimatedDelivery || 'today'}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white border border-line rounded-lg p-4">
          <VerticalStepper steps={steps} />
        </div>
      </div>

      <BottomActionBar>
        <Button onClick={() => showToast('Marked as ready')}>Mark as ready</Button>
      </BottomActionBar>
    </div>
  )
}
