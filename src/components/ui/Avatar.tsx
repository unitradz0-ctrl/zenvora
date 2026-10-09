import React from 'react'

interface AvatarProps {
  name: string
  color: string
  size?: 34 | 42 | 52 | 64 | 76 | 92
  className?: string
}

const sizeMap: Record<number, string> = {
  34: 'w-[34px] h-[34px] text-sm',
  42: 'w-[42px] h-[42px] text-base',
  52: 'w-[52px] h-[52px] text-lg',
  64: 'w-[64px] h-[64px] text-xl',
  76: 'w-[76px] h-[76px] text-2xl',
  92: 'w-[92px] h-[92px] text-3xl',
}

export default function Avatar({ name, color, size = 42, className = '' }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase()
  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-white shrink-0 ${sizeMap[size]} ${className}`}
      style={{ backgroundColor: color }}
      aria-label={name}
    >
      {initial}
    </div>
  )
}
