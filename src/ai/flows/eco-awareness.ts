'use server';
/**
 * @fileOverview Generates eco-awareness content based on a location.
 *
 * - ecoAwareness - A function that provides information about local flora, fauna, and an eco-friendly tip.
 * - EcoAwarenessInput - The input type for the ecoAwareness function.
 * - EcoAwarenessOutput - The return type for the ecoAwareness function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EcoAwarenessInputSchema = z.object({
  location: z.string().describe('The name of the city or geographic area.'),
});
export type EcoAwarenessInput = z.infer<typeof EcoAwarenessInputSchema>;

const EcoAwarenessOutputSchema = z.object({
  flora: z.string().describe('A brief, one-sentence description of notable local flora.'),
  fauna: z.string().describe('A brief, one-sentence description of notable local fauna.'),
  tip: z.string().describe('A concise, actionable eco-friendly tip relevant to the location or general outdoor activities.'),
});
export type EcoAwarenessOutput = z.infer<typeof EcoAwarenessOutputSchema>;

export async function ecoAwareness(input: EcoAwarenessInput): Promise<EcoAwarenessOutput> {
  return ecoAwarenessFlow(input);
}

const prompt = ai.definePrompt({
  name: 'ecoAwarenessPrompt',
  input: { schema: EcoAwarenessInputSchema },
  output: { schema: EcoAwarenessOutputSchema },
  prompt: `For the location "{{location}}", provide the following eco-awareness information. Each item should be a single, concise sentence.

1.  **Local Flora**: Briefly describe a common or interesting plant found in the area.
2.  **Local Fauna**: Briefly describe a common or interesting animal found in the area.
3.  **Eco Tip**: Provide a simple, actionable eco-friendly tip.

Generate a JSON object with the keys "flora", "fauna", and "tip".`,
});

const ecoAwarenessFlow = ai.defineFlow(
  {
    name: 'ecoAwarenessFlow',
    inputSchema: EcoAwarenessInputSchema,
    outputSchema: EcoAwarenessOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
