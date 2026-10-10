import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import type { User, Session } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  email?: string
  fullName: string
  school: string
  isVerifiedStudent: boolean
  isSeller: boolean
  avatarUrl?: string
  phone?: string
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) fetchProfile(session.user)
      else setLoading(false)
    })

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.user) fetchProfile(session.user)
      else { setUser(null); setLoading(false) }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(authUser: User) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single()

    if (data) {
      setUser({
        id: authUser.id,
        email: authUser.email,
        fullName: data.full_name,
        school: data.school || 'Greenfield University',
        isVerifiedStudent: data.is_verified_student,
        isSeller: data.is_seller,
        avatarUrl: data.avatar_url,
        phone: data.phone,
      })
    }
    setLoading(false)
  }

  async function signUp(email: string, password: string, fullName: string, phone?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone },
        emailRedirectTo: `${window.location.origin}/verified`,
      },
    })
    return { data, error }
  }

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
  }

  async function sendOTP(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/verified` },
    })
    return { data, error }
  }

  async function verifyOTP(email: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    })
    return { data, error }
  }

  async function updateProfile(updates: Partial<{ full_name: string; phone: string; school: string; avatar_url: string }>) {
    if (!session?.user) return { error: new Error('Not logged in') }
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', session.user.id)
    if (!error && user) {
      setUser({
        ...user,
        fullName: updates.full_name ?? user.fullName,
        phone: updates.phone ?? user.phone,
        school: updates.school ?? user.school,
        avatarUrl: updates.avatar_url ?? user.avatarUrl,
      })
    }
    return { error }
  }

  return { user, session, loading, signUp, signIn, signOut, sendOTP, verifyOTP, updateProfile }
}
