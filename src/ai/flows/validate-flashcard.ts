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

const validateFlashcardStyleFlow = ai.defineFlow(
  {
    name: 'validateFlashcardStyleFlow',
    inputSchema: ValidateFlashcardStyleInputSchema,
    outputSchema: ValidateFlashcardStyleOutputSchema,
  },
  async (input) => {
    // AI-based validation is disabled.
    // console.log(`Image validation requested for image data URI (first 50 chars): ${input.imageDataUri.substring(0,50)}, but AI validation is disabled.`);
    return {
      isValid: true, // Default to true as AI validation is off
      feedback: "AI-based style validation is currently disabled."
    };
  }
);
