import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, ArrowDownRight, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarketOverviewProps {
  selectedSymbol: string;
  onSymbolChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  percentageChange: number;
  latestPrice: string | number;
  volume: string | number;
  onRefresh: () => void;
}

export const MarketOverview = ({
  selectedSymbol,
  onSymbolChange,
  percentageChange,
  latestPrice,
  volume,
  onRefresh
}: MarketOverviewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
      <Card className="glass-card p-4 neon-glow">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{selectedSymbol}</h3>
            <Input
              value={selectedSymbol}
              onChange={onSymbolChange}
              placeholder="Enter symbol"
              className="w-32"
            />
          </div>
          <span className={`flex items-center ${percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {percentageChange >= 0 ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            )}
            {Math.abs(percentageChange).toFixed(2)}%
          </span>
        </div>
        <div className="text-3xl font-bold mt-2">
          {latestPrice}
        </div>
      </Card>
      
      <Card className="glass-card p-4 neon-glow">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Volume</h3>
          <span className="text-primary">{volume}</span>
        </div>
        <div className="text-xl font-semibold mt-2 text-muted-foreground">
          24h Volume
        </div>
      </Card>

      <Card className="glass-card p-4 neon-glow">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Market Status</h3>
          <Button variant="outline" size="icon" onClick={onRefresh}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xl font-semibold mt-2 text-green-500">Active</div>
      </Card>
    </div>
  );
};