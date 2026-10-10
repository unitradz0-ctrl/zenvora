import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ChevronLeft } from 'lucide-react'
import Button from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useStore } from '../../store/useStore'

export default function SignUp() {
  const navigate = useNavigate()
  const { login } = useStore()
  const [name, setName] = useState('Tolu Bello')
  const [email, setEmail] = useState('tolu@greenfield.edu.ng')
  const [phone, setPhone] = useState('08012345678')
  const [password, setPassword] = useState('password')
  const [showPass, setShowPass] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  const handleSubmit = () => {
    login()
    navigate('/verify/method')
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <div className="bg-nav-gradient px-4 pt-12 pb-8">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ChevronLeft size={22} className="text-white" />
        </button>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
            <span className="text-primary font-black text-[13px]">U</span>
          </div>
          <span className="text-white font-extrabold text-lg">UNITRADZ</span>
        </div>
        <h1 className="text-white text-[22px] font-extrabold mt-3">
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-white/65 text-sm mt-1">
          {isLogin ? 'Log in to continue' : 'Join millions of students worldwide'}
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-4 py-6 flex flex-col gap-4">
        {/* Toggle */}
        <div className="flex bg-line rounded-lg p-1">
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${!isLogin ? 'bg-white text-primary shadow-seg' : 'text-mute'}`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${isLogin ? 'bg-white text-primary shadow-seg' : 'text-mute'}`}
          >
            Log In
          </button>
        </div>

        {!isLogin && (
          <Input label="Full name" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" />
        )}
        <Input label="Email address" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" type="email" />
        {!isLogin && (
          <Input label="Phone number" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+234 800 000 0000" type="tel" />
        )}

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-ink">Password</label>
          <div className="relative">
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type={showPass ? 'text' : 'password'}
              placeholder="Create a strong password"
              className="w-full h-[46px] border border-line rounded-lg px-4 pr-12 text-sm text-ink placeholder:text-mute outline-none focus:border-accent bg-white"
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPass
                ? <EyeOff size={18} className="text-mute" />
                : <Eye size={18} className="text-mute" />
              }
            </button>
          </div>
        </div>

        <Button onClick={handleSubmit}>
          {isLogin ? 'Log In' : 'Create Account'}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-line" />
          <span className="text-mute text-xs">or continue with</span>
          <div className="flex-1 h-px bg-line" />
        </div>

        {/* Social */}
        <div className="flex gap-3">
          {['G', 'f', 'in'].map(s => (
            <button
              key={s}
              className="flex-1 h-11 border border-line rounded-lg bg-white flex items-center justify-center font-bold text-ink text-sm"
            >
              {s}
            </button>
          ))}
        </div>

        <p className="text-xs text-mute text-center">
          By continuing you agree to the UNITRADZ{' '}
          <span className="text-accent font-semibold">terms</span> and{' '}
          <span className="text-accent font-semibold">community rules</span>.
        </p>
      </div>
    </div>
  )
}
