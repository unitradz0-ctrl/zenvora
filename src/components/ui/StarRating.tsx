import React from 'react'

interface StarRatingProps {
  value: number
  max?: number
  interactive?: boolean
  onChange?: (v: number) => void
  size?: 'sm' | 'md' | 'lg'
}

export default function StarRating({ value, max = 5, interactive = false, onChange, size = 'sm' }: StarRatingProps) {
  const sz = size === 'lg' ? 38 : size === 'md' ? 24 : 16
  return (
    <div className="flex gap-[2px]" role={interactive ? 'group' : undefined} aria-label={`${value} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.round(value)
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            aria-label={`${i + 1} star`}
            onClick={() => interactive && onChange?.(i + 1)}
            className={`${interactive ? 'cursor-pointer' : 'cursor-default pointer-events-none'} leading-none`}
            style={{ fontSize: sz, lineHeight: 1 }}
          >
            <span style={{ color: filled ? '#FFB300' : '#CFC9EA' }}>★</span>
          </button>
        )
      })}
    </div>
  )
}
