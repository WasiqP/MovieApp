const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, preferences } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (preferences) {
      updateData.preferences = { ...req.user.preferences, ...preferences };
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
});

// @route   GET /api/users/watch-history
// @desc    Get user's watch history
// @access  Private
router.get('/watch-history', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const watchHistory = req.user.watchHistory
      .sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt))
      .slice(skip, skip + limit);

    const total = req.user.watchHistory.length;

    res.json({
      success: true,
      data: {
        watchHistory,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get watch history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch watch history'
    });
  }
});

// @route   DELETE /api/users/watch-history/:movieId
// @desc    Remove movie from watch history
// @access  Private
router.delete('/watch-history/:movieId', auth, async (req, res) => {
  try {
    const movieId = parseInt(req.params.movieId);
    
    if (isNaN(movieId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid movie ID'
      });
    }

    const initialLength = req.user.watchHistory.length;
    req.user.watchHistory = req.user.watchHistory.filter(
      item => item.movieId !== movieId
    );

    if (req.user.watchHistory.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found in watch history'
      });
    }

    await req.user.save();

    res.json({
      success: true,
      message: 'Movie removed from watch history'
    });
  } catch (error) {
    console.error('Remove from watch history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove movie from watch history'
    });
  }
});

// @route   DELETE /api/users/watch-history
// @desc    Clear all watch history
// @access  Private
router.delete('/watch-history', auth, async (req, res) => {
  try {
    req.user.watchHistory = [];
    await req.user.save();

    res.json({
      success: true,
      message: 'Watch history cleared'
    });
  } catch (error) {
    console.error('Clear watch history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear watch history'
    });
  }
});

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const { watchHistory } = req.user;
    
    // Calculate watch statistics
    const totalWatched = watchHistory.length;
    const recentlyWatched = watchHistory.filter(
      item => new Date(item.watchedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;

    // Calculate average progress
    const averageProgress = watchHistory.length > 0 
      ? watchHistory.reduce((sum, item) => sum + item.progress, 0) / watchHistory.length
      : 0;

    // Get completed movies (progress >= 90%)
    const completedMovies = watchHistory.filter(item => item.progress >= 90).length;

    res.json({
      success: true,
      data: {
        totalWatched,
        recentlyWatched,
        averageProgress: Math.round(averageProgress * 100) / 100,
        completedMovies,
        memberSince: req.user.createdAt
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user statistics'
    });
  }
});

// @route   POST /api/users/avatar
// @desc    Update user avatar
// @access  Private
router.post('/avatar', auth, async (req, res) => {
  try {
    const { avatarUrl } = req.body;

    if (!avatarUrl) {
      return res.status(400).json({
        success: false,
        message: 'Avatar URL is required'
      });
    }

    // Basic URL validation
    try {
      new URL(avatarUrl);
    } catch {
      return res.status(400).json({
        success: false,
        message: 'Invalid avatar URL'
      });
    }

    req.user.avatar = avatarUrl;
    await req.user.save();

    res.json({
      success: true,
      message: 'Avatar updated successfully',
      data: {
        avatar: req.user.avatar
      }
    });
  } catch (error) {
    console.error('Update avatar error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update avatar'
    });
  }
});

module.exports = router;

