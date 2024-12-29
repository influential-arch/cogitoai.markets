import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

// Validate URL format
try {
  new URL(supabaseUrl)
} catch (error) {
  throw new Error('Invalid Supabase URL format. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to check user's subscription tier
export const getUserTier = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_subscriptions')
    .select('tier')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching user tier:', error)
    return 'free'
  }

  return data?.tier || 'free'
}