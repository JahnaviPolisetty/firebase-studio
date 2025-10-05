import type { WeatherData } from './types';

// Mock function to simulate fetching weather data from NASA APIs
export const getWeatherData = async (location: string, date: Date): Promise<WeatherData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (location.toLowerCase() === 'error') {
    throw new Error('Could not fetch weather data for the specified location.');
  }

  const conditions: WeatherData['condition'][] = ['sunny', 'rainy', 'cloudy', 'stormy'];
  const comfortLevels: WeatherData['comfortIndex'][] = ['Very Hot', 'Pleasant', 'Cold', 'Very Wet', 'Windy'];
  
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const randomComfort = comfortLevels[Math.floor(Math.random() * comfortLevels.length)];
  const baseTemp = 5 + Math.random() * 25; // Base temperature between 5 and 30

  return {
    temperature: Math.round(baseTemp),
    humidity: Math.floor(Math.random() * 70) + 30, // 30-100%
    windSpeed: Math.floor(Math.random() * 40),
    rainfallChance: randomCondition === 'rainy' || randomCondition === 'stormy' ? Math.floor(Math.random() * 60) + 40 : Math.floor(Math.random() * 40),
    comfortIndex: randomComfort,
    condition: randomCondition,
    dailyForecast: [
      { time: 'Morning', temp: Math.round(baseTemp - 5), icon: 'Sunrise' },
      { time: 'Afternoon', temp: Math.round(baseTemp + 2), icon: 'Sun' },
      { time: 'Evening', temp: Math.round(baseTemp - 2), icon: 'Sunset' },
      { time: 'Night', temp: Math.round(baseTemp - 8), icon: 'Moon' },
    ],
    historicalData: Array.from({ length: 11 }, (_, i) => ({
      year: new Date().getFullYear() - 10 + i,
      avgTemp: Math.round(baseTemp - 3 + Math.random() * 6),
    })),
  };
};
