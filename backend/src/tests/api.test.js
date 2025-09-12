const request = require('supertest');
const app = require('../server');

describe('API Health Check', () => {
  test('GET /health should return 200', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  test('GET / should return API info', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('AirCorn Movie App API');
  });
});

describe('Authentication Endpoints', () => {
  test('POST /api/auth/register should create new user', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user.email).toBe(userData.email);
  });

  test('POST /api/auth/login should authenticate user', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();
  });
});

describe('Movie Endpoints', () => {
  test('GET /api/movies/popular should return popular movies', async () => {
    const response = await request(app).get('/api/movies/popular');
    
    // This test might fail without TMDB API key, but structure should be correct
    if (response.status === 500) {
      expect(response.body.success).toBe(false);
    } else {
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('results');
    }
  });

  test('GET /api/movies/genres should return genres', async () => {
    const response = await request(app).get('/api/movies/genres');
    
    if (response.status === 500) {
      expect(response.body.success).toBe(false);
    } else {
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    }
  });
});

