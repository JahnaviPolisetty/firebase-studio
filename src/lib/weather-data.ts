import type { WeatherData } from './types';

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

const validateCoordinates = (lat: number, lon: number) => {
  return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
};

// Mock function to simulate fetching weather data
export const getWeatherData = async (location: string, date: Date): Promise<WeatherData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (!location) {
    throw new Error('Please enter a valid location.');
  }

  // Check for random, nonsensical strings that are unlikely to be real places.
  // This is a mock validation. A real app would use a geocoding API.
  if (!location.includes(',') && location.length < 3) {
      throw new Error('Please enter a valid location.');
  }

  const coords = location.split(',').map(s => parseFloat(s.trim()));
  if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
    const [lat, lon] = coords;
    if (!validateCoordinates(lat, lon)) {
      throw new Error('Please enter a valid location. Latitude must be between -90 and 90, and longitude between -180 and 180.');
    }
  } else if (location.toLowerCase() === 'error' || location.toLowerCase() === 'invalid') {
     throw new Error('Please enter a valid input');
  }


  const seed = hashCode(location.toLowerCase() + date.toISOString().split('T')[0]);
  const random = seededRandom(seed);

  const conditions: WeatherData['condition'][] = ['sunny', 'rainy', 'cloudy', 'stormy'];
  const comfortLevels: WeatherData['comfortIndex'][] = ['Very Hot', 'Pleasant', 'Cold', 'Very Wet', 'Windy'];
  
  const randomCondition = conditions[Math.floor(random() * conditions.length)];
  const randomComfort = comfortLevels[Math.floor(random() * comfortLevels.length)];
  const baseTemp = 5 + random() * 25; // Base temperature between 5 and 30

  return {
    location,
    temperature: Math.round(baseTemp),
    humidity: Math.floor(random() * 70) + 30, // 30-100%
    windSpeed: Math.floor(random() * 40),
    rainfallChance: randomCondition === 'rainy' || randomCondition === 'stormy' ? Math.floor(random() * 60) + 40 : Math.floor(random() * 40),
    comfortIndex: randomComfort,
    condition: randomCondition,
    dailyForecast: [
      { time: 'Morning', temp: Math.round(baseTemp - 5 + random() * 2), icon: 'Sunrise' },
      { time: 'Afternoon', temp: Math.round(baseTemp + 2 + random() * 2), icon: 'Sun' },
      { time: 'Evening', temp: Math.round(baseTemp - 2 + random() * 2), icon: 'Sunset' },
      { time: 'Night', temp: Math.round(baseTemp - 8 + random() * 2), icon: 'Moon' },
    ],
    historicalData: Array.from({ length: 11 }, (_, i) => ({
      year: new Date().getFullYear() - 10 + i,
      avgTemp: Math.round(baseTemp - 3 + random() * 6),
    })),
  };
};
