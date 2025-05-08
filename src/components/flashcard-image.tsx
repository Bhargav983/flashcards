
import Image from 'next/image';
import type { Flashcard } from '@/lib/flashcard-data';
import { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface FlashcardImageProps {
  flashcard: Flashcard;
  zoomLevel?: number;
  imageRotation?: number; 
  animationClass?: string;
}

export function FlashcardImage({ flashcard, zoomLevel = 1, imageRotation = 0, animationClass = '' }: FlashcardImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const { imageUrl, altText, aiHint, displayText, id, type } = flashcard;
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [currentAnimation, setCurrentAnimation] = useState(animationClass);

  useEffect(() => {
    if (type === 'image' && imageUrl) { 
      setIsLoading(true);
      setErrorOccurred(false);
      
      try {
        if (!imageUrl.startsWith('/') && !imageUrl.startsWith('http')) {
            // console.warn(`Potentially malformed image URL: ${imageUrl}. Should be relative from public or absolute.`);
        }
      } catch (e) {
        // console.error(`Error constructing URL for image: ${imageUrl}`, e);
      }

    } else {
      setIsLoading(false); 
      setErrorOccurred(false);
    }
  }, [id, imageUrl, type]); 

  useEffect(() => {
    // This effect handles re-triggering animations.
    // When animationClass prop changes, we want to ensure the animation plays.
    if (imageContainerRef.current && animationClass) {
      // Remove the old animation class
      setCurrentAnimation('');
      // Force a reflow - this is a trick to make the browser re-evaluate styles
      // and restart the animation when the class is re-added.
      // void imageContainerRef.current.offsetWidth; 
      
      // Add the new animation class after a tiny delay
      const timer = setTimeout(() => {
        setCurrentAnimation(animationClass);
      }, 10); // Small delay can help ensure the class removal is processed
      
      return () => clearTimeout(timer);
    } else if (!animationClass) {
        setCurrentAnimation(''); // Clear animation if prop is empty
    }
  }, [animationClass, id]); // Re-run if animationClass or card ID changes


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
      ref={imageContainerRef}
      className="flex flex-col items-center justify-center w-full h-full animate-fadeIn overflow-hidden group"
    >
      <div 
        className={`relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-[1.02] ${currentAnimation}`}
        style={{
          '--zoom-level': zoomLevel,
          '--image-rotation': `${imageRotation}deg`,
           transform: `scale(var(--zoom-level)) rotate(var(--image-rotation))`,
        } as React.CSSProperties}
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

