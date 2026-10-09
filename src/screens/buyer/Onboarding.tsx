import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/ui/Button'

const slides = [
  {
    emoji: '🛍️',
    bg: '#EFEBFF',
    circle1: '#D5CCFF',
    circle2: '#FFF3D1',
    emoji2: '📦', emoji3: '🎁',
    title: 'Everything your campus sells, in one place',
    body: 'Search shoes, food, textbooks and services from students at your school.',
  },
  {
    emoji: '🛡️',
    bg: '#DDF6F3',
    circle1: '#B8EDE8',
    circle2: '#FFE1EE',
    emoji2: '⭐', emoji3: '✅',
    title: 'Know who you are buying from',
    body: 'Every seller is a verified student, with ratings and reviews from people you know.',
  },
  {
    emoji: '💸',
    bg: '#FFF3D1',
    circle1: '#FFE9C7',
    circle2: '#DDF6F3',
    emoji2: '🏷️', emoji3: '📈',
    title: 'Sell to your whole school',
    body: 'List a product or service in minutes and reach students who are looking right now.',
  },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const { page } = useParams()
  const idx = Math.min(Math.max((parseInt(page || '1') - 1), 0), slides.length - 1)
  const slide = slides[idx]
  const isLast = idx === slides.length - 1

  const next = () => {
    if (isLast) navigate('/signup')
    else navigate(`/onboarding/${idx + 2}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Top bar */}
      <div className="flex justify-end px-[18px] pt-5 pb-2">
        <button onClick={() => navigate('/signup')} className="text-violet font-bold text-[14px]">
          Skip
        </button>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex flex-col items-center justify-center px-[18px] pb-4">
        <div
          className="w-[210px] h-[210px] rounded-full flex items-center justify-center relative mb-6"
          style={{ backgroundColor: slide.bg }}
        >
          {/* Inner white circle */}
          <div className="w-[110px] h-[110px] rounded-full bg-white flex items-center justify-center z-10">
            <span className="text-[58px]">{slide.emoji}</span>
          </div>
          {/* Decorative smaller circles */}
          <div
            className="absolute top-4 right-2 w-[52px] h-[52px] rounded-full flex items-center justify-center text-[26px]"
            style={{ backgroundColor: slide.circle1 }}
          >
            {slide.emoji2}
          </div>
          <div
            className="absolute bottom-6 left-2 w-[44px] h-[44px] rounded-full flex items-center justify-center text-[22px]"
            style={{ backgroundColor: slide.circle2 }}
          >
            {slide.emoji3}
          </div>
        </div>

        <h1 className="text-[28px] font-extrabold text-ink text-center leading-[1.08] tracking-[-0.025em] mb-3 max-w-[300px]">
          {slide.title}
        </h1>
        <p className="text-[16px] text-mute text-center leading-[1.45] max-w-[300px]">
          {slide.body}
        </p>
      </div>

      {/* Bottom bar */}
      <div className="px-[18px] pb-[40px] flex flex-col gap-4 items-center">
        {/* Pagination dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${i === idx ? 'w-[26px] h-[8px] bg-violet' : 'w-2 h-2 bg-[#CFC9EA]'}`}
            />
          ))}
        </div>
        <Button onClick={next}>
          {isLast ? 'Create account' : 'Next'}
        </Button>
      </div>
    </div>
  )
}
