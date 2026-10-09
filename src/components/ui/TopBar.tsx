import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface TopBarProps {
  title?: string
  onBack?: () => void
  showBack?: boolean
  right?: React.ReactNode
  className?: string
  transparent?: boolean
}

export default function TopBar({ title, onBack, showBack = true, right, className = '', transparent = false }: TopBarProps) {
  const navigate = useNavigate()
  const handleBack = onBack ?? (() => navigate(-1))

  return (
    <div className={`sticky top-0 z-20 flex items-center gap-3 px-[18px] py-3 min-h-[56px] ${transparent ? 'bg-transparent' : 'bg-bg'} ${className}`}>
      {showBack && (
        <button
          onClick={handleBack}
          aria-label="Go back"
          className="w-[40px] h-[40px] rounded-full bg-white border border-line flex items-center justify-center shrink-0"
        >
          <ArrowLeft size={20} className="text-ink" />
        </button>
      )}
      {title && (
        <h1 className="flex-1 text-[19px] font-extrabold text-ink leading-tight">{title}</h1>
      )}
      {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
    </div>
  )
}
