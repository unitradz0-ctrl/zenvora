import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Compass, ShoppingBag, User, Plus } from 'lucide-react'

const tabs = [
  { to: '/home', icon: Home, label: 'Home' },
  { to: '/explore', icon: Compass, label: 'Explore' },
  { to: null, icon: Plus, label: 'Sell', isCentre: true },
  { to: '/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export default function BuyerTabBar() {
  const navigate = useNavigate()
  return (
    <nav
      className="sticky bottom-0 z-30 bg-white border-t border-line flex items-end justify-around px-2 h-[74px]"
      aria-label="Main navigation"
    >
      {tabs.map((tab) => {
        if (tab.isCentre) {
          return (
            <div key="sell" className="flex flex-col items-center -mt-[14px]">
              <button
                onClick={() => navigate('/seller/dashboard')}
                aria-label="Sell"
                className="w-[46px] h-[46px] rounded-[16px] bg-gold flex items-center justify-center shadow-md"
              >
                <Plus size={22} className="text-ink" strokeWidth={2.5} />
              </button>
              <span className="text-tab font-bold text-mute mt-[3px]">Sell</span>
            </div>
          )
        }
        return (
          <NavLink
            key={tab.to}
            to={tab.to!}
            className={({ isActive }) =>
              `flex flex-col items-center justify-end pb-2 pt-1 gap-[3px] ${isActive ? 'text-violet' : 'text-[#9993BB]'}`
            }
            aria-label={tab.label}
          >
            {({ isActive }) => (
              <>
                <tab.icon size={23} strokeWidth={isActive ? 2.2 : 1.9} />
                <span className="text-tab font-bold">{tab.label}</span>
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
