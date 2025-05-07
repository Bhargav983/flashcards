import Image from 'next/image';
import type { Flashcard } from '@/lib/flashcard-data';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface FlashcardImageProps {
  flashcard: Flashcard;
}

export function FlashcardImage({ flashcard }: FlashcardImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setErrorOccurred(false);
  }, [flashcard.id, flashcard.imageUrl]); // Reset loading state when flashcard or its URL changes

  const handleImageLoad = () => {
    setIsLoading(false);
    setErrorOccurred(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setErrorOccurred(true);
    // console.error(`Error loading image: ${flashcard.imageUrl}`); // Removed this line
  };

  return (
    <div className="relative w-full h-[calc(100svh-10rem)] flex items-center justify-center p-4">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">Loading image...</p>
        </div>
      )}
      {errorOccurred && !isLoading && (
         <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
          <p className="text-destructive">Could not load image.</p>
        </div>
      )}
      <Image
        key={flashcard.id} // For re-triggering animation and loading state on change
        src={flashcard.imageUrl}
        alt={flashcard.altText}
        fill
        style={{ objectFit: 'contain', visibility: isLoading || errorOccurred ? 'hidden' : 'visible' }}
        className="animate-fadeIn"
        priority // Prioritize loading the current image
        data-ai-hint={flashcard.aiHint}
        sizes="(max-width: 768px) 90vw, 70vw"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
}
