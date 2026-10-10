import React from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/ui/TopBar'
import RadioOptionCard from '../../components/ui/RadioOptionCard'
import Button from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { ShieldCheck, Mail, CreditCard, Hash, Camera } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function VerifyMethod() {
  const navigate = useNavigate()
  const { verificationMethod, setVerificationMethod } = useStore()

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <TopBar title="Seller verification" />

      <div className="flex-1 px-4 py-4 flex flex-col gap-4 pb-[100px]">

        {/* Info card */}
        <div className="bg-blue-soft rounded-lg p-4 flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-ink mb-1">Required to start selling</p>
            <p className="text-[12.5px] text-mute leading-snug">
              Verify your student status to get the <strong className="text-accent">Verified Seller badge</strong>.
              This builds trust with buyers and unlocks all selling features.
            </p>
          </div>
        </div>

        {/* Methods */}
        <div className="flex flex-col gap-3">
          <RadioOptionCard
            selected={verificationMethod === 'email'}
            onSelect={() => setVerificationMethod('email')}
            icon={<Mail size={18} className="text-accent" />}
            title="School email"
            subtitle="Use your official school email address"
          />
          <RadioOptionCard
            selected={verificationMethod === 'id'}
            onSelect={() => setVerificationMethod('id')}
            icon={<CreditCard size={18} className="text-accent" />}
            title="Student ID"
            subtitle="Upload a photo of your student ID card"
          />
          <RadioOptionCard
            selected={verificationMethod === 'regnum'}
            onSelect={() => setVerificationMethod('regnum')}
            icon={<Hash size={18} className="text-accent" />}
            title="Registration number"
            subtitle="Enter your matric / registration number"
          />
        </div>

        {/* Dynamic field */}
        {verificationMethod === 'email' && (
          <Input label="School email address" type="email" placeholder="you@university.edu.ng" />
        )}
        {verificationMethod === 'id' && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-ink">Student ID photo</label>
            <div className="h-[120px] rounded-lg border-2 border-dashed border-accent/40 bg-white flex flex-col items-center justify-center gap-2 cursor-pointer">
              <Camera size={28} className="text-accent" />
              <span className="text-[13px] text-mute">Tap to take or upload a photo</span>
            </div>
          </div>
        )}
        {verificationMethod === 'regnum' && (
          <Input label="Registration / matric number" placeholder="e.g. GFU/22/0001" />
        )}

        {/* Note for non-students */}
        <div className="bg-bg border border-line rounded-lg p-3">
          <p className="text-[11px] text-mute leading-snug">
            <strong className="text-ink">Not a student?</strong> You can still sell on UNITRADZ —
            use your business registration or a government-issued ID instead.
            Contact <span className="text-accent">support@unitradz.com</span> to apply.
          </p>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-line px-4 pt-3 pb-6">
        <Button onClick={() => navigate('/verify/code')}>
          {verificationMethod === 'email' ? 'Send code' : 'Submit for review'}
        </Button>
      </div>
    </div>
  )
}
