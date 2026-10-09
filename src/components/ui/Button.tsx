import React from 'react'

type Variant = 'primary' | 'gold' | 'ghost' | 'dark' | 'coral' | 'teal'
type Size = 'default' | 's'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  children: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-violet text-white active:bg-[#4A23C4]',
  gold: 'bg-gold text-ink active:bg-[#E09F00]',
  ghost: 'bg-white text-violet border border-[1.5px] border-violet active:bg-violet-soft',
  dark: 'bg-ink text-white active:bg-[#0e0830]',
  coral: 'bg-coral text-white active:bg-[#E04A44]',
  teal: 'bg-teal text-white active:bg-[#008C82]',
}

export default function Button({
  variant = 'primary',
  size = 'default',
  fullWidth = true,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-bold rounded-full transition-opacity select-none disabled:opacity-50'
  const sizeClass = size === 's'
    ? 'h-[38px] text-[13.5px] px-[18px] w-auto'
    : 'h-[50px] text-[15.5px] px-6'
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
