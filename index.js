const axios = require('axios');

/**
 * Fetch weather data for a given city
 * Uses Open-Meteo API (free, no API key required) for weather data
 * and Geocoding API to get city coordinates
 */

async function getWeather(cityName) {
  try {
    // Validate input: Check if city name provided
    if (!cityName || cityName.trim() === '') {
      throw new Error('City name not provided. Usage: node index.js "City Name"');
    }

    console.log(`\n🔍 Fetching weather data for ${cityName}...\n`);

    // Step 1: Geocode the city name to get latitude and longitude
    const geoResponse = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: {
        name: cityName.trim(),
        count: 1,
        language: 'en',
        format: 'json'
      },
      timeout: 5000
    });

    // Check if city was found
    if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
      throw new Error(`City "${cityName}" not found. Please check the spelling and try again.`);
    }

    const cityData = geoResponse.data.results[0];
    const { latitude, longitude, name, admin1, country } = cityData;

    // Step 2: Fetch weather data using the coordinates
    const weatherResponse = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: latitude,
        longitude: longitude,
        current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
        temperature_unit: 'celsius',
        wind_speed_unit: 'kmh',
        timezone: 'auto'
      },
      timeout: 5000
    });

    const weatherData = weatherResponse.data.current;
    const temperature = weatherData.temperature_2m;
    const humidity = weatherData.relative_humidity_2m;
    const windSpeed = weatherData.wind_speed_10m;
    const weatherCode = weatherData.weather_code;

    // Map weather codes to human-readable descriptions
    const weatherDescription = getWeatherDescription(weatherCode);

    // Step 3: Display the formatted output
    displayWeather(name, admin1, country, temperature, humidity, windSpeed, weatherDescription);

  } catch (error) {
    handleError(error);
  }
}

/**
 * Map WMO weather codes to descriptions
 * Reference: https://www.open-meteo.com/en/docs
 */
function getWeatherDescription(code) {
  const descriptions = {
    0: '☀️  Clear sky',
    1: '🌤️  Mainly clear',
    2: '⛅ Partly cloudy',
    3: '☁️  Overcast',
    45: '🌫️  Foggy',
    48: '🌫️  Foggy',
    51: '🌧️  Light drizzle',
    53: '🌧️  Drizzle',
    55: '🌧️  Heavy drizzle',
    61: '🌧️  Slight rain',
    63: '🌧️  Moderate rain',
    65: '🌧️  Heavy rain',
    71: '❄️  Slight snow',
    73: '❄️  Moderate snow',
    75: '❄️  Heavy snow',
    77: '❄️  Snow grains',
    80: '🌧️  Slight rain showers',
    81: '🌧️  Moderate rain showers',
    82: '🌧️  Violent rain showers',
    85: '❄️  Slight snow showers',
    86: '❄️  Heavy snow showers',
    95: '⛈️  Thunderstorm',
    96: '⛈️  Thunderstorm with hail',
    99: '⛈️  Thunderstorm with hail'
  };

  return descriptions[code] || '🌤️  Unknown conditions';
}

/**
 * Display formatted weather information
 */
function displayWeather(name, admin1, country, temperature, humidity, windSpeed, description) {
  const location = admin1 ? `${name}, ${admin1}, ${country}` : `${name}, ${country}`;

  console.log('═══════════════════════════════════════════');
  console.log(`📍 Weather in ${location}`);
  console.log('═══════════════════════════════════════════');
  console.log(`🌡️  Temperature: ${temperature}°C`);
  console.log(`💨 Wind Speed: ${windSpeed} km/h`);
  console.log(`💧 Humidity: ${humidity}%`);
  console.log(`${description}`);
  console.log('═══════════════════════════════════════════\n');
}

/**
 * Handle different types of errors
 */
function handleError(error) {
  console.error('❌ Error:\n');

  if (error.message.includes('City')) {
    console.error(`   ${error.message}`);
  } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
    console.error('   Request timeout. Check your internet connection and try again.');
  } else if (error.response?.status === 404) {
    console.error('   API endpoint not found. Please check the API configuration.');
  } else if (error.response?.status === 401) {
    console.error('   Invalid API key. Please check your credentials.');
  } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
    console.error('   Network error. Please check your internet connection.');
  } else if (error.message.includes('not provided')) {
    console.error(`   ${error.message}`);
  } else {
    console.error(`   ${error.message || 'An unexpected error occurred'}`);
  }

  console.error('\n   Usage: node index.js "City Name"\n');
  process.exit(1);
}

// Main execution
const cityName = process.argv[2];
getWeather(cityName);
