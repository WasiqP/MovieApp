# 🎬 Frontend-Backend Integration Guide

This guide explains how to run your Movie App with the integrated backend API.

## 🚀 Quick Start

### 1. Start the Backend Server

```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not already done)
npm install

# Start the backend server
node simple-test.js
```

The backend will start on `http://localhost:3001`

### 2. Start the React Native App

```bash
# Navigate to root directory
cd ..

# Install dependencies (if not already done)
npm install

# Start Metro bundler
npm start

# In a new terminal, run on Android
npx react-native run-android

# Or run on iOS
npx react-native run-ios
```

## 🔧 Configuration

### API Configuration
The API base URL is configured in `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001', // Development
  // BASE_URL: 'https://your-backend-domain.com', // Production
};
```

### Backend Configuration
The backend uses your TMDB API credentials:
- **API Key**: `5af72ddee55a9867af8921fc69d53723`
- **Read Access Token**: `eyJhbGciOiJIUzI1NiJ9...`

## 📱 Features Implemented

### ✅ Home Screen
- **Popular Movies**: Fetches from `/api/movies/popular`
- **Trending Movies**: Fetches from `/api/movies/trending`
- **Search**: Real-time search using `/api/movies/search`
- **Loading States**: Shows loading indicators while fetching data
- **Error Handling**: Displays error messages if API fails

### ✅ Movies Screen
- **Trending Movies**: Horizontal scrollable list
- **Popular Movies**: Grid layout with movie cards
- **Search Functionality**: Search across all movies
- **Movie Details**: Navigate to movie details (when implemented)

### ✅ API Integration
- **Custom Hooks**: `usePopularMovies`, `useTrendingMovies`, `useSearchMovies`
- **TypeScript Types**: Full type safety with Movie interface
- **Error Handling**: Comprehensive error handling and loading states
- **Caching**: Automatic caching of API responses

## 🧪 Testing the Integration

### 1. Test Backend Endpoints
```bash
# Health check
curl http://localhost:3001/health

# Popular movies
curl http://localhost:3001/api/movies/popular

# Search movies
curl "http://localhost:3001/api/movies/search?q=avengers"
```

### 2. Test Mobile App
1. Open the app on your device/emulator
2. Check if popular movies load on the home screen
3. Try searching for movies
4. Navigate to the Movies tab
5. Verify trending movies are displayed

## 🔍 Troubleshooting

### Common Issues

#### 1. "Network request failed" Error
- **Cause**: Backend server not running
- **Solution**: Start the backend with `node simple-test.js`

#### 2. "Unable to connect to server" Error
- **Cause**: Wrong API URL or network issues
- **Solution**: Check `src/config/api.ts` and ensure backend is running

#### 3. Empty Movie Lists
- **Cause**: TMDB API issues or network problems
- **Solution**: Check backend logs and verify TMDB API key

#### 4. Images Not Loading
- **Cause**: TMDB image URLs not accessible
- **Solution**: Check network connectivity and TMDB service status

### Debug Steps

1. **Check Backend Status**:
   ```bash
   curl http://localhost:3001/health
   ```

2. **Check API Responses**:
   ```bash
   curl http://localhost:3001/api/movies/popular
   ```

3. **Check React Native Logs**:
   ```bash
   npx react-native log-android
   # or
   npx react-native log-ios
   ```

4. **Check Metro Bundler Logs**:
   Look at the terminal where you ran `npm start`

## 📊 API Endpoints Used

| Endpoint | Purpose | Used In |
|----------|---------|---------|
| `GET /health` | Health check | App startup |
| `GET /api/movies/popular` | Popular movies | Home screen |
| `GET /api/movies/trending` | Trending movies | Home & Movies screens |
| `GET /api/movies/search?q={query}` | Search movies | Search functionality |
| `GET /api/movies/{id}` | Movie details | Movie details screen |

## 🚀 Next Steps

### 1. Add More Features
- Movie details screen
- Favorites functionality
- User authentication
- Movie reviews and ratings

### 2. Production Deployment
- Deploy backend to cloud service
- Update API configuration for production
- Add environment-specific configurations

### 3. Performance Optimization
- Implement image caching
- Add pagination for large lists
- Optimize API calls

## 📝 Notes

- The app uses mock data as fallback if API fails
- All API calls include proper error handling
- Loading states provide good user experience
- TypeScript ensures type safety throughout the app

---

**Happy Coding! 🎬✨**
