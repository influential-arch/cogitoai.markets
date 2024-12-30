import React from 'react';
import { Card } from "@/components/ui/card";
import { BackButton } from "@/components/BackButton";
import { DataTerminal } from "@/components/terminal/DataTerminal";
import { BarChart3, Brain, TrendingUp, LineChart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const { data: userSubscription } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { tier: 'free' };
      
      const { data } = await supabase
        .from('user_subscriptions')
        .select('tier')
        .eq('user_id', user.id)
        .single();
      
      return data || { tier: 'free' };
    },
  });

  const tier = userSubscription?.tier || 'free';

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        
        <h1 className="text-3xl font-bold mb-8 mt-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card p-6 neon-glow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">COT Analysis</h3>
                <p className="text-muted-foreground">Real-time data</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 neon-glow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Smart Money</h3>
                <p className="text-muted-foreground">Institutional flows</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 neon-glow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Price Action</h3>
                <p className="text-muted-foreground">Technical analysis</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 neon-glow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Forecasts</h3>
                <p className="text-muted-foreground">AI predictions</p>
              </div>
            </div>
          </Card>
        </div>

        {tier !== 'free' && <DataTerminal />}
        
        {tier === 'free' && (
          <Card className="glass-card p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Upgrade Required</h2>
            <p className="text-muted-foreground mb-6">
              Access to the data terminal requires a premium subscription.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}