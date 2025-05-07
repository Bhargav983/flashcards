'use server';
/**
 * @fileOverview A flashcard generation AI agent.
 *
 * - generateFlashcard - A function that handles the flashcard generation process.
 * - GenerateFlashcardInput - The input type for the generateFlashcard function.
 * - GenerateFlashcardOutput - The return type for the generateFlashcard function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFlashcardInputSchema = z.object({
  fruit: z.string().describe('The fruit to generate a flashcard for.'),
});
export type GenerateFlashcardInput = z.infer<typeof GenerateFlashcardInputSchema>;

const GenerateFlashcardOutputSchema = z.object({
  imageUrl: z.string().nullable().describe('The URL of the generated flashcard image, or null if generation failed/disabled.'),
  isAdherent: z.boolean().describe('Whether the generated image adheres to the guidelines (always false if generation failed/disabled).'),
});
export type GenerateFlashcardOutput = z.infer<typeof GenerateFlashcardOutputSchema>;

export async function generateFlashcard(input: GenerateFlashcardInput): Promise<GenerateFlashcardOutput> {
  return generateFlashcardFlow(input);
}

const generateFlashcardFlow = ai.defineFlow(
  {
    name: 'generateFlashcardFlow',
    inputSchema: GenerateFlashcardInputSchema,
    outputSchema: GenerateFlashcardOutputSchema,
  },
  async (input) => {
    // AI-based image generation is disabled.
    // console.log(`Image generation requested for: ${input.fruit}, but AI generation is disabled.`);
    return {
      imageUrl: null,
      isAdherent: false
    };
  }
);
