// API Configuration
export const API_CONFIG = {
  // For development - use your computer's IP address instead of localhost
  BASE_URL: 'http://192.168.60.197:3001', // Your actual IP address
  
  // Alternative: Use localhost for iOS simulator
  // BASE_URL: 'http://localhost:3001',
  
  // Alternative: Use 10.0.2.2 for Android emulator
  // BASE_URL: 'http://10.0.2.2:3001',
  
  // For production - replace with your deployed backend URL
  // BASE_URL: 'https://your-backend-domain.com',
  
  // API endpoints
  ENDPOINTS: {
    HEALTH: '/health',
    POPULAR_MOVIES: '/api/movies/popular',
    TRENDING_MOVIES: '/api/movies/trending',
    TOP_RATED_MOVIES: '/api/movies/top-rated',
    UPCOMING_MOVIES: '/api/movies/upcoming',
    SEARCH_MOVIES: '/api/movies/search',
    MOVIE_DETAILS: '/api/movies',
    GENRES: '/api/movies/genres',
    MOVIES_BY_GENRE: '/api/movies/genre',
  },
  
  // Request timeout
  TIMEOUT: 10000,
  
  // Default pagination
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
