import { API_CONFIG, getRapidAPIKey } from './config';
import { useToast } from "@/hooks/use-toast";

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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('Market data fetch error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { 
        data: null, 
        error: errorMessage 
      };
    }
  }

  async getMarketSentiment(): Promise<MarketDataResponse> {
    // Use a fixed article ID (1) instead of 'latest'
    return this.fetchWithRapidAPI(
      API_CONFIG.SENTIMENT.ENDPOINTS.ARTICLE_SENTIMENT(1),
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
    // Use Alpha Vantage OVERVIEW endpoint which includes short interest data
    return this.fetchWithRapidAPI(
      API_CONFIG.ALPHA_VANTAGE.ENDPOINTS.SHORT_INTEREST(symbol),
      API_CONFIG.ALPHA_VANTAGE.HOST
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