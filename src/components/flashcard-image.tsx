
import Image from 'next/image';
import type { Flashcard } from '@/lib/flashcard-data';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface FlashcardImageProps {
  flashcard: Flashcard;
  zoomLevel?: number;
  imageRotation?: number; 
}

export function FlashcardImage({ flashcard, zoomLevel = 1, imageRotation = 0 }: FlashcardImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const { imageUrl, altText, aiHint, displayText, id, type } = flashcard;

  useEffect(() => {
    if (type === 'image' && imageUrl) { 
      setIsLoading(true);
      setErrorOccurred(false);
      
      // Basic validation for imageUrl - only structural, not existence.
      // For local public assets, this doesn't fully validate path correctness.
      try {
        // Check if it's a relative path starting with / or an absolute URL
        if (!imageUrl.startsWith('/') && !imageUrl.startsWith('http')) {
            // console.warn(`Potentially malformed image URL: ${imageUrl}. Should be relative from public or absolute.`);
        }
      } catch (e) {
        // This catch block might not be hit for typical string path errors
        // console.error(`Error constructing URL for image: ${imageUrl}`, e);
        // setErrorOccurred(true); // Consider if this should set error
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
      className="flex flex-col items-center justify-center w-full h-full animate-fadeIn overflow-hidden group"
    >
      <div 
        className="relative w-[70vw] h-[70vh] flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105"
        style={{ transform: `scale(${zoomLevel}) rotate(${imageRotation}deg)` }}
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
            fill
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
