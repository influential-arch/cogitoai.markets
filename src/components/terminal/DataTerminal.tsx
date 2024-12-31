import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, RefreshCcw } from "lucide-react";
import { useMarketData } from '@/hooks/useMarketData';
import { useToast } from '@/hooks/use-toast';

export const DataTerminal = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const { getDailyTimeSeries } = useMarketData();
  const { toast } = useToast();
  
  const { data: timeSeriesData, isLoading, error } = getDailyTimeSeries(selectedSymbol);

  if (error) {
    toast({
      title: "Error fetching market data",
      description: error instanceof Error ? error.message : "Unknown error occurred",
      variant: "destructive",
    });
  }

  // ... keep existing code (card layout and styling)

  return (
    <div className="p-4 glass-card min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="glass-card p-4 neon-glow">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">EUR/USD</h3>
            <span className="text-green-500 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              +0.05%
            </span>
          </div>
          <div className="text-3xl font-bold mt-2">1.1255</div>
        </Card>
        
        <Card className="glass-card p-4 neon-glow">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">GBP/USD</h3>
            <span className="text-red-500 flex items-center">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              -0.03%
            </span>
          </div>
          <div className="text-3xl font-bold mt-2">1.2650</div>
        </Card>

        <Card className="glass-card p-4 neon-glow">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Market Status</h3>
            <Button variant="outline" size="icon">
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xl font-semibold mt-2 text-green-500">Active</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <Card className="glass-card p-4">
            <h3 className="text-lg font-semibold mb-4">Price Chart</h3>
            <div className="h-[400px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <RefreshCcw className="animate-spin" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeriesData?.data?.['Time Series (Daily)'] || []}>
                    <XAxis dataKey="date" stroke="#888888" />
                    <YAxis stroke="#888888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="4. close"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                      className="animate-glow"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="glass-card p-4">
            <h3 className="text-lg font-semibold mb-2">COT Data</h3>
            <p className="text-muted-foreground">Net Long: +23.5K</p>
            <p className="text-muted-foreground">Net Short: -12.3K</p>
          </Card>

          <Card className="glass-card p-4">
            <h3 className="text-lg font-semibold mb-2">Smart Money</h3>
            <p className="text-green-500">Bullish Signal</p>
            <p className="text-sm text-muted-foreground mt-1">Institutional buying detected</p>
          </Card>
        </div>
      </div>
    </div>
  );
};
