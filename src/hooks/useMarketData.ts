import { useQuery } from '@tanstack/react-query';
import { marketDataService } from '@/services/api/marketData';

export const useMarketData = () => {
  const getMarketSentiment = (articleId: string) => {
    return useQuery({
      queryKey: ['marketSentiment', articleId],
      queryFn: () => marketDataService.getMarketSentiment(articleId)
    });
  };

  const getPriceHistory = (ticker: string) => {
    return useQuery({
      queryKey: ['priceHistory', ticker],
      queryFn: () => marketDataService.getPriceHistory(ticker)
    });
  };

  const getShortInterest = (symbol: string) => {
    return useQuery({
      queryKey: ['shortInterest', symbol],
      queryFn: () => marketDataService.getShortInterest(symbol)
    });
  };

  const getDailyTimeSeries = (symbol: string) => {
    return useQuery({
      queryKey: ['dailyTimeSeries', symbol],
      queryFn: () => marketDataService.getDailyTimeSeries(symbol)
    });
  };

  return {
    getMarketSentiment,
    getPriceHistory,
    getShortInterest,
    getDailyTimeSeries
  };
};