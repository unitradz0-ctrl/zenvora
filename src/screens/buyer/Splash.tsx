import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'

export default function Splash() {
  const navigate = useNavigate()
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-splash px-[18px]"
      onClick={() => navigate('/onboarding/1')}
    >
      {/* Decorative circles */}
      <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full bg-white/8 pointer-events-none" />
      <div className="absolute bottom-[-40px] left-[-50px] w-[160px] h-[160px] rounded-full bg-teal/20 pointer-events-none" />
      <div className="absolute top-1/3 left-8 w-3 h-3 rounded-full bg-coral/60 pointer-events-none" />

      <div className="flex flex-col items-center gap-5 z-10">
        {/* Logo mark */}
        <div
          className="w-[88px] h-[88px] rounded-[26px] bg-gold flex items-center justify-center shadow-lg"
          aria-hidden="true"
        >
          <span className="text-[52px] font-black text-ink leading-none select-none">Z</span>
        </div>
        {/* Wordmark */}
        <h1
          className="text-[34px] font-black text-white"
          style={{ letterSpacing: '0.2em' }}
        >
          ZENVORA
        </h1>
        {/* Tagline */}
        <p className="text-[17px] text-white/85 text-center max-w-[240px] leading-snug">
          Buy, sell and grow on your campus.
        </p>
      </div>

      {/* CTA */}
      <div className="absolute bottom-[52px] w-full px-[18px]" onClick={e => e.stopPropagation()}>
        <Button variant="gold" onClick={() => navigate('/onboarding/1')}>
          Get started
        </Button>
      </div>
    </div>
  )
}
