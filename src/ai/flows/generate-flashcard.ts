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
  imageUrl: z.string().describe('The URL of the generated flashcard image.'),
  isAdherent: z.boolean().describe('Whether the generated image adheres to the guidelines.'),
});
export type GenerateFlashcardOutput = z.infer<typeof GenerateFlashcardOutputSchema>;

export async function generateFlashcard(input: GenerateFlashcardInput): Promise<GenerateFlashcardOutput> {
  return generateFlashcardFlow(input);
}

const checkAdherenceTool = ai.defineTool({
  name: 'checkAdherence',
  description: 'Checks if the generated image adheres to the flashcard guidelines.',
  inputSchema: z.object({
    imageUrl: z.string().describe('The URL of the generated flashcard image.'),
  }),
  outputSchema: z.boolean(),
},
async (input) => {
    // Dummy implementation that always returns true
    // In real implementation, you would check the image against the guidelines
    return true;
});


const generateFlashcardPrompt = ai.definePrompt({
  name: 'generateFlashcardPrompt',
  input: {schema: GenerateFlashcardInputSchema},
  output: {schema: GenerateFlashcardOutputSchema},
  tools: [checkAdherenceTool],
  prompt: `You are generating a flashcard image for a baby using the Glenn Doman method.

The image should contain:
- A single realistic {{fruit}}
- Centered on a plain white background
- No text, no borders, no background clutter
- High clarity, high resolution, large size — designed to visually stimulate infants

Generate the image and then use the checkAdherence tool to confirm it follows all guidelines.

Output the image URL and the result of the checkAdherence tool.
`,
});

const generateFlashcardFlow = ai.defineFlow(
  {
    name: 'generateFlashcardFlow',
    inputSchema: GenerateFlashcardInputSchema,
    outputSchema: GenerateFlashcardOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp',
      prompt: `Generate an image of ${input.fruit} centered on a plain white background. No text, no borders, no background clutter. High clarity, high resolution, large size.`, 
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    const imageUrl = media.url;
    const isAdherent = await checkAdherenceTool({
      imageUrl: imageUrl,
    });
    
    return {
      imageUrl: imageUrl,
      isAdherent: isAdherent
    };
  }
);
