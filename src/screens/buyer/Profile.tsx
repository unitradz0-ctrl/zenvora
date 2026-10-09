import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Heart, ShoppingBag, ShieldCheck, Bell, ChevronRight,
  HelpCircle, LogOut
} from 'lucide-react'
import TopBar from '../../components/ui/TopBar'
import Toggle from '../../components/ui/Toggle'
import Avatar from '../../components/ui/Avatar'
import Tag from '../../components/ui/Tag'
import BuyerTabBar from '../../components/layout/BuyerTabBar'
import { useStore } from '../../store/useStore'
import { SCHOOL } from '../../data/seed'

export default function Profile() {
  const navigate = useNavigate()
  const {
    pushNotifications, setPushNotifications,
    messageAlerts, setMessageAlerts,
    dealsAlerts, setDealsAlerts,
    showSchool, setShowSchool,
    logout,
  } = useStore()

  const stats = [
    { label: 'Orders', value: 3 },
    { label: 'Saved', value: 3 },
    { label: 'Rating', value: '4.9' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <TopBar title="Profile" showBack={false} />
      <div className="flex-1 overflow-y-auto px-[18px] flex flex-col gap-4 pb-6">

        {/* Profile card */}
        <div className="bg-white border border-line rounded-lg p-4 flex items-center gap-4">
          <Avatar name="Tolu Bello" color="#5B2EE5" size={64} />
          <div className="flex-1">
            <p className="text-[17px] font-extrabold text-ink">Tolu Bello</p>
            <p className="text-sm text-mute">{SCHOOL}</p>
            <Tag variant="teal" className="mt-1"><ShieldCheck size={11} /> Verified student</Tag>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map(s => (
            <div key={s.label} className="bg-white border border-line rounded-lg p-3 text-center">
              <p className="text-[22px] font-extrabold text-ink">{s.value}</p>
              <p className="text-xs text-mute">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Switch to selling */}
        <button
          onClick={() => navigate('/seller/setup')}
          className="w-full bg-gold-soft border border-gold/30 rounded-lg p-4 flex items-center justify-between"
        >
          <div>
            <p className="text-[15px] font-extrabold text-ink">Switch to selling</p>
            <p className="text-sm text-mute">Manage your shop, orders and earnings</p>
          </div>
          <ChevronRight size={20} className="text-mute" />
        </button>

        {/* Nav links */}
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          {[
            { icon: Heart, label: 'Wishlist', to: '/wishlist' },
            { icon: ShoppingBag, label: 'My orders', to: '/orders' },
            {
              icon: ShieldCheck, label: 'Student verification',
              to: '/verify/method',
              right: <Tag variant="teal">Verified</Tag>
            },
            { icon: Bell, label: 'Notifications', to: '/notifications' },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.to)}
              className="w-full flex items-center gap-3 px-4 py-4 border-b border-line last:border-0 text-left"
            >
              <item.icon size={20} className="text-mute shrink-0" />
              <span className="flex-1 text-[14px] font-semibold text-ink">{item.label}</span>
              {item.right || <ChevronRight size={16} className="text-mute" />}
            </button>
          ))}
        </div>

        {/* Settings toggles */}
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-line">
            <p className="text-[13px] font-bold text-mute uppercase tracking-wide">Settings</p>
          </div>
          {[
            { label: 'Push notifications', val: pushNotifications, set: setPushNotifications },
            { label: 'Message alerts', val: messageAlerts, set: setMessageAlerts },
            { label: 'Deals and price drops', val: dealsAlerts, set: setDealsAlerts },
            { label: 'Show my school on profile', val: showSchool, set: setShowSchool },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-4 border-b border-line last:border-0">
              <span className="text-[14px] text-ink">{item.label}</span>
              <Toggle checked={item.val} onChange={item.set} ariaLabel={item.label} />
            </div>
          ))}
        </div>

        {/* Help + Logout */}
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          <button className="w-full flex items-center gap-3 px-4 py-4 border-b border-line">
            <HelpCircle size={20} className="text-mute" />
            <span className="text-[14px] font-semibold text-ink">Help and support</span>
            <ChevronRight size={16} className="text-mute ml-auto" />
          </button>
          <button
            onClick={() => { logout(); navigate('/') }}
            className="w-full flex items-center gap-3 px-4 py-4 text-coral"
          >
            <LogOut size={20} />
            <span className="text-[14px] font-semibold">Log out</span>
          </button>
        </div>

      </div>
      <BuyerTabBar />
    </div>
  )
}
