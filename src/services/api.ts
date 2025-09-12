// API Service for Movie App
import { API_CONFIG, getApiUrl } from '../config/api';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  adult: boolean;
  originalLanguage: string;
  genreIds: number[];
  genres?: Array<{ id: number; name: string }>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface MoviesResponse {
  page: number;
  totalPages: number;
  totalResults: number;
  results: Movie[];
}

export interface SearchResponse {
  page: number;
  totalPages: number;
  totalResults: number;
  results: Movie[];
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      console.log('API Request:', url);

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(`API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get popular movies
  async getPopularMovies(page: number = 1): Promise<ApiResponse<MoviesResponse>> {
    return this.request<MoviesResponse>(`/api/movies/popular?page=${page}`);
  }

  // Get trending movies
  async getTrendingMovies(page: number = 1, timeWindow: 'day' | 'week' = 'week'): Promise<ApiResponse<MoviesResponse>> {
    return this.request<MoviesResponse>(`/api/movies/trending?page=${page}&time_window=${timeWindow}`);
  }

  // Get top rated movies
  async getTopRatedMovies(page: number = 1): Promise<ApiResponse<MoviesResponse>> {
    return this.request<MoviesResponse>(`/api/movies/top-rated?page=${page}`);
  }

  // Get upcoming movies
  async getUpcomingMovies(page: number = 1): Promise<ApiResponse<MoviesResponse>> {
    return this.request<MoviesResponse>(`/api/movies/upcoming?page=${page}`);
  }

  // Search movies
  async searchMovies(query: string, page: number = 1): Promise<ApiResponse<SearchResponse>> {
    const encodedQuery = encodeURIComponent(query);
    return this.request<SearchResponse>(`/api/movies/search?q=${encodedQuery}&page=${page}`);
  }

  // Get movie details
  async getMovieDetails(movieId: number): Promise<ApiResponse<Movie>> {
    return this.request<Movie>(`/api/movies/${movieId}`);
  }

  // Get movie genres
  async getGenres(): Promise<ApiResponse<Array<{ id: number; name: string }>>> {
    return this.request<Array<{ id: number; name: string }>>('/api/movies/genres');
  }

  // Get movies by genre
  async getMoviesByGenre(genreId: number, page: number = 1): Promise<ApiResponse<MoviesResponse>> {
    return this.request<MoviesResponse>(`/api/movies/genre/${genreId}?page=${page}`);
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string; uptime: number; environment: string }>> {
    return this.request<{ status: string; timestamp: string; uptime: number; environment: string }>('/health');
  }
}

export default new ApiService();
