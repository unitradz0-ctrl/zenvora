import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Users, Plus, ShoppingBag, User } from 'lucide-react'

const tabs = [
  { to: '/home',        icon: Home,        label: 'Home' },
  { to: '/communities', icon: Users,        label: 'Communities' },
  { to: null,           icon: Plus,         label: '',      isCentre: true },
  { to: '/orders',      icon: ShoppingBag,  label: 'Orders' },
  { to: '/profile',     icon: User,         label: 'Profile' },
]

export default function BottomTabBar() {
  const navigate = useNavigate()
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-line flex items-center justify-around px-2 h-16"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Main navigation"
    >
      {tabs.map((tab, i) => {
        if (tab.isCentre) {
          return (
            <button
              key="centre"
              onClick={() => navigate('/marketplace')}
              aria-label="Marketplace"
              className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-btn -mt-2"
            >
              <Plus size={24} className="text-white" strokeWidth={2.5} />
            </button>
          )
        }
        return (
          <NavLink
            key={tab.to}
            to={tab.to!}
            end={tab.to === '/home'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-[2px] min-w-[48px] py-1 ${isActive ? 'text-accent' : 'text-mute'}`
            }
            aria-label={tab.label}
          >
            {({ isActive }) => (
              <>
                <tab.icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
                <span className="text-[10px] font-semibold">{tab.label}</span>
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
