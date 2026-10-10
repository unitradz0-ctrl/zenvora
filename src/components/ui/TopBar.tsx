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
  dark?: boolean
}

export default function TopBar({ title, onBack, showBack = true, right, className = '', transparent = false, dark = false }: TopBarProps) {
  const navigate = useNavigate()
  const handleBack = onBack ?? (() => navigate(-1))

  if (dark) {
    return (
      <div className={`sticky top-0 z-20 bg-nav-gradient flex items-center gap-3 px-4 py-3 min-h-[56px] ${className}`}>
        {showBack && (
          <button onClick={handleBack} aria-label="Go back" className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <ArrowLeft size={18} className="text-white" />
          </button>
        )}
        {title && <h1 className="flex-1 text-[17px] font-extrabold text-white leading-tight">{title}</h1>}
        {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
      </div>
    )
  }

  return (
    <div className={`sticky top-0 z-20 flex items-center gap-3 px-4 py-3 min-h-[56px] ${transparent ? 'bg-transparent' : 'bg-white border-b border-line'} ${className}`}>
      {showBack && (
        <button onClick={handleBack} aria-label="Go back" className="w-9 h-9 rounded-full bg-bg border border-line flex items-center justify-center shrink-0">
          <ArrowLeft size={18} className="text-ink" />
        </button>
      )}
      {title && <h1 className="flex-1 text-[17px] font-extrabold text-ink leading-tight">{title}</h1>}
      {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
    </div>
  )
}
