import React from 'react'

type ChipVariant = 'default' | 'on' | 'v'

interface ChipProps {
  children: React.ReactNode
  variant?: ChipVariant
  onClick?: () => void
  className?: string
}

export default function Chip({ children, variant = 'default', onClick, className = '' }: ChipProps) {
  const base = 'inline-flex items-center gap-1 rounded-full text-[13px] font-bold py-[7px] px-[14px] cursor-pointer select-none transition-colors'
  const variants: Record<ChipVariant, string> = {
    default: 'bg-white border border-line text-ink',
    on: 'bg-ink text-white border border-ink',
    v: 'bg-violet-soft text-violet border-transparent',
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
