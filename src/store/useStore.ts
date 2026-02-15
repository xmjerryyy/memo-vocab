import { create } from 'zustand'
import { Session } from '@supabase/supabase-js'
import { Profile, Book } from '../types'

interface StoreState {
  session: Session | null
  profile: Profile | null
  currentBook: Book | null
  setSession: (session: Session | null) => void
  setProfile: (profile: Profile | null) => void
  setCurrentBook: (book: Book | null) => void
}

export const useStore = create<StoreState>((set) => ({
  session: null,
  profile: null,
  currentBook: null,
  setSession: (session) => set({ session }),
  setProfile: (profile) => set({ profile }),
  setCurrentBook: (currentBook) => set({ currentBook }),
}))
