# 🚀 AirCorn Backend Setup Guide

This guide will help you set up the AirCorn Movie App backend with TMDB API integration.

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
- **Redis** (optional, for caching) - [Download here](https://redis.io/download)
- **Git** - [Download here](https://git-scm.com/)

## 🔑 Get TMDB API Key

1. Go to [TMDB API](https://www.themoviedb.org/settings/api)
2. Create an account or log in
3. Request an API key (it's free)
4. Copy your API key for later use

## 🛠️ Installation Steps

### Step 1: Clone and Setup

```bash
# Navigate to your project directory
cd MovieApp

# Install backend dependencies
cd backend
npm install
```

### Step 2: Environment Configuration

```bash
# Copy the environment template
cp env.example .env

# Edit the .env file with your configuration
nano .env  # or use your preferred editor
```

**Required Environment Variables:**
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/movieapp
REDIS_URL=redis://localhost:6379

# TMDB API Configuration (REQUIRED)
TMDB_API_KEY=your_actual_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# JWT Configuration (REQUIRED)
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Cache Configuration
CACHE_TTL=3600
```

### Step 3: Start Services

#### Option A: Using Docker (Recommended)

```bash
# Start all services with Docker Compose
docker-compose up -d

# Check if services are running
docker-compose ps
```

#### Option B: Manual Setup

**Start MongoDB:**
```bash
# On Windows
mongod

# On macOS
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

**Start Redis (optional):**
```bash
# On Windows
redis-server

# On macOS
brew services start redis

# On Linux
sudo systemctl start redis
```

**Start the Backend:**
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

### Step 4: Verify Installation

1. **Check Health Endpoint:**
   ```bash
   curl http://localhost:3001/health
   ```
   Expected response:
   ```json
   {
     "status": "OK",
     "timestamp": "2024-01-01T00:00:00.000Z",
     "uptime": 123.456,
     "environment": "development"
   }
   ```

2. **Test API Root:**
   ```bash
   curl http://localhost:3001/
   ```

3. **Test TMDB Integration:**
   ```bash
   curl http://localhost:3001/api/movies/popular
   ```

## 🔧 Configuration Details

### Database Setup

**MongoDB Collections:**
- `users` - User accounts and profiles
- `favorites` - User's favorite movies
- `moviecaches` - Cached movie data (auto-expires)

**Redis Keys (if enabled):**
- `popular_movies_*` - Cached popular movies
- `trending_movies_*` - Cached trending movies
- `movie_*` - Cached movie details

### API Rate Limits

- **General API**: 100 requests per 15 minutes per IP
- **TMDB API**: Respects TMDB's rate limits
- **Authentication**: No special limits

### Caching Strategy

1. **Redis Cache** (if enabled):
   - Popular movies: 30 minutes
   - Trending movies: 30 minutes
   - Search results: 30 minutes
   - Genres: 24 hours

2. **MongoDB Cache**:
   - Movie details: 24 hours
   - Auto-expires based on TTL

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- src/tests/api.test.js
```

## 📊 Monitoring

### Health Check Endpoints

- `GET /health` - Basic health status
- `GET /` - API information

### Logs

- **Development**: Console logs with Morgan
- **Production**: Structured JSON logs

### Database Monitoring

If using Docker Compose, access MongoDB Express at:
- URL: http://localhost:8081
- Username: admin
- Password: password

## 🚀 Production Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb://your-production-mongo-url
REDIS_URL=redis://your-production-redis-url
TMDB_API_KEY=your_production_tmdb_key
JWT_SECRET=your_production_jwt_secret
CORS_ORIGIN=https://your-frontend-domain.com
```

### Security Considerations

1. **JWT Secret**: Use a strong, random secret
2. **CORS**: Set appropriate origins
3. **Rate Limiting**: Adjust based on usage
4. **HTTPS**: Use SSL certificates in production
5. **Database**: Use connection strings with authentication

## 🔍 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running and connection string is correct.

**2. TMDB API Error**
```
Error: Request failed with status code 401
```
**Solution**: Check your TMDB API key in the .env file.

**3. Redis Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:6379
```
**Solution**: Redis is optional. The app will work without it but without caching.

**4. Port Already in Use**
```
Error: listen EADDRINUSE :::3001
```
**Solution**: Change the PORT in .env or kill the process using port 3001.

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev

# Or specific modules
DEBUG=app:*,tmdb:* npm run dev
```

## 📚 API Documentation

Once running, you can test the API using:

1. **Postman Collection**: Import the API endpoints
2. **cURL Commands**: Use the examples in README.md
3. **Frontend Integration**: Connect your React Native app

## 🆘 Support

If you encounter issues:

1. Check the logs for error messages
2. Verify all environment variables are set
3. Ensure all services (MongoDB, Redis) are running
4. Check your TMDB API key is valid
5. Review the troubleshooting section above

## 🎯 Next Steps

1. **Test the API** with the provided endpoints
2. **Integrate with Frontend** using the API endpoints
3. **Set up Monitoring** for production use
4. **Configure CI/CD** for automated deployments

Your AirCorn Movie App backend is now ready! 🎬

