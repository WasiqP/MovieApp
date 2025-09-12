const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

// Basic middleware
app.use(cors());
app.use(express.json());

// TMDB API configuration
const TMDB_API_KEY = '5af72ddee55a9867af8921fc69d53723';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: 'test'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AirCorn Movie App API - Test Mode',
    version: '1.0.0',
    status: 'running'
  });
});

// Test TMDB API directly
app.get('/test-tmdb', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        page: 1
      }
    });
    
    res.json({
      success: true,
      message: 'TMDB API is working!',
      data: {
        totalResults: response.data.total_results,
        results: response.data.results.slice(0, 3).map(movie => ({
          id: movie.id,
          title: movie.title,
          overview: movie.overview.substring(0, 100) + '...'
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'TMDB API test failed',
      error: error.message
    });
  }
});

// Trending movies endpoint
app.get('/api/movies/trending', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const timeWindow = req.query.time_window || 'week';
    const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/${timeWindow}`, {
      params: {
        api_key: TMDB_API_KEY,
        page: page
      }
    });
    
    const movies = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      backdropPath: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : null,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
      popularity: movie.popularity,
      adult: movie.adult,
      originalLanguage: movie.original_language,
      genreIds: movie.genre_ids || []
    }));
    
    res.json({
      success: true,
      data: {
        page: response.data.page,
        totalPages: response.data.total_pages,
        totalResults: response.data.total_results,
        results: movies
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trending movies',
      error: error.message
    });
  }
});

// Popular movies endpoint
app.get('/api/movies/popular', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        page: page
      }
    });
    
    const movies = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      backdropPath: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : null,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
      popularity: movie.popularity,
      adult: movie.adult,
      originalLanguage: movie.original_language,
      genreIds: movie.genre_ids || []
    }));
    
    res.json({
      success: true,
      data: {
        page: response.data.page,
        totalPages: response.data.total_pages,
        totalResults: response.data.total_results,
        results: movies
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch popular movies',
      error: error.message
    });
  }
});

// Search movies endpoint
app.get('/api/movies/search', async (req, res) => {
  try {
    const { q: query, page = 1 } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: query,
        page: page,
        include_adult: false
      }
    });
    
    const movies = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      backdropPath: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : null,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
      popularity: movie.popularity,
      adult: movie.adult,
      originalLanguage: movie.original_language,
      genreIds: movie.genre_ids || []
    }));
    
    res.json({
      success: true,
      data: {
        page: response.data.page,
        totalPages: response.data.total_pages,
        totalResults: response.data.total_results,
        results: movies
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to search movies',
      error: error.message
    });
  }
});

// Movie details endpoint
app.get('/api/movies/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
        append_to_response: 'credits,videos,reviews,similar'
      }
    });
    
    const movie = {
      id: response.data.id,
      title: response.data.title,
      overview: response.data.overview,
      posterPath: response.data.poster_path ? `https://image.tmdb.org/t/p/w500${response.data.poster_path}` : null,
      backdropPath: response.data.backdrop_path ? `https://image.tmdb.org/t/p/w1280${response.data.backdrop_path}` : null,
      releaseDate: response.data.release_date,
      voteAverage: response.data.vote_average,
      voteCount: response.data.vote_count,
      popularity: response.data.popularity,
      adult: response.data.adult,
      originalLanguage: response.data.original_language,
      genreIds: response.data.genre_ids || [],
      genres: response.data.genres || [],
      runtime: response.data.runtime,
      status: response.data.status,
      tagline: response.data.tagline,
      budget: response.data.budget,
      revenue: response.data.revenue,
      homepage: response.data.homepage,
      imdbId: response.data.imdb_id,
      productionCompanies: response.data.production_companies || [],
      productionCountries: response.data.production_countries || [],
      spokenLanguages: response.data.spoken_languages || [],
      credits: response.data.credits || {},
      videos: response.data.videos || {},
      reviews: response.data.reviews || {},
      similar: response.data.similar?.results?.map(movie => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
        backdropPath: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : null,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        popularity: movie.popularity,
        adult: movie.adult,
        originalLanguage: movie.original_language,
        genreIds: movie.genre_ids || []
      })) || []
    };
    
    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch movie details',
        error: error.message
      });
    }
  }
});

// Genres endpoint
app.get('/api/movies/genres', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
      params: {
        api_key: TMDB_API_KEY
      }
    });
    
    res.json({
      success: true,
      data: response.data.genres
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch genres',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Test Server running on port ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🔗 Mobile API URL: http://192.168.60.197:${PORT}/api`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
  console.log(`🧪 TMDB Test: http://localhost:${PORT}/test-tmdb`);
  console.log(`🎬 Popular Movies: http://localhost:${PORT}/api/movies/popular`);
  console.log(`🔍 Search Movies: http://localhost:${PORT}/api/movies/search?q=avengers`);
  console.log(`📱 Mobile App should connect to: http://192.168.60.197:${PORT}`);
});
