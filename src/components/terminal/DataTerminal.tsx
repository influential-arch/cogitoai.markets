import React, { useState, useEffect } from 'react';
import { useMarketData } from '@/hooks/useMarketData';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarketOverview } from './MarketOverview';
import { PriceChart } from './PriceChart';
import { MarketMetrics } from './MarketMetrics';

export const DataTerminal = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('RAPIDAPI_KEY') || '');
  const { getDailyTimeSeries, getMarketSentiment, getShortInterest } = useMarketData();
  const { toast } = useToast();
  
  const { 
    data: timeSeriesData, 
    isLoading: timeSeriesLoading, 
    error: timeSeriesError 
  } = getDailyTimeSeries(selectedSymbol);

  const {
    data: shortInterestData,
    isLoading: shortInterestLoading
  } = getShortInterest(selectedSymbol);

  const {
    data: sentimentData,
    isLoading: sentimentLoading
  } = getMarketSentiment('latest');

  useEffect(() => {
    if (timeSeriesError) {
      toast({
        title: "Error fetching market data",
        description: timeSeriesError.toString(),
        variant: "destructive"
      });
    }
  }, [timeSeriesError, toast]);

  const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSymbol(event.target.value.toUpperCase());
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const formatTimeSeriesData = (data: any) => {
    if (!data?.data?.['Time Series (Daily)']) return [];
    
    return Object.entries(data.data['Time Series (Daily)']).map(([date, values]: [string, any]) => ({
      date,
      close: parseFloat(values['4. close']),
      volume: parseInt(values['5. volume'])
    })).reverse();
  };

  const calculateChange = (data: any[]) => {
    if (!data || data.length < 2) return 0;
    const latest = data[data.length - 1].close;
    const previous = data[data.length - 2].close;
    return ((latest - previous) / previous) * 100;
  };

  const formattedData = formatTimeSeriesData(timeSeriesData);
  const percentageChange = calculateChange(formattedData);
  const latestPrice = formattedData.length > 0 ? 
    `$${formattedData[formattedData.length - 1].close.toFixed(2)}` : 
    'Loading...';
  const latestVolume = formattedData.length > 0 ? 
    formattedData[formattedData.length - 1].volume.toLocaleString() : 
    'Loading...';

  return (
    <div className="p-4 glass-card min-h-screen">
      <Dialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Use Custom RapidAPI Key</DialogTitle>
            <DialogDescription>
              Enter your RapidAPI key to use custom API access.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your RapidAPI key"
              type="password"
            />
            <Button 
              onClick={() => {
                localStorage.setItem('RAPIDAPI_KEY', apiKey);
                setApiKeyDialogOpen(false);
                toast({
                  title: "API Key Saved",
                  description: "Your custom RapidAPI key has been saved.",
                });
                handleRefresh();
              }} 
              className="w-full"
            >
              Save API Key
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <MarketOverview
        selectedSymbol={selectedSymbol}
        onSymbolChange={handleSymbolChange}
        percentageChange={percentageChange}
        latestPrice={latestPrice}
        volume={latestVolume}
        onRefresh={handleRefresh}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <PriceChart
            data={formattedData}
            isLoading={timeSeriesLoading}
          />
        </div>

        <MarketMetrics
          sentimentData={sentimentData}
          shortInterestData={shortInterestData}
          sentimentLoading={sentimentLoading}
          shortInterestLoading={shortInterestLoading}
        />
      </div>
    </div>
  );
};