
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
  const { imageUrl, altText, aiHint, displayText, id } = flashcard;

  useEffect(() => {
    setIsLoading(true);
    setErrorOccurred(false);
  }, [id, imageUrl]); // Reset loading state when flashcard or its URL changes

  const handleImageLoad = () => {
    setIsLoading(false);
    setErrorOccurred(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setErrorOccurred(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full animate-fadeIn h-full">
      <div className="relative w-full flex-grow flex items-center justify-center p-2 sm:p-4"> {/* Adjusted height, make it flexible */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">Loading image...</p>
          </div>
        )}
        {errorOccurred && !isLoading && (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10">
            <p className="text-destructive text-lg">Could not load image.</p>
            <p className="text-muted-foreground text-sm">Please check the image path.</p>
          </div>
        )}
        <Image
          key={id}
          src={imageUrl}
          alt={altText}
          fill
          style={{ objectFit: 'contain', visibility: isLoading || errorOccurred ? 'hidden' : 'visible' }}
          priority // Prioritize loading the current image
          data-ai-hint={aiHint}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 60vw"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      {displayText && !isLoading && !errorOccurred && (
        <div className="mt-2 sm:mt-4 p-2 text-center">
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground break-words">
            {displayText}
          </p>
        </div>
      )}
    </div>
  );
}
