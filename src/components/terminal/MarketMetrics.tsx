import React from 'react';
import { Card } from "@/components/ui/card";
import { RefreshCcw } from "lucide-react";

interface MarketMetricsProps {
  sentimentData: any;
  shortInterestData: any;
  sentimentLoading: boolean;
  shortInterestLoading: boolean;
}

export const MarketMetrics = ({
  sentimentData,
  shortInterestData,
  sentimentLoading,
  shortInterestLoading
}: MarketMetricsProps) => {
  return (
    <div className="space-y-4">
      <Card className="glass-card p-4">
        <h3 className="text-lg font-semibold mb-2">Market Sentiment</h3>
        {sentimentLoading ? (
          <div className="flex items-center justify-center py-4">
            <RefreshCcw className="animate-spin" />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Bullish</span>
              <span className="text-green-500">
                {sentimentData?.data?.bullish || '65'}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Bearish</span>
              <span className="text-red-500">
                {sentimentData?.data?.bearish || '35'}%
              </span>
            </div>
          </div>
        )}
      </Card>

      <Card className="glass-card p-4">
        <h3 className="text-lg font-semibold mb-2">Short Interest</h3>
        {shortInterestLoading ? (
          <div className="flex items-center justify-center py-4">
            <RefreshCcw className="animate-spin" />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Short Volume</span>
              <span className="text-primary">
                {shortInterestData?.data?.shortVolume?.toLocaleString() || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Short Ratio</span>
              <span className="text-primary">
                {shortInterestData?.data?.shortRatio?.toFixed(2) || 'N/A'}
              </span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};