# 🧪 Backend Testing Guide

This guide will help you test whether your Movie App backend is working correctly with your TMDB API credentials.

## 🔑 Your API Credentials
- **API Key**: `5af72ddee55a9867af8921fc69d53723`
- **Read Access Token**: `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWY3MmRkZWU1NWE5ODY3YWY4OTIxZmM2OWQ1MzcyMyIsIm5iZiI6MTc1Njg4NzMyOC4zNDA5OTk4LCJzdWIiOiI2OGI3ZjkyMDAzNzdmNzBkZTcwNjg3OWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Y0QPLzQcbXIN6XiQA2OSJYVyXW_Qy2He-SnKY_dvzwk`

## 🚀 Quick Start Testing

### Method 1: Automated Test Script (Recommended)

1. **Set up environment variables**:
   ```bash
   cd backend
   cp env.example .env
   ```
   
2. **Edit the `.env` file** and update:
   ```
   TMDB_API_KEY=5af72ddee55a9867af8921fc69d53723
   JWT_SECRET=your_secure_jwt_secret_here
   ```

3. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

4. **Start required services**:
   ```bash
   # Terminal 1: Start MongoDB
   mongod
   
   # Terminal 2: Start Redis
   redis-server
   
   # Terminal 3: Start your backend
   npm run dev
   ```

5. **Run the automated test**:
   ```bash
   node test-api.js
   ```

### Method 2: Manual Testing with curl

Test each endpoint individually:

```bash
# 1. Health Check
curl http://localhost:3001/health

# 2. Root Endpoint
curl http://localhost:3001/

# 3. Popular Movies
curl http://localhost:3001/api/movies/popular

# 4. Trending Movies
curl http://localhost:3001/api/movies/trending

# 5. Top Rated Movies
curl http://localhost:3001/api/movies/top-rated

# 6. Upcoming Movies
curl http://localhost:3001/api/movies/upcoming

# 7. Search Movies
curl "http://localhost:3001/api/movies/search?q=avengers"

# 8. Movie Details (Fight Club)
curl http://localhost:3001/api/movies/550

# 9. Movie Genres
curl http://localhost:3001/api/movies/genres

# 10. Movies by Genre (Action)
curl http://localhost:3001/api/movies/genre/28
```

### Method 3: Browser Testing

Open these URLs in your browser:

- **Health Check**: http://localhost:3001/health
- **API Info**: http://localhost:3001/
- **Popular Movies**: http://localhost:3001/api/movies/popular
- **Trending Movies**: http://localhost:3001/api/movies/trending
- **Search Movies**: http://localhost:3001/api/movies/search?q=batman

### Method 4: Postman/Insomnia Testing

Import these requests into Postman or Insomnia:

```json
{
  "name": "Movie App API Tests",
  "requests": [
    {
      "name": "Health Check",
      "method": "GET",
      "url": "http://localhost:3001/health"
    },
    {
      "name": "Popular Movies",
      "method": "GET",
      "url": "http://localhost:3001/api/movies/popular"
    },
    {
      "name": "Search Movies",
      "method": "GET",
      "url": "http://localhost:3001/api/movies/search?q=avengers"
    },
    {
      "name": "Movie Details",
      "method": "GET",
      "url": "http://localhost:3001/api/movies/550"
    }
  ]
}
```

## 🔍 What to Look For

### ✅ Success Indicators

1. **Health Check Response**:
   ```json
   {
     "status": "OK",
     "timestamp": "2024-01-XX...",
     "uptime": 123.456,
     "environment": "development"
   }
   ```

2. **Movie API Response**:
   ```json
   {
     "success": true,
     "data": {
       "page": 1,
       "totalPages": 500,
       "totalResults": 10000,
       "results": [
         {
           "id": 550,
           "title": "Fight Club",
           "posterPath": "https://image.tmdb.org/t/p/w500/...",
           "voteAverage": 8.4,
           "releaseDate": "1999-10-15"
         }
       ]
     }
   }
   ```

### ❌ Common Issues & Solutions

1. **"Cannot connect to server"**
   - Make sure the backend is running: `npm run dev`
   - Check if port 3001 is available

2. **"TMDB API error"**
   - Verify your API key is correct
   - Check if you have internet connection
   - Ensure TMDB API is accessible

3. **"Database connection error"**
   - Start MongoDB: `mongod`
   - Check MongoDB connection string in `.env`

4. **"Redis connection error"**
   - Start Redis: `redis-server`
   - Check Redis URL in `.env`

5. **"Rate limit exceeded"**
   - Wait a few minutes and try again
   - Check rate limiting configuration

## 📊 Expected Test Results

When everything is working correctly, you should see:

- ✅ All 10 test cases pass
- 📊 Movie data with proper structure
- 🎬 Sample movie titles displayed
- 📈 100% success rate

## 🛠️ Troubleshooting

### Check Backend Logs
Look for these messages in your backend console:
```
🚀 Server running on port 3001
📱 Environment: development
🔗 API Base URL: http://localhost:3001/api
❤️  Health Check: http://localhost:3001/health
```

### Verify Dependencies
```bash
# Check if all packages are installed
npm list

# Reinstall if needed
rm -rf node_modules package-lock.json
npm install
```

### Test TMDB API Directly
```bash
curl "https://api.themoviedb.org/3/movie/popular?api_key=5af72ddee55a9867af8921fc69d53723"
```

## 🎯 Next Steps

Once your backend is working:

1. **Test Authentication**: Try registering and logging in
2. **Test Favorites**: Add/remove movies from favorites
3. **Test Search**: Search for different movies
4. **Test Pagination**: Try different page numbers
5. **Test Error Handling**: Try invalid movie IDs

## 📞 Support

If you encounter issues:

1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB and Redis are running
4. Test TMDB API directly to verify credentials
5. Check network connectivity

---

**Happy Testing! 🎬✨**
