import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Compass, ShoppingBag, MessageCircle, User } from 'lucide-react'

const tabs = [
  { to: '/home',          icon: Home,          label: 'Home' },
  { to: '/explore',       icon: Compass,       label: 'Explore' },
  { to: '/cart',          icon: ShoppingBag,   label: 'Cart',    isCentre: true },
  { to: '/chat/general',  icon: MessageCircle, label: 'Messages' },
  { to: '/profile',       icon: User,          label: 'Profile' },
]

export default function BottomTabBar() {
  const navigate = useNavigate()
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-line flex items-end justify-around px-2 h-16 pb-safe"
      aria-label="Main navigation"
    >
      {tabs.map(tab => {
        if (tab.isCentre) {
          return (
            <div key="cart" className="flex flex-col items-center -mt-3">
              <button
                onClick={() => navigate('/cart')}
                aria-label="Cart"
                className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-btn"
              >
                <ShoppingBag size={22} className="text-white" />
              </button>
              <span className="text-tab font-bold text-mute mt-[2px]">Cart</span>
            </div>
          )
        }
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/home'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-end pb-2 pt-1 gap-[2px] min-w-[44px] ${isActive ? 'text-accent' : 'text-mute'}`
            }
            aria-label={tab.label}
          >
            {({ isActive }) => (
              <>
                <tab.icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
                <span className="text-tab font-semibold">{tab.label}</span>
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
