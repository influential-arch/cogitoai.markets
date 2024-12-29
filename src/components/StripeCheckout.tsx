import { useEffect } from 'react'
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'

interface StripeCheckoutProps {
  priceId: string
  buttonText?: string
}

export const StripeCheckout = ({ priceId, buttonText = 'Subscribe' }: StripeCheckoutProps) => {
  const { toast } = useToast()

  const handleCheckout = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to subscribe",
          variant: "destructive",
        })
        return
      }

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ priceId }),
      })

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to initiate checkout",
        variant: "destructive",
      })
    }
  }

  return (
    <Button onClick={handleCheckout} className="w-full neon-glow">
      {buttonText}
    </Button>
  )
}