import { API_CONFIG } from './config'

export interface MarketDataResponse {
  data: any;
  error?: string;
}

class MarketDataService {
  private async fetchWithRapidAPI(url: string, host: string): Promise<MarketDataResponse> {
    try {
      const response = await fetch(url, {
        headers: {
          'x-rapidapi-key': await this.getApiKey(),
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

  private async getApiKey(): Promise<string> {
    // In a production environment, this should be fetched from Supabase secrets
    // For development, you can use localStorage temporarily
    return localStorage.getItem('RAPIDAPI_KEY') || '';
  }

  // Sentiment Analysis
  async getMarketSentiment(articleId: string): Promise<MarketDataResponse> {
    return this.fetchWithRapidAPI(
      `https://${API_CONFIG.SENTIMENT.BASE_URL}/rapid-api/articles/${articleId}/sentiment`,
      API_CONFIG.SENTIMENT.HOST
    );
  }

  // Price History
  async getPriceHistory(ticker: string): Promise<MarketDataResponse> {
    return this.fetchWithRapidAPI(
      `https://${API_CONFIG.MACROTRENDS.BASE_URL}/price-history/${ticker}`,
      API_CONFIG.MACROTRENDS.HOST
    );
  }

  // Short Interest
  async getShortInterest(symbol: string): Promise<MarketDataResponse> {
    return this.fetchWithRapidAPI(
      `https://${API_CONFIG.IEX.BASE_URL}/stock/${symbol}/short-interest`,
      API_CONFIG.IEX.HOST
    );
  }

  // Daily Time Series
  async getDailyTimeSeries(symbol: string): Promise<MarketDataResponse> {
    return this.fetchWithRapidAPI(
      `https://${API_CONFIG.ALPHA_VANTAGE.BASE_URL}/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&datatype=json`,
      API_CONFIG.ALPHA_VANTAGE.HOST
    );
  }
}

export const marketDataService = new MarketDataService();