'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting outdoor activities based on the user's emotion and the weather conditions.
 *
 * - suggestOutdoorActivities - A function that takes the user's emotion and weather data to suggest suitable outdoor activities.
 * - EmotionAwareActivityInput - The input type for the suggestOutdoorActivities function.
 * - EmotionAwareActivityOutput - The return type for the suggestOutdoorActivities function.
 */

import {ai} from '@/ai/genkit-instance';
import {z} from 'genkit';

const EmotionAwareActivityInputSchema = z.object({
  emotion: z
    .string()
    .describe('The current emotion of the user (e.g., tired, happy, stressed).'),
  temperature: z.number().describe('The current temperature in Celsius.'),
  humidity: z.number().describe('The current humidity (percentage).'),
  windSpeed: z.number().describe('The current wind speed in km/h.'),
  rainfallChance: z.number().describe('The chance of rainfall (percentage).'),
  comfortIndex: z
    .string()
    .describe(
      'A general comfort index based on the weather conditions (e.g., very hot, very cold, very windy, very wet, uncomfortable).'    )
});
export type EmotionAwareActivityInput = z.infer<typeof EmotionAwareActivityInputSchema>;

const EmotionAwareActivityOutputSchema = z.object({
  suggestedActivity: z
    .string()
    .describe(
      'A suggested outdoor activity based on the user\'s emotion and the weather conditions.'
    ),
  reasoning: z
    .string()
    .describe(
      'Explanation of why the suggested activity is appropriate for the given emotion and weather conditions.'
    ),
});
export type EmotionAwareActivityOutput = z.infer<typeof EmotionAwareActivityOutputSchema>;

export async function suggestOutdoorActivities(
  input: EmotionAwareActivityInput
): Promise<EmotionAwareActivityOutput> {
  return emotionAwareActivityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'emotionAwareActivityPrompt',
  input: {schema: EmotionAwareActivityInputSchema},
  output: {schema: EmotionAwareActivityOutputSchema},
  prompt: `You are an AI assistant designed to suggest outdoor activities based on a user's current emotion and the current weather conditions. Here are the details:

User Emotion: {{{emotion}}}
Temperature: {{{temperature}}}°C
Humidity: {{{humidity}}}%
Wind Speed: {{{windSpeed}}} km/h
Rainfall Chance: {{{rainfallChance}}}%
Comfort Index: {{{comfortIndex}}}

Consider these factors and suggest ONE outdoor activity that would be most suitable for the user. Explain your reasoning for the suggestion.
`,
});

const emotionAwareActivityFlow = ai.defineFlow(
  {
    name: 'emotionAwareActivityFlow',
    inputSchema: EmotionAwareActivityInputSchema,
    outputSchema: EmotionAwareActivityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
