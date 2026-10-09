import React from 'react'

interface SegmentedControlProps {
  options: string[]
  value: string
  onChange: (v: string) => void
  className?: string
}

export default function SegmentedControl({ options, value, onChange, className = '' }: SegmentedControlProps) {
  return (
    <div className={`flex bg-[#EAE6FA] rounded-full p-[3px] gap-[3px] ${className}`} role="tablist">
      {options.map((opt) => (
        <button
          key={opt}
          role="tab"
          aria-selected={value === opt}
          onClick={() => onChange(opt)}
          className={`flex-1 rounded-full text-[13.5px] font-bold py-[7px] px-3 transition-all ${
            value === opt
              ? 'bg-white text-ink shadow-seg'
              : 'text-mute'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
