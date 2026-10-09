import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Check } from 'lucide-react'
import Button from '../../components/ui/Button'
import { SCHOOL } from '../../data/seed'

export default function Verified() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-verified-success flex flex-col items-center justify-center px-[18px] text-center gap-6">
      {/* Icon */}
      <div className="w-[120px] h-[120px] rounded-full bg-white/20 flex items-center justify-center">
        <div className="w-[88px] h-[88px] rounded-full bg-white flex items-center justify-center">
          <ShieldCheck size={44} className="text-teal" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-[28px] font-extrabold text-white leading-[1.08] tracking-[-0.025em]">
          You're a verified student
        </h1>
        <p className="text-[16px] text-white/80 leading-[1.45] max-w-[300px] mx-auto">
          Your badge now shows on your profile, so sellers and buyers know you're from {SCHOOL}.
        </p>
      </div>

      {/* Badge */}
      <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2">
        <Check size={16} className="text-teal" />
        <span className="text-[14px] font-bold text-teal">Verified student</span>
      </div>

      <div className="w-full max-w-[320px]">
        <Button variant="gold" onClick={() => navigate('/home')}>
          Start exploring
        </Button>
      </div>
    </div>
  )
}
