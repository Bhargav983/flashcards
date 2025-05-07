'use server';

/**
 * @fileOverview Validates if a generated flashcard image adheres to the specified style guidelines.
 *
 * - validateFlashcardStyle - A function that validates the flashcard style.
 * - ValidateFlashcardStyleInput - The input type for the validateFlashcardStyle function.
 * - ValidateFlashcardStyleOutput - The return type for the validateFlashcardStyle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateFlashcardStyleInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      'The flashcard image data URI, must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'      
    ),
});
export type ValidateFlashcardStyleInput = z.infer<typeof ValidateFlashcardStyleInputSchema>;

const ValidateFlashcardStyleOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the flashcard image adheres to the style guidelines.'),
  feedback: z.string().describe('Feedback on why the flashcard image is invalid, if applicable.'),
});
export type ValidateFlashcardStyleOutput = z.infer<typeof ValidateFlashcardStyleOutputSchema>;

export async function validateFlashcardStyle(input: ValidateFlashcardStyleInput): Promise<ValidateFlashcardStyleOutput> {
  return validateFlashcardStyleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateFlashcardStylePrompt',
  input: {schema: ValidateFlashcardStyleInputSchema},
  output: {schema: ValidateFlashcardStyleOutputSchema},
  prompt: `You are an expert in evaluating flashcard images for adherence to a specific style guide for baby flashcards.  The flashcards should follow the Glenn Doman method style.

  Here are the guidelines:
  - Minimalist
  - High-contrast
  - Educational
  - A single realistic fruit
  - Centered on a plain white background
  - No text, no borders, no background clutter
  - High clarity, high resolution, large size

  Analyze the image and determine if it follows the style guide. Provide feedback if it does not.

  Image: {{media url=imageDataUri}}
  `,
});

const validateFlashcardStyleFlow = ai.defineFlow(
  {
    name: 'validateFlashcardStyleFlow',
    inputSchema: ValidateFlashcardStyleInputSchema,
    outputSchema: ValidateFlashcardStyleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
