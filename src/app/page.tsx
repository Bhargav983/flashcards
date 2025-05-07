
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { flashcards as allFlashcardsData, type Flashcard } from '@/lib/flashcard-data';
import { FlashcardImage } from '@/components/flashcard-image';
import { NavigationControls } from '@/components/navigation-controls';
import { CategoryTabs } from '@/components/category-tabs';
import { generateFlashcard } from '@/ai/flows/generate-flashcard';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [allFlashcards] = useState<Flashcard[]>(allFlashcardsData);
  const [displayedFlashcards, setDisplayedFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const defaultCategory = 'fruit'; // Changed from 'fruits' to 'fruit' to match data
  const [activeCategory, setActiveCategory] = useState<string>(defaultCategory);
  const [showTabs, setShowTabs] = useState(true);


  const uniqueCategories = useMemo(() => {
    const categories = new Set(allFlashcards.map(fc => fc.category));
    return Array.from(categories);
  }, [allFlashcards]);

  useEffect(() => {
    const itemToGenerate = searchParams.get('fruit'); // Keep 'fruit' param for specific item generation
    
    if (itemToGenerate) {
      setShowTabs(false);
      setIsLoading(true); // Ensure loading state is true before generation
      const generateSingleCard = async () => {
        setIsGenerating(true);
        try {
          // Attempt to find if it's a known item first to get its category
          const knownItem = allFlashcards.find(fc => fc.fruitName.toLowerCase() === itemToGenerate.toLowerCase());
          
          const result = await generateFlashcard({ fruit: itemToGenerate });
          if (result.imageUrl && result.isAdherent) {
            const newFlashcard: Flashcard = {
              id: itemToGenerate.toLowerCase().replace(/\s+/g, '-'),
              fruitName: itemToGenerate,
              altText: `A realistic ${itemToGenerate} centered on a plain white background.`,
              imageUrl: result.imageUrl,
              aiHint: itemToGenerate.toLowerCase(),
              category: knownItem?.category || 'fruit', // Use known category or default
            };
            setDisplayedFlashcards([newFlashcard]);
            setCurrentIndex(0);
            toast({
              title: "Flashcard Generated!",
              description: `Showing flashcard for ${itemToGenerate}.`,
            });
          } else {
            toast({
              title: "AI Generation Unavailable",
              description: `Could not generate a flashcard for ${itemToGenerate} using AI. AI features might be disabled.`,
              variant: "destructive",
            });
            // Fallback to showing all cards of the default category if generation fails
            setShowTabs(true);
            const cardsForCategory = allFlashcards.filter(fc => fc.category === defaultCategory);
            setDisplayedFlashcards(cardsForCategory);
            setActiveCategory(defaultCategory);
            setCurrentIndex(0);
          }
        } catch (error) {
          console.error("Error generating flashcard:", error);
          toast({
            title: "Error",
            description: "An error occurred while attempting to generate the flashcard.",
            variant: "destructive",
          });
          setShowTabs(true);
          const cardsForCategory = allFlashcards.filter(fc => fc.category === defaultCategory);
          setDisplayedFlashcards(cardsForCategory);
          setActiveCategory(defaultCategory);
          setCurrentIndex(0);
        } finally {
          setIsGenerating(false);
          setIsLoading(false);
        }
      };
      generateSingleCard();
    } else {
      // Category view
      setShowTabs(true);
      setIsLoading(true);
      const cardsForCategory = allFlashcards.filter(fc => fc.category === activeCategory);
      setDisplayedFlashcards(cardsForCategory.length > 0 ? cardsForCategory : allFlashcards.filter(fc => fc.category === defaultCategory));
      if (cardsForCategory.length === 0 && activeCategory !== defaultCategory) {
        setActiveCategory(defaultCategory); // Fallback to default if current category has no cards
      }
      setCurrentIndex(0);
      setIsLoading(false);
    }
  }, [searchParams, toast, allFlashcards, activeCategory]);


  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    // The useEffect will update displayedFlashcards and reset currentIndex
    router.push('/', { scroll: false }); // Remove query params when changing category
  }, [router]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : displayedFlashcards.length - 1));
  }, [displayedFlashcards.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex < displayedFlashcards.length - 1 ? prevIndex + 1 : 0));
  }, [displayedFlashcards.length]);

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
      if (touchEndX < touchStartX - 50) goToNext();
      if (touchEndX > touchStartX + 50) goToPrevious();
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
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
  
  if (displayedFlashcards.length === 0 && !isLoading) {
     return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        {showTabs && uniqueCategories.length > 0 && (
          <CategoryTabs
            categories={uniqueCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        )}
        <Card className="w-full max-w-md shadow-xl mt-4">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-foreground">
              No Flashcards Available
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4 py-12">
            <p className="text-muted-foreground">
              Could not load or generate flashcards for this {showTabs ? `category: ${activeCategory}` : 'item'}.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-background overflow-hidden">
      {showTabs && uniqueCategories.length > 0 && (
        <CategoryTabs
          categories={uniqueCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      )}
      <div className="w-full max-w-3xl flex-grow flex flex-col items-center justify-center relative px-4">
        {displayedFlashcards.length > 0 && displayedFlashcards[currentIndex] && (
          <FlashcardImage flashcard={displayedFlashcards[currentIndex]} />
        )}
      </div>
      {displayedFlashcards.length > 1 && (
        <NavigationControls
          onPrevious={goToPrevious}
          onNext={goToNext}
          // Loop behavior is handled by goToPrevious/goToNext logic
          canGoPrevious={true} 
          canGoNext={true}
        />
      )}
    </main>
  );
}
