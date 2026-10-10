import React from 'react'

type Variant = 'primary' | 'gold' | 'ghost' | 'dark' | 'coral' | 'teal' | 'outline'
type Size = 'default' | 's'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  children: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-accent text-white active:bg-accent-dark shadow-btn',
  gold:    'bg-gold text-ink active:bg-yellow-500',
  ghost:   'bg-white text-accent border border-[1.5px] border-accent active:bg-blue-soft',
  outline: 'bg-transparent text-white border border-[1.5px] border-white/40 active:bg-white/10',
  dark:    'bg-primary text-white active:bg-primary-dark',
  coral:   'bg-coral text-white active:opacity-80',
  teal:    'bg-teal text-white active:bg-teal/80',
}

export default function Button({
  variant = 'primary',
  size = 'default',
  fullWidth = true,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-bold rounded-full transition-all select-none disabled:opacity-50'
  const sizeClass = size === 's'
    ? 'h-[38px] text-[13px] px-[18px] w-auto'
    : 'h-[50px] text-[15px] px-6'
  const widthClass = fullWidth && size !== 's' ? 'w-full' : ''

  return (
    <button
      className={`${base} ${sizeClass} ${widthClass} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
