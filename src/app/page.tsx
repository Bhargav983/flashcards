
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { flashcards as allFlashcardsData, type Flashcard } from '@/lib/flashcard-data';
import { FlashcardImage } from '@/components/flashcard-image';
import { NavigationControls } from '@/components/navigation-controls';
import { CategoryTabs } from '@/components/category-tabs';
import { SetTabs } from '@/components/set-tabs';
import { DisplayModeTabs } from '@/components/display-mode-tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, PanelTopOpen, PanelTopClose } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const [allFlashcards] = useState<Flashcard[]>(allFlashcardsData);
  const [displayedFlashcards, setDisplayedFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const defaultCategory = 'fruit'; 
  const [activeCategory, setActiveCategory] = useState<string>(
    (allFlashcardsData.find(fc => fc.category === defaultCategory)?.category.charAt(0).toUpperCase() + defaultCategory.slice(1)) || 'Fruit'
  );

  const [availableSets, setAvailableSets] = useState<string[]>([]);
  const [activeSet, setActiveSet] = useState<string | null>(null);
  const [activeDisplayMode, setActiveDisplayMode] = useState<'image' | 'text'>('image');
  
  const [showTabs, setShowTabs] = useState(true);

  const uniqueCategories = useMemo(() => {
    const categories = new Set(allFlashcards.map(fc => fc.category.toLowerCase()));
    return Array.from(categories).map(cat => {
      if (cat === 'ai-ml') return 'AI/ML';
      return cat.charAt(0).toUpperCase() + cat.slice(1);
    });
  }, [allFlashcards]);

  const toggleTabsVisibility = useCallback(() => {
    setShowTabs(prevShowTabs => !prevShowTabs);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const currentCategoryNormalized = activeCategory.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
    const cardsForCategory = allFlashcards.filter(fc => fc.category === currentCategoryNormalized);

    if (cardsForCategory.length > 0) {
      const setsForThisCategory = Array.from(new Set(cardsForCategory.map(fc => fc.set))).sort();
      setAvailableSets(setsForThisCategory);
      if (setsForThisCategory.length > 0) {
        if (!activeSet || !setsForThisCategory.includes(activeSet)) {
          setActiveSet(setsForThisCategory[0]);
        }
      } else {
        setActiveSet(null); 
      }
    } else {
      setAvailableSets([]);
      setActiveSet(null);
      setDisplayedFlashcards([]); 
      if (currentCategoryNormalized !== defaultCategory) {
          const defaultCategoryDisplayName = uniqueCategories.find(c => c.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-') === defaultCategory) || defaultCategory;
          if (activeCategory !== defaultCategoryDisplayName) {
             setActiveCategory(defaultCategoryDisplayName);
          } else {
              setIsLoading(false); 
          }
      } else {
          setIsLoading(false); 
      }
    }
  }, [activeCategory, allFlashcards, defaultCategory, uniqueCategories, activeSet]);


  useEffect(() => {
    if (!activeCategory) {
      setIsLoading(false);
      return;
    }
    if (availableSets.length > 0 && !activeSet) {
      setDisplayedFlashcards([]); 
      setCurrentIndex(0);
      setIsLoading(true); 
      return;
    }

    setIsLoading(true);
    const currentCategoryNormalized = activeCategory.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
    let cardsToDisplay: Flashcard[] = [];

    if (activeSet) { 
      cardsToDisplay = allFlashcards.filter(
        fc => fc.category === currentCategoryNormalized && fc.set === activeSet && fc.type === activeDisplayMode
      );
    } else if (availableSets.length === 0) { 
      cardsToDisplay = allFlashcards.filter(
        fc => fc.category === currentCategoryNormalized && fc.type === activeDisplayMode
      );
    }

    setDisplayedFlashcards(cardsToDisplay);
    setCurrentIndex(0);
    setIsLoading(false);
  }, [activeCategory, activeSet, allFlashcards, availableSets, activeDisplayMode]);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    router.push('/', { scroll: false }); 
  }, [router]);

  const handleSetChange = useCallback((set: string) => {
    setActiveSet(set);
  }, []);

  const handleDisplayModeChange = useCallback((mode: 'image' | 'text') => {
    setActiveDisplayMode(mode);
    setCurrentIndex(0); 
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

  const headerApproxHeight = useMemo(() => {
    if (!showTabs) return "0rem"; // No tabs, no header space needed other than button
    let height = 2.5; // Base for category tabs (approx h-10)
    if (availableSets.length > 0 && activeSet) height += 2.5; // Approx for set tabs
    if (activeCategory && ((availableSets.length > 0 && activeSet) || availableSets.length === 0)) height += 2.5; // Approx for display mode tabs
    return `${height}rem`;
  }, [showTabs, availableSets, activeSet, activeCategory]);
  
  const controlButtonRowHeight = "3rem"; // Approx height for the row containing the toggle button
  const footerApproxHeight = displayedFlashcards.length > 1 ? "6rem" : "0rem";

  const commonWrapperStyle = useMemo(() => ({
    paddingTop: `calc(${controlButtonRowHeight} + ${headerApproxHeight} + 1rem)`, // control button row + tabs height + padding
    paddingBottom: `calc(${footerApproxHeight} + 1rem)`,
  }), [headerApproxHeight, footerApproxHeight, controlButtonRowHeight]);


  if (isLoading && displayedFlashcards.length === 0) { 
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4" style={commonWrapperStyle}>
        <div className="fixed top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-sm flex flex-col">
           <div className="flex items-center w-full px-2 sm:px-4 py-2" style={{height: controlButtonRowHeight}}>
            <div className="flex-grow"></div> 
            <Button
              onClick={toggleTabsVisibility}
              variant="outline"
              size="icon"
              className="ml-2 flex-shrink-0 shadow-sm"
              aria-label={showTabs ? 'Hide Controls' : 'Show Controls'}
            >
              {showTabs ? <PanelTopClose className="h-5 w-5" /> : <PanelTopOpen className="h-5 w-5" />}
            </Button>
          </div>
        </div>
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
        <div className="fixed bottom-0 left-0 right-0 z-10" style={{ height: footerApproxHeight }}></div>
      </div>
    );
  }
  
  const currentCategoryPath = activeCategory.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
  const imagePathHint = activeSet ?
    `public/${currentCategoryPath}/${activeSet}/your-image.jpg` :
    (availableSets.length === 0 ? `public/${currentCategoryPath}/your-image.jpg` : `public/${currentCategoryPath}/setX/your-image.jpg (select a set)`);


  if (displayedFlashcards.length === 0 && !isLoading) {
     return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4" style={commonWrapperStyle}>
        <div className="fixed top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-sm flex flex-col">
          <div className="flex items-center w-full px-2 sm:px-4 py-2" style={{height: controlButtonRowHeight}}>
            <div className="flex-grow">
             {showTabs && uniqueCategories.length > 0 && (
                <CategoryTabs
                  categories={uniqueCategories}
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                />
              )}
            </div>
            <Button
              onClick={toggleTabsVisibility}
              variant="outline"
              size="icon"
              className="ml-2 flex-shrink-0 shadow-sm"
              aria-label={showTabs ? 'Hide Controls' : 'Show Controls'}
            >
              {showTabs ? <PanelTopClose className="h-5 w-5" /> : <PanelTopOpen className="h-5 w-5" />}
            </Button>
          </div>

          {showTabs && availableSets.length > 0 && activeSet && (
            <SetTabs
              sets={availableSets}
              activeSet={activeSet}
              onSetChange={handleSetChange}
            />
          )}
          {showTabs && activeCategory && 
            ((availableSets.length > 0 && activeSet) || availableSets.length === 0) && (
              <DisplayModeTabs
                activeDisplayMode={activeDisplayMode}
                onDisplayModeChange={handleDisplayModeChange}
              />
          )}
        </div>
        <Card className={`w-full max-w-md shadow-xl`}>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-foreground">
              No Flashcards Available
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4 py-12">
            <p className="text-muted-foreground text-center">
                No {activeDisplayMode === 'image' ? 'images' : 'text cards'} found for {activeCategory}
                {activeSet ? ` - Set ${activeSet.replace('set', '')}` : ''}.
                <br />
                {activeDisplayMode === 'image' && (
                    <>
                    Please check paths like: <code>{imagePathHint}</code>. Ensure images are in the public folder.
                    </>
                )}
                {activeDisplayMode === 'text' && "Ensure flashcard data includes text entries for this selection."}
            </p>
          </CardContent>
        </Card>
        <div className="fixed bottom-0 left-0 right-0 z-10" style={{ height: footerApproxHeight }}></div>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-background overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-sm flex flex-col">
        <div className="flex items-center w-full px-2 sm:px-4 py-2" style={{height: controlButtonRowHeight}}>
           <div className="flex-grow overflow-x-auto">
            {showTabs && uniqueCategories.length > 0 && (
                <CategoryTabs
                  categories={uniqueCategories}
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                />
            )}
            </div>
          <Button
            onClick={toggleTabsVisibility}
            variant="outline"
            size="icon"
            className="ml-2 flex-shrink-0 shadow-sm"
            aria-label={showTabs ? 'Hide Controls' : 'Show Controls'}
          >
            {showTabs ? <PanelTopClose className="h-5 w-5" /> : <PanelTopOpen className="h-5 w-5" />}
          </Button>
        </div>
        
        {showTabs && availableSets.length > 0 && activeSet && (
          <SetTabs
            sets={availableSets}
            activeSet={activeSet}
            onSetChange={handleSetChange}
          />
        )}
        {showTabs && activeCategory && 
          ( (availableSets.length > 0 && activeSet) || availableSets.length === 0 ) && (
          <DisplayModeTabs
            activeDisplayMode={activeDisplayMode}
            onDisplayModeChange={handleDisplayModeChange}
          />
        )}
      </div>
      
      <div 
        className="w-full max-w-7xl mx-auto flex-grow flex flex-col items-center justify-center relative px-4"
        style={commonWrapperStyle}
      >
        {isLoading && <Loader2 className="h-12 w-12 animate-spin text-primary absolute" />}
        {!isLoading && displayedFlashcards.length > 0 && displayedFlashcards[currentIndex] && (
          <FlashcardImage flashcard={displayedFlashcards[currentIndex]} />
        )}
      </div>
      {displayedFlashcards.length > 1 && (
         <div className="fixed bottom-0 left-0 right-0 z-10" style={{ height: footerApproxHeight }}>
            <NavigationControls
              onPrevious={goToPrevious}
              onNext={goToNext}
              canGoPrevious={true} 
              canGoNext={true}
            />
        </div>
      )}
    </main>
  );
}

