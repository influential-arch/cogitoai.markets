export const API_CONFIG = {
  SENTIMENT: {
    BASE_URL: 'sentiment-on-markets1.p.rapidapi.com',
    HOST: 'sentiment-on-markets1.p.rapidapi.com',
    ENDPOINTS: {
      ARTICLE_SENTIMENT: (articleId: number) => `/rapid-api/articles/${articleId}/sentiment`
    }
  },
  MACROTRENDS: {
    BASE_URL: 'macrotrends-finance1.p.rapidapi.com',
    HOST: 'macrotrends-finance1.p.rapidapi.com',
    ENDPOINTS: {
      PRICE_HISTORY: (ticker: string) => `/price-history/${ticker}`
    }
  },
  ALPHA_VANTAGE: {
    BASE_URL: 'alpha-vantage.p.rapidapi.com',
    HOST: 'alpha-vantage.p.rapidapi.com',
    ENDPOINTS: {
      TIME_SERIES: (symbol: string) => 
        `/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&datatype=json`,
      SHORT_INTEREST: (symbol: string) =>
        `/query?function=OVERVIEW&symbol=${symbol}`
    }
  }
};

// Use the provided API key directly
const RAPIDAPI_KEY = "dfc35ca888msh49d2d1bb0bfb134p1342ddjsn7890ecf4255c";

export const getRapidAPIKey = () => {
  // First try to get from localStorage in case user wants to use their own key
  const localKey = localStorage.getItem('RAPIDAPI_KEY');
  // If no local key is set, use the provided key
  return localKey || RAPIDAPI_KEY;
};