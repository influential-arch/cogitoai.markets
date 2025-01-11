import React from 'react';
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { RefreshCcw } from "lucide-react";

interface PriceChartProps {
  data: any[];
  isLoading: boolean;
}

export const PriceChart = ({ data, isLoading }: PriceChartProps) => {
  return (
    <Card className="glass-card p-4">
      <h3 className="text-lg font-semibold mb-4">Price Chart</h3>
      <div className="h-[400px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <RefreshCcw className="animate-spin" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="date" 
                stroke="#888888"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis 
                stroke="#888888"
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                }}
                formatter={(value: any) => [`$${value.toFixed(2)}`, 'Price']}
              />
              <Area
                type="monotone"
                dataKey="close"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.1}
                strokeWidth={2}
                dot={false}
                className="animate-glow"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};