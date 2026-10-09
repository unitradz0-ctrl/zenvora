import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ShieldCheck, Shield, FileText, MoreHorizontal } from 'lucide-react'

const tabs = [
  { to: '/admin/overview', icon: LayoutDashboard, label: 'Overview' },
  { to: '/admin/verify', icon: ShieldCheck, label: 'Verify' },
  { to: '/admin/moderate', icon: Shield, label: 'Moderate' },
  { to: '/admin/reports', icon: FileText, label: 'Reports' },
  { to: '/admin/more', icon: MoreHorizontal, label: 'More' },
]

export default function AdminTabBar() {
  return (
    <nav
      className="sticky bottom-0 z-30 bg-white border-t border-line flex items-end justify-around px-2 h-[74px]"
      aria-label="Admin navigation"
    >
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
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
      ))}
    </nav>
  )
}
