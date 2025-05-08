
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { flashcards as allFlashcardsData, type Flashcard } from '@/lib/flashcard-data';
import { FlashcardImage } from '@/components/flashcard-image';
import { NavigationControls } from '@/components/navigation-controls';
import { CategoryTabs } from '@/components/category-tabs';
import { SetTabs } from '@/components/set-tabs'; // Import SetTabs
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, PanelTopClose, PanelTopOpen } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const [allFlashcards] = useState<Flashcard[]>(allFlashcardsData);
  const [displayedFlashcards, setDisplayedFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const defaultCategory = 'fruit'; // Normalized default category
  const [activeCategory, setActiveCategory] = useState<string>(
    (allFlashcardsData.find(fc => fc.category === defaultCategory)?.category.charAt(0).toUpperCase() + defaultCategory.slice(1)) || 'Fruit'
  ); // Display name for default

  const [availableSets, setAvailableSets] = useState<string[]>([]);
  const [activeSet, setActiveSet] = useState<string | null>(null);
  
  const [showTabs, setShowTabs] = useState(true);

  const uniqueCategories = useMemo(() => {
    const categories = new Set(allFlashcards.map(fc => fc.category.toLowerCase()));
    return Array.from(categories).map(cat => {
      if (cat === 'ai-ml') return 'AI/ML';
      return cat.charAt(0).toUpperCase() + cat.slice(1);
    });
  }, [allFlashcards]);

  // Effect 1: Handle activeCategory change to update available sets and default active set
  useEffect(() => {
    setIsLoading(true);
    const currentCategoryNormalized = activeCategory.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
    const cardsForCategory = allFlashcards.filter(fc => fc.category === currentCategoryNormalized);

    if (cardsForCategory.length > 0) {
      const setsForThisCategory = Array.from(new Set(cardsForCategory.map(fc => fc.set))).sort();
      setAvailableSets(setsForThisCategory);
      if (setsForThisCategory.length > 0) {
        // If activeSet is not valid for this new category, or if it's null, set to first set
        if (!activeSet || !setsForThisCategory.includes(activeSet)) {
          setActiveSet(setsForThisCategory[0]);
        }
        // If activeSet was already valid, this effect won't change it,
        // and the next effect will use the existing valid activeSet.
      } else {
        setActiveSet(null); // No sets for this category
      }
    } else {
      setAvailableSets([]);
      setActiveSet(null);
      setDisplayedFlashcards([]); 
      // If the category was not found and it's not the default, try to switch to default
      if (currentCategoryNormalized !== defaultCategory) {
          const defaultCategoryDisplayName = uniqueCategories.find(c => c.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-') === defaultCategory) || defaultCategory;
          if (activeCategory !== defaultCategoryDisplayName) {
             setActiveCategory(defaultCategoryDisplayName); // This will re-run this effect
          } else {
              setIsLoading(false); 
          }
      } else {
          setIsLoading(false); 
      }
    }
    // setIsLoading(false) will be primarily handled by the next effect after cards are loaded or confirmed empty
  }, [activeCategory, allFlashcards, defaultCategory, uniqueCategories, activeSet]); // activeSet added to re-evaluate if it becomes invalid for a new category.


  // Effect 2: Handle activeCategory or activeSet change to update displayed flashcards
  useEffect(() => {
    if (!activeCategory) {
      setIsLoading(false);
      return;
    }
    // If there are sets for this category, but no active set is selected yet, wait.
    if (availableSets.length > 0 && !activeSet) {
      // This state can occur during transition to a category that has sets, before activeSet is determined by Effect 1.
      setDisplayedFlashcards([]); // Clear cards until a set is chosen
      setCurrentIndex(0);
      setIsLoading(true); // Still loading as we need an active set
      return;
    }

    setIsLoading(true);
    const currentCategoryNormalized = activeCategory.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
    let cardsToDisplay: Flashcard[] = [];

    if (activeSet) { // Category has sets, and a specific set is active
      cardsToDisplay = allFlashcards.filter(
        fc => fc.category === currentCategoryNormalized && fc.set === activeSet
      );
    } else if (availableSets.length === 0) { // Category has no sets defined, show all cards for that category
      cardsToDisplay = allFlashcards.filter(
        fc => fc.category === currentCategoryNormalized
      );
    }
    // If availableSets.length > 0 but activeSet is null (should be handled by Effect 1),
    // cardsToDisplay remains empty, which is a safe fallback.

    setDisplayedFlashcards(cardsToDisplay);
    setCurrentIndex(0);
    setIsLoading(false);
  }, [activeCategory, activeSet, allFlashcards, availableSets]);


  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    // activeSet will be reset by the first useEffect if necessary
    router.push('/', { scroll: false }); 
  }, [router]);

  const handleSetChange = useCallback((set: string) => {
    setActiveSet(set);
  }, []);

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

  const toggleTabsVisibility = useCallback(() => {
    setShowTabs(prevShowTabs => !prevShowTabs);
  }, []);

  if (isLoading) {
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
        <div className="w-full flex justify-end py-2 px-4 fixed top-0 right-0 z-20">
          <Button onClick={toggleTabsVisibility} variant="outline" size="icon" aria-label={showTabs ? "Hide Categories" : "Show Categories"}>
            {showTabs ? <PanelTopClose className="h-5 w-5" /> : <PanelTopOpen className="h-5 w-5" />}
          </Button>
        </div>
        {showTabs && uniqueCategories.length > 0 && (
          <CategoryTabs
            categories={uniqueCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        )}
        {showTabs && availableSets.length > 0 && activeSet && (
          <SetTabs
            sets={availableSets}
            activeSet={activeSet}
            onSetChange={handleSetChange}
          />
        )}
        <Card className="w-full max-w-md shadow-xl mt-4">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-foreground">
              No Flashcards Available
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4 py-12">
            <p className="text-muted-foreground text-center">
              No flashcards found for {activeCategory}
              {activeSet ? ` - Set ${activeSet.replace('set', '')}` : ''}.
              <br />
              Ensure images are present in{' '}
              <code>public/{activeCategory.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}/{activeSet || 'setX'}/image.jpg</code>.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-background overflow-hidden pt-16 md:pt-24 relative"> {/* Adjusted top padding */}
      <div className="w-full flex justify-end py-2 px-4 fixed top-0 right-0 z-20 bg-background/80 backdrop-blur-sm">
          <Button onClick={toggleTabsVisibility} variant="outline" size="icon" aria-label={showTabs ? "Hide Categories & Sets" : "Show Categories & Sets"} className="shadow-md">
            {showTabs ? <PanelTopClose className="h-5 w-5" /> : <PanelTopOpen className="h-5 w-5" />}
          </Button>
      </div>
      <div className="fixed top-12 md:top-16 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm"> {/* Container for tabs */}
        {showTabs && uniqueCategories.length > 0 && (
          <CategoryTabs
            categories={uniqueCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        )}
        {showTabs && availableSets.length > 0 && activeSet && (
          <SetTabs
            sets={availableSets}
            activeSet={activeSet}
            onSetChange={handleSetChange}
          />
        )}
      </div>
      
      <div className="w-full max-w-3xl flex-grow flex flex-col items-center justify-center relative px-4 mt-8 md:mt-12 mb-[80px] sm:mb-[100px]"> {/* Added margin-top and margin-bottom */}
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
