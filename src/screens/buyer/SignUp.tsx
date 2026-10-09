import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/ui/TopBar'
import { Input } from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { ChevronRight } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function SignUp() {
  const navigate = useNavigate()
  const { login } = useStore()
  const [name, setName] = useState('Tolu Bello')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleCreate = () => {
    login()
    navigate('/verify/method')
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <TopBar title="Create your account" />
      <div className="flex-1 px-[18px] py-4 flex flex-col gap-5">
        <p className="text-base text-mute">Join students already buying and selling at your school.</p>

        <Input label="Full name" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" />

        {/* School selector */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-ink">School</label>
          <button className="h-[50px] rounded-[14px] bg-white border border-[1.5px] border-line px-4 flex items-center justify-between text-[15px] text-ink">
            <span>Greenfield University</span>
            <ChevronRight size={18} className="text-mute" />
          </button>
        </div>

        <Input
          label="Phone number"
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="+234 000 000 0000"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Create a password"
        />

        <p className="text-sm text-mute text-center">
          By continuing you agree to the ZENVORA <span className="text-violet font-semibold">terms</span> and <span className="text-violet font-semibold">community rules</span>.
        </p>

        <Button onClick={handleCreate}>Create account</Button>

        <button onClick={() => navigate('/home')} className="text-[14px] text-violet font-semibold text-center">
          I already have an account
        </button>
      </div>
    </div>
  )
}
