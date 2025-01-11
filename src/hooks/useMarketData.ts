import { useQuery } from '@tanstack/react-query';
import { marketDataService } from '@/services/api/marketData';

export const useMarketData = () => {
  const getMarketSentiment = (articleId: string) => {
    return useQuery({
      queryKey: ['marketSentiment', articleId],
      queryFn: () => marketDataService.getMarketSentiment(articleId),
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2
    });
  };

  const getPriceHistory = (ticker: string) => {
    return useQuery({
      queryKey: ['priceHistory', ticker],
      queryFn: () => marketDataService.getPriceHistory(ticker),
      staleTime: 5 * 60 * 1000,
      retry: 2
    });
  };

  const getShortInterest = (symbol: string) => {
    return useQuery({
      queryKey: ['shortInterest', symbol],
      queryFn: () => marketDataService.getShortInterest(symbol),
      staleTime: 15 * 60 * 1000, // 15 minutes
      retry: 2
    });
  };

  const getDailyTimeSeries = (symbol: string) => {
    return useQuery({
      queryKey: ['dailyTimeSeries', symbol],
      queryFn: () => marketDataService.getDailyTimeSeries(symbol),
      staleTime: 5 * 60 * 1000,
      retry: 2
    });
  };

  return {
    getMarketSentiment,
    getPriceHistory,
    getShortInterest,
    getDailyTimeSeries
  };
};