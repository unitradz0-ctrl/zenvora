import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/onboarding/1'), 2500)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div
      className="min-h-screen bg-hero flex flex-col items-center justify-center"
      onClick={() => navigate('/onboarding/1')}
    >
      {/* Logo mark */}
      <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-6">
        <span className="text-primary font-black text-[36px]">U</span>
      </div>

      <h1 className="text-white text-[32px] font-black tracking-widest mb-2">
        UNITRADZ
      </h1>
      <p className="text-white/60 text-sm font-medium tracking-wider">
        Connect · Buy · Sell · Grow
      </p>

      {/* Loading dots */}
      <div className="flex gap-2 mt-16">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white/40"
            style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
    </div>
  )
}
