# Weather CLI Application

A simple Node.js command-line interface (CLI) application that fetches and displays real-time weather information for any city in the world.

## Features

✨ **Simple & Clean**: Easy-to-use command-line interface
📍 **Global Coverage**: Works with cities worldwide
🌦️ **Real-time Data**: Fetches current weather conditions
🔧 **No API Key Required**: Uses free Open-Meteo API
⚠️ **Robust Error Handling**: Comprehensive error messages

## Weather Information Displayed

- 🌡️ Temperature (in Celsius)
- 💨 Wind Speed (in km/h)
- 💧 Humidity (percentage)
- 🌤️ Weather Conditions (Clear, Cloudy, Rainy, Snowy, etc.)

## Prerequisites

- **Node.js**: Version 14.0.0 or higher
- **npm**: Comes with Node.js

To check if Node.js is installed:
```bash
node --version
npm --version
```

If not installed, download from: https://nodejs.org/

## Installation

1. **Navigate to the project directory:**
   ```bash
   cd "weather app"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   This will install the `axios` package used for HTTP requests.

## Usage

### Basic Usage

```bash
node index.js "City Name"
```

### Examples

```bash
node index.js "New York"
node index.js "London"
node index.js "Tokyo"
node index.js "Paris"
node index.js "Sydney"
```

### Using the npm script

Alternatively, you can use the npm start script:

```bash
npm start -- "New York"
```

## Output Example

```
🔍 Fetching weather data for New York...

═══════════════════════════════════════════
📍 Weather in New York, New York, United States
═══════════════════════════════════════════
🌡️  Temperature: 15°C
💨 Wind Speed: 12 km/h
💧 Humidity: 65%
⛅ Partly cloudy
═══════════════════════════════════════════
```

## Error Handling

The application handles the following scenarios:

| Scenario | Error Message |
|----------|---------------|
| No city name provided | "City name not provided. Usage: node index.js \"City Name\"" |
| City not found | "City \"[city name]\" not found. Please check the spelling and try again." |
| Network disconnected | "Network error. Please check your internet connection." |
| Request timeout | "Request timeout. Check your internet connection and try again." |
| API error | Appropriate error message based on the error type |

### Example Error Cases

```bash
# No city name provided
node index.js
# ❌ Error: City name not provided. Usage: node index.js "City Name"

# Invalid city name
node index.js "XYZ123"
# ❌ Error: City "XYZ123" not found. Please check the spelling and try again.

# Network error
node index.js "Paris"  # (if no internet)
# ❌ Error: Network error. Please check your internet connection.
```

## How It Works

1. **Input Validation**: Checks if a city name was provided
2. **Geocoding**: Uses Open-Meteo Geocoding API to convert city name to coordinates
3. **Weather Data**: Fetches weather data using the coordinates from Open-Meteo Weather API
4. **Processing**: Parses the JSON response and converts weather codes to descriptions
5. **Display**: Shows formatted output with all weather information

## APIs Used

### 1. Open-Meteo Geocoding API
- **URL**: `https://geocoding-api.open-meteo.com/v1/search`
- **Purpose**: Convert city name to latitude/longitude
- **API Key**: Not required (free)

### 2. Open-Meteo Weather API
- **URL**: `https://api.open-meteo.com/v1/forecast`
- **Purpose**: Fetch current weather data
- **API Key**: Not required (free)

**Note**: These are free public APIs with no authentication required!

## Project Structure

```
weather-app/
├── package.json          # Project configuration and dependencies
├── index.js              # Main application file
└── README.md             # This file
```

## Code Architecture

### Main Functions

- **`getWeather(cityName)`**: Main async function that orchestrates the weather fetching process
- **`getWeatherDescription(code)`**: Maps WMO weather codes to human-readable descriptions
- **`displayWeather(...)`**: Formats and displays the weather information
- **`handleError(error)`**: Handles different types of errors gracefully

### Key Features

- **Async/Await**: All asynchronous operations use modern async/await syntax
- **Error Handling**: Comprehensive try-catch blocks and specific error messages
- **Timeout Protection**: 5-second timeout on API requests to prevent hanging
- **Input Validation**: Checks for empty or missing city names
- **Clean Output**: Formatted with emojis and clear separators

## Troubleshooting

### Command not recognized
- Make sure you're in the correct directory
- Check that Node.js is installed: `node --version`

### Module not found (axios)
- Run `npm install` to install dependencies
- Check that `node_modules` folder exists

### API connection errors
- Check your internet connection
- Try a different city name (avoid special characters)
- Ensure you're using the correct syntax: `node index.js "city name"`

### Timeout errors
- Check your internet speed
- Try again after a few seconds
- Ensure the API service is up (usually very reliable)

## Tips

- **City Name Format**: Use the English name of the city. Examples: "New York", "São Paulo", "Tokyo"
- **Special Characters**: City names with special characters usually work fine
- **Case Insensitive**: Both "london" and "LONDON" work
- **Spaces**: If city name has spaces, wrap it in quotes: `"New York"`

## Dependencies

- **axios** (^1.6.0): Simple HTTP client for making API requests
  - Used for making GET requests to weather APIs
  - Automatically handles JSON parsing
  - Includes timeout support

## License


For issues or questions, check:
1. The Troubleshooting section above
2. Ensure you're using valid city names
3. Verify your internet connection
4. Check Node.js version compatibility

---

**Created**: March 2026  
**Version**: 1.0.0
