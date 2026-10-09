import React from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  value?: string
  placeholder?: string
  onChange?: (v: string) => void
  onFocus?: () => void
  onClick?: () => void
  readOnly?: boolean
  focusStyle?: boolean
  className?: string
}

export default function SearchBar({
  value, placeholder = 'Search products and services',
  onChange, onFocus, onClick, readOnly = false, focusStyle = false, className = ''
}: SearchBarProps) {
  return (
    <div
      className={`flex items-center gap-3 h-[50px] rounded-full bg-white px-4 cursor-text ${focusStyle ? 'border border-[1.5px] border-violet' : 'border border-line'} ${className}`}
      onClick={onClick}
    >
      <Search size={18} className="text-mute shrink-0" />
      <input
        type="text"
        value={value ?? ''}
        placeholder={placeholder}
        readOnly={readOnly}
        onFocus={onFocus}
        onChange={e => onChange?.(e.target.value)}
        className="flex-1 bg-transparent text-[15px] text-ink placeholder:text-mute outline-none"
        aria-label="Search"
      />
    </div>
  )
}
