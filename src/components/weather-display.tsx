import type { WeatherData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Wind, Droplets, CloudRain, Sun, Moon, Sunrise, Sunset,Gauge } from "lucide-react";

type WeatherDisplayProps = {
  weatherData: WeatherData;
};

const glassmorphismStyle = "bg-card/30 backdrop-blur-sm border border-white/20 shadow-lg text-white";

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center size-12 rounded-full bg-white/10">
    {children}
  </div>
);

const WeatherDisplay = ({ weatherData }: WeatherDisplayProps) => {
  const { temperature, humidity, windSpeed, rainfallChance, comfortIndex, dailyForecast } = weatherData;

  const timelineIcons = {
    Sunrise: <Sunrise className="size-6 text-yellow-300" />,
    Sun: <Sun className="size-6 text-yellow-300" />,
    Sunset: <Sunset className="size-6 text-orange-400" />,
    Moon: <Moon className="size-6 text-slate-300" />,
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
      <Card className={`${glassmorphismStyle} lg:col-span-1`}>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Temperature</CardTitle>
          <IconWrapper><Thermometer className="size-5 text-red-400" /></IconWrapper>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold">{temperature}°C</div>
          <p className="text-xs text-white/80 mt-1">{comfortIndex}</p>
        </CardContent>
      </Card>
      <Card className={`${glassmorphismStyle} lg:col-span-1`}>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Humidity</CardTitle>
           <IconWrapper><Droplets className="size-5 text-blue-300" /></IconWrapper>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold">{humidity}%</div>
           <p className="text-xs text-white/80 mt-1">The moisture in the air.</p>
        </CardContent>
      </Card>
      <Card className={`${glassmorphismStyle} lg:col-span-1`}>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Wind Speed</CardTitle>
          <IconWrapper><Wind className="size-5 text-slate-300" /></IconWrapper>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold">{windSpeed} <span className="text-2xl">km/h</span></div>
          <p className="text-xs text-white/80 mt-1">Current wind velocity.</p>
        </CardContent>
      </Card>
      <Card className={`${glassmorphismStyle} lg:col-span-1`}>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rainfall</CardTitle>
          <IconWrapper><CloudRain className="size-5 text-cyan-300" /></IconWrapper>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold">{rainfallChance}%</div>
          <p className="text-xs text-white/80 mt-1">Chance of precipitation.</p>
        </CardContent>
      </Card>
      <Card className={`${glassmorphismStyle} lg:col-span-1`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Daily Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center space-x-2">
            {dailyForecast.map((forecast) => (
              <div key={forecast.time} className="flex flex-col items-center space-y-1">
                <span className="text-xs text-white/80">{forecast.time}</span>
                {timelineIcons[forecast.icon]}
                <span className="text-sm font-bold">{forecast.temp}°</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherDisplay;
