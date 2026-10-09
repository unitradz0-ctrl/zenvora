import React from 'react'
import Button from './Button'

interface EmptyStateProps {
  emoji?: string
  title: string
  subtitle?: string
  buttonLabel?: string
  onButton?: () => void
}

export default function EmptyState({ emoji = '📭', title, subtitle, buttonLabel, onButton }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-8 gap-3">
      <span className="text-[56px] leading-none">{emoji}</span>
      <h2 className="text-lg font-extrabold text-ink">{title}</h2>
      {subtitle && <p className="text-base text-mute max-w-[260px]">{subtitle}</p>}
      {buttonLabel && onButton && (
        <div className="mt-2 w-full max-w-[220px]">
          <Button onClick={onButton}>{buttonLabel}</Button>
        </div>
      )}
    </div>
  )
}
