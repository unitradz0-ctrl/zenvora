import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, List, ShoppingBag, Wallet, Plus } from 'lucide-react'

const tabs = [
  { to: '/seller/dashboard', icon: LayoutDashboard, label: 'Shop' },
  { to: '/seller/listings', icon: List, label: 'Listings' },
  { to: null, icon: Plus, label: 'Add', isCentre: true },
  { to: '/seller/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/seller/wallet', icon: Wallet, label: 'Wallet' },
]

export default function SellerTabBar() {
  const navigate = useNavigate()
  return (
    <nav
      className="sticky bottom-0 z-30 bg-white border-t border-line flex items-end justify-around px-2 h-[74px]"
      aria-label="Seller navigation"
    >
      {tabs.map((tab) => {
        if (tab.isCentre) {
          return (
            <div key="add" className="flex flex-col items-center -mt-[14px]">
              <button
                onClick={() => navigate('/seller/add-listing')}
                aria-label="Add listing"
                className="w-[46px] h-[46px] rounded-[16px] bg-gold flex items-center justify-center shadow-md"
              >
                <Plus size={22} className="text-ink" strokeWidth={2.5} />
              </button>
              <span className="text-tab font-bold text-mute mt-[3px]">Add</span>
            </div>
          )
        }
        return (
          <NavLink
            key={tab.to}
            to={tab.to!}
            end={tab.to === '/seller/dashboard'}
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
