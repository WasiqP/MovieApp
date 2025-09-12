# AirCorn Movie App Backend API

A comprehensive backend API for the AirCorn Movie App with TMDB integration, user authentication, favorites management, and watch history tracking.

## 🚀 Features

- **Movie Data Integration**: Full TMDB API integration for movies, genres, search, and details
- **User Authentication**: JWT-based authentication with registration and login
- **Favorites Management**: Add, remove, and manage favorite movies
- **Watch History**: Track user's movie watching progress and history
- **Caching**: Redis caching for improved performance
- **Rate Limiting**: API rate limiting for security
- **Data Validation**: Comprehensive input validation and error handling
- **MongoDB**: Document-based database for user data and caching

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Redis (optional, for caching)
- TMDB API Key

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=3001
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/movieapp
   REDIS_URL=redis://localhost:6379
   TMDB_API_KEY=your_tmdb_api_key_here
   JWT_SECRET=your_jwt_secret_key_here
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `PUT /api/auth/profile` - Update user profile

### Movies
- `GET /api/movies/popular` - Get popular movies
- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/top-rated` - Get top rated movies
- `GET /api/movies/upcoming` - Get upcoming movies
- `GET /api/movies/search?q=query` - Search movies
- `GET /api/movies/:id` - Get movie details
- `GET /api/movies/genres` - Get movie genres
- `GET /api/movies/genre/:id` - Get movies by genre
- `POST /api/movies/:id/watch` - Add to watch history

### Favorites
- `GET /api/favorites` - Get user's favorites
- `POST /api/favorites` - Add movie to favorites
- `DELETE /api/favorites/:movieId` - Remove from favorites
- `GET /api/favorites/check/:movieId` - Check if movie is favorited
- `GET /api/favorites/stats` - Get favorite statistics

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/watch-history` - Get watch history
- `DELETE /api/users/watch-history/:movieId` - Remove from watch history
- `DELETE /api/users/watch-history` - Clear watch history
- `GET /api/users/stats` - Get user statistics
- `POST /api/users/avatar` - Update avatar

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/movieapp |
| `REDIS_URL` | Redis connection string | redis://localhost:6379 |
| `TMDB_API_KEY` | TMDB API key | Required |
| `TMDB_BASE_URL` | TMDB API base URL | https://api.themoviedb.org/3 |
| `TMDB_IMAGE_BASE_URL` | TMDB image base URL | https://image.tmdb.org/t/p |
| `JWT_SECRET` | JWT secret key | Required |
| `JWT_EXPIRE` | JWT expiration | 7d |
| `CORS_ORIGIN` | CORS origin | http://localhost:3000 |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String,
  preferences: {
    favoriteGenres: [String],
    language: String,
    notifications: {
      email: Boolean,
      push: Boolean
    }
  },
  watchHistory: [{
    movieId: Number,
    watchedAt: Date,
    progress: Number (0-100)
  }],
  isActive: Boolean,
  lastLogin: Date
}
```

### Favorite Model
```javascript
{
  user: ObjectId (ref: User),
  movieId: Number,
  movieTitle: String,
  moviePoster: String,
  movieReleaseDate: String,
  movieRating: Number,
  addedAt: Date
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Configurable cross-origin requests
- **Helmet**: Security headers
- **Error Handling**: Secure error responses

## 📊 Caching Strategy

- **Redis Caching**: For frequently accessed data
- **MongoDB Caching**: For movie details and metadata
- **TTL Management**: Automatic cache expiration
- **Cache Invalidation**: Smart cache updates

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📈 Performance

- **Response Caching**: Reduces API calls to TMDB
- **Database Indexing**: Optimized queries
- **Compression**: Gzip compression for responses
- **Connection Pooling**: Efficient database connections

## 🚀 Deployment

### Docker (Recommended)
```bash
# Build image
docker build -t movieapp-backend .

# Run container
docker run -p 3001:3001 --env-file .env movieapp-backend
```

### Manual Deployment
1. Set up MongoDB and Redis
2. Configure environment variables
3. Install dependencies: `npm install --production`
4. Start server: `npm start`

## 📝 API Documentation

The API follows RESTful conventions with consistent response formats:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ] // Optional validation errors
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

