const axios = require('axios');

// Test configuration
const BASE_URL = 'http://localhost:3001';
const API_KEY = '5af72ddee55a9867af8921fc69d53723';

// Test data
const testCases = [
  {
    name: 'Health Check',
    method: 'GET',
    url: '/health',
    expectedStatus: 200
  },
  {
    name: 'Root Endpoint',
    method: 'GET',
    url: '/',
    expectedStatus: 200
  },
  {
    name: 'Popular Movies',
    method: 'GET',
    url: '/api/movies/popular',
    expectedStatus: 200
  },
  {
    name: 'Trending Movies',
    method: 'GET',
    url: '/api/movies/trending',
    expectedStatus: 200
  },
  {
    name: 'Top Rated Movies',
    method: 'GET',
    url: '/api/movies/top-rated',
    expectedStatus: 200
  },
  {
    name: 'Upcoming Movies',
    method: 'GET',
    url: '/api/movies/upcoming',
    expectedStatus: 200
  },
  {
    name: 'Movie Genres',
    method: 'GET',
    url: '/api/movies/genres',
    expectedStatus: 200
  },
  {
    name: 'Search Movies',
    method: 'GET',
    url: '/api/movies/search?q=avengers',
    expectedStatus: 200
  },
  {
    name: 'Movie Details',
    method: 'GET',
    url: '/api/movies/550', // Fight Club movie ID
    expectedStatus: 200
  },
  {
    name: 'Movies by Genre',
    method: 'GET',
    url: '/api/movies/genre/28', // Action genre
    expectedStatus: 200
  }
];

// Test function
async function runTests() {
  console.log('🧪 Starting API Tests...\n');
  console.log('=' * 50);
  
  let passed = 0;
  let failed = 0;
  
  for (const testCase of testCases) {
    try {
      console.log(`\n🔍 Testing: ${testCase.name}`);
      console.log(`   ${testCase.method} ${BASE_URL}${testCase.url}`);
      
      const response = await axios({
        method: testCase.method,
        url: `${BASE_URL}${testCase.url}`,
        timeout: 10000
      });
      
      if (response.status === testCase.expectedStatus) {
        console.log(`   ✅ PASSED (${response.status})`);
        passed++;
        
        // Show sample data for successful requests
        if (response.data && response.data.data) {
          if (Array.isArray(response.data.data.results)) {
            console.log(`   📊 Found ${response.data.data.results.length} results`);
            if (response.data.data.results.length > 0) {
              console.log(`   🎬 Sample: ${response.data.data.results[0].title || response.data.data.results[0].name || 'N/A'}`);
            }
          } else if (response.data.data.title) {
            console.log(`   🎬 Movie: ${response.data.data.title}`);
          }
        }
      } else {
        console.log(`   ❌ FAILED - Expected ${testCase.expectedStatus}, got ${response.status}`);
        failed++;
      }
    } catch (error) {
      console.log(`   ❌ ERROR - ${error.message}`);
      if (error.response) {
        console.log(`   📝 Response: ${JSON.stringify(error.response.data, null, 2)}`);
      }
      failed++;
    }
  }
  
  console.log('\n' + '=' * 50);
  console.log(`\n📊 Test Results:`);
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! Your backend is working perfectly!');
  } else {
    console.log('\n⚠️  Some tests failed. Check the errors above.');
  }
}

// Test TMDB API directly
async function testTMDBDirect() {
  console.log('\n🔗 Testing TMDB API directly...');
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
    console.log('✅ TMDB API is accessible');
    console.log(`📊 Found ${response.data.results.length} popular movies`);
    console.log(`🎬 Sample: ${response.data.results[0].title}`);
  } catch (error) {
    console.log('❌ TMDB API test failed:', error.message);
  }
}

// Main execution
async function main() {
  console.log('🚀 Movie App Backend Tester');
  console.log('==========================\n');
  
  // Test TMDB API first
  await testTMDBDirect();
  
  // Test our backend
  await runTests();
  
  console.log('\n📝 Next Steps:');
  console.log('1. Make sure MongoDB is running (mongod)');
  console.log('2. Make sure Redis is running (redis-server)');
  console.log('3. Start your backend: npm run dev');
  console.log('4. Run this test: node test-api.js');
}

main().catch(console.error);
