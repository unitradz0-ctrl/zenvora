import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/ui/Button'

const slides = [
  {
    emoji: '🌍',
    title: 'Your Community,\nYour Marketplace',
    desc: 'Join your university community, discover products and services from fellow students, and connect with people around the world.',
    color: '#0A2463',
  },
  {
    emoji: '🛍️',
    title: 'Buy, Sell &\nGrow Together',
    desc: 'List your products and services, reach thousands of students, and grow your campus business with powerful seller tools.',
    color: '#1E40AF',
  },
  {
    emoji: '🏍️',
    title: 'Fast & Reliable\nDelivery',
    desc: 'Get anything delivered to your door with our verified campus dispatch riders. Real-time tracking and safe payments.',
    color: '#1A3A8F',
  },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const { page } = useParams()
  const idx = Math.min(Math.max(Number(page) - 1, 0), slides.length - 1)
  const slide = slides[idx]
  const isLast = idx === slides.length - 1

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: slide.color }}>
      {/* Skip */}
      <div className="flex justify-end px-5 pt-5">
        <button
          onClick={() => navigate('/signup')}
          className="text-white/60 text-sm font-semibold"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-24 h-24 bg-white/15 rounded-3xl flex items-center justify-center text-[52px] mb-8">
          {slide.emoji}
        </div>
        <h1 className="text-white text-[26px] font-black leading-snug mb-4 whitespace-pre-line">
          {slide.title}
        </h1>
        <p className="text-white/70 text-sm leading-relaxed max-w-[300px]">
          {slide.desc}
        </p>
      </div>

      {/* Dots + CTA */}
      <div className="px-6 pb-12">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-[6px] rounded-full transition-all ${i === idx ? 'w-6 bg-white' : 'w-[6px] bg-white/30'}`}
            />
          ))}
        </div>

        {isLast ? (
          <Button onClick={() => navigate('/signup')}>
            Create Account
          </Button>
        ) : (
          <Button onClick={() => navigate(`/onboarding/${idx + 2}`)}>
            Next
          </Button>
        )}
      </div>
    </div>
  )
}
