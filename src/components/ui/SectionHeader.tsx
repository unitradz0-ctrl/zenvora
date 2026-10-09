import React from 'react'
import { useNavigate } from 'react-router-dom'

interface SectionHeaderProps {
  title: string
  seeAllHref?: string
  onSeeAll?: () => void
  className?: string
}

export default function SectionHeader({ title, seeAllHref, onSeeAll, className = '' }: SectionHeaderProps) {
  const navigate = useNavigate()
  const handleSeeAll = onSeeAll ?? (seeAllHref ? () => navigate(seeAllHref) : undefined)
  return (
    <div className={`flex items-center justify-between mx-[18px] mt-[22px] mb-[10px] ${className}`}>
      <h2 className="text-lg font-extrabold text-ink">{title}</h2>
      {handleSeeAll && (
        <button onClick={handleSeeAll} className="text-[13px] font-bold text-violet">
          See all
        </button>
      )}
    </div>
  )
}
