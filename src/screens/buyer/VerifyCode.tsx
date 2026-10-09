import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/ui/TopBar'
import Button from '../../components/ui/Button'

const CODE_LENGTH = 6

export default function VerifyCode() {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const digits = value.split('').concat(Array(CODE_LENGTH).fill('')).slice(0, CODE_LENGTH)
  const activeIndex = Math.min(value.length, CODE_LENGTH - 1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, CODE_LENGTH)
    setValue(raw)
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <TopBar title="Enter the code" />
      <div className="flex-1 px-[18px] py-6 flex flex-col gap-6">
        <p className="text-[15px] text-mute">
          We sent a 6-digit code to <strong className="text-ink">tolu@greenfield.edu.ng</strong>
        </p>

        {/* OTP boxes — clicking anywhere on the row focuses the hidden input */}
        <div
          className="flex gap-2 justify-center cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {digits.map((d, i) => (
            <div
              key={i}
              className={`w-[46px] h-[56px] rounded-[14px] bg-white border-[1.5px] flex items-center justify-center text-[24px] font-extrabold text-ink transition-colors ${
                i === activeIndex && document.activeElement === inputRef.current
                  ? 'border-violet'
                  : d
                  ? 'border-violet/40'
                  : 'border-line'
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Hidden real input that captures keystrokes */}
        <input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={CODE_LENGTH}
          aria-label="One-time code"
          className="sr-only"
        />

        <p className="text-[13.5px] text-mute text-center">
          Didn't get it?{' '}
          <button
            className="text-violet font-bold"
            onClick={() => setValue('')}
          >
            Resend code
          </button>
        </p>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-line px-[18px] pt-3 pb-[26px]">
        <Button
          onClick={() => navigate('/verified')}
          disabled={value.length < CODE_LENGTH}
        >
          Verify
        </Button>
      </div>
    </div>
  )
}
