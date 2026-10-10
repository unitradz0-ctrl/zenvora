import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from './supabase'
import type { Session, User } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  email?: string
  fullName: string
  phone?: string
  school?: string
  isVerifiedSeller: boolean
  isSeller: boolean
  avatarUrl?: string
}

interface AuthContextType {
  user: AuthUser | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string, phone?: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
    setUser({
      id: authUser.id,
      email: authUser.email,
      fullName: data?.full_name ?? authUser.email ?? 'User',
      phone: data?.phone,
      school: data?.school,
      isVerifiedSeller: data?.is_verified_student ?? false,
      isSeller: data?.is_seller ?? false,
      avatarUrl: data?.avatar_url,
    })
    setLoading(false)
  }

  async function signUp(email: string, password: string, fullName: string, phone?: string) {
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName, phone } },
    })
    return { error }
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider')
  return ctx
}
