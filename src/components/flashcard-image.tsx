
import Image from 'next/image';
import type { Flashcard } from '@/lib/flashcard-data';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface FlashcardImageProps {
  flashcard: Flashcard;
  zoomLevel?: number;
  imageRotation?: number; 
  animationType?: string; // e.g., "jump-image", "spin-image-once"
}

export function FlashcardImage({ 
  flashcard, 
  zoomLevel = 1, 
  imageRotation = 0, 
  animationType = '' 
}: FlashcardImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const { imageUrl, altText, aiHint, displayText, id, type } = flashcard;
  const [internalAnimationKey, setInternalAnimationKey] = useState(0);

  useEffect(() => {
    if (type === 'image' && imageUrl) { 
      setIsLoading(true);
      setErrorOccurred(false);
    } else {
      setIsLoading(false); 
      setErrorOccurred(false);
    }
  }, [id, imageUrl, type]); 

  useEffect(() => {
    if (animationType) {
      setInternalAnimationKey(prev => prev + 1);
    }
  }, [animationType, id]);


  const handleImageLoad = () => {
    setIsLoading(false);
    setErrorOccurred(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setErrorOccurred(true);
    // console.error(`Error loading image. Path: ${imageUrl}`);
  };

  const getAnimationTarget = () => {
    const baseTarget = {
      scale: zoomLevel,
      rotate: imageRotation,
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" } // Smooth transition for prop changes
    };

    switch (animationType) {
      case 'jump-image':
        return {
          y: [0, -30, 0], 
          scale: [zoomLevel, zoomLevel * 1.1, zoomLevel],
          rotate: imageRotation, 
          opacity: 1,
          transition: { duration: 0.5, ease: "easeInOut", times: [0, 0.5, 1] },
        };
      case 'spin-image-once':
        return {
          ...baseTarget,
          rotate: imageRotation + 360,
          transition: { duration: 0.7, ease: "easeInOut" },
        };
      case 'pop-image':
        return {
          scale: [zoomLevel, zoomLevel * 1.2, zoomLevel],
          rotate: imageRotation,
          y:0,
          opacity: 1,
          transition: { duration: 0.4, ease: "easeInOut" },
        };
      case 'float-image':
        return {
          ...baseTarget,
          y: -50, 
          opacity: 0.3,
          transition: { duration: 1.5, ease: "easeInOut" },
        };
      case 'color-shift-image': // Handled by CSS for now
        return baseTarget;
      default:
        return baseTarget; 
    }
  };

  const animationProps = getAnimationTarget();
  
  const imageDynamicClassName = animationType === 'color-shift-image' ? 'animate-color-shift-image' : '';


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

  return (
    <div 
      id={`flashcard-image-container-${id}`} 
      className="flex flex-col items-center justify-center w-full h-full animate-fadeIn overflow-hidden group"
    >
      <motion.div 
        key={`${id}-${internalAnimationKey}`}
        className="relative w-full h-full flex items-center justify-center"
        initial={{ scale: zoomLevel, rotate: imageRotation, y: 0, opacity: 1 }}
        animate={animationProps}
        whileHover={!animationType ? { scale: zoomLevel * 1.02 } : {}} // Apply hover zoom only if no active animation
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
            key={`${id}-img`}
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
            className={imageDynamicClassName}
          />
        )}
        {!imageUrl && !isLoading && !errorOccurred && type === 'image' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10">
                <p className="text-muted-foreground text-lg">Image not available for this card.</p>
            </div>
        )}
      </motion.div>
    </div>
  );
}
