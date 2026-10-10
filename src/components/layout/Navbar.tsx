import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell } from 'lucide-react'

interface NavbarProps {
  onSearch?: () => void
}

export default function Navbar({ onSearch }: NavbarProps) {
  const navigate = useNavigate()
  return (
    <div className="sticky top-0 z-40 bg-primary shadow-nav flex items-center justify-between px-4 h-14">
      {/* Logo */}
      <button onClick={() => navigate('/home')} className="flex items-center gap-[6px]">
        <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
          <span className="text-primary font-black text-[14px] leading-none">Z</span>
        </div>
        <span className="text-white font-extrabold text-[17px] tracking-wide">UNITRADZ</span>
      </button>
      {/* Actions */}
      <div className="flex items-center gap-4">
        <button onClick={onSearch ?? (() => navigate('/search'))} aria-label="Search">
          <Search size={20} className="text-white/90" />
        </button>
        <button onClick={() => navigate('/notifications')} className="relative" aria-label="Notifications">
          <Bell size={20} className="text-white/90" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full border border-primary" />
        </button>
      </div>
    </div>
  )
}
