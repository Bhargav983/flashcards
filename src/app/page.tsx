
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation'; // Removed useSearchParams as it's no longer needed for fruit param
import { flashcards as allFlashcardsData, type Flashcard } from '@/lib/flashcard-data';
import { FlashcardImage } from '@/components/flashcard-image';
import { NavigationControls } from '@/components/navigation-controls';
import { CategoryTabs } from '@/components/category-tabs';
// import { generateFlashcard } from '@/ai/flows/generate-flashcard'; // No longer used here
// import { useToast } from '@/hooks/use-toast'; // No longer used here for AI generation toasts
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  // const searchParams = useSearchParams(); // No longer needed
  // const { toast } = useToast(); // No longer needed for AI generation toasts

  const [allFlashcards] = useState<Flashcard[]>(allFlashcardsData);
  const [displayedFlashcards, setDisplayedFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // const [isGenerating, setIsGenerating] = useState(false); // No longer needed
  
  const defaultCategory = 'fruit';
  const [activeCategory, setActiveCategory] = useState<string>(defaultCategory);
  // const [showTabs, setShowTabs] = useState(true); // showTabs is effectively always true now

  const uniqueCategories = useMemo(() => {
    // Convert all categories to lowercase for Set to ensure uniqueness if data has mixed casing
    // and then capitalize for display if needed, though current data is already lowercase.
    const categories = new Set(allFlashcards.map(fc => fc.category.toLowerCase()));
    return Array.from(categories).map(cat => {
      // Example of capitalizing, adjust if your category names need specific casing
      if (cat === 'ai-ml') return 'AI/ML';
      return cat.charAt(0).toUpperCase() + cat.slice(1);
    });
  }, [allFlashcards]);

  useEffect(() => {
    // Simplified: always load by category
    setIsLoading(true);
    // Normalize activeCategory to lowercase for filtering, as data categories are lowercase
    const currentCategoryNormalized = activeCategory.toLowerCase().replace(/\s+/g, '-');
    
    const cardsForCategory = allFlashcards.filter(fc => fc.category === currentCategoryNormalized);
    
    if (cardsForCategory.length > 0) {
      setDisplayedFlashcards(cardsForCategory);
    } else {
      // Fallback to default category if current category has no cards or is invalid
      const defaultCards = allFlashcards.filter(fc => fc.category === defaultCategory);
      setDisplayedFlashcards(defaultCards);
      if (activeCategory !== defaultCategory) {
         // find the display name for defaultCategory
        const defaultCategoryDisplayName = uniqueCategories.find(c => c.toLowerCase().replace(/\s+/g, '-') === defaultCategory) || defaultCategory;
        setActiveCategory(defaultCategoryDisplayName);
      }
    }
    setCurrentIndex(0);
    setIsLoading(false);
  }, [activeCategory, allFlashcards, defaultCategory, uniqueCategories]);


  const handleCategoryChange = useCallback((category: string) => {
    // The category from tabs might be capitalized (e.g. "Fruit", "AI/ML")
    // We set activeCategory to this display name.
    // The useEffect will handle normalization for filtering.
    setActiveCategory(category);
    router.push('/', { scroll: false }); 
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

  if (isLoading) { // Removed isGenerating condition
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-foreground">
              Loading Flashcards...
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
        {uniqueCategories.length > 0 && (
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
              Could not load flashcards for this category: {activeCategory}. Ensure images are present in the /public/{activeCategory.toLowerCase().replace(/\s+/g, '-')} folder and named 0.jpg, 1.jpg, etc.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-background overflow-hidden">
      {uniqueCategories.length > 0 && (
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
          canGoPrevious={true} 
          canGoNext={true}
        />
      )}
    </main>
  );
}
