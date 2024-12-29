import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co'
const supabaseAnonKey = 'your-anon-key'

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