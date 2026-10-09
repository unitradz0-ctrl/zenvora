import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Grid, CreditCard, Megaphone, ChevronRight, LogOut } from 'lucide-react'
import AdminTabBar from '../../components/layout/AdminTabBar'
import { useStore } from '../../store/useStore'

const items = [
  { icon: Users, label: 'User management', to: '/admin/users', bg: '#EFEBFF', color: '#5B2EE5' },
  { icon: Grid, label: 'Category management', to: '/admin/categories', bg: '#DDF6F3', color: '#00A99D' },
  { icon: CreditCard, label: 'Transaction monitoring', to: '/admin/transactions', bg: '#FFF3D1', color: '#8A5A00' },
  { icon: Megaphone, label: 'Advertising management', to: '/admin/ads', bg: '#FFE1EE', color: '#E8408C' },
]

export default function AdminMore() {
  const navigate = useNavigate()
  const { logout } = useStore()

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <div className="px-[18px] pt-12 pb-4">
        <h1 className="text-[21px] font-extrabold text-ink">More</h1>
        <p className="text-sm text-mute">ZENVORA admin · Greenfield University</p>
      </div>

      <div className="flex-1 px-[18px] flex flex-col gap-3 pb-6">
        <div className="bg-white border border-line rounded-lg overflow-hidden divide-y divide-line">
          {items.map(item => (
            <button
              key={item.label}
              onClick={() => navigate(item.to)}
              className="w-full flex items-center gap-3 px-4 py-4 text-left"
            >
              <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0" style={{ backgroundColor: item.bg }}>
                <item.icon size={20} style={{ color: item.color }} />
              </div>
              <span className="flex-1 text-[14px] font-semibold text-ink">{item.label}</span>
              <ChevronRight size={16} className="text-mute" />
            </button>
          ))}
        </div>

        <button
          onClick={() => { logout(); navigate('/') }}
          className="w-full bg-white border border-line rounded-lg px-4 py-4 flex items-center gap-3 text-coral"
        >
          <LogOut size={20} />
          <span className="text-[14px] font-semibold">Sign out of admin</span>
        </button>
      </div>

      <AdminTabBar />
    </div>
  )
}
