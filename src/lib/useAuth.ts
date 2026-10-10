import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import type { User, Session } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  email?: string
  fullName: string
  school: string
  isVerifiedSeller: boolean
  isSeller: boolean
  avatarUrl?: string
  phone?: string
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) loadProfile(session.user)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.user) loadProfile(session.user)
      else { setUser(null); setLoading(false) }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function loadProfile(authUser: User) {
    const { data } = await supabase.from('profiles').select('*').eq('id', authUser.id).single()
    if (data) {
      setUser({
        id: authUser.id,
        email: authUser.email,
        fullName: data.full_name,
        school: data.school ?? '',
        isVerifiedSeller: data.is_verified_student,
        isSeller: data.is_seller,
        avatarUrl: data.avatar_url,
        phone: data.phone,
      })
    }
    setLoading(false)
  }

  async function signUp(email: string, password: string, fullName: string, phone?: string) {
    return supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName, phone } },
    })
  }

  async function signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password })
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
  }

  async function sendOTP(email: string) {
    return supabase.auth.signInWithOtp({ email })
  }

  async function verifyOTP(email: string, token: string) {
    return supabase.auth.verifyOtp({ email, token, type: 'email' })
  }

  return { user, session, loading, signUp, signIn, signOut, sendOTP, verifyOTP }
}
