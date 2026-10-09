import React from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/ui/TopBar'
import RadioOptionCard from '../../components/ui/RadioOptionCard'
import Button from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { ShieldCheck, Mail, CreditCard, Hash, Camera } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { SCHOOL } from '../../data/seed'

export default function VerifyMethod() {
  const navigate = useNavigate()
  const { verificationMethod, setVerificationMethod } = useStore()

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <TopBar title="Verify you are a student" />
      <div className="flex-1 px-[18px] py-4 flex flex-col gap-4 pb-[100px]">
        {/* Info card */}
        <div className="bg-violet-soft rounded-lg p-4 flex gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-violet flex items-center justify-center shrink-0">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <p className="text-[13.5px] text-[#3D3862] leading-snug">
            Verified students get a badge. It tells buyers and sellers you belong to <strong>{SCHOOL}</strong>.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <RadioOptionCard
            selected={verificationMethod === 'email'}
            onSelect={() => setVerificationMethod('email')}
            icon={<Mail size={18} className="text-violet" />}
            title="School email"
            subtitle="Use your official school email address"
          />
          <RadioOptionCard
            selected={verificationMethod === 'id'}
            onSelect={() => setVerificationMethod('id')}
            icon={<CreditCard size={18} className="text-violet" />}
            title="Student ID"
            subtitle="Upload a photo of your student ID card"
          />
          <RadioOptionCard
            selected={verificationMethod === 'regnum'}
            onSelect={() => setVerificationMethod('regnum')}
            icon={<Hash size={18} className="text-violet" />}
            title="Registration number"
            subtitle="Enter your matric / registration number"
          />
        </div>

        {/* Dynamic field */}
        {verificationMethod === 'email' && (
          <Input label="School email address" type="email" placeholder="you@greenfield.edu.ng" />
        )}
        {verificationMethod === 'id' && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-ink">Student ID photo</label>
            <div className="h-[120px] rounded-[14px] border border-dashed border-[#7A55F5] bg-white flex flex-col items-center justify-center gap-2 text-mute cursor-pointer">
              <Camera size={28} className="text-violet" />
              <span className="text-[13px]">Tap to take or upload a photo</span>
            </div>
          </div>
        )}
        {verificationMethod === 'regnum' && (
          <Input label="Registration number" placeholder="GFU/22/0001" />
        )}
      </div>

      <div className="sticky bottom-0 bg-white border-t border-line px-[18px] pt-3 pb-[26px]">
        <Button onClick={() => navigate('/verify/code')}>
          {verificationMethod === 'email' ? 'Send code' : 'Submit for check'}
        </Button>
      </div>
    </div>
  )
}
