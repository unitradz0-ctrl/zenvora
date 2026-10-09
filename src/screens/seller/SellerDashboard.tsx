import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Plus, TrendingUp, ShoppingBag } from 'lucide-react'
import SellerTabBar from '../../components/layout/SellerTabBar'
import BarChart from '../../components/ui/BarChart'
import Avatar from '../../components/ui/Avatar'
import Tag from '../../components/ui/Tag'
import { sellerOrders, chartData7 } from '../../data/seed'
import { useStore, fmt } from '../../store/useStore'

const recentOrders = sellerOrders.slice(0, 3)

const statusColor: Record<string, string> = {
  new: 'violet', preparing: 'gold', delivered: 'teal',
}
const statusLabel: Record<string, string> = {
  new: 'New', preparing: 'Preparing', delivered: 'Delivered',
}

export default function SellerDashboard() {
  const navigate = useNavigate()
  const { sellerPlan } = useStore()

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Hero */}
      <div className="bg-seller-hero px-[18px] pt-12 pb-6" style={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-[42px] h-[42px] rounded-[12px] bg-gold flex items-center justify-center text-[20px] font-extrabold text-ink shrink-0">T</div>
          <div className="flex-1">
            <p className="text-[17px] font-extrabold text-white">Tolu's Treats</p>
            <p className="text-xs text-white/60">
              {sellerPlan === 'pro' ? 'Pro seller' : 'Free plan · 6 of 10 listings'}
            </p>
          </div>
          <button
            onClick={() => navigate('/home')}
            className="bg-white/15 rounded-full px-3 py-[6px] text-[12px] font-bold text-white"
          >
            Switch to buying
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Sales this week', value: '₦42,500' },
            { label: 'New orders', value: '7' },
            { label: 'Listing views', value: '318' },
          ].map(s => (
            <div key={s.label} className="bg-white/10 rounded-[14px] p-3">
              <p className="text-[18px] font-extrabold text-white">{s.value}</p>
              <p className="text-[11px] text-white/60 mt-[2px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[18px] pt-4 pb-6 flex flex-col gap-4">
        {/* Alert */}
        <div
          className="bg-gold-soft border border-gold/30 rounded-lg p-4 cursor-pointer"
          onClick={() => navigate('/seller/orders')}
        >
          <p className="text-[14px] font-extrabold text-ink">🔔 2 orders waiting for you</p>
          <p className="text-sm text-mute">Accept them before 6pm</p>
        </div>

        {/* Chart */}
        <div className="bg-white border border-line rounded-lg p-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[13px] font-bold text-mute">Last 7 days</p>
            <p className="text-[15px] font-extrabold text-ink">₦118,400 total</p>
          </div>
          <BarChart data={chartData7} />
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Plus, label: 'Add listing', to: '/seller/add-listing', bg: 'bg-violet-soft', color: 'text-violet' },
            { icon: Zap, label: 'Promote', to: '/seller/promote', bg: 'bg-gold-soft', color: 'text-[#8A5A00]' },
            { icon: TrendingUp, label: 'Go Pro', to: '/seller/plans', bg: 'bg-teal-soft', color: 'text-teal' },
          ].map(a => (
            <button
              key={a.label}
              onClick={() => navigate(a.to)}
              className={`${a.bg} rounded-lg p-4 flex flex-col items-center gap-2`}
            >
              <a.icon size={22} className={a.color} />
              <span className={`text-[12px] font-bold ${a.color}`}>{a.label}</span>
            </button>
          ))}
        </div>

        {/* Recent orders */}
        <div>
          <p className="text-lg font-extrabold text-ink mb-3">Recent orders</p>
          <div className="bg-white border border-line rounded-lg overflow-hidden divide-y divide-line">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center gap-3 px-4 py-3">
                <Avatar name={order.buyerName} color="#5B2EE5" size={34} />
                <div className="flex-1">
                  <p className="text-[13.5px] font-bold text-ink">{order.buyerName}</p>
                  <p className="text-xs text-mute">{fmt(order.amount)}</p>
                </div>
                <Tag variant={statusColor[order.status] as any}>{statusLabel[order.status]}</Tag>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SellerTabBar />
    </div>
  )
}
