import React from 'react'

type TagVariant = 'teal' | 'gold' | 'coral' | 'violet' | 'blue' | 'grey'

interface TagProps {
  children: React.ReactNode
  variant?: TagVariant
  className?: string
}

const tagStyles: Record<TagVariant, string> = {
  teal: 'bg-teal-soft text-[#007A71]',
  gold: 'bg-gold-soft text-[#8A5A00]',
  coral: 'bg-coral-soft text-[#C23A34]',
  violet: 'bg-violet-soft text-violet',
  blue: 'bg-blue-soft text-[#1B5FC0]',
  grey: 'bg-[#EEECF6] text-mute',
}

export default function Tag({ children, variant = 'grey', className = '' }: TagProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full text-xs font-bold py-[3px] px-[9px] ${tagStyles[variant]} ${className}`}>
      {children}
    </span>
  )
}
