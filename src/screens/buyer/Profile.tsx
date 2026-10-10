import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShoppingBag, List, Heart,
  ChevronRight, Settings, ShieldCheck, LogOut
} from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import BottomTabBar from '../../components/layout/BottomTabBar'
import Tag from '../../components/ui/Tag'
import Toggle from '../../components/ui/Toggle'
import { useStore, fmt } from '../../store/useStore'
import { buyerOrders } from '../../data/seed'

const quickActions = [
  { icon: <ShoppingBag size={18} className="text-accent" />, label: 'My Orders',   to: '/orders',           bg: '#EFF6FF' },
  { icon: <List size={18} className="text-accent" />,        label: 'My Listings', to: '/seller/listings',  bg: '#EFF6FF' },
  { icon: <Heart size={18} className="text-accent" />,       label: 'Saved Items', to: '/wishlist',         bg: '#EFF6FF' },
  { icon: <ShieldCheck size={18} className="text-accent" />, label: 'Verify',      to: '/verify/method',    bg: '#EFF6FF' },
]

const statusColor: Record<string, string> = {
  delivered: 'text-teal',
  out_for_delivery: 'text-accent',
  new: 'text-gold',
  preparing: 'text-gold',
  cancelled: 'text-coral',
}

export default function Profile() {
  const navigate = useNavigate()
  const {
    pushNotifications, setPushNotifications,
    messageAlerts, setMessageAlerts,
    logout,
  } = useStore()

  const recentOrders = buyerOrders.slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen bg-bg pb-16">
      <Navbar />

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-5 flex flex-col gap-4">

          {/* Profile card */}
          <div className="bg-white border border-line rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shrink-0">
                <span className="text-white text-2xl font-black">S</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <p className="text-[15px] font-extrabold text-ink">Success Nnando</p>
                  <ShieldCheck size={14} className="text-accent" />
                </div>
                <p className="text-xs text-mute">@successnnando</p>
                <p className="text-xs text-mute">Joined Jan 2025</p>
              </div>
              <button
                onClick={() => navigate('/settings')}
                className="w-9 h-9 bg-bg border border-line rounded-full flex items-center justify-center"
              >
                <Settings size={16} className="text-mute" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Listings', value: 12 },
                { label: 'Orders', value: 8 },
                { label: 'Saved', value: 4 },
                { label: 'Messages', value: 24 },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-[16px] font-extrabold text-ink">{s.value}</p>
                  <p className="text-[10px] text-mute">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Complete profile CTA */}
          <div className="bg-gold-soft border border-gold/30 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white text-lg">⭐</span>
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-extrabold text-ink">Complete your profile</p>
              <p className="text-[11px] text-mute">Get better deals, build trust and unlock more opportunities.</p>
            </div>
            <button className="bg-accent text-white text-xs font-bold px-3 py-2 rounded-lg shrink-0">
              Complete →
            </button>
          </div>

          {/* Quick actions */}
          <div>
            <h2 className="text-[14px] font-extrabold text-ink mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map(a => (
                <button
                  key={a.label}
                  onClick={() => navigate(a.to)}
                  className="bg-white border border-line rounded-lg p-3 flex items-center gap-3"
                >
                  <div className="w-9 h-9 bg-blue-soft rounded-lg flex items-center justify-center shrink-0">
                    {a.icon}
                  </div>
                  <span className="text-[13px] font-semibold text-ink">{a.label}</span>
                  <ChevronRight size={14} className="text-mute ml-auto" />
                </button>
              ))}
            </div>
          </div>

          {/* Recent orders */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[14px] font-extrabold text-ink">Recent Orders</h2>
              <button onClick={() => navigate('/orders')} className="text-accent text-xs font-bold flex items-center gap-1">
                View all <ChevronRight size={12} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {recentOrders.map(o => (
                <div key={o.id} className="bg-white border border-line rounded-lg p-3 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-soft flex items-center justify-center shrink-0">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-bold text-ink line-clamp-1">Order #{o.orderNumber}</p>
                    <p className="text-xs text-mute">{fmt(o.amount)}</p>
                  </div>
                  <span className={`text-xs font-bold capitalize ${statusColor[o.status] || 'text-mute'}`}>
                    {o.status.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white border border-line rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-line">
              <p className="text-[12px] font-bold text-mute uppercase tracking-wide">Settings</p>
            </div>
            {[
              { label: 'Push notifications', val: pushNotifications, set: setPushNotifications },
              { label: 'Message alerts', val: messageAlerts, set: setMessageAlerts },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-4 border-b border-line last:border-0">
                <span className="text-[13px] text-ink">{item.label}</span>
                <Toggle checked={item.val} onChange={item.set} ariaLabel={item.label} />
              </div>
            ))}
            <button
              onClick={() => { logout(); navigate('/') }}
              className="w-full flex items-center gap-3 px-4 py-4 text-coral"
            >
              <LogOut size={18} />
              <span className="text-[13px] font-semibold">Log out</span>
            </button>
          </div>

        </div>
      </div>

      <BottomTabBar />
    </div>
  )
}
