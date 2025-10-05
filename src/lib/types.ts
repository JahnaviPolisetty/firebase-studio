export interface DailyForecast {
  time: string;
  temp: number;
  icon: 'Sunrise' | 'Sun' | 'Sunset' | 'Moon';
}

export interface HistoricalDataPoint {
  year: number;
  avgTemp: number;
}

export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainfallChance: number;
  comfortIndex: 'Very Hot' | 'Pleasant' | 'Cold' | 'Very Wet' | 'Windy';
  dailyForecast: DailyForecast[];
  historicalData: HistoricalDataPoint[];
  condition: 'sunny' | 'rainy' | 'cloudy' | 'stormy';
}
