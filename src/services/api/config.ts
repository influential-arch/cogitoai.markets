import { createClient } from '@supabase/supabase-js'

// API Configuration
export const API_CONFIG = {
  SENTIMENT: {
    BASE_URL: 'sentiment-on-markets1.p.rapidapi.com',
    HOST: 'sentiment-on-markets1.p.rapidapi.com'
  },
  MACROTRENDS: {
    BASE_URL: 'macrotrends-finance1.p.rapidapi.com',
    HOST: 'macrotrends-finance1.p.rapidapi.com'
  },
  IEX: {
    BASE_URL: 'investors-exchange-iex-trading.p.rapidapi.com',
    HOST: 'investors-exchange-iex-trading.p.rapidapi.com'
  },
  ALPHA_VANTAGE: {
    BASE_URL: 'alpha-vantage.p.rapidapi.com',
    HOST: 'alpha-vantage.p.rapidapi.com'
  }
}

// Initialize Supabase client
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)