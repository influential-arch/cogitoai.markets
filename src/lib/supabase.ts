import { createClient } from '@supabase/supabase-js'
import { toast } from "@/hooks/use-toast"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  toast({
    title: "Configuration Error",
    description: "Missing Supabase configuration. Please check environment variables.",
    variant: "destructive"
  })
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

// Validate URL format
try {
  new URL(supabaseUrl)
} catch (error) {
  console.error('Invalid Supabase URL format')
  toast({
    title: "Configuration Error",
    description: "Invalid Supabase URL format. Please check configuration.",
    variant: "destructive"
  })
  throw new Error('Invalid Supabase URL format. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'implicit'
  }
})

// Helper function to check user's subscription tier
export const getUserTier = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .select('tier')
      .eq('user_id', userId)
      .single()

    if (error) throw error

    return data?.tier || 'free'
  } catch (error) {
    console.error('Error fetching user tier:', error)
    return 'free'
  }
}