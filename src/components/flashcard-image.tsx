
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
  const { imageUrl, altText, aiHint, displayText, id, type } = flashcard;

  useEffect(() => {
    if (type === 'image' && imageUrl) { 
      setIsLoading(true);
      setErrorOccurred(false);
      
      const img = new window.Image();
      img.src = imageUrl; 
      img.onload = () => {
        if (document.getElementById(`flashcard-image-${id}`)) {
            handleImageLoad();
        }
      };
      img.onerror = () => {
        if (document.getElementById(`flashcard-image-${id}`)) {
            handleImageError();
        }
      };

    } else {
      setIsLoading(false); 
      setErrorOccurred(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, imageUrl, type]); 

  const handleImageLoad = () => {
    setIsLoading(false);
    setErrorOccurred(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setErrorOccurred(true);
  };

  if (type === 'text') {
    return (
      <div className="flex flex-col items-center justify-center w-full animate-fadeIn h-full p-4">
        <div className="text-center">
          <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-bright-red break-words">
            {displayText}
          </p>
        </div>
      </div>
    );
  }

  // type === 'image'
  return (
    <div id={`flashcard-image-${id}`} className="flex flex-col items-center justify-center w-full animate-fadeIn h-full">
      <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4"> {/* Reduced padding, ensure h-full */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">Loading image</p>
          </div>
        )}
        {errorOccurred && !isLoading && (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10">
            <p className="text-destructive text-lg">Could not load image.</p>
            <p className="text-muted-foreground text-sm">Please check the image path: {imageUrl}</p>
          </div>
        )}
        {imageUrl && altText && (
          <Image
            key={id} 
            src={imageUrl}
            alt={altText}
            fill
            style={{ objectFit: 'contain', visibility: isLoading || errorOccurred ? 'hidden' : 'visible' }}
            priority 
            data-ai-hint={aiHint}
            sizes="(max-width: 768px) 95vw, (max-width: 1280px) 90vw, 80vw" 
            onLoad={handleImageLoad} 
            onError={handleImageError}
          />
        )}
        {!imageUrl && !isLoading && !errorOccurred && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10">
                <p className="text-muted-foreground text-lg">Image not available for this card.</p>
            </div>
        )}
      </div>
    </div>
  );
}
