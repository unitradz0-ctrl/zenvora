import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ChevronLeft, ArrowRight, Loader } from 'lucide-react'
import Button from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuth } from '../../lib/useAuth'

export default function SignUp() {
  const navigate = useNavigate()
  const { signUp, signIn } = useAuth()
  const [isLogin, setIsLogin] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    try {
      if (isLogin) {
        const { error } = await signIn(email, password)
        if (error) { setError(error.message); return }
        navigate('/home')
      } else {
        if (!name) { setError('Please enter your name.'); return }
        const { error } = await signUp(email, password, name, phone)
        if (error) { setError(error.message); return }
        navigate('/home')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-7">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ChevronLeft size={22} className="text-white" />
        </button>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
            <span className="text-primary font-black text-[13px]">Z</span>
          </div>
          <span className="text-white font-extrabold text-lg">UNITRADZ</span>
        </div>
        <h1 className="text-white text-[22px] font-extrabold">
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-white/65 text-sm mt-1">
          {isLogin ? 'Log in to continue' : 'Anyone can join — students, professionals, and businesses.'}
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-4 py-5 flex flex-col gap-4 overflow-y-auto pb-10">
        {/* Toggle */}
        <div className="flex bg-line rounded-lg p-1">
          {['Sign Up', 'Log In'].map((t, i) => (
            <button
              key={t}
              onClick={() => { setIsLogin(i === 1); setError('') }}
              className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${(isLogin ? i === 1 : i === 0) ? 'bg-white text-primary shadow-seg' : 'text-mute'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {!isLogin && (
          <Input label="Full name" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" />
        )}
        <Input label="Email address" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" type="email" />
        {!isLogin && (
          <Input label="Phone number (optional)" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+234 800 000 0000" type="tel" />
        )}

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-ink">Password</label>
          <div className="relative">
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type={showPass ? 'text' : 'password'}
              placeholder="Enter password"
              className="w-full h-[46px] border border-line rounded-lg px-4 pr-12 text-sm text-ink placeholder:text-mute outline-none focus:border-accent bg-white"
            />
            <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2" type="button">
              {showPass ? <EyeOff size={18} className="text-mute" /> : <Eye size={18} className="text-mute" />}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-coral-soft border border-coral/20 rounded-lg px-3 py-2">
            <p className="text-coral text-sm">{error}</p>
          </div>
        )}

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? <Loader size={18} className="animate-spin" /> : isLogin ? 'Log In' : 'Create Account'}
        </Button>

        {/* Guest option */}
        <button
          onClick={() => navigate('/home')}
          className="flex items-center justify-center gap-2 py-2 text-mute text-sm font-semibold"
        >
          Browse as guest — no account needed
          <ArrowRight size={14} className="text-mute" />
        </button>

        {/* Student note */}
        <div className="bg-blue-soft border border-accent/20 rounded-lg p-3">
          <p className="text-[12px] text-accent font-semibold mb-1">🎓 Want to sell?</p>
          <p className="text-[11px] text-mute leading-snug">
            Create an account then verify your identity to get your Verified Seller badge and start listing.
          </p>
        </div>

        <p className="text-xs text-mute text-center">
          By continuing you agree to the UNITRADZ{' '}
          <span className="text-accent font-semibold">Terms</span> and{' '}
          <span className="text-accent font-semibold">Community Rules</span>.
        </p>
      </div>
    </div>
  )
}
