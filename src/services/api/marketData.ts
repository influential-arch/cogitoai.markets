import { API_CONFIG, getRapidAPIKey } from './config';

export interface MarketDataResponse {
  data: any;
  error?: string;
}

class MarketDataService {
  private async fetchWithRapidAPI(url: string, host: string): Promise<MarketDataResponse> {
    try {
      const response = await fetch(`https://${host}${url}`, {
        headers: {
          'x-rapidapi-key': getRapidAPIKey(),
          'x-rapidapi-host': host
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('Market data fetch error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
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