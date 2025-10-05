"use client";

import { useState, useEffect, useTransition } from "react";
import type { WeatherData } from "@/lib/types";
import { clothingAndSafetyRecommendations } from "@/ai/flows/clothing-and-safety-recommendations";
import { suggestOutdoorActivities } from "@/ai/flows/emotion-aware-activity-suggestions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Smile, Shirt, Shield, BrainCircuit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type AiAssistantProps = {
  weatherData: WeatherData;
};

const glassmorphismStyle = "bg-card/30 backdrop-blur-sm border border-white/20 shadow-lg text-white";

const AiAssistant = ({ weatherData }: AiAssistantProps) => {
  const [emotion, setEmotion] = useState("happy");
  const [activitySuggestion, setActivitySuggestion] = useState<{ suggestedActivity: string; reasoning: string } | null>(null);
  const [clothingRecs, setClothingRecs] = useState<{ clothingRecommendations: string[]; safetyRecommendations: string[] } | null>(null);
  const [isAiLoading, startAiTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    if (weatherData && emotion) {
      startAiTransition(async () => {
        try {
          const clothingInput = {
            temperature: weatherData.temperature,
            humidity: weatherData.humidity,
            windSpeed: weatherData.windSpeed,
            rainfallChance: weatherData.rainfallChance,
          };
          const clothingPromise = clothingAndSafetyRecommendations(clothingInput);

          const activityInput = {
            ...clothingInput,
            emotion,
            comfortIndex: weatherData.comfortIndex,
          };
          const activityPromise = suggestOutdoorActivities(activityInput);
          
          const [clothingResult, activityResult] = await Promise.all([clothingPromise, activityPromise]);

          setClothingRecs(clothingResult);
          setActivitySuggestion(activityResult);

        } catch (error) {
          console.error("AI Assistant Error:", error);
          toast({
            variant: "destructive",
            title: "AI Assistant Error",
            description: "Could not generate AI recommendations at this time.",
          });
        }
      });
    }
  }, [weatherData, emotion, toast]);

  return (
    <div className="space-y-6">
      <Card className={glassmorphismStyle}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Sparkles className="size-6 text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]" />
            <CardTitle className="text-white">AI-Powered Guidance</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <label htmlFor="emotion-select" className="flex items-center gap-2 text-lg text-white/90">
              <Smile className="size-5" /> How are you feeling?
            </label>
            <Select value={emotion} onValueChange={setEmotion}>
              <SelectTrigger id="emotion-select" className="w-[180px] bg-white/20 border-white/30 text-white">
                <SelectValue placeholder="Select emotion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="happy">Happy</SelectItem>
                <SelectItem value="tired">Tired</SelectItem>
                <SelectItem value="stressed">Stressed</SelectItem>
                <SelectItem value="adventurous">Adventurous</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className={`${glassmorphismStyle} md:col-span-2`}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <BrainCircuit className="size-6 text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]" />
              <CardTitle className="text-white">Emotion-Aware Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {isAiLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : activitySuggestion ? (
              <div>
                <h3 className="text-2xl font-bold text-accent">{activitySuggestion.suggestedActivity}</h3>
                <p className="mt-2 text-white/90">{activitySuggestion.reasoning}</p>
              </div>
            ) : (
               <p className="text-white/70">Select your mood to get a suggestion.</p>
            )}
          </CardContent>
        </Card>
        
        <Card className={`${glassmorphismStyle} md:col-span-1`}>
          <CardHeader>
             <div className="flex items-center gap-3">
              <Shirt className="size-6 text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]" />
              <CardTitle className="text-white">Smart Wardrobe</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {isAiLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full mt-4" />
              </div>
            ) : clothingRecs ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white/90">Clothing:</h4>
                  <ul className="list-disc list-inside text-white/80">
                    {clothingRecs.clothingRecommendations.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                 <div>
                  <h4 className="font-semibold text-white/90">Safety:</h4>
                  <ul className="list-disc list-inside text-white/80">
                    {clothingRecs.safetyRecommendations.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-white/70">Loading recommendations...</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AiAssistant;
