import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, ArrowDownRight, RefreshCcw } from "lucide-react";
import { useMarketData } from '@/hooks/useMarketData';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <Card className="glass-card p-4 neon-glow">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{selectedSymbol}</h3>
              <Input
                value={selectedSymbol}
                onChange={handleSymbolChange}
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
            {formattedData.length > 0 ? 
              `$${formattedData[formattedData.length - 1].close.toFixed(2)}` : 
              'Loading...'
            }
          </div>
        </Card>
        
        <Card className="glass-card p-4 neon-glow">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Volume</h3>
            <span className="text-primary">
              {formattedData.length > 0 ? 
                formattedData[formattedData.length - 1].volume.toLocaleString() : 
                'Loading...'
              }
            </span>
          </div>
          <div className="text-xl font-semibold mt-2 text-muted-foreground">
            24h Volume
          </div>
        </Card>

        <Card className="glass-card p-4 neon-glow">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Market Status</h3>
            <Button variant="outline" size="icon" onClick={handleRefresh}>
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
              {timeSeriesLoading ? (
                <div className="flex items-center justify-center h-full">
                  <RefreshCcw className="animate-spin" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formattedData}>
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
        </div>

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
      </div>
    </div>
  );
};