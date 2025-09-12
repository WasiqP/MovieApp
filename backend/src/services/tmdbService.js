const axios = require('axios');
const MovieCache = require('../models/MovieCache');
const { getRedisClient } = require('../config/redis');

class TMDBService {
  constructor() {
    this.apiKey = process.env.TMDB_API_KEY;
    this.baseURL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
    this.imageBaseURL = process.env.TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';
    
    this.client = axios.create({
      baseURL: this.baseURL,
      params: {
        api_key: this.apiKey,
        language: 'en-US'
      },
      timeout: 10000
    });
  }

  // Helper method to get full image URL
  getImageURL(path, size = 'w500') {
    if (!path) return null;
    return `${this.imageBaseURL}/${size}${path}`;
  }

  // Helper method to transform movie data
  transformMovieData(movie) {
    return {
      id: movie.id,
      title: movie.title,
      originalTitle: movie.original_title,
      overview: movie.overview,
      posterPath: this.getImageURL(movie.poster_path),
      backdropPath: this.getImageURL(movie.backdrop_path, 'w1280'),
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
      popularity: movie.popularity,
      adult: movie.adult,
      originalLanguage: movie.original_language,
      genreIds: movie.genre_ids || [],
      genres: movie.genres || []
    };
  }

  // Cache helper methods
  async getFromCache(key) {
    try {
      const redisClient = getRedisClient();
      if (redisClient) {
        const cached = await redisClient.get(key);
        return cached ? JSON.parse(cached) : null;
      }
    } catch (error) {
      console.error('Redis cache error:', error);
    }
    return null;
  }

  async setCache(key, data, ttl = 3600) {
    try {
      const redisClient = getRedisClient();
      if (redisClient) {
        await redisClient.setEx(key, ttl, JSON.stringify(data));
      }
    } catch (error) {
      console.error('Redis cache error:', error);
    }
  }

  // Get popular movies
  async getPopularMovies(page = 1) {
    try {
      const cacheKey = `popular_movies_${page}`;
      let movies = await this.getFromCache(cacheKey);
      
      if (!movies) {
        const response = await this.client.get('/movie/popular', {
          params: { page }
        });
        
        movies = {
          page: response.data.page,
          totalPages: response.data.total_pages,
          totalResults: response.data.total_results,
          results: response.data.results.map(movie => this.transformMovieData(movie))
        };
        
        await this.setCache(cacheKey, movies, 1800); // 30 minutes
      }
      
      return movies;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw new Error('Failed to fetch popular movies');
    }
  }

  // Get trending movies
  async getTrendingMovies(page = 1, timeWindow = 'week') {
    try {
      const cacheKey = `trending_movies_${timeWindow}_${page}`;
      let movies = await this.getFromCache(cacheKey);
      
      if (!movies) {
        const response = await this.client.get(`/trending/movie/${timeWindow}`, {
          params: { page }
        });
        
        movies = {
          page: response.data.page,
          totalPages: response.data.total_pages,
          totalResults: response.data.total_results,
          results: response.data.results.map(movie => this.transformMovieData(movie))
        };
        
        await this.setCache(cacheKey, movies, 1800); // 30 minutes
      }
      
      return movies;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw new Error('Failed to fetch trending movies');
    }
  }

  // Get top rated movies
  async getTopRatedMovies(page = 1) {
    try {
      const cacheKey = `top_rated_movies_${page}`;
      let movies = await this.getFromCache(cacheKey);
      
      if (!movies) {
        const response = await this.client.get('/movie/top_rated', {
          params: { page }
        });
        
        movies = {
          page: response.data.page,
          totalPages: response.data.total_pages,
          totalResults: response.data.total_results,
          results: response.data.results.map(movie => this.transformMovieData(movie))
        };
        
        await this.setCache(cacheKey, movies, 3600); // 1 hour
      }
      
      return movies;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw new Error('Failed to fetch top rated movies');
    }
  }

  // Get upcoming movies
  async getUpcomingMovies(page = 1) {
    try {
      const cacheKey = `upcoming_movies_${page}`;
      let movies = await this.getFromCache(cacheKey);
      
      if (!movies) {
        const response = await this.client.get('/movie/upcoming', {
          params: { page }
        });
        
        movies = {
          page: response.data.page,
          totalPages: response.data.total_pages,
          totalResults: response.data.total_results,
          results: response.data.results.map(movie => this.transformMovieData(movie))
        };
        
        await this.setCache(cacheKey, movies, 1800); // 30 minutes
      }
      
      return movies;
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      throw new Error('Failed to fetch upcoming movies');
    }
  }

  // Search movies
  async searchMovies(query, page = 1) {
    try {
      if (!query || query.trim().length < 2) {
        throw new Error('Search query must be at least 2 characters long');
      }

      const cacheKey = `search_movies_${query.toLowerCase()}_${page}`;
      let movies = await this.getFromCache(cacheKey);
      
      if (!movies) {
        const response = await this.client.get('/search/movie', {
          params: { 
            query: query.trim(),
            page,
            include_adult: false
          }
        });
        
        movies = {
          page: response.data.page,
          totalPages: response.data.total_pages,
          totalResults: response.data.total_results,
          results: response.data.results.map(movie => this.transformMovieData(movie))
        };
        
        await this.setCache(cacheKey, movies, 1800); // 30 minutes
      }
      
      return movies;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw new Error('Failed to search movies');
    }
  }

  // Get movie details
  async getMovieDetails(movieId) {
    try {
      // Check cache first
      let cached = await MovieCache.findOne({ 
        movieId, 
        type: 'details',
        expiresAt: { $gt: new Date() }
      });

      if (cached) {
        return cached.data;
      }

      const response = await this.client.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'credits,videos,reviews,similar'
        }
      });

      const movieData = {
        ...this.transformMovieData(response.data),
        runtime: response.data.runtime,
        status: response.data.status,
        tagline: response.data.tagline,
        budget: response.data.budget,
        revenue: response.data.revenue,
        homepage: response.data.homepage,
        imdbId: response.data.imdb_id,
        productionCompanies: response.data.production_companies,
        productionCountries: response.data.production_countries,
        spokenLanguages: response.data.spoken_languages,
        credits: response.data.credits,
        videos: response.data.videos,
        reviews: response.data.reviews,
        similar: response.data.similar?.results?.map(movie => this.transformMovieData(movie)) || []
      };

      // Cache the result
      await MovieCache.findOneAndUpdate(
        { movieId, type: 'details' },
        { 
          movieId, 
          type: 'details', 
          data: movieData,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        },
        { upsert: true, new: true }
      );

      return movieData;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      if (error.response?.status === 404) {
        throw new Error('Movie not found');
      }
      throw new Error('Failed to fetch movie details');
    }
  }

  // Get movie genres
  async getGenres() {
    try {
      const cacheKey = 'movie_genres';
      let genres = await this.getFromCache(cacheKey);
      
      if (!genres) {
        const response = await this.client.get('/genre/movie/list');
        genres = response.data.genres;
        await this.setCache(cacheKey, genres, 86400); // 24 hours
      }
      
      return genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw new Error('Failed to fetch genres');
    }
  }

  // Get movies by genre
  async getMoviesByGenre(genreId, page = 1) {
    try {
      const cacheKey = `movies_by_genre_${genreId}_${page}`;
      let movies = await this.getFromCache(cacheKey);
      
      if (!movies) {
        const response = await this.client.get('/discover/movie', {
          params: { 
            with_genres: genreId,
            page,
            sort_by: 'popularity.desc'
          }
        });
        
        movies = {
          page: response.data.page,
          totalPages: response.data.total_pages,
          totalResults: response.data.total_results,
          results: response.data.results.map(movie => this.transformMovieData(movie))
        };
        
        await this.setCache(cacheKey, movies, 1800); // 30 minutes
      }
      
      return movies;
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      throw new Error('Failed to fetch movies by genre');
    }
  }
}

module.exports = new TMDBService();

