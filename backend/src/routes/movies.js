const express = require('express');
const tmdbService = require('../services/tmdbService');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/movies/popular
// @desc    Get popular movies
// @access  Public
router.get('/popular', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const movies = await tmdbService.getPopularMovies(page);
    
    res.json({
      success: true,
      data: movies
    });
  } catch (error) {
    console.error('Popular movies error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch popular movies'
    });
  }
});

// @route   GET /api/movies/trending
// @desc    Get trending movies
// @access  Public
router.get('/trending', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const timeWindow = req.query.time_window || 'week'; // week or day
    const movies = await tmdbService.getTrendingMovies(page, timeWindow);
    
    res.json({
      success: true,
      data: movies
    });
  } catch (error) {
    console.error('Trending movies error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch trending movies'
    });
  }
});

// @route   GET /api/movies/top-rated
// @desc    Get top rated movies
// @access  Public
router.get('/top-rated', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const movies = await tmdbService.getTopRatedMovies(page);
    
    res.json({
      success: true,
      data: movies
    });
  } catch (error) {
    console.error('Top rated movies error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch top rated movies'
    });
  }
});

// @route   GET /api/movies/upcoming
// @desc    Get upcoming movies
// @access  Public
router.get('/upcoming', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const movies = await tmdbService.getUpcomingMovies(page);
    
    res.json({
      success: true,
      data: movies
    });
  } catch (error) {
    console.error('Upcoming movies error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch upcoming movies'
    });
  }
});

// @route   GET /api/movies/search
// @desc    Search movies
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q: query, page = 1 } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const movies = await tmdbService.searchMovies(query, parseInt(page));
    
    res.json({
      success: true,
      data: movies
    });
  } catch (error) {
    console.error('Search movies error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to search movies'
    });
  }
});

// @route   GET /api/movies/:id
// @desc    Get movie details
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const movieId = parseInt(req.params.id);
    
    if (isNaN(movieId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid movie ID'
      });
    }

    const movie = await tmdbService.getMovieDetails(movieId);
    
    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.error('Movie details error:', error);
    if (error.message === 'Movie not found') {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch movie details'
    });
  }
});

// @route   GET /api/movies/genres
// @desc    Get movie genres
// @access  Public
router.get('/genres', async (req, res) => {
  try {
    const genres = await tmdbService.getGenres();
    
    res.json({
      success: true,
      data: genres
    });
  } catch (error) {
    console.error('Genres error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch genres'
    });
  }
});

// @route   GET /api/movies/genre/:id
// @desc    Get movies by genre
// @access  Public
router.get('/genre/:id', async (req, res) => {
  try {
    const genreId = parseInt(req.params.id);
    const page = parseInt(req.query.page) || 1;
    
    if (isNaN(genreId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid genre ID'
      });
    }

    const movies = await tmdbService.getMoviesByGenre(genreId, page);
    
    res.json({
      success: true,
      data: movies
    });
  } catch (error) {
    console.error('Movies by genre error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch movies by genre'
    });
  }
});

// @route   POST /api/movies/:id/watch
// @desc    Add movie to watch history
// @access  Private
router.post('/:id/watch', auth, async (req, res) => {
  try {
    const movieId = parseInt(req.params.id);
    const { progress = 0 } = req.body;
    
    if (isNaN(movieId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid movie ID'
      });
    }

    // Get movie details to ensure it exists
    const movie = await tmdbService.getMovieDetails(movieId);
    
    // Update or add to watch history
    const existingIndex = req.user.watchHistory.findIndex(
      item => item.movieId === movieId
    );

    const watchEntry = {
      movieId,
      watchedAt: new Date(),
      progress: Math.min(Math.max(progress, 0), 100)
    };

    if (existingIndex >= 0) {
      req.user.watchHistory[existingIndex] = watchEntry;
    } else {
      req.user.watchHistory.push(watchEntry);
    }

    await req.user.save();

    res.json({
      success: true,
      message: 'Movie added to watch history',
      data: {
        movie: {
          id: movie.id,
          title: movie.title,
          posterPath: movie.posterPath
        },
        progress: watchEntry.progress
      }
    });
  } catch (error) {
    console.error('Add to watch history error:', error);
    if (error.message === 'Movie not found') {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to add movie to watch history'
    });
  }
});

module.exports = router;

