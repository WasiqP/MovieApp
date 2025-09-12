const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: {
    type: Number,
    required: true
  },
  movieTitle: {
    type: String,
    required: true
  },
  moviePoster: {
    type: String,
    required: true
  },
  movieReleaseDate: {
    type: String,
    required: true
  },
  movieRating: {
    type: Number,
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to ensure unique user-movie combination
favoriteSchema.index({ user: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);

