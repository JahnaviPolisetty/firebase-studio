'use server';
/**
 * @fileOverview Recommends clothing and safety items based on the weather forecast.
 *
 * - clothingAndSafetyRecommendations - A function that handles the clothing and safety recommendations process.
 * - ClothingAndSafetyInput - The input type for the clothingAndSafetyRecommendations function.
 * - ClothingAndSafetyOutput - The return type for the clothingAndSafetyRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClothingAndSafetyInputSchema = z.object({
  temperature: z.number().describe('The temperature in Celsius.'),
  humidity: z.number().describe('The humidity as a percentage.'),
  windSpeed: z.number().describe('The wind speed in km/h.'),
  rainfallChance: z.number().describe('The chance of rainfall as a percentage.'),
});
export type ClothingAndSafetyInput = z.infer<typeof ClothingAndSafetyInputSchema>;

const ClothingAndSafetyOutputSchema = z.object({
  clothingRecommendations: z.array(z.string()).describe('An array of recommended clothing items.'),
  safetyRecommendations: z.array(z.string()).describe('An array of safety recommendations.'),
});
export type ClothingAndSafetyOutput = z.infer<typeof ClothingAndSafetyOutputSchema>;

export async function clothingAndSafetyRecommendations(input: ClothingAndSafetyInput): Promise<ClothingAndSafetyOutput> {
  return clothingAndSafetyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'clothingAndSafetyPrompt',
  input: {schema: ClothingAndSafetyInputSchema},
  output: {schema: ClothingAndSafetyOutputSchema},
  prompt: `Based on the following weather conditions, provide clothing and safety recommendations:

Temperature: {{temperature}}°C
Humidity: {{humidity}}%
Wind Speed: {{windSpeed}} km/h
Chance of Rainfall: {{rainfallChance}}%

Please provide specific recommendations for clothing and safety items.`,
});

const clothingAndSafetyFlow = ai.defineFlow(
  {
    name: 'clothingAndSafetyFlow',
    inputSchema: ClothingAndSafetyInputSchema,
    outputSchema: ClothingAndSafetyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
