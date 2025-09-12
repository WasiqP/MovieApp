import { useState, useEffect } from 'react';
import apiService, { Movie, MoviesResponse } from '../services/api';

export const usePopularMovies = (page: number = 1) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getPopularMovies(page);
        
        if (response.success) {
          setMovies(response.data.results);
          setTotalPages(response.data.totalPages);
        } else {
          setError(response.message || 'Failed to fetch popular movies');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return { movies, loading, error, totalPages };
};

export const useTrendingMovies = (page: number = 1, timeWindow: 'day' | 'week' = 'week') => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getTrendingMovies(page, timeWindow);
        
        if (response.success) {
          setMovies(response.data.results);
          setTotalPages(response.data.totalPages);
        } else {
          setError(response.message || 'Failed to fetch trending movies');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, timeWindow]);

  return { movies, loading, error, totalPages };
};

export const useSearchMovies = (query: string, page: number = 1) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setMovies([]);
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.searchMovies(query, page);
        
        if (response.success) {
          setMovies(response.data.results);
          setTotalPages(response.data.totalPages);
        } else {
          setError(response.message || 'Failed to search movies');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchMovies, 500); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [query, page]);

  return { movies, loading, error, totalPages };
};

export const useMovieDetails = (movieId: number | null) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setMovie(null);
      return;
    }

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getMovieDetails(movieId);
        
        if (response.success) {
          setMovie(response.data);
        } else {
          setError(response.message || 'Failed to fetch movie details');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  return { movie, loading, error };
};
