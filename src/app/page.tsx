"use client";

import { useState } from "react";
import type { WeatherData } from "@/lib/types";
import { getWeatherData } from "@/lib/weather-data";
import Header from "@/components/header";
import LocationForm from "@/components/location-form";
import WeatherDisplay from "@/components/weather-display";
import HistoricalChart from "@/components/historical-chart";
import AiAssistant from "@/components/ai-assistant";
import InfoCards from "@/components/info-cards";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Sparkles, CloudOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = async (location: string, date: Date) => {
    setIsLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      if (!location) {
        throw new Error("Please enter a valid location.");
      }
      const data = await getWeatherData(location, date);
      setWeatherData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Search Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const backgroundClass = () => {
    if (!weatherData) return "bg-background";
    switch (weatherData.condition) {
      case "sunny":
        return "bg-gradient-to-br from-yellow-300 via-sky-400 to-blue-600";
      case "rainy":
        return "bg-gradient-to-br from-slate-500 via-gray-600 to-blue-900";
      case "cloudy":
        return "bg-gradient-to-br from-slate-300 via-gray-400 to-slate-600";
      case "stormy":
        return "bg-gradient-to-br from-indigo-900 via-gray-800 to-black";
      default:
        return "bg-background";
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen w-full transition-all duration-1000",
        backgroundClass()
      )}
      style={{
        backgroundSize: '200% 200%',
        animation: 'slow-gradient-shift 15s ease infinite',
      }}
    >
      <Header />
      <main className="container mx-auto px-4 py-8">
        <LocationForm onSearch={handleSearch} isLoading={isLoading} />

        {isLoading && (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-48 rounded-lg" />
            <Skeleton className="h-48 rounded-lg" />
            <Skeleton className="h-48 rounded-lg md:col-span-2" />
            <Skeleton className="h-72 rounded-lg lg:col-span-4" />
          </div>
        )}

        {error && !isLoading && (
          <div className="mt-12 flex flex-col items-center justify-center text-center text-destructive-foreground/80">
            <CloudOff className="size-16" />
            <h2 className="mt-4 text-2xl font-bold">Failed to Fetch Weather</h2>
            <p className="mt-2">{error}</p>
          </div>
        )}

        {weatherData && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="col-span-1 md:col-span-2 lg:col-span-4">
              <WeatherDisplay weatherData={weatherData} />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-4">
              <HistoricalChart historicalData={weatherData.historicalData} />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-4">
               <AiAssistant weatherData={weatherData} />
            </div>
             <div className="col-span-1 md:col-span-2 lg:col-span-4">
              <InfoCards weatherData={weatherData} />
            </div>
          </div>
        )}

        {!isLoading && !weatherData && !error && (
          <div className="mt-20 flex flex-col items-center justify-center text-center text-foreground/70">
            <Sparkles className="size-16 animate-pulse text-accent" />
            <h2 className="mt-4 text-3xl font-bold font-headline">
              Welcome to AstroWeather
            </h2>
            <p className="mt-2 max-w-md">
              Enter a location and date to get started and unlock AI-powered weather insights for your outdoor adventures.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
