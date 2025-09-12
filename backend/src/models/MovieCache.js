const mongoose = require('mongoose');

const movieCacheSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
    unique: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  type: {
    type: String,
    enum: ['details', 'credits', 'videos', 'reviews'],
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  }
}, {
  timestamps: true
});

// TTL index for automatic cleanup
movieCacheSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('MovieCache', movieCacheSchema);

