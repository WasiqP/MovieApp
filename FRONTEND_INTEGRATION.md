# 🎬 Frontend Integration Guide

This guide will help you integrate the AirCorn Movie App frontend with the new backend API.

## 🔗 API Integration Overview

The backend provides a comprehensive REST API that replaces all mock data in your React Native app. Here's how to integrate it:

## 📱 Frontend Changes Required

### 1. API Configuration

Create a new file `src/services/api.js`:

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // Change to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      AsyncStorage.removeItem('authToken');
      // Navigate to login screen
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 2. Authentication Service

Create `src/services/authService.js`:

```javascript
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  // Register user
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      const { user, token } = response.data.data;
      
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      
      return { success: true, user, token };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  },

  // Login user
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const { user, token } = response.data.data;
      
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      
      return { success: true, user, token };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return { success: true, user: response.data.data.user };
    } catch (error) {
      return { success: false, message: 'Failed to get user data' };
    }
  },

  // Logout
  async logout() {
    try {
      await api.post('/auth/logout');
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Logout failed' };
    }
  }
};
```

### 3. Movie Service

Create `src/services/movieService.js`:

```javascript
import api from './api';

export const movieService = {
  // Get popular movies
  async getPopularMovies(page = 1) {
    try {
      const response = await api.get(`/movies/popular?page=${page}`);
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch popular movies' };
    }
  },

  // Get trending movies
  async getTrendingMovies(page = 1, timeWindow = 'week') {
    try {
      const response = await api.get(`/movies/trending?page=${page}&time_window=${timeWindow}`);
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch trending movies' };
    }
  },

  // Get top rated movies
  async getTopRatedMovies(page = 1) {
    try {
      const response = await api.get(`/movies/top-rated?page=${page}`);
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch top rated movies' };
    }
  },

  // Get upcoming movies
  async getUpcomingMovies(page = 1) {
    try {
      const response = await api.get(`/movies/upcoming?page=${page}`);
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch upcoming movies' };
    }
  },

  // Search movies
  async searchMovies(query, page = 1) {
    try {
      const response = await api.get(`/movies/search?q=${encodeURIComponent(query)}&page=${page}`);
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: 'Failed to search movies' };
    }
  },

  // Get movie details
  async getMovieDetails(movieId) {
    try {
      const response = await api.get(`/movies/${movieId}`);
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch movie details' };
    }
  },

  // Get genres
  async getGenres() {
    try {
      const response = await api.get('/movies/genres');
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch genres' };
    }
  },

  // Get movies by genre
  async getMoviesByGenre(genreId, page = 1) {
    try {
      const response = await api.get(`/movies/genre/${genreId}?page=${page}`);
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch movies by genre' };
    }
  },

  // Add to watch history
  async addToWatchHistory(movieId, progress = 0) {
    try {
      const response = await api.post(`/movies/${movieId}/watch`, { progress });
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: 'Failed to add to watch history' };
    }
  }
};
```

### 4. Favorites Service

Create `src/services/favoritesService.js`:

```javascript
import api from './api';

export const favoritesService = {
  // Get user's favorites
  async getFavorites(page = 1, limit = 20) {
    try {
      const response = await api.get(`/favorites?page=${page}&limit=${limit}`);
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch favorites' };
    }
  },

  // Add movie to favorites
  async addToFavorites(movieId) {
    try {
      const response = await api.post('/favorites', { movieId });
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: 'Failed to add to favorites' };
    }
  },

  // Remove movie from favorites
  async removeFromFavorites(movieId) {
    try {
      const response = await api.delete(`/favorites/${movieId}`);
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: 'Failed to remove from favorites' };
    }
  },

  // Check if movie is favorited
  async checkFavorite(movieId) {
    try {
      const response = await api.get(`/favorites/check/${movieId}`);
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: 'Failed to check favorite status' };
    }
  },

  // Get favorite statistics
  async getFavoriteStats() {
    try {
      const response = await api.get('/favorites/stats');
      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch favorite statistics' };
    }
  }
};
```

## 🔄 Update Your Components

### 1. Update Home Component

Replace mock data in `src/main/Home.tsx`:

```javascript
import React, { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load popular movies
      const popularResult = await movieService.getPopularMovies(1);
      if (popularResult.success) {
        setPopularMovies(popularResult.data.results);
      }

      // Load trending movies
      const trendingResult = await movieService.getTrendingMovies(1);
      if (trendingResult.success) {
        setTrendingMovies(trendingResult.data.results);
      }

      // Load genres
      const genresResult = await movieService.getGenres();
      if (genresResult.success) {
        setGenres(genresResult.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Rest of your component...
};
```

### 2. Update Login Component

Update `src/authentication/Login.tsx`:

```javascript
import React, { useState } from 'react';
import { authService } from '../services/authService';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await authService.login({ email, password });
    setLoading(false);

    if (result.success) {
      navigation.replace('MainScreen');
    } else {
      Alert.alert('Login Failed', result.message);
    }
  };

  // Rest of your component...
};
```

### 3. Update Favorites Component

Update `src/main/Favourites.tsx`:

```javascript
import React, { useState, useEffect } from 'react';
import { favoritesService } from '../services/favoritesService';

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const result = await favoritesService.getFavorites();
      if (result.success) {
        setFavorites(result.data.favorites);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (movieId) => {
    const result = await favoritesService.removeFromFavorites(movieId);
    if (result.success) {
      setFavorites(favorites.filter(fav => fav.movieId !== movieId));
    }
  };

  // Rest of your component...
};
```

## 🎯 Key Integration Points

### 1. Authentication Flow
- Replace mock navigation with real API calls
- Store JWT tokens securely
- Handle authentication errors gracefully

### 2. Data Loading
- Replace all mock data with API calls
- Implement loading states
- Handle network errors

### 3. State Management
- Consider using Context API or Redux for global state
- Cache API responses locally
- Implement offline support

### 4. Error Handling
- Show user-friendly error messages
- Implement retry mechanisms
- Handle network connectivity issues

## 📦 Required Dependencies

Add these to your `package.json`:

```json
{
  "dependencies": {
    "axios": "^1.6.2",
    "@react-native-async-storage/async-storage": "^1.19.5"
  }
}
```

Install them:
```bash
npm install axios @react-native-async-storage/async-storage
```

## 🔧 Environment Configuration

Create `src/config/api.js`:

```javascript
// Development
const API_BASE_URL = 'http://localhost:3001/api';

// Production (replace with your production URL)
// const API_BASE_URL = 'https://your-api-domain.com/api';

export default API_BASE_URL;
```

## 🚀 Testing the Integration

1. **Start the backend server**
2. **Update your frontend API calls**
3. **Test authentication flow**
4. **Test movie data loading**
5. **Test favorites functionality**

## 📱 Production Considerations

1. **API URL**: Update to production backend URL
2. **Error Handling**: Implement comprehensive error handling
3. **Loading States**: Add loading indicators
4. **Offline Support**: Cache data for offline viewing
5. **Performance**: Implement pagination and lazy loading

Your AirCorn Movie App is now fully integrated with the backend! 🎬✨

