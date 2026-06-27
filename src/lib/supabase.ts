import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  xp: number
  level: number
  streak: number
  longest_streak: number
  questions_solved: number
  last_active: string | null
  created_at: string
}
