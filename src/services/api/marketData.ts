import { API_CONFIG, getRapidAPIKey } from './config';
import { toast } from "@/hooks/use-toast";

export interface MarketDataResponse {
  data: any;
  error?: string;
}

class MarketDataService {
  private validateAPIKey(): string {
    const apiKey = getRapidAPIKey();
    if (!apiKey) {
      throw new Error('RapidAPI key is not set. Please set it in localStorage.');
    }
    return apiKey;
  }

  private async fetchWithRapidAPI(url: string, host: string): Promise<MarketDataResponse> {
    try {
      const apiKey = this.validateAPIKey();
      
      const response = await fetch(`https://${host}${url}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': host,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('Market data fetch error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast({
        variant: "destructive",
        title: "API Error",
        description: errorMessage
      });
      return { data: null, error: errorMessage };
    }
  }

  async getMarketSentiment(articleId: string): Promise<MarketDataResponse> {
    return this.fetchWithRapidAPI(
      API_CONFIG.SENTIMENT.ENDPOINTS.ARTICLE_SENTIMENT(articleId),
      API_CONFIG.SENTIMENT.HOST
    );
  }

  async getPriceHistory(ticker: string): Promise<MarketDataResponse> {
    return this.fetchWithRapidAPI(
      API_CONFIG.MACROTRENDS.ENDPOINTS.PRICE_HISTORY(ticker),
      API_CONFIG.MACROTRENDS.HOST
    );
  }

  async getShortInterest(symbol: string): Promise<MarketDataResponse> {
    return this.fetchWithRapidAPI(
      API_CONFIG.IEX.ENDPOINTS.SHORT_INTEREST(symbol),
      API_CONFIG.IEX.HOST
    );
  }

  async getDailyTimeSeries(symbol: string): Promise<MarketDataResponse> {
    return this.fetchWithRapidAPI(
      API_CONFIG.ALPHA_VANTAGE.ENDPOINTS.TIME_SERIES(symbol),
      API_CONFIG.ALPHA_VANTAGE.HOST
    );
  }
}

export const marketDataService = new MarketDataService();