import { useQuery } from '@tanstack/react-query';
import { marketDataService } from '@/services/api/marketData';
import { useToast } from "@/hooks/use-toast";

export const useMarketData = () => {
  const { toast } = useToast();

  const getMarketSentiment = () => {
    return useQuery({
      queryKey: ['marketSentiment'],
      queryFn: () => marketDataService.getMarketSentiment(),
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      meta: {
        onError: (error: Error) => {
          toast({
            title: "Error fetching market sentiment",
            description: error.message,
            variant: "destructive"
          });
        }
      }
    });
  };

  const getPriceHistory = (ticker: string) => {
    return useQuery({
      queryKey: ['priceHistory', ticker],
      queryFn: () => marketDataService.getPriceHistory(ticker),
      staleTime: 5 * 60 * 1000,
      retry: 2,
      meta: {
        onError: (error: Error) => {
          toast({
            title: "Error fetching price history",
            description: error.message,
            variant: "destructive"
          });
        }
      }
    });
  };

  const getShortInterest = (symbol: string) => {
    return useQuery({
      queryKey: ['shortInterest', symbol],
      queryFn: () => marketDataService.getShortInterest(symbol),
      staleTime: 15 * 60 * 1000, // 15 minutes
      retry: 2,
      meta: {
        onError: (error: Error) => {
          toast({
            title: "Error fetching short interest",
            description: error.message,
            variant: "destructive"
          });
        }
      }
    });
  };

  const getDailyTimeSeries = (symbol: string) => {
    return useQuery({
      queryKey: ['dailyTimeSeries', symbol],
      queryFn: () => marketDataService.getDailyTimeSeries(symbol),
      staleTime: 5 * 60 * 1000,
      retry: 2,
      meta: {
        onError: (error: Error) => {
          toast({
            title: "Error fetching daily time series",
            description: error.message,
            variant: "destructive"
          });
        }
      }
    });
  };

  return {
    getMarketSentiment,
    getPriceHistory,
    getShortInterest,
    getDailyTimeSeries
  };
};