import React from 'react'

interface RadioOptionCardProps {
  selected: boolean
  onSelect: () => void
  icon?: React.ReactNode
  title: string
  subtitle?: string
  price?: string
  priceColor?: string
}

export default function RadioOptionCard({
  selected, onSelect, icon, title, subtitle, price, priceColor = 'text-mute'
}: RadioOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center gap-3 p-4 rounded-[14px] border transition-colors text-left ${
        selected ? 'border-[1.5px] border-violet bg-[#FAF8FF]' : 'border border-line bg-white'
      }`}
    >
      {icon && (
        <div className="w-10 h-10 rounded-[12px] bg-violet-soft flex items-center justify-center shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-bold text-ink">{title}</p>
        {subtitle && <p className="text-sm text-mute mt-[2px] leading-snug">{subtitle}</p>}
      </div>
      {price && <span className={`text-[13px] font-bold ${priceColor} shrink-0`}>{price}</span>}
      <div className={`w-[22px] h-[22px] rounded-full border-2 shrink-0 flex items-center justify-center ${selected ? 'border-violet' : 'border-[#CFC9EA]'}`}>
        {selected && <div className="w-[11px] h-[11px] rounded-full bg-violet" />}
      </div>
    </button>
  )
}
