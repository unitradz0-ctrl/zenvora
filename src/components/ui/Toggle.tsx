import React from 'react'

interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
  ariaLabel?: string
}

export default function Toggle({ checked, onChange, label, ariaLabel }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel || label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex items-center shrink-0 w-[46px] h-[28px] rounded-full transition-colors ${checked ? 'bg-teal' : 'bg-[#CFC9EA]'}`}
    >
      <span
        className={`absolute w-[22px] h-[22px] bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-[21px]' : 'translate-x-[3px]'}`}
      />
    </button>
  )
}
