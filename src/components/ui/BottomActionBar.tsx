import React from 'react'

interface BottomActionBarProps {
  children: React.ReactNode
  className?: string
}

export default function BottomActionBar({ children, className = '' }: BottomActionBarProps) {
  return (
    <div className={`sticky bottom-0 z-20 bg-white border-t border-line px-[18px] pt-3 pb-[26px] flex gap-3 ${className}`}>
      {children}
    </div>
  )
}
