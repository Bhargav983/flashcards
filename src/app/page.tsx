'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { flashcards as initialFlashcards, type Flashcard } from '@/lib/flashcard-data';
import { FlashcardImage } from '@/components/flashcard-image';
import { NavigationControls } from '@/components/navigation-controls';
import { generateFlashcard } from '@/ai/flows/generate-flashcard';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [flashcards, setFlashcards] = useState<Flashcard[]>(initialFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle generating a single flashcard if 'fruit' query param is present
  useEffect(() => {
    const fruitToGenerate = searchParams.get('fruit');
    if (fruitToGenerate) {
      const generateSingleCard = async () => {
        setIsGenerating(true);
        try {
          const result = await generateFlashcard({ fruit: fruitToGenerate });
          if (result.imageUrl && result.isAdherent) {
            const newFlashcard: Flashcard = {
              id: fruitToGenerate.toLowerCase().replace(/\s+/g, '-'),
              fruitName: fruitToGenerate,
              altText: `A realistic ${fruitToGenerate} centered on a plain white background.`,
              imageUrl: result.imageUrl,
              aiHint: fruitToGenerate.toLowerCase(),
            };
            setFlashcards([newFlashcard]);
            setCurrentIndex(0);
            toast({
              title: "Flashcard Generated!",
              description: `Showing flashcard for ${fruitToGenerate}.`,
            });
          } else {
            toast({
              title: "AI Generation Unavailable",
              description: `Could not generate a flashcard for ${fruitToGenerate} using AI. Showing default cards. AI features might be disabled.`,
              variant: "destructive",
            });
            setFlashcards(initialFlashcards); // Fallback to default
          }
        } catch (error) {
          console.error("Error generating flashcard:", error);
          toast({
            title: "Error",
            description: "An error occurred while attempting to generate the flashcard. Showing default cards.",
            variant: "destructive",
          });
          setFlashcards(initialFlashcards); // Fallback to default
        } finally {
          setIsGenerating(false);
          setIsLoading(false);
        }
      };
      generateSingleCard();
    } else {
      setFlashcards(initialFlashcards); // Load default if no fruit specified
      setIsLoading(false); 
    }
  }, [searchParams, toast]);


  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : flashcards.length - 1));
  }, [flashcards.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex < flashcards.length - 1 ? prevIndex + 1 : 0));
  }, [flashcards.length]);

  // Swipe gesture handling
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      if (touchEndX < touchStartX - 50) { // Swipe left
        goToNext();
      }
      if (touchEndX > touchStartX + 50) { // Swipe right
        goToPrevious();
      }
    };
    
    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNext, goToPrevious]);

  if (isLoading || isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-foreground">
              {isGenerating ? "Attempting AI Flashcard Generation..." : "Loading Flashcards..."}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4 py-12">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="text-muted-foreground">Please wait a moment.</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (flashcards.length === 0) {
     return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-foreground">
              No Flashcards Available
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4 py-12">
            <p className="text-muted-foreground">Could not load or generate flashcards.</p>
          </CardContent>
        </Card>
      </div>
    );
  }


  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background overflow-hidden">
      <div className="w-full max-w-3xl flex-grow flex flex-col items-center justify-center relative">
        <FlashcardImage flashcard={flashcards[currentIndex]} />
      </div>
      {flashcards.length > 1 && (
        <NavigationControls
          onPrevious={goToPrevious}
          onNext={goToNext}
          canGoPrevious={currentIndex > 0 || flashcards.length > 1}
          canGoNext={currentIndex < flashcards.length - 1 || flashcards.length > 1}
        />
      )}
    </main>
  );
}
