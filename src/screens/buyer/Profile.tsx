import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Heart, ShoppingBag, ShieldCheck, Bell, ChevronRight,
  HelpCircle, LogOut, Store, Settings
} from 'lucide-react'
import Toggle from '../../components/ui/Toggle'
import Tag from '../../components/ui/Tag'
import BottomTabBar from '../../components/layout/BottomTabBar'
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

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-nav-gradient px-4 pt-12 pb-6">
        <h1 className="text-white text-[20px] font-extrabold mb-4">Profile</h1>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
            <span className="text-white text-2xl font-black">T</span>
          </div>
          <div className="flex-1">
            <p className="text-white text-[17px] font-extrabold">Tolu Bello</p>
            <p className="text-white/65 text-sm">{SCHOOL}</p>
            <div className="flex items-center gap-1 mt-1">
              <ShieldCheck size={12} className="text-teal" />
              <span className="text-teal text-xs font-semibold">Verified student</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/settings')}
            className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center"
          >
            <Settings size={16} className="text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 pb-24">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[{ label: 'Orders', value: 3 }, { label: 'Saved', value: 3 }, { label: 'Rating', value: '4.9' }].map(s => (
            <div key={s.label} className="bg-white border border-line rounded-lg p-3 text-center">
              <p className="text-[20px] font-extrabold text-ink">{s.value}</p>
              <p className="text-xs text-mute">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Switch to selling */}
        <button
          onClick={() => navigate('/seller/setup')}
          className="w-full bg-accent/10 border border-accent/20 rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Store size={18} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-[14px] font-extrabold text-ink">Switch to selling</p>
              <p className="text-xs text-mute">Manage your shop, orders and earnings</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-mute" />
        </button>

        {/* Nav links */}
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          {[
            { icon: Heart, label: 'Wishlist', to: '/wishlist' },
            { icon: ShoppingBag, label: 'My orders', to: '/orders' },
            { icon: ShieldCheck, label: 'Student verification', to: '/verify/method', right: <Tag variant="teal">Verified</Tag> },
            { icon: Bell, label: 'Notifications', to: '/notifications' },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.to)}
              className="w-full flex items-center gap-3 px-4 py-4 border-b border-line last:border-0"
            >
              <item.icon size={18} className="text-mute shrink-0" />
              <span className="flex-1 text-[14px] font-semibold text-ink text-left">{item.label}</span>
              {item.right || <ChevronRight size={16} className="text-mute" />}
            </button>
          ))}
        </div>

        {/* Settings toggles */}
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-line">
            <p className="text-[12px] font-bold text-mute uppercase tracking-wide">Settings</p>
          </div>
          {[
            { label: 'Push notifications', val: pushNotifications, set: setPushNotifications },
            { label: 'Message alerts', val: messageAlerts, set: setMessageAlerts },
            { label: 'Deals and price drops', val: dealsAlerts, set: setDealsAlerts },
            { label: 'Show my school on profile', val: showSchool, set: setShowSchool },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-4 border-b border-line last:border-0">
              <span className="text-[13px] text-ink">{item.label}</span>
              <Toggle checked={item.val} onChange={item.set} ariaLabel={item.label} />
            </div>
          ))}
        </div>

        {/* Help + Logout */}
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          <button className="w-full flex items-center gap-3 px-4 py-4 border-b border-line">
            <HelpCircle size={18} className="text-mute" />
            <span className="flex-1 text-[14px] font-semibold text-ink text-left">Help and support</span>
            <ChevronRight size={16} className="text-mute ml-auto" />
          </button>
          <button
            onClick={() => { logout(); navigate('/') }}
            className="w-full flex items-center gap-3 px-4 py-4 text-coral"
          >
            <LogOut size={18} />
            <span className="text-[14px] font-semibold">Log out</span>
          </button>
        </div>
      </div>

      <BottomTabBar />
    </div>
  )
}
