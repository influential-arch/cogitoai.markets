export const API_CONFIG = {
  SENTIMENT: {
    BASE_URL: 'sentiment-on-markets1.p.rapidapi.com',
    HOST: 'sentiment-on-markets1.p.rapidapi.com',
    ENDPOINTS: {
      ARTICLE_SENTIMENT: (articleId: string) => `/rapid-api/articles/${articleId}/sentiment`
    }
  },
  MACROTRENDS: {
    BASE_URL: 'macrotrends-finance1.p.rapidapi.com',
    HOST: 'macrotrends-finance1.p.rapidapi.com',
    ENDPOINTS: {
      PRICE_HISTORY: (ticker: string) => `/price-history/${ticker}`
    }
  },
  IEX: {
    BASE_URL: 'investors-exchange-iex-trading.p.rapidapi.com',
    HOST: 'investors-exchange-iex-trading.p.rapidapi.com',
    ENDPOINTS: {
      SHORT_INTEREST: (symbol: string) => `/stock/${symbol}/short-interest`
    }
  },
  ALPHA_VANTAGE: {
    BASE_URL: 'alpha-vantage.p.rapidapi.com',
    HOST: 'alpha-vantage.p.rapidapi.com',
    ENDPOINTS: {
      TIME_SERIES: (symbol: string) => 
        `/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&datatype=json`
    }
  }
}

// For development, store API key in localStorage
export const getRapidAPIKey = () => localStorage.getItem('RAPIDAPI_KEY') || '';