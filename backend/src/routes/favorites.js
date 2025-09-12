const express = require('express');
const Favorite = require('../models/Favorite');
const tmdbService = require('../services/tmdbService');
const auth = require('../middleware/auth');
const { validateMovieId } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/favorites
// @desc    Get user's favorite movies
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const favorites = await Favorite.find({ user: req.user._id })
      .sort({ addedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Favorite.countDocuments({ user: req.user._id });

    res.json({
      success: true,
      data: {
        favorites,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch favorites'
    });
  }
});

// @route   POST /api/favorites
// @desc    Add movie to favorites
// @access  Private
router.post('/', auth, validateMovieId, async (req, res) => {
  try {
    const { movieId } = req.body;

    // Check if already in favorites
    const existingFavorite = await Favorite.findOne({
      user: req.user._id,
      movieId
    });

    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: 'Movie is already in favorites'
      });
    }

    // Get movie details from TMDB
    const movieDetails = await tmdbService.getMovieDetails(movieId);

    // Create favorite entry
    const favorite = await Favorite.create({
      user: req.user._id,
      movieId: movieDetails.id,
      movieTitle: movieDetails.title,
      moviePoster: movieDetails.posterPath,
      movieReleaseDate: movieDetails.releaseDate,
      movieRating: movieDetails.voteAverage
    });

    res.status(201).json({
      success: true,
      message: 'Movie added to favorites',
      data: {
        favorite: {
          id: favorite._id,
          movieId: favorite.movieId,
          movieTitle: favorite.movieTitle,
          moviePoster: favorite.moviePoster,
          movieReleaseDate: favorite.movieReleaseDate,
          movieRating: favorite.movieRating,
          addedAt: favorite.addedAt
        }
      }
    });
  } catch (error) {
    console.error('Add favorite error:', error);
    if (error.message === 'Movie not found') {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to add movie to favorites'
    });
  }
});

// @route   DELETE /api/favorites/:movieId
// @desc    Remove movie from favorites
// @access  Private
router.delete('/:movieId', auth, async (req, res) => {
  try {
    const movieId = parseInt(req.params.movieId);
    
    if (isNaN(movieId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid movie ID'
      });
    }

    const favorite = await Favorite.findOneAndDelete({
      user: req.user._id,
      movieId
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found in favorites'
      });
    }

    res.json({
      success: true,
      message: 'Movie removed from favorites',
      data: {
        movieId: favorite.movieId,
        movieTitle: favorite.movieTitle
      }
    });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove movie from favorites'
    });
  }
});

// @route   GET /api/favorites/check/:movieId
// @desc    Check if movie is in favorites
// @access  Private
router.get('/check/:movieId', auth, async (req, res) => {
  try {
    const movieId = parseInt(req.params.movieId);
    
    if (isNaN(movieId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid movie ID'
      });
    }

    const favorite = await Favorite.findOne({
      user: req.user._id,
      movieId
    });

    res.json({
      success: true,
      data: {
        isFavorite: !!favorite,
        favorite: favorite ? {
          id: favorite._id,
          addedAt: favorite.addedAt
        } : null
      }
    });
  } catch (error) {
    console.error('Check favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check favorite status'
    });
  }
});

// @route   GET /api/favorites/stats
// @desc    Get user's favorite statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const totalFavorites = await Favorite.countDocuments({ user: req.user._id });
    
    // Get genre distribution from favorites
    const genreStats = await Favorite.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, total: { $sum: 1 } } }
    ]);

    // Get recent favorites (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentFavorites = await Favorite.countDocuments({
      user: req.user._id,
      addedAt: { $gte: thirtyDaysAgo }
    });

    res.json({
      success: true,
      data: {
        totalFavorites,
        recentFavorites,
        averageRating: 0 // This would require additional calculation
      }
    });
  } catch (error) {
    console.error('Favorites stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch favorite statistics'
    });
  }
});

module.exports = router;

