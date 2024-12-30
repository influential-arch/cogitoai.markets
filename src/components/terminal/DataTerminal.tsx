import React from 'react';
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, RefreshCcw } from "lucide-react";

const mockData = [
  { time: '10:00', price: 1.1250 },
  { time: '11:00', price: 1.1245 },
  { time: '12:00', price: 1.1260 },
  { time: '13:00', price: 1.1240 },
  { time: '14:00', price: 1.1255 },
];

export const DataTerminal = () => {
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
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <XAxis dataKey="time" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    className="animate-glow"
                  />
                </LineChart>
              </ResponsiveContainer>
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