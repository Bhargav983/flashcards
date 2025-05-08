
import Image from 'next/image';
import type { Flashcard } from '@/lib/flashcard-data';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface FlashcardImageProps {
  flashcard: Flashcard;
  zoomLevel?: number; // Optional zoomLevel prop
}

export function FlashcardImage({ flashcard, zoomLevel = 1 }: FlashcardImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const { imageUrl, altText, aiHint, displayText, id, type } = flashcard;

  useEffect(() => {
    if (type === 'image' && imageUrl) { 
      setIsLoading(true);
      setErrorOccurred(false);
      
      // Basic validation for imageUrl
      try {
        new URL(imageUrl, window.location.origin); // Check if it's a valid relative or absolute URL
      } catch (e) {
        // If imageUrl is not a valid URL path (e.g. for local files), this might throw.
        // For public folder assets, this check is fine.
        // If it was an external URL, this would also validate its basic structure.
      }

    } else {
      setIsLoading(false); 
      setErrorOccurred(false);
    }
  }, [id, imageUrl, type]); 

  const handleImageLoad = () => {
    setIsLoading(false);
    setErrorOccurred(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setErrorOccurred(true);
    // console.error(`Error loading image. Path: ${imageUrl}`);
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
    <div 
      id={`flashcard-image-container-${id}`} 
      className="flex flex-col items-center justify-center w-full animate-fadeIn h-full overflow-hidden"
      // The 'group' class allows targeting children on hover of this container
      // Adding perspective for 3D-like zoom if desired in future, not strictly needed for 2D scale
    >
      <div 
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105"
        style={{ transform: `scale(${zoomLevel})` }} // Apply zoom level via transform
      >
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">Loading image</p>
          </div>
        )}
        {errorOccurred && !isLoading && (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10 p-4">
            <p className="text-destructive text-lg text-center">Could not load image.</p>
            {imageUrl && <p className="text-muted-foreground text-sm text-center">Path: {imageUrl}</p>}
          </div>
        )}
        {imageUrl && altText && (
          <Image
            key={id} 
            src={imageUrl}
            alt={altText}
            fill // Use fill to respect parent dimensions
            style={{ 
              objectFit: 'contain', 
              visibility: isLoading || errorOccurred ? 'hidden' : 'visible',
            }}
            priority 
            data-ai-hint={aiHint}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            onLoad={handleImageLoad} 
            onError={handleImageError}
          />
        )}
        {!imageUrl && !isLoading && !errorOccurred && type === 'image' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10">
                <p className="text-muted-foreground text-lg">Image not available for this card.</p>
            </div>
        )}
      </div>
    </div>
  );
}
