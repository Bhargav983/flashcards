
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
    const baseTarget = { // Base properties for animations
      scale: zoomLevel,
      rotate: imageRotation,
      y: 0,
      x: 0,
      opacity: 1,
      filter: 'none',
      // Default transition for prop changes, individual animations will override
      transition: { duration: 0.3, ease: "easeOut" } 
    };

    switch (animationType) {
      case 'jump-image':
        return {
          ...baseTarget,
          y: [0, -30, 0], 
          scale: [zoomLevel, zoomLevel * 1.1, zoomLevel],
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
          ...baseTarget,
          scale: [zoomLevel, zoomLevel * 1.2, zoomLevel],
          transition: { duration: 0.4, ease: "easeInOut" },
        };
      case 'float-image':
        return {
          ...baseTarget,
          y: [0, -50, 0], 
          opacity: [1, 0.7, 1],
          transition: { duration: 1.5, ease: "easeInOut", times: [0, 0.5, 1] },
        };
      case 'color-shift-image':
        return {
          ...baseTarget,
          filter: ["hue-rotate(0deg)", "hue-rotate(360deg)", "hue-rotate(0deg)"],
          transition: { duration: 2, ease: "linear", times: [0, 0.5, 1] },
        };
      // New Advanced Animations
      case 'shake-image':
        return {
          ...baseTarget,
          x: [0, -10, 10, -7, 7, -3, 3, 0],
          transition: { duration: 0.5, ease: "easeInOut" },
        };
      case 'dance-image':
        return {
          ...baseTarget,
          rotate: [imageRotation, imageRotation - 10, imageRotation + 10, imageRotation - 5, imageRotation + 5, imageRotation],
          scale: [zoomLevel, zoomLevel * 1.05, zoomLevel * 0.95, zoomLevel * 1.05, zoomLevel * 0.95, zoomLevel],
          transition: { duration: 0.8, ease: "easeInOut" },
        };
      case 'twinkle-image':
        return {
          ...baseTarget,
          opacity: [1, 0.4, 1, 0.4, 1, 0.4, 1],
          scale: [zoomLevel, zoomLevel * 1.03, zoomLevel, zoomLevel * 1.03, zoomLevel, zoomLevel * 1.03, zoomLevel],
          transition: { duration: 1.0, ease: "easeInOut" },
        };
      case 'blast-off-image':
        return {
          ...baseTarget,
          y: [0, -350],
          opacity: [1, 0],
          scale: [zoomLevel, zoomLevel * 0.4],
          transition: { duration: 0.7, ease: "easeIn" },
        };
      case 'freeze-image':
        return {
          ...baseTarget,
          filter: ["none", "saturate(20%) sepia(50%) hue-rotate(180deg) brightness(1.2) contrast(0.8)", "none"],
          transition: { duration: 1.5, ease: "easeInOut", times: [0, 0.5, 1] },
        };
      case 'boom-image':
        return {
          ...baseTarget,
          scale: [zoomLevel, zoomLevel * 2.2, zoomLevel * 0.2, zoomLevel * 0.2], // Hold small before fade
          opacity: [1, 0.8, 0.3, 0],
          rotate: [imageRotation, imageRotation + 8, imageRotation - 8, imageRotation + 4, imageRotation - 4, imageRotation],
          transition: { duration: 0.7, ease: "easeOut" },
        };
      case 'peekaboo-image':
        return {
          ...baseTarget,
          opacity: [1, 0.1, 1],
          scale: [zoomLevel, zoomLevel * 0.8, zoomLevel],
          transition: { duration: 1.2, ease:"easeInOut", times: [0, 0.5, 1] },
        };
      case 'magic-image':
        return {
          ...baseTarget,
          rotate: [imageRotation, imageRotation + 180, imageRotation + 360],
          scale: [zoomLevel, zoomLevel * 0.6, zoomLevel, zoomLevel * 1.3, zoomLevel],
          filter: ["none", "hue-rotate(120deg) saturate(250%)", "hue-rotate(240deg) saturate(200%)", "hue-rotate(360deg) saturate(150%)", "none"],
          transition: { duration: 1.5, ease: "circOut" },
        };
      default: // No animation or prop change (zoom/rotate)
        return {
            scale: zoomLevel,
            rotate: imageRotation,
            y: 0,
            x: 0,
            opacity: 1,
            filter: 'none',
            transition: { duration: 0.3, ease: "easeOut" }
        };
    }
  };

  const animationProps = getAnimationTarget();
  
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
        key={`${id}-${internalAnimationKey}`} // Change key to re-trigger animation from initial state
        className="relative w-full h-full flex items-center justify-center"
        initial={{ scale: zoomLevel, rotate: imageRotation, y: 0, x: 0, opacity: 1, filter: 'none' }}
        animate={animationProps}
        whileHover={!animationType && zoomLevel === 1 && imageRotation === 0 ? { scale: 1.05 } : {}}
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
            key={`${id}-img`} // Keep image key stable unless src changes for Next Image optimization
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
            // className is removed as color-shift is now Framer Motion based
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

